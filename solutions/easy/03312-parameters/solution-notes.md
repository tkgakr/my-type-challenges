# Challenge #3312 - parameters

**難易度**: easy  
**実施日**: 2025-11-20  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03312-easy-parameters)

## 解法

### アプローチ

- `Parameters<T>` とは、関数型 `T` の引数型をタプルとして抽出するユーティリティ型。
- `T` が関数であることを型引数で制約し、引数部分に `infer P` を仕込んで推論させる。
- 条件型を使い、推論が成功すれば `P` を返し、それ以外は `never` にフォールバックする。

### 実装のポイント

- 条件型 `T extends (...args: infer P) => any ? P : never` によって、Tが関数型であるか判定しつつ、関数型である場合は`infer` で得られた引数タプル `P` をそのまま返す。
- `...args` を使うことでタプル型として推論される点を明示し、戻り値型はこの課題では不要なため `any` を使用する。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- `infer` で抽出したタプルは、そのまま返すだけで `Parameters<T>` と同等になるため、追加の型操作は不要であること。

### つまずいたポイント

- 関数型Tの引数を取得するために、`infer`を使用する点。

### 参考リンク

[TypeScript: Documentation - Utility Types - Parameters<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)

[【TypeScript】Utility TypesのParametersを深く理解する #JavaScript - Qiita](https://qiita.com/NOMURA_keibyou38/items/ecfc6c798f4d59d762a4)

[infer | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/conditional-types/infer)

---
*Generated at 2025-11-20 21:41:11*
