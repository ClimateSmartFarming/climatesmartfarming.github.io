// src/components/markdown/MarkdownRenderer.tsx
//
// Converts raw markdown to HTML with NO external dependencies.
// Handles: headings, bold, italic, links, images, unordered + ordered lists,
//          blockquotes, inline code, fenced code blocks, horizontal rules,
//          and paragraphs.
//
// To add a full-featured renderer later, swap this component's internals
// for react-markdown — the interface stays the same.

import React from 'react';
import styles from './MarkdownRenderer.module.css';

interface Props {
  content: string;
  className?: string;
}

// ─── Minimal Markdown → HTML ──────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseInline(text: string): string {
  return text
    // Images before links
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      output.push(`<pre><code class="language-${lang}">${codeLines.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      output.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      output.push('<hr />');
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      output.push(`<blockquote>${parseInline(quoteLines.join(' '))}</blockquote>`);
      continue;
    }

    // Unordered list
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].slice(2))}</li>`);
        i++;
      }
      output.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li>${parseInline(lines[i].replace(/^\d+\.\s/, ''))}</li>`);
        i++;
      }
      output.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6}\s|```|[-*+]\s|\d+\.\s|> |---|___|===)/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      output.push(`<p>${parseInline(paraLines.join(' '))}</p>`);
    }
  }

  return output.join('\n');
}

// ─── Component ────────────────────────────────────────────────────────────────

const MarkdownRenderer: React.FC<Props> = ({ content, className }) => {
  const html = markdownToHtml(content);
  return (
    <div
      className={`${styles.markdown} ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;