import { useRef, useEffect, useCallback, useState } from 'react'
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, Link2, Heading2, Heading3,
  Quote, RemoveFormatting, Pilcrow,
  IndentIncrease, IndentDecrease,
} from 'lucide-react'

const FONT_SIZES = [
  { label: 'Kecil (14px)', value: '14px' },
  { label: 'Normal (16px)', value: '16px' },
  { label: 'Sedang (18px)', value: '18px' },
  { label: 'Besar (20px)', value: '20px' },
  { label: 'Judul (24px)', value: '24px' },
]

const TOOLBAR = [
  { cmd: 'bold', icon: Bold, title: 'Tebal (Ctrl+B)' },
  { cmd: 'italic', icon: Italic, title: 'Miring (Ctrl+I)' },
  { cmd: 'underline', icon: Underline, title: 'Garis bawah (Ctrl+U)' },
  { cmd: 'strikeThrough', icon: Strikethrough, title: 'Coret' },
  { type: 'sep' },
  { cmd: 'formatBlock', arg: 'p', icon: Pilcrow, title: 'Paragraf' },
  { cmd: 'formatBlock', arg: 'h2', icon: Heading2, title: 'Judul besar' },
  { cmd: 'formatBlock', arg: 'h3', icon: Heading3, title: 'Judul kecil' },
  { type: 'sep' },
  { cmd: 'insertUnorderedList', icon: List, title: 'Daftar bullet' },
  { cmd: 'insertOrderedList', icon: ListOrdered, title: 'Daftar nomor' },
  { cmd: 'formatBlock', arg: 'blockquote', icon: Quote, title: 'Kutipan' },
  { type: 'sep' },
  { cmd: 'indent', icon: IndentIncrease, title: 'Jorok ke kanan (Tab)' },
  { cmd: 'outdent', icon: IndentDecrease, title: 'Jorok ke kiri (Shift+Tab)' },
  { type: 'sep' },
  { cmd: 'createLink', icon: Link2, title: 'Sisipkan tautan' },
  { cmd: 'removeFormat', icon: RemoveFormatting, title: 'Hapus format' },
]

function normalizeHtml(html) {
  const trimmed = (html || '').trim()
  if (!trimmed || trimmed === '<br>') return ''
  return trimmed
}

export function plainTextToHtml(text) {
  if (!text?.trim()) return ''
  if (/<[a-z][\s\S]*>/i.test(text)) return text
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('')
}

function applyFontSize(editor, px) {
  editor?.focus()
  const selection = window.getSelection()
  if (!selection?.rangeCount) return

  const range = selection.getRangeAt(0)
  const span = document.createElement('span')
  span.style.fontSize = px

  if (selection.isCollapsed) {
    span.appendChild(document.createTextNode('\u200B'))
    range.insertNode(span)
    range.setStart(span.firstChild, 1)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
    return
  }

  try {
    range.surroundContents(span)
  } catch {
    const extracted = range.extractContents()
    span.appendChild(extracted)
    range.insertNode(span)
  }
  selection.collapseToEnd()
}

function applyIndent(shiftKey) {
  if (shiftKey) {
    if (!document.execCommand('outdent')) {
      document.execCommand('insertText', false, '')
    }
    return
  }
  const ok = document.execCommand('indent')
  if (!ok) {
    document.execCommand('insertText', false, '    ')
  }
}

export default function RichTextEditor({ value, onChange, placeholder = 'Tulis artikel project di sini...' }) {
  const editorRef = useRef(null)
  const lastHtmlRef = useRef(value || '')
  const [fontSize, setFontSize] = useState('16px')

  const emitChange = useCallback(() => {
    const html = normalizeHtml(editorRef.current?.innerHTML)
    lastHtmlRef.current = html
    onChange(html)
  }, [onChange])

  const initializedRef = useRef(false)

  useEffect(() => {
    const el = editorRef.current
    if (!el) return

    if (!initializedRef.current) {
      initializedRef.current = true
      const html = plainTextToHtml(value)
      el.innerHTML = html
      lastHtmlRef.current = html
      if (html !== (value || '')) onChange(html)
      return
    }

    const next = value || ''
    if (next !== lastHtmlRef.current && next !== normalizeHtml(el.innerHTML)) {
      el.innerHTML = next
      lastHtmlRef.current = next
    }
  }, [value, onChange])

  const runCommand = (cmd, arg) => {
    editorRef.current?.focus()
    if (cmd === 'createLink') {
      const url = window.prompt('URL tautan:', 'https://')
      if (url) document.execCommand('createLink', false, url)
    } else if (cmd === 'indent') {
      applyIndent(false)
    } else if (cmd === 'outdent') {
      applyIndent(true)
    } else if (cmd === 'formatBlock' && arg) {
      document.execCommand('formatBlock', false, arg)
    } else {
      document.execCommand(cmd, false, arg ?? null)
    }
    emitChange()
  }

  const handleFontSizeChange = (px) => {
    setFontSize(px)
    applyFontSize(editorRef.current, px)
    emitChange()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      e.stopPropagation()
      editorRef.current?.focus()
      applyIndent(e.shiftKey)
      emitChange()
      return
    }

    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') { e.preventDefault(); runCommand('bold') }
      if (e.key === 'i') { e.preventDefault(); runCommand('italic') }
      if (e.key === 'u') { e.preventDefault(); runCommand('underline') }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    const html = e.clipboardData.getData('text/html')
    if (html) {
      document.execCommand('insertHTML', false, html)
    } else {
      document.execCommand('insertText', false, text)
    }
    emitChange()
  }

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar" role="toolbar" aria-label="Format artikel">
        <label className="rich-text-size-label">
          <span className="rich-text-size-label-text">Ukuran</span>
          <select
            className="rich-text-size-select"
            value={fontSize}
            title="Ukuran huruf"
            onChange={(e) => handleFontSizeChange(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {FONT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
        <span className="rich-text-sep" aria-hidden />
        {TOOLBAR.map((item, i) =>
          item.type === 'sep' ? (
            <span key={`sep-${i}`} className="rich-text-sep" aria-hidden />
          ) : (
            <button
              key={item.cmd + (item.arg || '')}
              type="button"
              className="rich-text-btn"
              title={item.title}
              onMouseDown={(e) => {
                e.preventDefault()
                runCommand(item.cmd, item.arg)
              }}
            >
              <item.icon size={16} />
            </button>
          )
        )}
      </div>
      <div
        ref={editorRef}
        className="rich-text-content"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        tabIndex={0}
        data-placeholder={placeholder}
        onInput={emitChange}
        onBlur={emitChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
      />
      <p className="rich-text-hint">
        Tab = jorok ke kanan · Shift+Tab = jorok ke kiri · Pilih teks lalu ubah ukuran huruf di dropdown.
      </p>
    </div>
  )
}
