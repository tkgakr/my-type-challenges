# Challenge #17973 - deepmutable

**難易度**: medium  
**実施日**: 2026-01-26  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/17973-medium-deepmutable)

## 解法

### アプローチ

readonly を深く外すために、mapped type で各プロパティから readonly 修飾子を外し、
値の型が object の場合は再帰的に DeepMutable を適用する。
ただし関数型は object に含まれるため、先に関数かどうかを判定してそのまま返す。

### 実装のポイント

- `-readonly` で mapped type modifier を除去して浅い readonly を外す。
- `T[K] extends Function` を先に判定して、関数の型を再帰対象から除外する。
- `T[K] extends object` の場合は再帰し、そうでなければそのまま返す。
- 配列やタプルは TypeScript 上 `object` に含まれるため、`object` 判定により再帰が有効になる。
  その結果、`readonly` な配列/タプルも mapped type の `-readonly` により可変化され、
  要素の型も再帰的に DeepMutable が適用される。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 関数型が object に含まれるため、object 判定より前に除外する必要がある。
- 配列/タプルは object に分類されるので、object 判定の再帰で自然に深い可変化ができる。

### つまずいたポイント

- 関数型も object に含まれる点を忘れると、意図せず再帰してしまう点。

### 参考リンク

- [#2793 Mutable](https://github.com/type-challenges/type-challenges/blob/main/questions/02793-medium-mutable/README.md)
- [配列はオブジェクト | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/array/array-as-a-object)

---
*Generated at 2026-01-26 21:34:01*
