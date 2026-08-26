import { Activity } from 'lucide-react'

export default function ActivitiesEditor({ data, onChange }) {
  const items = data.activities || []
  const update = (i, key, val) => {
    const u = [...items]; u[i] = { ...u[i], [key]: val }
    onChange({ ...data, activities: u })
  }
  const add = () => onChange({ ...data, activities: [...items, { id: Date.now(), heading: '', caption: '' }] })
  const remove = (i) => onChange({ ...data, activities: items.filter((_, idx) => idx !== i) })

  return (
    <div className="editor-section">
      <h2 className="editor-title"><Activity size={20} /> Activities</h2>
      {items.map((item, i) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-header">
            <span>Activity #{i + 1}</span>
            <button className="btn-danger-sm" onClick={() => remove(i)}>Delete</button>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Heading</label>
              <input type="text" value={item.heading} onChange={e => update(i, 'heading', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label>Caption</label>
              <textarea rows={3} value={item.caption} onChange={e => update(i, 'caption', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={add}>+ Add Activity</button>
    </div>
  )
}
