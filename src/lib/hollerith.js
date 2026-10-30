// Kode kartu IBM 029: baris 12, 11, 0, 1..9 (urutan fisik dari atas).
export const ROWS = ['12', '11', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const ZONE = { A: '12', J: '11', S: '0' }
const SPECIAL = {
  ' ': [], '&': ['12'], '-': ['11'], '/': ['0', '1'], '.': ['12', '3', '8'],
  ',': ['0', '3', '8'], '@': ['8', '4'], "'": ['8', '5'], '(': ['12', '5', '8'], ')': ['11', '5', '8'],
}

// Kembalikan daftar baris yang dipunch untuk satu karakter.
export function encodeChar(ch) {
  const c = ch.toUpperCase()
  if (c in SPECIAL) return SPECIAL[c]
  if (c >= '0' && c <= '9') return [c]
  if (c >= 'A' && c <= 'I') return [ZONE.A, String(c.charCodeAt(0) - 64)]
  if (c >= 'J' && c <= 'R') return [ZONE.J, String(c.charCodeAt(0) - 73)]
  if (c >= 'S' && c <= 'Z') return [ZONE.S, String(c.charCodeAt(0) - 81)]
  return [] // ponytail: karakter di luar set 029 dibiarkan kosong
}

if (import.meta.env?.DEV) {
  const eq = (a, b) => a.join() === b.join()
  console.assert(eq(encodeChar('A'), ['12', '1']), 'A')
  console.assert(eq(encodeChar('K'), ['11', '2']), 'K')
  console.assert(eq(encodeChar('S'), ['0', '2']), 'S')
  console.assert(eq(encodeChar('Z'), ['0', '9']), 'Z')
  console.assert(eq(encodeChar('7'), ['7']), '7')
}
