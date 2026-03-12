import { useState } from 'react';

function QualityBar({ score }) {
  const color =
    score >= 80 ? '#16a34a' :
    score >= 50 ? '#d97706' :
    '#dc2626';

  return (
    <div className="quality-bar-wrap">
      <div className="quality-label">
        <span>Quality</span>
        <span className="quality-score" style={{ color }}>{score}/100</span>
      </div>
      <div className="quality-bar-bg">
        <div
          className="quality-bar-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function OutputPanel({ result, error, loading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result?.prompt) return;
    navigator.clipboard.writeText(result.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div id="output-panel" className="output-panel output-panel--empty">
        <div className="empty-state">
          <div className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
          <p className="empty-subtitle">Generating your prompt…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="output-panel" className="output-panel output-panel--error">
        <div className="error-icon">⚠️</div>
        <p className="error-msg">{error}</p>
        <p className="error-hint">Make sure the backend is running on port 8000.</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div id="output-panel" className="output-panel output-panel--empty">
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <h3 className="empty-title">Your prompt will appear here</h3>
          <p className="empty-subtitle">
            Fill in the form and click <strong>Forge Prompt</strong> to generate a structured prompt.
          </p>
          <ul className="feature-list">
            <li>⚡ Role + tone + format injection</li>
            <li>🎯 Context-aware assembly</li>
            <li>📊 Quality score & improvement tips</li>
            <li>📋 One-click copy</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div id="output-panel" className="output-panel output-panel--result">
      <div className="output-meta">
        <span className="meta-chip">~{result.token_estimate} tokens</span>
        <QualityBar score={result.quality_score} />
        <button
          id="copy-btn"
          className={`copy-btn ${copied ? 'copy-btn--copied' : ''}`}
          onClick={handleCopy}
          title="Copy prompt to clipboard"
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
      </div>

      <div className="prompt-output-wrap">
        <pre id="prompt-output" className="prompt-output">{result.prompt}</pre>
      </div>

      {result.tips?.length > 0 && (
        <div className="tips-section">
          <h4 className="tips-title">Improvement Tips</h4>
          <ul className="tips-list">
            {result.tips.map((tip, i) => (
              <li key={i} className="tip-item">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
