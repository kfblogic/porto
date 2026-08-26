import { Cpu } from 'lucide-react'
import { getSkillIcon } from '../lib/techIcons'

export default function SkillsEditor({ data, onChange }) {
  const items = data.skills || []
  const update = (i, key, val) => {
    const u = [...items]; u[i] = { ...u[i], [key]: val }
    onChange({ ...data, skills: u })
  }
  const add = () => onChange({ ...data, skills: [...items, { id: Date.now(), skill: '', svg: '' }] })
  const remove = (i) => onChange({ ...data, skills: items.filter((_, idx) => idx !== i) })

  return (
    <div className="editor-section">
      <h2 className="editor-title"><Cpu size={20} /> Skills</h2>
      <div className="skills-editor-list">
        {items.map((item, i) => {
          const iconSvg = getSkillIcon(item.skill, item.svg)
          // Check if it's auto detected (not manual and doesn't return the generic feather placeholder)
          const rawAutoSvg = getSkillIcon(item.skill, '')
          const isDetected = !item.svg && rawAutoSvg && !rawAutoSvg.includes('class="feather feather-code"')

          return (
            <div key={item.id} className="skill-editor-card">
              <div className="skill-editor-main">
                <div 
                  className="skill-editor-preview" 
                  dangerouslySetInnerHTML={{ __html: iconSvg }} 
                  title={isDetected ? 'Auto-detected icon' : item.svg ? 'Manual custom SVG icon' : 'Placeholder icon'}
                />
                <div className="skill-editor-fields">
                  <div className="skill-editor-fields-top">
                    <input 
                      type="text" 
                      value={item.skill || ''} 
                      onChange={e => update(i, 'skill', e.target.value)} 
                      placeholder="Skill name" 
                    />
                  </div>
                  <input 
                    type="text" 
                    value={item.svg || ''} 
                    onChange={e => update(i, 'svg', e.target.value)} 
                    placeholder="Custom SVG code (e.g. <svg>...</svg>)" 
                    className="skill-editor-svg-input"
                  />
                  {isDetected && (
                    <span className="skill-badge-detected-status">
                      ✓ Auto-detected icon
                    </span>
                  )}
                  {item.svg && (
                    <span className="skill-badge-custom-status">
                      ★ Manual custom SVG
                    </span>
                  )}
                </div>
                <button className="btn-danger-sm btn-remove-skill" onClick={() => remove(i)}>✕</button>
              </div>
            </div>
          )
        })}
      </div>
      <button className="btn-add" onClick={add}>+ Add Skill</button>
    </div>
  )
}

