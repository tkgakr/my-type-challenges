# Challenge #3192 - reverse

**難易度**: medium  
**実施日**: 2025-12-28  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03192-medium-reverse)

## 解法

### アプローチ

配列を反転させる型を実装する問題。2つの異なるアプローチで解決できる:

**解法1: 最初の要素を後ろにつめていく再帰処理**
- 配列の先頭要素を取り出し、残りの配列を再帰的に反転
- 反転した配列の末尾に先頭要素を追加

**解法2: 最後の要素を前につめていく再帰処理**
- 配列の末尾要素を取り出し、残りの配列を再帰的に反転
- 末尾要素を反転した配列の先頭に追加

### 実装のポイント

1. **Conditional Typesでパターンマッチング**
   - `T extends [infer First, ...infer Rest]` で先頭要素と残りを分離
   - `T extends [...infer Rest, infer Last]` で末尾要素と残りを分離

2. **再帰的な型定義**
   - 自分自身を呼び出して配列を段階的に反転
   - 空配列 `[]` が再帰の終了条件

3. **Spread構文の活用**
   - `[...Reverse<Rest>, First]` で配列の末尾に要素を追加
   - `[Last, ...Reverse2<Rest>]` で配列の先頭に要素を追加

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

特になし

### つまずいたポイント

特になし

### 参考リンク

特になし

---
*Generated at 2025-12-28 10:47:33*
