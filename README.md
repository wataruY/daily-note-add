# Markdown Content Inserter

マークダウンの特定の見出しの下にコンテンツを追加するTypeScriptライブラリです。

## 機能

- 指定された見出しの下にコンテンツを挿入
- 見出しが存在しない場合の安全な処理
- TypeScript型安全性
- 包括的なテストカバレッジ

## 使用例

```typescript
import { insertContentUnderHeading, safeInsertContentUnderHeading } from './src/index';

const markdown = `
## Daily Note

## After
`;

const result = insertContentUnderHeading(
  markdown,
  '## Daily Note',
  '- 21:30 foo #tag #tag2'
);

console.log(result);
// 出力:
// ## Daily Note
//
// - 21:30 foo #tag #tag2
//
// ## After
```

## API

### `insertContentUnderHeading(markdown, heading, content)`
指定された見出しの下にコンテンツを挿入します。見出しが見つからない場合はエラーを投げます。

### `safeInsertContentUnderHeading(markdown, heading, content)`
見出しが存在しない場合は、マークダウンの末尾に見出しとコンテンツを追加します。

## 開発

```bash
# 依存関係のインストール
pnpm install

# ビルド
pnpm run build

# テスト実行
pnpm test
```