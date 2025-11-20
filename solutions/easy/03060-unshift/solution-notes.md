# Challenge #3060 - unshift

**難易度**: easy  
**実施日**: 2025-11-20  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03060-easy-unshift)

## 解法

### アプローチ

`Push` の実装を反転させる。`T` の先頭に `U` を差し込むために、スプレッド構文で `[U, ...T]` というタプルを組み立てる。

### 実装のポイント

- `Unshift` はジェネリック型エイリアスとして定義し、`T` を `unknown[]` に制約して配列であることを保証。

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

特になし。

### つまずいたポイント

特になし。

### 参考リンク

[TypeScript: Documentation - TypeScript 4.0 - Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)

---
*Generated at 2025-11-20 21:28:20*
