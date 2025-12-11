# Challenge #529 - absolute

**難易度**: medium  
**実施日**: 2025-12-11  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00529-medium-absolute)

## 解法

### アプローチ

1. `number | string | bigint` を受け取り、テンプレートリテラル `` `${T}` `` で文字列に変換
2. 条件型で `-${infer U}` パターンにマッチするか判定
3. マッチした場合は `-` を除去した `U` を返す
4. マッチしない場合はそのまま文字列として返す

### 実装のポイント

- **テンプレートリテラルによる統一変換**: `number` や `bigint` も `` `${T}` `` で文字列に変換することで、統一的に処理できる
- **パターンマッチングと infer**: `` `-${infer U}` `` で負の符号を検出し、`U` で符号を除いた部分を抽出
- **数字判定の追加**: `IsNumeric<S>` 型で `S extends \`${number}\`` を使い、`-` の後が数字かどうかを判定。数字でない場合（例: `'-abc'`）はそのまま返す

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- テンプレートリテラル型 `` `${T}` `` で `number` や `bigint` を文字列型に変換できる
- `` `${number}` `` を使うと文字列が数値として有効かどうかを判定できる

### つまずいたポイント

- T がnumber や bigint の場合の 条件型の書き方で T もテンプレートリテラルに変換する必要があった点

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2025-12-11 22:36:13*
