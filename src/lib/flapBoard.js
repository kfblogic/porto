import {
  BoxGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  AmbientLight,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three'

const HOUSING = '#111210'
const FLAP = '#1c1d1a'
const INK = '#ece8dc'
const FONT = '"Big Shoulders Display", "Barlow Condensed", sans-serif'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const BASE_CHARS = ` ${LETTERS}0123456789/-&.`

const CELL_W = 1
const CELL_H = 1.62
const CREASE = 0.018
const PITCH_X = 1.05
const ROW_GAP = 0.09
const FLIP_MS = 130
const LAST_FLIP_MS = 210
const STAGGER_MS = 26
const HEADLINE_EVERY_MS = 6000
const PHONE_WIDTH = 720
const WIDE_COLUMNS = 13

// Bungkus nama ke baris selebar kolom papan, tanpa memotong kata.
export function layoutRows(text, columns) {
  const rows = []
  for (const word of text.toUpperCase().split(/\s+/).filter(Boolean)) {
    const last = rows[rows.length - 1]
    if (last !== undefined && last.length + 1 + word.length <= columns) {
      rows[rows.length - 1] = `${last} ${word}`
    } else {
      rows.push(word)
    }
  }
  return rows
}

function buildAtlas(chars, maxAnisotropy) {
  const tileW = 180
  const tileH = Math.round((tileW * CELL_H) / CELL_W)
  const perRow = 8
  const rowCount = Math.ceil(chars.length / perRow)
  const canvas = document.createElement('canvas')
  canvas.width = tileW * perRow
  canvas.height = tileH * rowCount
  const ctx = canvas.getContext('2d')

  ctx.font = `800 ${tileH * 0.8}px ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  const cap = ctx.measureText('H')
  const baseline = tileH / 2 + (cap.actualBoundingBoxAscent - cap.actualBoundingBoxDescent) / 2

  const tiles = new Map()
  ;[...chars].forEach((ch, i) => {
    const x = (i % perRow) * tileW
    const y = Math.floor(i / perRow) * tileH
    ctx.fillStyle = FLAP
    ctx.fillRect(x, y, tileW, tileH)
    // Bayangan lipatan tercetak di flap, supaya tengah tiap huruf terasa berengsel.
    const shade = ctx.createLinearGradient(0, y + tileH * 0.4, 0, y + tileH * 0.6)
    shade.addColorStop(0, 'rgba(0,0,0,0)')
    shade.addColorStop(0.5, 'rgba(0,0,0,0.38)')
    shade.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = shade
    ctx.fillRect(x, y, tileW, tileH)
    ctx.fillStyle = INK
    ctx.fillText(ch, x + tileW / 2, y + baseline)
    tiles.set(ch, {
      u0: x / canvas.width,
      u1: (x + tileW) / canvas.width,
      v0: 1 - (y + tileH) / canvas.height,
      v1: 1 - y / canvas.height,
    })
  })

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.minFilter = LinearMipmapLinearFilter
  texture.magFilter = LinearFilter
  texture.anisotropy = maxAnisotropy
  return { texture, tiles }
}

// Geometri setengah flap per karakter; atas dan bawah berbagi engsel di y = 0.
function halfGeometry({ u0, u1, v0, v1 }, upper) {
  const height = CELL_H / 2 - CREASE / 2
  const geometry = new PlaneGeometry(CELL_W, height)
  geometry.translate(0, upper ? height / 2 + CREASE / 2 : -height / 2 - CREASE / 2, 0)
  const vMid = (v0 + v1) / 2
  const uv = geometry.attributes.uv
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(
      i,
      uv.getX(i) === 0 ? u0 : u1,
      upper ? (uv.getY(i) === 0 ? vMid : v1) : uv.getY(i) === 0 ? v0 : vMid,
    )
  }
  return geometry
}

export async function createFlapBoard(host, { name, headlines }) {
  await document.fonts.load(`800 100px "Big Shoulders Display"`)

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new WebGLRenderer({ antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(new Color(HOUSING))
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)

  const upperHeadlines = headlines.map((h) => h.toUpperCase())
  const chars = [...new Set(BASE_CHARS + name.toUpperCase() + upperHeadlines.join(''))].join('')
  const { texture, tiles } = buildAtlas(chars, renderer.capabilities.getMaxAnisotropy())
  const upperGeo = new Map()
  const lowerGeo = new Map()
  for (const [ch, tile] of tiles) {
    upperGeo.set(ch, halfGeometry(tile, true))
    lowerGeo.set(ch, halfGeometry(tile, false))
  }

  const flapMaterial = new MeshLambertMaterial({ map: texture })
  const backingMaterial = new MeshBasicMaterial({ color: '#070706' })
  const railMaterial = new MeshStandardMaterial({ color: '#34352f', roughness: 0.45, metalness: 0.5 })
  const unitBox = new BoxGeometry(1, 1, 1)
  const unitPlane = new PlaneGeometry(1, 1)

  const scene = new Scene()
  // Total cahaya pada flap menghadap depan = 1, supaya warnanya sama dengan token --flap dan --flap-ink.
  scene.add(new AmbientLight('#ffffff', 2.45))
  const key = new DirectionalLight('#ffffff', 1)
  key.position.set(-5, 8, 9)
  scene.add(key)

  const camera = new PerspectiveCamera(16, 1, 0.1, 400)
  const bank = new Group()
  scene.add(bank)

  let cells = []
  let headlineCells = []
  let boardW = 1
  let boardH = 1

  const makeCell = (x, y, scale) => {
    const group = new Group()
    group.position.set(x, y, 0)
    group.scale.setScalar(scale)
    const top = new Mesh(upperGeo.get(' '), flapMaterial)
    const bottom = new Mesh(lowerGeo.get(' '), flapMaterial)
    const pivot = new Group()
    pivot.position.z = 0.012
    pivot.visible = false
    const front = new Mesh(upperGeo.get(' '), flapMaterial)
    const back = new Mesh(lowerGeo.get(' '), flapMaterial)
    back.rotation.x = -Math.PI
    pivot.add(front, back)
    group.add(top, bottom, pivot)
    bank.add(group)
    const cell = { top, bottom, pivot, front, back, current: ' ', next: ' ', queue: [], startAt: 0, flipStart: 0, duration: 0 }
    cells.push(cell)
    return cell
  }

  const showNow = (cell, ch) => {
    cell.current = ch
    cell.queue = []
    cell.pivot.visible = false
    cell.top.geometry = upperGeo.get(ch)
    cell.bottom.geometry = lowerGeo.get(ch)
  }

  // Jalur flip dibatasi beberapa huruf acak, bukan satu putaran alfabet penuh, supaya tetap tenang.
  const flipTo = (cell, ch, startAt) => {
    if (cell.current === ch && cell.queue.length === 0) return
    const spins = 2 + Math.floor(Math.random() * 3)
    cell.queue = []
    for (let i = 0; i < spins; i++) cell.queue.push(LETTERS[Math.floor(Math.random() * LETTERS.length)])
    cell.queue.push(ch)
    cell.startAt = startAt
  }

  const fitCamera = () => {
    const width = host.clientWidth || 1
    const height = host.clientHeight || 1
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360)
    const margin = width < PHONE_WIDTH ? 1.05 : 1.09
    camera.position.z = Math.max(boardH / 2 / tanHalf, boardW / 2 / (tanHalf * camera.aspect)) * margin
    camera.updateProjectionMatrix()
  }

  const buildBoard = () => {
    bank.clear()
    cells = []
    const phone = host.clientWidth < PHONE_WIDTH
    const longestWord = Math.max(...name.split(/\s+/).map((word) => word.length))
    const columns = phone ? longestWord : Math.max(longestWord, WIDE_COLUMNS)
    const nameRows = layoutRows(name, columns)

    const headlineColumns = Math.max(...upperHeadlines.map((h) => h.length))
    boardW = columns * PITCH_X - (PITCH_X - CELL_W)
    const headlineScale = Math.min(0.72, (boardW + PITCH_X - CELL_W) / (headlineColumns * PITCH_X))
    const headlineH = CELL_H * headlineScale
    boardH = nameRows.length * (CELL_H + ROW_GAP) + ROW_GAP + headlineH

    const left = -boardW / 2 + CELL_W / 2
    let y = boardH / 2 - CELL_H / 2
    const rows = nameRows.map((row) => {
      const line = []
      for (let col = 0; col < columns; col++) line.push(makeCell(left + col * PITCH_X, y, 1))
      y -= CELL_H + ROW_GAP
      const rail = new Mesh(unitBox, railMaterial)
      rail.scale.set(boardW + 0.14, 0.022, 0.05)
      rail.position.set(0, y + CELL_H / 2 + ROW_GAP / 2, 0.02)
      bank.add(rail)
      return { line, text: row }
    })

    const headlineY = -boardH / 2 + headlineH / 2
    const headlineLeft = -boardW / 2 + (CELL_W * headlineScale) / 2
    headlineCells = []
    for (let col = 0; col < headlineColumns; col++) {
      headlineCells.push(makeCell(headlineLeft + col * PITCH_X * headlineScale, headlineY, headlineScale))
    }

    const backing = new Mesh(unitPlane, backingMaterial)
    backing.scale.set(boardW + 0.14, boardH + 0.14, 1)
    backing.position.z = -0.04
    bank.add(backing)

    fitCamera()
    return rows
  }

  const padTo = (text, length) => text.padEnd(length, ' ').slice(0, length)

  const setHeadline = (text, animate, now) => {
    const padded = padTo(text, headlineCells.length)
    headlineCells.forEach((cell, i) => {
      const ch = padded[i]
      if (animate) flipTo(cell, ch, now + i * STAGGER_MS)
      else showNow(cell, ch)
    })
  }

  let rafId = 0
  let onScreen = true
  let headlineIndex = 0
  let targetTiltX = 0
  let targetTiltY = 0

  const requestFrame = () => {
    if (!rafId && onScreen) rafId = requestAnimationFrame(tick)
  }

  const advanceCell = (cell, now) => {
    if (cell.pivot.visible) {
      const progress = Math.min(1, (now - cell.flipStart) / cell.duration)
      // Gravitasi: flap jatuh makin cepat sampai menepuk flap di bawahnya.
      cell.pivot.rotation.x = Math.PI * progress * progress
      if (progress === 1) {
        cell.current = cell.next
        cell.bottom.geometry = lowerGeo.get(cell.current)
        cell.pivot.visible = false
      }
      return true
    }
    if (cell.queue.length === 0) return false
    if (now < cell.startAt) return true
    cell.next = cell.queue.shift()
    cell.front.geometry = upperGeo.get(cell.current)
    cell.back.geometry = lowerGeo.get(cell.next)
    cell.top.geometry = upperGeo.get(cell.next)
    cell.pivot.rotation.x = 0
    cell.pivot.visible = true
    cell.flipStart = now
    cell.duration = cell.queue.length === 0 ? LAST_FLIP_MS : FLIP_MS
    return true
  }

  function tick(now) {
    rafId = 0
    let busy = false
    for (const cell of cells) if (advanceCell(cell, now)) busy = true

    const dx = targetTiltX - bank.rotation.x
    const dy = targetTiltY - bank.rotation.y
    if (Math.abs(dx) > 0.0002 || Math.abs(dy) > 0.0002) {
      bank.rotation.x += dx * 0.06
      bank.rotation.y += dy * 0.06
      busy = true
    }

    renderer.render(scene, camera)
    // ponytail: render hanya saat ada yang bergerak, papan idle tidak memakai GPU sama sekali.
    if (busy) requestFrame()
  }

  const showFinal = (rows) => {
    for (const { line, text } of rows) {
      const padded = padTo(text, line.length)
      line.forEach((cell, i) => showNow(cell, padded[i]))
    }
    setHeadline(upperHeadlines[headlineIndex], false)
  }

  let rows = buildBoard()
  let lastPhone = host.clientWidth < PHONE_WIDTH

  if (reducedMotion) {
    showFinal(rows)
  } else {
    const now = performance.now() + 250
    rows.forEach(({ line, text }, r) => {
      const padded = padTo(text, line.length)
      line.forEach((cell, i) => flipTo(cell, padded[i], now + (i + r * 3) * STAGGER_MS))
    })
    setHeadline(upperHeadlines[0], true, now + rows.length * 3 * STAGGER_MS + 200)
  }
  requestFrame()

  const onResize = () => {
    const phone = host.clientWidth < PHONE_WIDTH
    if (phone !== lastPhone) {
      lastPhone = phone
      rows = buildBoard()
      showFinal(rows)
    } else {
      fitCamera()
    }
    renderer.render(scene, camera)
  }
  const resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(host)

  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting
    if (onScreen) requestFrame()
  })
  visibility.observe(host)

  let timer = 0
  if (!reducedMotion && upperHeadlines.length > 1) {
    timer = window.setInterval(() => {
      if (!onScreen || document.hidden) return
      headlineIndex = (headlineIndex + 1) % upperHeadlines.length
      setHeadline(upperHeadlines[headlineIndex], true, performance.now())
      requestFrame()
    }, HEADLINE_EVERY_MS)
  }

  const onPointerMove = (event) => {
    targetTiltY = ((event.clientX / window.innerWidth) * 2 - 1) * 0.035
    targetTiltX = ((event.clientY / window.innerHeight) * 2 - 1) * 0.022
    requestFrame()
  }
  const canTilt = !reducedMotion && window.matchMedia('(hover: hover)').matches
  if (canTilt) window.addEventListener('pointermove', onPointerMove, { passive: true })

  return () => {
    cancelAnimationFrame(rafId)
    window.clearInterval(timer)
    resizeObserver.disconnect()
    visibility.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    for (const geometry of [...upperGeo.values(), ...lowerGeo.values(), unitBox, unitPlane]) geometry.dispose()
    texture.dispose()
    flapMaterial.dispose()
    backingMaterial.dispose()
    railMaterial.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}
