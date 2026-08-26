import { User } from 'lucide-react'
import ProfilePhotoInput from './ProfilePhotoInput'
import FileInput from './FileInput'
import { assertCvFile } from '../lib/readFile'

export default function ProfileEditor({ data, onChange }) {
  const p = data.profile || {}
  const update = (key, value) => onChange({ ...data, profile: { ...p, [key]: value } })
  const updateHeadline = (i, v) => {
    const h = [...(p.headlines || [])]; h[i] = v
    onChange({ ...data, profile: { ...p, headlines: h } })
  }
  const addHeadline = () => onChange({ ...data, profile: { ...p, headlines: [...(p.headlines || []), ''] } })
  const removeHeadline = (i) => onChange({ ...data, profile: { ...p, headlines: (p.headlines || []).filter((_, idx) => idx !== i) } })

  return (
    <div className="editor-section">
      <h2 className="editor-title"><User size={20} /> Profile</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={p.name || ''} onChange={e => update('name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={p.email || ''} onChange={e => update('email', e.target.value)} />
        </div>
        <div className="form-group full-width">
          <label>Description</label>
          <textarea rows={4} value={p.description || ''} onChange={e => update('description', e.target.value)} />
        </div>

        <ProfilePhotoInput value={p.photo || ''} onChange={(v) => update('photo', v)} />

        <FileInput
          label="CV (PDF)"
          accept="application/pdf,.pdf"
          hint="PDF disimpan di public/assets/portfolio/cv/. Maks. 5MB."
          value={p.cv_path || ''}
          onChange={(v) => update('cv_path', v)}
          onValidate={assertCvFile}
          storageFolder="cv"
          fixedFilename="cv.pdf"
          preview="file"
        />

        <div className="form-group">
          <label>GitHub URL</label>
          <input type="text" value={p.github_url || ''} onChange={e => update('github_url', e.target.value)} />
        </div>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input type="text" value={p.linkedin_url || ''} onChange={e => update('linkedin_url', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Instagram URL</label>
          <input type="text" value={p.instagram_url || ''} onChange={e => update('instagram_url', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Twitter URL</label>
          <input type="text" value={p.twitter_url || ''} onChange={e => update('twitter_url', e.target.value)} />
        </div>
        <div className="form-group full-width">
          <label>Headlines (Typewriter)</label>
          {(p.headlines || []).map((h, i) => (
            <div key={i} className="inline-field">
              <input type="text" value={h} onChange={e => updateHeadline(i, e.target.value)} />
              <button type="button" className="btn-danger-sm" onClick={() => removeHeadline(i)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={addHeadline}>+ Add Headline</button>
        </div>
      </div>
    </div>
  )
}
