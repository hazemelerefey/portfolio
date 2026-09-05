import { describe, expect, it } from 'vitest';
import { highlightPdfText } from './pdf-text';

describe('PDF search rendering', () => {
  it('treats regex syntax as literal text', () => {
    expect(highlightPdfText('C++ [AI] (data)', '[')).toBe('C++ <mark>[</mark>AI] (data)');
    expect(highlightPdfText('a.*b', '.*')).toBe('a<mark>.*</mark>b');
    expect(highlightPdfText('a'.repeat(1000), '(a+)+$')).toBe('a'.repeat(1000));
  });
  it('escapes HTML even when there is no active search', () => {
    expect(highlightPdfText('<img src=x onerror=alert(1)>', '')).toBe('&lt;img src=x onerror=alert(1)&gt;');
    expect(highlightPdfText('<script>', '<script>')).toBe('<mark>&lt;script&gt;</mark>');
  });
  it('highlights case-insensitively without corrupting entities', () => {
    expect(highlightPdfText('AI & ai', 'ai')).toBe('<mark>AI</mark> &amp; <mark>ai</mark>');
    expect(highlightPdfText('&amp;', 'amp')).toBe('&amp;<mark>amp</mark>;');
  });
});
