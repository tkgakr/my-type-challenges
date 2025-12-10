# Challenge #527 - append-to-object

**難易度**: medium  
**実施日**: 2025-12-10  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00527-medium-append-to-object)

## 解法

### アプローチ

与えられた型 `T` に新しいキー `U` を追加するには、`keyof T` に `U` を結合したユニオンを走査する mapped type を構築し、既存キーは `T` の値を、追加キーは `V` を割り当てる。

### 実装のポイント

1. `U extends PropertyKey` を必須にし、mapped type のキーとして利用できるようにする。
2. `[P in keyof T | U]` で既存キーと追加キーをすべて列挙する。
3. 条件型 `P extends keyof T ? T[P] : V` で既存キーは元の値、追加キーは新しい値を割り当てる。

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

- `keyof T` はオブジェクトのキーをユニオン型に変更するもの
- `[key in K]` はユニオン型 K の反復処理を行うもの
- 条件型を組み合わせることで、既存キーと新規キーで異なる値型を割り当てられる

### つまずいたポイント

- U がプロパティキーである制約を加えないとエラーになる点
- キー U を追加する方法

### 参考リンク

[TypeScript: Documentation - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
[Mapped Types | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/mapped-types)

---
*Generated at 2025-12-10 21:13:43*
