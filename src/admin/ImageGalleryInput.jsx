import { useRef, useState } from 'react'
import { Upload, X, RefreshCw } from 'lucide-react'
import { assertImageFile } from '../lib/readFile'
import { uploadAsset, assetUrl } from '../lib/uploadAsset'
import { ASSET_NAMES, fileExtension } from '../lib/assetNames'

export default function ImageGalleryInput({ label, projectId, images = [], onChange }) {
  const inputRef = useRef(null)
  const replaceRef = useRef(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [replaceIndex, setReplaceIndex] = useState(null)

  const paths = images.map((img) => (typeof img === 'string' ? img : img?.path)).filter(Boolean)

  const setImages = (newPaths) => {
    const next = newPaths.map((path, idx) => ({
      id: images[idx]?.id ?? projectId * 1000 + idx,
      path,
    }))
    onChange(next)
  }

  const uploadAtIndex = async (file, index) => {
    assertImageFile(file)
    const ext = fileExtension(file.name, fileExtension(file.type))
    const filename = ASSET_NAMES.projectImage(projectId, index, ext)
    return uploadAsset(file, 'projects', filename)
  }

  const handleAdd = async (fileList) => {
    if (!fileList?.length || !projectId) return
    setError(null)
    setLoading(true)
    try {
      const files = Array.from(fileList)
      const uploaded = []
      for (let i = 0; i < files.length; i++) {
        const index = paths.length + i
        const path = await uploadAtIndex(files[i], index)
        uploaded.push(path)
      }
      setImages([...paths, ...uploaded])
    } catch (err) {
      setError(err.message || 'Gagal memuat gambar')
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleReplace = async (fileList) => {
    const file = fileList?.[0]
    if (file == null || replaceIndex == null) return
    setError(null)
    setLoading(true)
    try {
      const path = await uploadAtIndex(file, replaceIndex)
      const next = [...paths]
      next[replaceIndex] = path
      setImages(next)
    } catch (err) {
      setError(err.message || 'Gagal mengganti gambar')
    } finally {
      setLoading(false)
      setReplaceIndex(null)
      if (replaceRef.current) replaceRef.current.value = ''
    }
  }

  const removeAt = (index) => {
    setImages(paths.filter((_, i) => i !== index))
  }

  const startReplace = (index) => {
    setReplaceIndex(index)
    replaceRef.current?.click()
  }

  return (
    <div className="form-group full-width file-input-group">
      <label>{label}</label>
      <p className="file-input-hint">
        File: project-{projectId}-0, project-{projectId}-1, … Upload baru menimpa slot yang sama (tidak menambah file acak).
      </p>

      {paths.length > 0 && (
        <div className="image-gallery-preview">
          {paths.map((src, i) => (
            <div key={`${projectId}-${i}`} className="image-gallery-item">
              <img src={assetUrl(src)} alt={`Gambar ${i + 1}`} />
              <div className="image-gallery-actions">
                <button
                  type="button"
                  className="image-gallery-replace"
                  onClick={() => startReplace(i)}
                  title="Ganti gambar (timpa file lama)"
                >
                  <RefreshCw size={12} />
                </button>
                <button
                  type="button"
                  className="image-gallery-remove"
                  onClick={() => removeAt(i)}
                  aria-label={`Hapus gambar ${i + 1}`}
                >
                  <X size={14} />
                </button>
              </div>
              {i === 0 && <span className="image-gallery-badge">Cover</span>}
            </div>
          ))}
        </div>
      )}

      <input
        ref={replaceRef}
        type="file"
        accept="image/*"
        className="file-input-hidden"
        onChange={(e) => handleReplace(e.target.files)}
      />

      <label className="file-upload-btn">
        <Upload size={16} />
        {loading ? 'Memuat...' : '+ Tambah gambar'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="file-input-hidden"
          disabled={loading}
          onChange={(e) => handleAdd(e.target.files)}
        />
      </label>

      {error && <p className="file-input-error">{error}</p>}
    </div>
  )
}
