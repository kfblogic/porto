import { GraduationCap } from 'lucide-react'

export default function EducationEditor({ data, onChange }) {
  const items = data.educations || []
  const update = (i, key, val) => {
    const u = [...items]; u[i] = { ...u[i], [key]: val }
    onChange({ ...data, educations: u })
  }
  const add = () => onChange({
    ...data, educations: [...items, {
      id: Date.now(), school: '', degree: '', program: '',
      start_date: '', end_date: '', grade: '', description: ''
    }]
  })
  const remove = (i) => onChange({ ...data, educations: items.filter((_, idx) => idx !== i) })

  return (
    <div className="editor-section">
      <h2 className="editor-title"><GraduationCap size={20} /> Education</h2>
      {items.map((item, i) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-header">
            <span>{item.school || `#${i + 1}`}</span>
            <button className="btn-danger-sm" onClick={() => remove(i)}>Delete</button>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>School</label>
              <input type="text" value={item.school} onChange={e => update(i, 'school', e.target.value)} /></div>
            <div className="form-group"><label>Degree</label>
              <input type="text" value={item.degree} onChange={e => update(i, 'degree', e.target.value)} /></div>
            <div className="form-group"><label>Program</label>
              <input type="text" value={item.program} onChange={e => update(i, 'program', e.target.value)} /></div>
            <div className="form-group"><label>Grade/GPA</label>
              <input type="text" value={item.grade} onChange={e => update(i, 'grade', e.target.value)} /></div>
            <div className="form-group"><label>Start Date</label>
              <input type="date" value={item.start_date} onChange={e => update(i, 'start_date', e.target.value)} /></div>
            <div className="form-group"><label>End Date</label>
              <input type="date" value={item.end_date} onChange={e => update(i, 'end_date', e.target.value)} /></div>
            <div className="form-group full-width"><label>Description</label>
              <textarea rows={3} value={item.description} onChange={e => update(i, 'description', e.target.value)} /></div>
          </div>
        </div>
      ))}
      <button className="btn-add" onClick={add}>+ Add Education</button>
    </div>
  )
}
