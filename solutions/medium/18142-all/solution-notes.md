# Challenge #18142 - all

**難易度**: medium  
**実施日**: 2026-01-27  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/18142-medium-all)

## 解法

### アプローチ

タプル `T` を先頭要素と残りに分解し、先頭が `U` と等しいかを順番に検証する。`Equal<First, U>` が `true` なら残りへ再帰し、1つでも `false` が出たら `false` を返す。タプルが空になったら、全要素が一致したとみなして `true` を返す。

### 実装のポイント

- `T extends [infer First, ...infer Rest]` でタプルを分解して再帰する。
- 判定は `Equal` を使い、型の完全一致をチェックする（`extends` だけだと `any`/`unknown` などで崩れるため）。
- ベースケースは `T` が空のときに `true` を返す。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

`extends` だけの比較ではなく、`Equal` を使うことで `any`/`unknown` を含むケースの厳密比較ができる点を再確認した。

### つまずいたポイント

特になし

### 参考リンク

特になし

---
*Generated at 2026-01-27 21:44:12*
