import { FolderOpen } from 'lucide-react'
import ImageGalleryInput from './ImageGalleryInput'
import RichTextEditor from './RichTextEditor'
import { slugify } from '../lib/projectSlug'

export default function ProjectsEditor({ data, onChange }) {
  const items = data.projects || []
  const categories = data.categories || ['All']
  const update = (i, key, val) => {
    const u = [...items]; u[i] = { ...u[i], [key]: val }
    onChange({ ...data, projects: u })
  }
  const updateImages = (i, images) => {
    const u = [...items]
    const cover = images[0]?.path || ''
    u[i] = { ...u[i], images, image_path: cover }
    onChange({ ...data, projects: u })
  }
  const add = () => onChange({
    ...data, projects: [...items, {
      id: Date.now(), name: '', category: categories[1] || '', slug: '',
      excerpt: '', artikel: '', link: '', image_path: '', images: []
    }]
  })
  const remove = (i) => onChange({ ...data, projects: items.filter((_, idx) => idx !== i) })
  const updateCats = (v) => {
    const cats = ['All', ...v.split(',').map(s => s.trim()).filter(Boolean)]
    onChange({ ...data, categories: cats })
  }

  return (
    <div className="editor-section">
      <h2 className="editor-title"><FolderOpen size={20} /> Projects</h2>
      <div className="form-group full-width" style={{ marginBottom: 24 }}>
        <label>Categories (comma-separated, without "All")</label>
        <input type="text" value={categories.filter(c => c !== 'All').join(', ')} onChange={e => updateCats(e.target.value)} />
      </div>
      {items.map((item, i) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-header">
            <span>{item.name || `Project #${i + 1}`}</span>
            <button type="button" className="btn-danger-sm" onClick={() => remove(i)}>Delete</button>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => {
                  const name = e.target.value
                  const u = [...items]
                  u[i] = { ...u[i], name, slug: slugify(name) }
                  onChange({ ...data, projects: u })
                }}
              /></div>
            <div className="form-group"><label>URL slug</label>
              <input
                type="text"
                value={item.slug || ''}
                onChange={(e) => update(i, 'slug', slugify(e.target.value))}
                placeholder="nama-project"
              />
              <p className="file-input-hint">Halaman: /#/project/{item.slug || slugify(item.name) || '…'}</p></div>
            <div className="form-group"><label>Category</label>
              <select value={item.category} onChange={e => update(i, 'category', e.target.value)}>
                {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select></div>
            <div className="form-group full-width"><label>Excerpt</label>
              <input type="text" value={item.excerpt || ''} onChange={e => update(i, 'excerpt', e.target.value)} /></div>
            <div className="form-group full-width">
              <label>Artikel</label>
              <RichTextEditor
                value={item.artikel || ''}
                onChange={(html) => update(i, 'artikel', html)}
                placeholder="Ceritakan detail project — gunakan toolbar untuk format teks..."
              />
            </div>
            <ImageGalleryInput
              label="Gambar Project"
              projectId={item.id}
              images={item.images || []}
              onChange={(images) => updateImages(i, images)}
            />
            <div className="form-group full-width">
              <label>Link project (URL eksternal)</label>
              <input
                type="text"
                value={item.link || ''}
                onChange={e => update(i, 'link', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={add}>+ Add Project</button>
    </div>
  )
}
