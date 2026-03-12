const API_BASE = '/api';

/**
 * Send a prompt generation request to the FastAPI backend.
 * @param {Object} formData - { task, role, tone, format, context, extra_instructions }
 * @returns {Promise<{prompt: string, token_estimate: number, quality_score: number, tips: string[]}>}
 */
export async function generatePrompt(formData) {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || `Server error: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch dropdown options from the backend.
 * @returns {Promise<{roles: string[], tones: string[], formats: string[]}>}
 */
export async function fetchOptions() {
  const response = await fetch(`${API_BASE}/options`);
  if (!response.ok) throw new Error('Failed to load options');
  return response.json();
}
