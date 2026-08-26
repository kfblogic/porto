import { useCallback, useEffect, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import { Upload, X } from 'lucide-react'
import { assertImageFile } from '../lib/readFile'
import { getCroppedSquareBlob, HERO_AVATAR_OUTPUT_PX } from '../lib/cropImage'
import { uploadAsset, assetUrl } from '../lib/uploadAsset'
import { ASSET_NAMES, fileExtension } from '../lib/assetNames'

export default function ProfilePhotoInput({ value, onChange }) {
  const inputRef = useRef(null)
  const imageSrcRef = useRef('')
  const [error, setError] = useState(null)
  const [loadingPick, setLoadingPick] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [applying, setApplying] = useState(false)
  const croppedPixelsRef = useRef(null)

  useEffect(() => {
    imageSrcRef.current = imageSrc
  }, [imageSrc])

  useEffect(() => () => {
    const u = imageSrcRef.current
    if (u?.startsWith('blob:')) URL.revokeObjectURL(u)
  }, [])

  const closeModal = () => {
    const u = imageSrcRef.current
    if (u?.startsWith('blob:')) URL.revokeObjectURL(u)
    imageSrcRef.current = ''
    setImageSrc('')
    setModalOpen(false)
    setZoom(1)
    setCrop({ x: 0, y: 0 })
    croppedPixelsRef.current = null
    if (inputRef.current) inputRef.current.value = ''
  }

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    croppedPixelsRef.current = croppedAreaPixels
  }, [])

  const handlePick = async (files) => {
    const file = files?.[0]
    if (!file) return
    setError(null)
    setLoadingPick(true)
    try {
      assertImageFile(file)
      const prev = imageSrcRef.current
      if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev)
      const url = URL.createObjectURL(file)
      imageSrcRef.current = url
      setImageSrc(url)
      setModalOpen(true)
      setZoom(1)
      setCrop({ x: 0, y: 0 })
    } catch (err) {
      setError(err.message || 'Gagal memuat file')
    } finally {
      setLoadingPick(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleApply = async () => {
    const pixels = croppedPixelsRef.current
    const src = imageSrcRef.current
    if (!pixels || !src) {
      setError('Sesuaikan crop terlebih dahulu.')
      return
    }
    setError(null)
    setApplying(true)
    try {
      const blob = await getCroppedSquareBlob(src, pixels, HERO_AVATAR_OUTPUT_PX)
      const ext = blob.type.includes('webp') ? 'webp' : 'png'
      const filename = ASSET_NAMES.profilePhoto(ext)
      const path = await uploadAsset(
        new File([blob], filename, { type: blob.type }),
        'profile',
        filename
      )
      onChange(path)
      closeModal()
    } catch (err) {
      setError(err.message || 'Gagal memproses gambar')
    } finally {
      setApplying(false)
    }
  }

  const clear = () => {
    onChange('')
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="form-group full-width file-input-group">
      <label>Foto Profil</label>
      <p className="file-input-hint">
        Crop lingkaran 1:1 — disimpan sebagai file WebP di public/assets/portfolio/profile/ (bukan base64).
        Output {HERO_AVATAR_OUTPUT_PX}px untuk layar retina. Maks. 5MB sebelum crop.
      </p>

      {value && (
        <div className="file-preview">
          <div className="profile-photo-preview-ring">
            <img src={assetUrl(value)} alt="Preview profil" className="profile-photo-preview-avatar" />
          </div>
          <button type="button" className="btn-danger-sm file-preview-remove" onClick={clear}>
            <X size={14} /> Hapus
          </button>
        </div>
      )}

      <label className="file-upload-btn">
        <Upload size={16} />
        {loadingPick ? 'Memuat...' : value ? 'Ganti & crop foto' : 'Pilih & crop foto'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="file-input-hidden"
          disabled={loadingPick || modalOpen}
          onChange={(e) => handlePick(e.target.files)}
        />
      </label>

      {error && !modalOpen && <p className="file-input-error">{error}</p>}

      {modalOpen && imageSrc && (
        <div className="crop-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="crop-modal-title">
          <div className="crop-modal">
            <h3 id="crop-modal-title" className="crop-modal-title">Sesuaikan foto (lingkaran hero)</h3>
            <p className="crop-modal-sub">Geser & zoom agar isi foto pas di lingkaran — sama bentuknya dengan avatar di beranda.</p>

            <div className="crop-modal-stage">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="crop-modal-zoom">
              <label htmlFor="crop-zoom">Zoom</label>
              <input
                id="crop-zoom"
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </div>

            {error && <p className="file-input-error">{error}</p>}

            <div className="crop-modal-actions">
              <button type="button" className="btn btn-outline" onClick={closeModal} disabled={applying}>
                Batal
              </button>
              <button type="button" className="btn btn-primary" onClick={handleApply} disabled={applying}>
                {applying ? 'Menyimpan...' : `Terapkan (${HERO_AVATAR_OUTPUT_PX}×${HERO_AVATAR_OUTPUT_PX}px)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
