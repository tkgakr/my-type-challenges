# Challenge #296 - permutation

**難易度**: medium  
**実施日**: 2025-12-07  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00296-medium-permutation)

## 解法

### アプローチ

Distributive Conditional Types（分配条件型）を利用して、ユニオン型の各要素を順番に取り出し、残りの要素で再帰的に順列を生成する。

### 実装のポイント

1. **ジェネリクスのコピー**: `K = T` でオリジナルの `T` を保持し、分配後も元のユニオン型にアクセスできるようにする
2. **分配条件型**: `T extends T` で `T` がユニオン型の場合に分配則を適用させる
3. **`never` の判定**: `[T] extends [never]` でタプルに包むことで、`never` を正しく判定する（包まないと分配されて判定できない）
4. **再帰と `Exclude`**: `Exclude<K, T>` で現在の要素を除外し、残りで再帰的に順列を生成

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

- オプショナルの初期値を使うことでジェネリクス型のコピーを保持できること
- ユニオン型を条件型に当てはめたときの分配則

### つまずいたポイント

- `never` の判定に `[T] extends [never]` とタプルで包む必要がある理由の理解
- 分配条件型が適用されるタイミングと、`K` で元の型を保持する必要性

### 参考リンク

[【TypeScript と友達に】Type Challenges を全問解いたのでエッセンスと推し問題を紹介してみる - 前編](https://zenn.dev/kakekakemiya/articles/2d7a3384a5faf0#296%3A-permutation)

[TypeScript: Documentation - Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

---
*Generated at 2025-12-07 16:44:37*
