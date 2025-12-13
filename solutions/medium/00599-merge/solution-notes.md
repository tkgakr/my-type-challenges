# Challenge #599 - merge

**難易度**: medium  
**実施日**: 2025-12-13  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00599-medium-merge)

## 解法

### アプローチ

2 つのオブジェクト型 `F`, `S` のキーをユニオンでまとめた mapped type を構築し、`S` が同じキーを持つ場合は `S` の型を優先して上書きする。

### 実装のポイント

- `[P in keyof F | keyof S]` で 2 つのキーを網羅し、欠損をなくす。
- `P extends keyof S ? S[P] : P extends keyof F ? F[P] : never` という条件分岐で `S` 優先のマージを実現。
- `S[P]` や `F[P]` による index access で元オブジェクトの型を取得。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `keyof F | keyof S` のようにキーのユニオンを取れば漏れなくプロパティを網羅できるのを再確認。

### つまずいたポイント

Key と Value を挟んだ `:` と、 条件型の `:` の違いに混乱した。

### 参考リンク

[#4 Pick](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md)
[#527 AppendToObject](https://github.com/type-challenges/type-challenges/blob/main/questions/00527-medium-append-to-object/README.md)

---
*Generated at 2025-12-13 20:29:14*
