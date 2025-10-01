// modules/validation.js

/**
 * Escape HTML to prevent XSS
 * @param {string} str
 * @returns {string}
 */
export function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag]));
}

/**
 * Validate task input string
 * @param {string} input
 * @returns {{valid: boolean, error: string|null}}
 */
export function validateTaskInput(input) {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Task cannot be empty.' };
  }
  if (trimmed.length > 100) {
    return { valid: false, error: 'Task cannot exceed 100 characters.' };
  }
  return { valid: true, error: null };
}