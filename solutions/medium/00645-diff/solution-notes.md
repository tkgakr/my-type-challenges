# Challenge #645 - diff

**難易度**: medium  
**実施日**: 2025-12-14  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00645-medium-diff)

## 解法

### アプローチ

1. **解法1 (Omit + 交差型)**  
   `O & O1` で値を統合しつつ `keyof (O | O1)` で共通キーだけを抽出し、`Omit` で取り除く。交差型から共通キーを落とすだけで差分プロパティが得られる。
2. **解法2 (差分キー + Mapped Types)**  
   `UnionDiff2<keyof O, keyof O1>` で排他的キーを求め、そのキー集合に対して `(O & O1)[P]` を割り当てる。型レベルで差分キーを明示的に扱うパターン。

### 実装のポイント

- `keyof (O | O1)` が共通キーになる性質を利用して Omit するだけで差分を取れる。
- 排他的キーは `Exclude<T | U, T & U>` で簡潔に求められるため、Mapped Types と組み合わせると実装が明瞭。
- 値の型を `(O & O1)[P]` から取得すると、どちらのオブジェクトに含まれる場合でも正しい型を拾える。

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [x] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `keyof (T | U)` が T と U の共通プロパティを表すため、`Omit` と組み合わせると差分が取れる。
- `Exclude<T | U, T & U>` で排他的なキーを一発で表現でき、差分を明示的に扱う Mapped Types が書きやすくなる。

### つまずいたポイント

- 差分プロパティの求め方につまずいた。
- `keyof (T | U)` が T と U の共通プロパティになる点。

### 参考リンク

[#599 Merge](https://github.com/type-challenges/type-challenges/blob/main/questions/00599-medium-merge/README.ja.md)

---
*Generated at 2025-12-14 14:34:29*
