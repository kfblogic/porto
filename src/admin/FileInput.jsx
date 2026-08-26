import { useRef, useState } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import { uploadAsset, assetUrl } from '../lib/uploadAsset'
import { fileExtension } from '../lib/assetNames'

export default function FileInput({
  label,
  accept,
  hint,
  value,
  onChange,
  onReadFile,
  onValidate,
  preview = 'image',
  storageFolder,
  fixedFilename,
}) {
  const inputRef = useRef(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFiles = async (files) => {
    const file = files?.[0]
    if (!file) return
    setError(null)
    setLoading(true)
    try {
      if (onValidate) onValidate(file)
      else if (storageFolder && preview === 'image') {
        const { assertImageFile } = await import('../lib/readFile')
        assertImageFile(file)
      } else if (storageFolder && preview === 'auto') {
        const { assertCertFile } = await import('../lib/readFile')
        assertCertFile(file)
      }

      if (storageFolder) {
        let name = file.name
        if (fixedFilename) {
          name = fixedFilename.includes('.')
            ? fixedFilename
            : `${fixedFilename}.${fileExtension(file.name, fileExtension(file.type))}`
        }
        const path = await uploadAsset(file, storageFolder, name)
        onChange(path)
      } else if (onReadFile) {
        const dataUrl = await onReadFile(file)
        onChange(dataUrl)
      } else {
        throw new Error('Konfigurasi upload tidak lengkap')
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat file')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const clear = () => {
    onChange('')
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const isPdfPath = value?.toLowerCase().includes('.pdf')
  const isPdfData = value?.startsWith('data:application/pdf')
  const isPdf = isPdfPath || isPdfData
  const showImage = (preview === 'image' || preview === 'auto') && value && !isPdf
  const showDoc = (preview === 'file' || (preview === 'auto' && isPdf)) && value
  const previewSrc = assetUrl(value)
  const docName = value?.split('/').pop() || (isPdf ? 'PDF' : 'File')

  return (
    <div className="form-group full-width file-input-group">
      <label>{label}</label>
      {hint && <p className="file-input-hint">{hint}</p>}

      {showImage && (
        <div className="file-preview">
          <img src={previewSrc} alt="Preview" className="file-preview-img" />
          <button type="button" className="btn-danger-sm file-preview-remove" onClick={clear}>
            <X size={14} /> Hapus
          </button>
        </div>
      )}

      {showDoc && (
        <div className="file-preview file-preview-doc">
          <FileText size={20} />
          <span>{isPdf ? `${docName} (tersimpan)` : 'File tersimpan'}</span>
          {isPdfPath && (
            <a href={previewSrc} target="_blank" rel="noopener noreferrer" className="text-accent-secondary text-sm">
              Buka
            </a>
          )}
          <button type="button" className="btn-danger-sm" onClick={clear}>
            <X size={14} /> Hapus
          </button>
        </div>
      )}

      <label className="file-upload-btn">
        <Upload size={16} />
        {loading ? 'Memuat...' : value ? 'Ganti file' : 'Pilih file'}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="file-input-hidden"
          disabled={loading}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {value && storageFolder && (
        <p className="file-input-hint mt-2 break-all font-mono text-[0.75rem]">{value}</p>
      )}

      {error && <p className="file-input-error">{error}</p>}
    </div>
  )
}
