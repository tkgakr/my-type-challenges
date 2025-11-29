# Challenge #16 - pop

**難易度**: medium  
**実施日**: 2025-11-29  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00016-medium-pop)

## 解法

### アプローチ

#15 Last で使った `T extends [...infer Rest, infer Last]` のパターンを応用。
`Last` を返す代わりに `Rest` を返すことで、最後の要素を除いたタプルを取得する。

### 実装のポイント

- 可変長タプル型（Variadic Tuple Types）のスプレッド構文 `...infer Rest` を活用
- 空配列の場合は条件型がマッチしないため、`[]` を返す
- おまけで `Push`, `Shift`, `Unshift` も実装し、スタック/キュー操作の4種を網羅

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- `infer` の位置を変えるだけで `Pop`/`Shift` を切り替えられる
  - `[...infer Rest, infer Last]` → Pop（末尾を除去）
  - `[infer First, ...infer Rest]` → Shift（先頭を除去）
- スプレッド構文でタプルの先頭・末尾への追加も簡潔に書ける

### つまずいたポイント

特になし。#15 Last の応用で素直に解けた。

### 参考リンク

- [TypeScript 4.0 Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)

---
*Generated at 2025-11-29 21:06:22*
