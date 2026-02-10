# Challenge #29650 - extracttoobject

**難易度**: medium  
**実施日**: 2026-02-10  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/29650-medium-extracttoobject)

## 解法

### アプローチ

1. `Omit<T, U>` でオブジェクト `T` から指定キー `U` を除外する
2. `T[U]`（Index Access）で `U` に対応する値の型（オブジェクト）を取得する
3. 両者を `&`（Intersection）で結合し、`Prettify` でフラットなオブジェクトに展開する

### 実装のポイント

- `Equal` は交差型（`A & B`）と単一オブジェクト型を区別するため、`Prettify`（`Omit<T, never>`）で交差型をフラット化する必要がある
- `Omit<T, never>` は全キーを保持しつつ Mapped Type を通すことで、交差型を単一オブジェクトに正規化するテクニック

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `Omit<T, never>` で交差型をフラットなオブジェクトに変換できる（`Prettify` パターン）
- `Equal` 型は構造的に同じでも交差型と単一オブジェクト型を区別する

### つまずいたポイント

- 交差型のままだと `Equal` でテストが通らない点。`Prettify` で正規化することで解決

### 参考リンク

---
*Generated at 2026-02-10 22:58:32*
