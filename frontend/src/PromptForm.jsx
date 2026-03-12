import { useState, useEffect } from 'react';
import { fetchOptions } from './api';

const DEFAULT_ROLES   = ['Assistant', 'Expert', 'Teacher', 'Creative Writer', 'Analyst', 'Developer', 'Researcher', 'Coach'];
const DEFAULT_TONES   = ['Professional', 'Casual', 'Technical', 'Creative', 'Academic', 'Concise', 'Empathetic'];
const DEFAULT_FORMATS = ['Plain text', 'Bullet points', 'Numbered list', 'JSON', 'Step-by-step', 'Markdown', 'Table'];

export default function PromptForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    task: '',
    role: 'Expert',
    tone: 'Professional',
    format: 'Plain text',
    context: '',
    extra_instructions: '',
  });

  const [options, setOptions] = useState({
    roles: DEFAULT_ROLES,
    tones: DEFAULT_TONES,
    formats: DEFAULT_FORMATS,
  });

  useEffect(() => {
    fetchOptions().then(setOptions).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.task.trim()) return;
    onSubmit(formData);
  };

  return (
    <form id="prompt-form" className="prompt-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <label className="form-label" htmlFor="task">
          Task / Goal
          <span className="char-count">{formData.task.length} chars</span>
        </label>
        <textarea
          id="task"
          name="task"
          className="form-textarea"
          placeholder="Describe what you want the AI to do…"
          value={formData.task}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-section">
          <label className="form-label" htmlFor="role">AI Role</label>
          <select id="role" name="role" className="form-select" value={formData.role} onChange={handleChange}>
            {options.roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="tone">Tone</label>
          <select id="tone" name="tone" className="form-select" value={formData.tone} onChange={handleChange}>
            {options.tones.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="format">Output Format</label>
          <select id="format" name="format" className="form-select" value={formData.format} onChange={handleChange}>
            {options.formats.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <div className="form-section">
        <label className="form-label" htmlFor="context">
          Context <span className="optional-badge">optional</span>
        </label>
        <textarea
          id="context"
          name="context"
          className="form-textarea form-textarea--sm"
          placeholder="Background info, audience, use case…"
          value={formData.context}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-section">
        <label className="form-label" htmlFor="extra_instructions">
          Extra Instructions <span className="optional-badge">optional</span>
        </label>
        <textarea
          id="extra_instructions"
          name="extra_instructions"
          className="form-textarea form-textarea--sm"
          placeholder="Word limit, style rules, examples to follow…"
          value={formData.extra_instructions}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <button
        id="forge-btn"
        type="submit"
        className={`forge-btn ${loading ? 'forge-btn--loading' : ''}`}
        disabled={loading || !formData.task.trim()}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Generating…
          </>
        ) : (
          'Forge Prompt'
        )}
      </button>
    </form>
  );
}
