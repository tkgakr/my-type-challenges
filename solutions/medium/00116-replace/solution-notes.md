# Challenge #116 - replace

**難易度**: medium  
**実施日**: 2025-12-05  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00116-medium-replace)

## 解法

### アプローチ

テンプレートリテラル型と `infer` を使って文字列 `S` を `From` の前後に分割し、`From` を `To` に置換する。

### 実装のポイント

- `From` が空文字 `''` の場合は置換せずそのまま `S` を返す
- `From` の前後を`infer`を使って推論し、マッチすれば置換して返す
- 別解では `From extends '' ? never : From` をインラインで書くことで、空文字チェックを条件分岐なしで実現

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

- 空文字 `''` はテンプレートリテラル型のパターンマッチで常にマッチしてしまうため、事前に除外が必要

### つまずいたポイント

最初、From が空文字の場合の考慮ができておらず、空文字まで置換処理していた

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2025-12-05 22:21:38*
