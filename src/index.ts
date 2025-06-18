/**
 * マークダウンの特定の見出しの下にコンテンツを追加する関数
 * @param markdown 元のマークダウンテキスト
 * @param heading 対象の見出しテキスト（## Daily Note など）
 * @param content 追加するコンテンツ
 * @returns 更新されたマークダウンテキスト
 */
export function insertContentUnderHeading(
  markdown: string,
  heading: string,
  content: string
): string {
  const lines = markdown.split('\n');
  const headingIndex = lines.findIndex(line => line.trim() === heading.trim());
  
  if (headingIndex === -1) {
    throw new Error(`Heading "${heading}" not found in markdown`);
  }
  
  // 見出しの次の行を探す
  let insertIndex = headingIndex + 1;
  
  // 空行がある場合のフラグ
  const hasEmptyLineAfterHeading = insertIndex < lines.length && lines[insertIndex].trim() === '';
  
  // 空行をスキップして、コンテンツがある場合はその前に挿入
  while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
    insertIndex++;
  }
  
  // 次の行が見出しで、元々空行があった場合のみ空行を追加
  const nextLine = insertIndex < lines.length ? lines[insertIndex] : '';
  const isNextLineHeading = nextLine.trim().startsWith('#');
  const shouldAddEmptyLine = hasEmptyLineAfterHeading && isNextLineHeading;
  
  // コンテンツを挿入
  const updatedLines = [
    ...lines.slice(0, insertIndex),
    content,
    ...(shouldAddEmptyLine ? [''] : []),
    ...lines.slice(insertIndex)
  ];
  
  return updatedLines.join('\n');
}

/**
 * マークダウンの特定の見出しの下にコンテンツを安全に追加する関数
 * 見出しが存在しない場合は、マークダウンの末尾に見出しとコンテンツを追加
 */
export function safeInsertContentUnderHeading(
  markdown: string,
  heading: string,
  content: string
): string {
  try {
    return insertContentUnderHeading(markdown, heading, content);
  } catch (error) {
    // 見出しが見つからない場合は、末尾に見出しとコンテンツを追加
    const trimmedMarkdown = markdown.trim();
    if (trimmedMarkdown === '') {
      return heading + '\n\n' + content;
    }
    return trimmedMarkdown + '\n\n' + heading + '\n\n' + content;
  }
}