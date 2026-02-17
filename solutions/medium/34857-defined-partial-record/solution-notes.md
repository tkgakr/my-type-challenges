# Challenge #34857 - defined-partial-record

**難易度**: medium  
**実施日**: 2026-02-17  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/34857-medium-defined-partial-record)

## 解法

### アプローチ

Distributive Conditional Type でプロパティキーを1つずつ分配し、各キーを `Omit` で除いたオブジェクトに対して再帰することで、すべての非空部分集合に対応するユニオン型を生成する。

### 実装のポイント

- `K extends K` で `K`（デフォルト `keyof T`）をユニオンの各メンバーに分配する
- 分配された各 `K` に対して `T | DefinedPartial<Omit<T, K>>` で、元のオブジェクト `T` と `K` を除いた部分型の再帰結果をユニオンする
- `keyof T` が `never`（空オブジェクト）のとき、Distributive Conditional Type が `never` を返すため再帰が自然に停止する

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `K extends K` というパターンで、ユニオン型の各メンバーへの分配を意図的に発生させられること
- `never` に対する Distributive Conditional Type が `never` を返す性質を再帰の終了条件として活用できること
- `Omit` と再帰の組み合わせで、べき集合（の非空部分）に相当するユニオン型を生成できること

### つまずいたポイント

- `Partial` のように全キーをオプショナルにするのではなく、「少なくとも1つのキーが定義されている」すべての組み合わせをユニオンで表現する必要がある点

### 参考リンク

---
*Generated at 2026-02-17 21:41:46*
