# Challenge #2793 - mutable

**難易度**: medium  
**実施日**: 2025-12-25  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02793-medium-mutable)

## 解法

### アプローチ

Mapped Types を使用して、すべてのプロパティから `readonly` 修飾子を取り除く型を実装する。

1. `T extends object` で型パラメータをオブジェクト型に制約
2. Mapped Types で各プロパティを走査
3. `-readonly` 修飾子で `readonly` を削除

### 実装のポイント

- **`-readonly` 構文**: Mapped Types で `-` を付けることで、既存の修飾子を取り除くことができる
- **`T extends object` 制約**: プリミティブ型（`string`, `number` など）を受け付けないようにする
- **タプル型への対応**: `object` 型にはタプルも含まれるため、配列やタプルにも適用可能

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- Mapped Types で `-readonly` や `-?` を使って修飾子を削除できる
- `T extends object` により、オブジェクト型やタプル型のみを受け入れる制約が可能
- Mapped Type Modifier の削除は、既存の型から特定の性質を取り除く際に有用

### つまずいたポイント

- T をオブジェクトまたはタプルに制約する方法

### 参考リンク

- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook - Mapping Modifiers](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers)

---
*Generated at 2025-12-25 18:53:56*
