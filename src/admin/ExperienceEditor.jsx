import { Building2 } from 'lucide-react'
import FileInput from './FileInput'

export default function ExperienceEditor({ data, onChange }) {
  const items = data.experiences || []
  const update = (i, key, val) => {
    const u = [...items]; u[i] = { ...u[i], [key]: val }
    onChange({ ...data, experiences: u })
  }
  const add = () => onChange({
    ...data, experiences: [...items, {
      id: Date.now(), title: '', employment_type: 'fulltime', employment_type_label: 'Full-time',
      company: '', start_date: '', end_date: '', location: '', location_type: 'on_site',
      location_type_label: 'On-site', description: '', photo: ''
    }]
  })
  const remove = (i) => onChange({ ...data, experiences: items.filter((_, idx) => idx !== i) })
  const empTypes = [
    { value: 'fulltime', label: 'Full-time' }, { value: 'parttime', label: 'Part-time' },
    { value: 'freelance', label: 'Freelance' }, { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ]
  const locTypes = [
    { value: 'on_site', label: 'On-site' }, { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ]

  return (
    <div className="editor-section">
      <h2 className="editor-title"><Building2 size={20} /> Experience</h2>
      {items.map((item, i) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-header">
            <span>{item.title || `#${i + 1}`}</span>
            <button className="btn-danger-sm" onClick={() => remove(i)}>Delete</button>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Title</label>
              <input type="text" value={item.title} onChange={e => update(i, 'title', e.target.value)} /></div>
            <div className="form-group"><label>Company</label>
              <input type="text" value={item.company} onChange={e => update(i, 'company', e.target.value)} /></div>
            <div className="form-group"><label>Employment Type</label>
              <select value={item.employment_type} onChange={e => {
                const t = empTypes.find(t => t.value === e.target.value)
                update(i, 'employment_type', e.target.value)
                if (t) { const u2 = [...items]; u2[i] = { ...u2[i], employment_type: e.target.value, employment_type_label: t.label }; onChange({ ...data, experiences: u2 }) }
              }}>{empTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <div className="form-group"><label>Location Type</label>
              <select value={item.location_type} onChange={e => {
                const t = locTypes.find(t => t.value === e.target.value)
                if (t) { const u2 = [...items]; u2[i] = { ...u2[i], location_type: e.target.value, location_type_label: t.label }; onChange({ ...data, experiences: u2 }) }
              }}>{locTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <div className="form-group"><label>Start Date</label>
              <input type="date" value={item.start_date} onChange={e => update(i, 'start_date', e.target.value)} /></div>
            <div className="form-group"><label>End Date</label>
              <input type="date" value={item.end_date} onChange={e => update(i, 'end_date', e.target.value)} /></div>
            <div className="form-group"><label>Location</label>
              <input type="text" value={item.location} onChange={e => update(i, 'location', e.target.value)} /></div>
            <FileInput
              label="Logo Perusahaan"
              accept="image/*"
              hint="Disimpan di public/assets/portfolio/experience/. Maks. 5MB."
              value={item.photo || ''}
              onChange={(v) => update(i, 'photo', v)}
              storageFolder="experience"
              fixedFilename={`experience-${item.id}`}
              preview="image"
            />
            <div className="form-group full-width"><label>Description</label>
              <textarea rows={4} value={item.description} onChange={e => update(i, 'description', e.target.value)} /></div>
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={add}>+ Add Experience</button>
    </div>
  )
}
