import { describe, it, expect } from 'vitest';
import { insertContentUnderHeading, safeInsertContentUnderHeading } from './index';

describe('insertContentUnderHeading', () => {
  it('should insert content under existing heading', () => {
    const markdown = `
## Daily Note

## After

`;
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    const result = insertContentUnderHeading(markdown, heading, content);
    
    const expected = `
## Daily Note

- 21:30 foo #tag #tag2

## After

`;
    
    expect(result).toBe(expected);
  });

  it('should insert content immediately after heading when no empty lines', () => {
    const markdown = `## Daily Note
## After`;
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    const result = insertContentUnderHeading(markdown, heading, content);
    
    const expected = `## Daily Note
- 21:30 foo #tag #tag2
## After`;
    
    expect(result).toBe(expected);
  });

  it('should insert content after heading with existing content', () => {
    const markdown = `## Daily Note
- existing content

## After`;
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    const result = insertContentUnderHeading(markdown, heading, content);
    
    const expected = `## Daily Note
- 21:30 foo #tag #tag2
- existing content

## After`;
    
    expect(result).toBe(expected);
  });

  it('should throw error when heading not found', () => {
    const markdown = `## Some Other Heading

Content here`;
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    expect(() => {
      insertContentUnderHeading(markdown, heading, content);
    }).toThrow('Heading "## Daily Note" not found in markdown');
  });

  it('should handle heading at the end of document', () => {
    const markdown = `## Daily Note`;
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    const result = insertContentUnderHeading(markdown, heading, content);
    
    const expected = `## Daily Note
- 21:30 foo #tag #tag2`;
    
    expect(result).toBe(expected);
  });
});

describe('safeInsertContentUnderHeading', () => {
  it('should insert content under existing heading', () => {
    const markdown = `
## Daily Note

## After

`;
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    const result = safeInsertContentUnderHeading(markdown, heading, content);
    
    const expected = `
## Daily Note

- 21:30 foo #tag #tag2

## After

`;
    
    expect(result).toBe(expected);
  });

  it('should create heading and add content when heading not found', () => {
    const markdown = `## Some Other Heading

Content here`;
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    const result = safeInsertContentUnderHeading(markdown, heading, content);
    
    const expected = `## Some Other Heading

Content here

## Daily Note

- 21:30 foo #tag #tag2`;
    
    expect(result).toBe(expected);
  });

  it('should handle empty markdown', () => {
    const markdown = '';
    const heading = '## Daily Note';
    const content = '- 21:30 foo #tag #tag2';
    
    const result = safeInsertContentUnderHeading(markdown, heading, content);
    
    const expected = `## Daily Note

- 21:30 foo #tag #tag2`;
    
    expect(result).toBe(expected);
  });
});