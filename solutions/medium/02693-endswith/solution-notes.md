# Challenge #2693 - endswith

**難易度**: medium  
**実施日**: 2025-12-23  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02693-medium-endswith)

## 解法

### アプローチ

- テンプレートリテラル型を用いて後方一致を判定する。

### 実装のポイント

- `T extends ${string}${U}` で、`T` が `U` で終わるかを判定
- `${string}` は任意の文字列にマッチするため、`infer` を使わずに簡潔に書ける
- `U` が空文字列の場合、任意の文字列にマッチするため `true` を返す
- `T` と `U` が完全一致の場合も、`${string}` が空文字列にマッチするため `true`

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- StartsWith と同様のパターンで、`${string}` の位置を変えるだけで後方一致に対応できる
- `infer` を使わず `${string}` を使うことで、不要な推論を避けてシンプルに書ける

### つまずいたポイント

- 特になし

### 参考リンク

- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---
*Generated at 2025-12-23 21:11:44*
