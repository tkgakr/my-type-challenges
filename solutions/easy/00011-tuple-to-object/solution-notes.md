# Challenge #9 - tuple-to-object

**難易度**: easy  
**実施日**: 2025-11-11  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00011-easy-tuple-to-object)

## 解法

### アプローチ

- `T[number]` でタプル要素のユニオン型を取り出し、キー集合として利用する
- 各キーに対して同じ値を割り当てるマッピングを Mapped Type で構築する

### 実装のポイント

- タプル要素をキーに利用できるように `T extends readonly PropertyKey[]` で制約する
- Mapped Type のインデックスに `K in T[number]` を指定し、すべての要素を列挙する
- 値の型として `K` をそのまま返すことでキーと値を一致させる

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- Indexed Access Types

### つまずいたポイント
<!-- 難しかった部分とその解決方法 -->

### 参考リンク

[解法 Tuple to Object](https://ghaiklor.github.io/type-challenges-solutions/ja/easy-tuple-to-object.html)
[インデックスアクセス型 (indexed access types) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/indexed-access-types)  
[TypeScript: Documentation - Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

---
*Generated at 2025-11-11 22:42:10*
