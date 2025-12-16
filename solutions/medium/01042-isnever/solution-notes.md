# Challenge #1042 - isnever

**難易度**: medium  
**実施日**: 2025-12-16  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/01042-medium-isnever)

## 解法

### アプローチ

 `never` かどうかを判定する型を作る。  
 素朴に `T extends never ? true : false` と書くと、分配的条件型の性質により `T = never` のとき結果が `never` になり、`true` を返せない。  
 そこで `T` をタプルで包んで分配を止め、`[T] extends [never]` で厳密に判定する。

 別解として `@type-challenges/utils` の `Equal` を使い、`Equal<T, never>` でも同様に判定できる。

### 実装のポイント

 `never` は「要素数 0 の union」として扱われるため、分配的条件型 `T extends U ? X : Y` の `T` にそのまま `never` を渡すと分配結果が空になり、最終的に `never` になる。  
 分配を止める定番テクニックとして、`T` を「裸（naked type parameter）」ではなく、`[T]` のようなコンテナに入れて比較する。

 実装:

 ```ts
 type IsNever<T> = [T] extends [never] ? true : false
 ```

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 条件型が「分配的」になるのは、`T extends ...` の `T` が裸の型パラメータのとき。
- `T = never` のケースは特に落とし穴で、`T extends never ? true : false` は `false` ではなく `never` になる（分配結果が空になるため）。
- 分配を止めたいときは、`[T] extends [U]` の形にして判定する。

### つまずいたポイント

 `IsNever<never>` が `true` にならず、かつ `false` でもなく `never` になっていて混乱した。

### 参考リンク

[TypeScript: Documentation - Conditional Types - Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

---
*Generated at 2025-12-16 21:07:38*
