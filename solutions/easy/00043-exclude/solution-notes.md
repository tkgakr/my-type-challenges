# Challenge #43 - exclude

**難易度**: easy  
**実施日**: 2025-11-14  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00043-easy-exclude)

## 解法

### アプローチ

- `T` が`U` に割り当て可能な型かどうかを Conditinal Types を用いて評価し、
当てはまる場合に `never` でスキップさせる。

### 実装のポイント

- `T extends U ? never : T` は、Tがユニオン型の場合、要素ごとに評価する点
- `U` に `T` には存在しない型を指定できるため、`U extends T` のような制約を課すとテストケース（3・4番目）が失敗する

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

### 新しく学んだこと

組み込みのユーティリティ型 `Exclude`  

### つまずいたポイント
<!-- 難しかった部分とその解決方法 -->

### 参考リンク

[TypeScript: Documentation - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

[TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)

[Exclude<T, U> | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/utility-types/exclude)

---
*Generated at 2025-11-14 21:42:35*
