import { useState } from 'react';
import PromptForm from './PromptForm.jsx';
import OutputPanel from './OutputPanel.jsx';
import { generatePrompt } from './api';

export default function App() {
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generatePrompt(formData);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">
              Prompt<span className="logo-accent">Forge</span> AI
            </span>
          </div>
          <p className="header-tagline">Craft perfect AI prompts — structured, optimized, ready to use.</p>
        </div>
      </header>

      <main className="app-main">
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Configure Prompt</h2>
            <p className="panel-sub">Define your task, role, tone &amp; output format</p>
          </div>
          <PromptForm onSubmit={handleSubmit} loading={loading} />
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Generated Prompt</h2>
            <p className="panel-sub">Your optimized, structured prompt</p>
          </div>
          <OutputPanel result={result} error={error} loading={loading} />
        </section>
      </main>

      <footer className="app-footer">
        PromptForge AI — helping you get the best out of every AI model.
      </footer>
    </div>
  );
}
