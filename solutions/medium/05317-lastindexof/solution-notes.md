# Challenge #5317 - lastindexof

**難易度**: medium  
**実施日**: 2026-01-12  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/05317-medium-lastindexof)

## 解法

### アプローチ

配列の**末尾から**要素を取り出し、`Equal` で厳密比較を行う再帰的アプローチ。

1. `[...infer Rest, infer Last]` で配列の末尾要素を分離
2. `Equal<Last, U>` で厳密な型比較
3. 一致すれば `Rest['length']` がそのままインデックス（0-indexed）
4. 一致しなければ `Rest` で再帰
5. 配列が空になったら `-1` を返す

### 実装のポイント

- **末尾からの分解**: `[...Rest, Last]` パターンで末尾要素を取得
- **インデックス計算**: `Rest['length']` が末尾要素のインデックスに一致する
  - 例: `[1, 2, 3]` の末尾 `3` のインデックスは `2` = `[1, 2]['length']`
- **厳密比較**: `Equal` ユーティリティで `any` や `number` などの特殊な型も正しく比較

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `IndexOf` が先頭から探索するのに対し、`LastIndexOf` は末尾から探索
- `[...Rest, Last]` パターンで末尾要素を取り出せる
- `Rest['length']` が末尾要素のインデックスになる点が直感的

### つまずいたポイント

特になし

### 参考リンク

- [Array.prototype.lastIndexOf() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
- [#5153 IndexOf](https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md)

---
*Generated at 2026-01-12 20:00:04*
