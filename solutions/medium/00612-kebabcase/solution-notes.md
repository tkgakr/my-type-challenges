# Challenge #612 - kebabcase

**難易度**: medium  
**実施日**: 2025-12-13  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00612-medium-kebabcase)

## 解法

### アプローチ

文字列を1文字ずつ再帰的に処理し、大文字を検出したら小文字に変換しつつ、先頭以外の場合はハイフンを挿入する。

**解法1**: `First` フラグで先頭かどうかを管理し、大文字判定用の `UpperCase` 型と `ToLowerCase` マッピングを使用。

**解法2（別解）**: 組み込みの `Uncapitalize<T>` を使い、次の文字が大文字かどうかを `R extends Uncapitalize<R>` で判定。

### 実装のポイント

- Template Literal Types で `${infer F}${infer R}` とすると、`F` は常に1文字のみキャプチャされる
- 先頭の大文字にはハイフンを付けない → `First` フラグまたは次の文字を見る方法で対応
- `Uncapitalize<R>` は先頭文字のみ小文字化するため、`R extends Uncapitalize<R>` で「先頭が小文字か」を判定可能

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types（`Uncapitalize` - 別解）
- [x] Index Access Types（`ToLowerCase[F]`）
- [x] Union Types（`UpperCase = 'A' | 'B' | ...`）
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `Uncapitalize<T>` は文字列の先頭1文字のみを小文字化する組み込み型
- `R extends Uncapitalize<R>` で「先頭が既に小文字か」を判定できる
- Template Literal Types の `infer` は貪欲ではなく、最小マッチ（1文字）となる

### つまずいたポイント

S extends `${infer F}${infer R}` としたときに、F が1文字分しかマッチされない点に気づかなかった

### 参考リンク

[TypeScript: Documentation - Template Literal Types - Uncapitalize](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uncapitalizestringtype)

---
*Generated at 2025-12-13 22:01:36*
