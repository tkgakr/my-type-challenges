# Challenge #3188 - tuple-to-nested-object

**難易度**: medium  
**実施日**: 2025-12-27  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03188-medium-tuple-to-nested-object)

## 解法

### アプローチ

文字列のタプル `T` を先頭から順に取り出し、それぞれをオブジェクトのキーとして再帰的にネストしていく。

1. タプル `T` を `[First, ...Rest]` の形で分割
2. `First` をオブジェクトのキーとして使用し、値として `Rest` を再帰的に処理
3. タプルが空になったら、最終的な値の型 `U` を返す

### 実装のポイント

**Mapped Type でのキー制約**

`infer First` で推論された型をそのままオブジェクトのキーとして使うことはできない。Mapped Type `[K in First]` を使う際、`First` は `PropertyKey` (= `string | number | symbol`) に割り当て可能である必要がある。

しかし、このチャレンジでは文字列のタプルを扱うため、`First & string` という交差型を使って `string` 型のみを取り出している。これにより:

- `First` が `string` の場合 → `First & string` は `First` そのまま
- `First` が `string` 以外の場合 → `First & string` は `never`

この型制約により、`K` を安全にオブジェクトのキーとして利用できる。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- **Mapped Type におけるキーの型制約**: `[K in SomeType]` の形式で使う際、`SomeType` は `PropertyKey` に割り当て可能でなければならない
- **交差型による型の絞り込み**: `First & string` のように交差型を使うことで、推論された型から特定の型のみを抽出できる
- **再帰的な型定義**: タプルの先頭を取り出して処理し、残りを再帰的に処理するパターン

### つまずいたポイント

分割によって得られた最初の要素 `First` をプロパティキーとして扱う方法につまずいた。

まず、{ First: ...} の形で直接定義しようとしたが、'First' というキー名で解釈されてしまい、infer で取得した `First` が型として扱われなかった。

次に、Mapped Type で `[K in First]` という形式で直接使おうとしたが、TypeScript が `First` を `PropertyKey` として認識しないためエラーが発生。`First & string` という交差型を使うことで、型を `string` に絞り込み、Mapped Type のキーとして使用できるようになった。

### 参考リンク

---
*Generated at 2025-12-27 15:09:01*
