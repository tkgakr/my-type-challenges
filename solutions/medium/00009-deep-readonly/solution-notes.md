# Challenge #9 - deep-readonly

**難易度**: medium  
**実施日**: 2025-11-24  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00009-medium-deep-readonly)

## 解法

### アプローチ

1. Conditional Types を利用してユニオンを分配評価させ、個々の要素ごとに readonly 変換を適用する。
2. 関数型はそのまま返し、オブジェクト型にのみ再帰的な Mapped Type を適用して深い階層まで readonly 化する。
3. オブジェクト判定は `T extends { [k in string]: any }` と `keyof T extends never` の 2 パターンを比較・検証した。

### 実装のポイント

- `T extends (...args: any[]) => any ? T : ...` で関数を早期 return。
- オブジェクト判定後に `{ readonly [P in keyof T]: DeepReadonly<T[P]> }` を再帰的に適用。
- `DeepReadonly2` では `keyof T extends never` を利用してオブジェクト/非オブジェクトを見分ける別解を提示。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- Distributive Conditional Types を利用するとユニオン構成要素ごとに再帰を適用できる。
- `keyof T extends never` をオブジェクト判定に使うパターンで edge case を減らせる。
- 条件型で複数種類の関数型を判定する方法

### つまずいたポイント

- オブジェクト型かどうかの判定
- 関数型かどうかの判定
- ユニオンの条件型の取り扱い

### 参考リンク

[Distributive Conditional Types | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/conditional-types/distributive-conditional-types)

---
*Generated at 2025-11-24 20:03:26*
