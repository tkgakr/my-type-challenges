# Challenge #3057 - push

**難易度**: easy  
**実施日**: 2025-11-19  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03057-easy-push)

## 解法

### アプローチ

末尾に要素を追加した新しいタプル型を作るだけなので、既存タプル `T` と要素 `U` をそのままスプレッド構文で結合し、`[...T, U]` を返す。

### 実装のポイント

- `T extends unknown[]` でタプル／配列に限定しなければ、スプレッド構文を使用するところでエラーになる。
- 可変長タプル（variadic tuple）構文 `[..., U]` を使うことでシンプルに末尾追加が表現できる。

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

特になし。過去実施分の組み合わせで解くことができた。

### つまずいたポイント

特になし。

### 参考リンク

[TypeScript: Documentation - TypeScript 4.0 - Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)

---
*Generated at 2025-11-19 22:01:46*
