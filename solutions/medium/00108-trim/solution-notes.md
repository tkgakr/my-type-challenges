# Challenge #108 - trim

**難易度**: medium  
**実施日**: 2025-12-03  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00108-medium-trim)

## 解法

### アプローチ

テンプレートリテラル型と条件型を組み合わせて、文字列の両端から空白文字を再帰的に取り除く。

1. **Trim（順次処理）**: まず右端のスペースを全て取り除き、次に左端のスペースを取り除く
2. **Trim2（ユニオン型）**: 左右どちらかにスペースがあれば1文字取り除く条件をユニオン型で表現

### 実装のポイント

- `Space` 型で空白文字（スペース、改行、タブ）をユニオン型で定義
- テンプレートリテラル型 `` `${infer R}${Space}` `` で右端のスペースを検出
- テンプレートリテラル型 `` `${Space}${infer R}` `` で左端のスペースを検出
- 別解では `` `${infer R}${Space}` | `${Space}${infer R}` `` のユニオン型で左右どちらかのスペースを一度に検出

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 特になし、#106 TrimLeft の応用だった。

### つまずいたポイント

- はじめ、TrimLeftとTrimRightの両方を用意したが、再帰がうまくいかなかったが、素直にTrimで再帰するとうまくいった。

### 参考リンク

[テンプレートリテラル | TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/future-javascript/template-strings)

---
*Generated at 2025-12-03 22:29:20*
