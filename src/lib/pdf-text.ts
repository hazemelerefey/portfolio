function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

// React-PDF inserts this result as HTML. Both PDF text and search matches
// must be escaped, and search input must never be interpreted as a regex.
export function highlightPdfText(text: string, query: string): string {
  if (!query) return escapeHtml(text);
  const literal = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.split(new RegExp(`(${literal})`, 'gi'))
    .map((part, index) => index % 2 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part))
    .join('');
}
