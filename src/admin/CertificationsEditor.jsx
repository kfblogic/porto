import { Award } from 'lucide-react'
import FileInput from './FileInput'
import { assertCertFile, assertImageFile } from '../lib/readFile'
import { isPdfCert } from '../lib/certAssets'

export default function CertificationsEditor({ data, onChange }) {
  const items = data.certifications || []
  const update = (i, key, val) => {
    const u = [...items]; u[i] = { ...u[i], [key]: val }
    onChange({ ...data, certifications: u })
  }
  const add = () => onChange({
    ...data, certifications: [...items, {
      id: Date.now(), name: '', issuer: '', issued_at: '',
      expires_at: '', credential_id: '', credential_url: '', image: '', cover: ''
    }]
  })
  const remove = (i) => onChange({ ...data, certifications: items.filter((_, idx) => idx !== i) })

  return (
    <div className="editor-section">
      <h2 className="editor-title"><Award size={20} /> Certifications</h2>
      {items.map((item, i) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-header">
            <span>{item.name || `#${i + 1}`}</span>
            <button className="btn-danger-sm" onClick={() => remove(i)}>Delete</button>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Name</label>
              <input type="text" value={item.name} onChange={e => update(i, 'name', e.target.value)} /></div>
            <div className="form-group"><label>Issuer</label>
              <input type="text" value={item.issuer} onChange={e => update(i, 'issuer', e.target.value)} /></div>
            <div className="form-group"><label>Issued Date</label>
              <input type="date" value={item.issued_at} onChange={e => update(i, 'issued_at', e.target.value)} /></div>
            <div className="form-group"><label>Expires Date</label>
              <input type="date" value={item.expires_at} onChange={e => update(i, 'expires_at', e.target.value)} /></div>
            <div className="form-group"><label>Credential ID</label>
              <input type="text" value={item.credential_id || ''} onChange={e => update(i, 'credential_id', e.target.value)} /></div>
            <div className="form-group"><label>Credential URL</label>
              <input type="text" value={item.credential_url || ''} onChange={e => update(i, 'credential_url', e.target.value)} /></div>
            <FileInput
              label="Bukti Sertifikat (gambar atau PDF)"
              accept="image/*,application/pdf,.pdf"
              hint="Gambar (JPG, PNG, WebP) atau PDF. Disimpan sebagai cert-{id}.ext — upload baru menimpa file lama. Maks. 5MB."
              value={item.image || ''}
              onChange={(v) => {
                const u = [...items]
                const next = { ...u[i], image: v }
                if (!isPdfCert(v)) next.cover = ''
                u[i] = next
                onChange({ ...data, certifications: u })
              }}
              onValidate={assertCertFile}
              storageFolder="certifications"
              fixedFilename={`cert-${item.id}`}
              preview="auto"
            />
            {isPdfCert(item.image) && (
              <FileInput
                label="Cover sertifikat (gambar)"
                accept="image/*"
                hint="Tampil di portofolio saat bukti berupa PDF. Disimpan sebagai cert-{id}-cover.ext. Maks. 5MB."
                value={item.cover || ''}
                onChange={(v) => update(i, 'cover', v)}
                onValidate={assertImageFile}
                storageFolder="certifications"
                fixedFilename={`cert-${item.id}-cover`}
                preview="image"
              />
            )}
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={add}>+ Add Certification</button>
    </div>
  )
}
