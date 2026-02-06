# Challenge #27862 - cartesianproduct

**難易度**: medium  
**実施日**: 2026-02-06  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/27862-medium-cartesianproduct)

## 解法

### アプローチ

Conditional Types の **Distributive（分配）** 特性を利用して、2つのユニオン型の直積（Cartesian Product）を生成する。

```typescript
type CartesianProduct<T, U> =
  T extends T       // T のユニオンを分配
    ? U extends U   // U のユニオンを分配
      ? [T, U]      // 分配された各メンバーでタプルを構成
      : never
    : never
```

### 実装のポイント

1. **Distributive Conditional Types**: `T extends T` のような条件型は、`T` がユニオン型の場合、各メンバーに対して分配される
2. **ネストした分配**: `T extends T` と `U extends U` をネストすることで、T の各メンバーと U の各メンバーの全組み合わせを生成
3. **常に真となる条件**: `T extends T` は常に真なので、分配のトリガーとしてのみ機能する（`T extends any` でも同様に動作する）

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- Conditional Types でユニオン型を分配するには、型パラメータを直接条件部に置く必要がある
- `T extends T` のパターンは、分配を発生させるためのイディオム
- ネストした Conditional Types で複数のユニオン型を同時に分配できる

### つまずいたポイント

特になし。シンプルな分配の応用問題。

### 参考リンク

- [TypeScript Handbook - Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

---
*Generated at 2026-02-06 21:24:19*
