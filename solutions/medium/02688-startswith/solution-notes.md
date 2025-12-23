# Challenge #2688 - startswith

**難易度**: medium  
**実施日**: 2025-12-23  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02688-medium-startswith)

## 解法

### アプローチ

- テンプレートリテラル型を用いて前方一致を判定する。

### 実装のポイント

- `T extends ${U}${infer _}` で、`T` が `U` で始まるかを判定
- `infer _` は残りの部分をキャプチャするが、使用しないためアンダースコアで破棄
- `U` が空文字列の場合、任意の文字列にマッチするため `true` を返す
- `T` と `U` が完全一致の場合も、`infer _` が空文字列にマッチするため `true`

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- テンプレートリテラル型と `infer` を組み合わせることで、文字列の前方一致判定が簡潔に実装できる
- `infer _` のようにアンダースコアを使うことで、不要な推論結果を明示的に破棄できる

### つまずいたポイント

- 特になし

### 参考リンク

- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---
*Generated at 2025-12-23 20:57:14*
