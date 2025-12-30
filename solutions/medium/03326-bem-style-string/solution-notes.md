# Challenge #3326 - bem-style-string

**難易度**: medium  
**実施日**: 2025-12-30  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03326-medium-bem-style-string)

## 解法

### アプローチ

1. `TupleToUnion<T>` でタプルをユニオン型に変換
2. `Element<E>` と `Modifier<M>` で各パーツを整形（空配列の場合は空文字を返す）
3. `BEM<B, E, M>` でテンプレートリテラルを使って結合し、ユニオン型の分配により全組み合わせを生成

### 実装のポイント

- **テンプレートリテラル内でのユニオン型の分配**: テンプレートリテラル内にユニオン型を埋め込むと、各要素が分配されてユニオン型として展開される
  - 例: `` `${"a" | "b"}--${"x" | "y"}` `` → `"a--x" | "a--y" | "b--x" | "b--y"`
- **空配列の判定**: `E extends []` で空配列かどうかを判定し、空の場合は空文字 `''` を返す
- **Index Access Types**: `T[number]` でタプルの全要素をユニオン型として取得

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- テンプレートリテラル型の中でユニオン型を使うと、自動的に分配されて全組み合わせのユニオン型が生成される
- `T[number]` を使ってタプル型からユニオン型への変換ができる

### つまずいたポイント

- `TupleToUnion<M>` で取り出したユニオン型をテンプレートリテラルで使う方法がわからなかった
  - 解決: テンプレートリテラル内に直接ユニオン型を埋め込めば自動的に分配される

### 参考リンク

- [【命名規則】BEMを使った書き方についてまとめてみた【CSS】 #Sass - Qiita](https://qiita.com/takahirocook/items/01fd723b934e3b38cbbc)
- [#10 Tuple to Union](https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.ja.md)

---
*Generated at 2025-12-30 10:44:40*
