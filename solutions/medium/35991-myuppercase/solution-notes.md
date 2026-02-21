# Challenge #35991 - myuppercase

**難易度**: medium  
**実施日**: 2026-02-21  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/35991-medium-myuppercase)

## 解法

### アプローチ

2つの解法を実装した。

**解法1: 条件型を1種類ずつ適用するアプローチ**
ヘルパー型 `UpperCaseChar<C>` で `'a'`〜`'z'` を26個の条件型で順次チェックし、対応する大文字を返す。`MyUppercase<T>` はテンプレートリテラル型で先頭1文字 `First` と残り `Rest` に分解し、`UpperCaseChar<First>` を適用しながら末尾まで再帰する。

**解法2: Mappingインターフェースを使用するアプローチ**
`interface Mapping` に `a: 'A'` 〜 `z: 'Z'` のルックアップテーブルを定義する。`MyUppercase2<T>` で `First` を取り出し、`First extends keyof Mapping ? Mapping[First] : First` によりインデックスアクセス型でO(1)的に変換する。

### 実装のポイント

- テンプレートリテラル型 `` `${infer First}${infer Rest}` `` で1文字ずつ取り出して再帰する。空文字列のとき `''` を返すことが終端条件になる。
- 解法1では大文字・記号・絵文字など小文字以外の文字はそのまま `C` を返すため、マッピング外の文字を自然に透過できる。
- 解法2では `keyof Mapping` に含まれないキー（大文字・記号・絵文字等）は `First` をそのまま使うため、同様に透過できる。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- テンプレートリテラル型の `infer` による文字列分解パターンは、文字列を先頭から1文字ずつ処理する再帰の基本形として汎用性が高い。
- `interface` をルックアップテーブルとして使い、インデックスアクセス型 `T[K]` で値を取得するパターン（解法2）は、条件型を連鎖させる解法1よりも読みやすく拡張しやすい。
- `keyof` と条件型を組み合わせることで、マッピングに存在するキーかどうかを型レベルで安全にチェックできる。

### つまずいたポイント

- 絵文字（😃）や改行（`\n`）・タブ（`\t`）・スペースなど小文字アルファベット以外の文字が含まれる場合のフォールスルー処理。条件型の最後に `C`（解法1）、または `keyof Mapping` 外は `First`（解法2）を返すことで対応できる。

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2026-02-21 11:22:35*
