# Challenge #27133 - square

**難易度**: medium  
**実施日**: 2026-02-04  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/27133-medium-square)

## 解法

### アプローチ

最初は「長さ N のタプルを N 回フラットに結合する」ことで N×N を得る素直な実装を試しましたが、
`N >= 100` で「型では大きすぎて表すことができないタプル型を生成します。」が発生しました。

そこで、数値を **桁配列** に分解して筆算のように加算を繰り返す「多桁の乗算」を型レベルで実装し、
`Square` は `Multiply<M, M>` で計算する構成に切り替えています。
負数は `Abs` で正数に変換してから乗算します。

### 実装のポイント

- `SplitNumber` で数値を `Digit[]` に変換し、`JoinNumber` で元の数値へ戻す。
- 1桁加算は `AddDigits` + `Carry`、多桁加算は `AddLists` で実装。
- `AddListXTimes` で「配列としての数」を X 回加算し、`Multiply` を構成。
- 先頭 0 の扱いは `PadList` / `DePadList` で整える。
- `Abs` により負数入力でも `Square` が正の平方値を返す。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- タプル長による計算は便利だが、サイズ上限に引っかかると途端に使えなくなる。
- 桁配列に分解して筆算的に処理すれば、より大きな数値でも型レベルで扱える。

### つまずいたポイント

- `SquareNG` の単純なタプル結合は 100 付近でコンパイラ制限に当たる。
  → 乗算を桁配列の繰り返し加算に置き換えて解決。

### 参考リンク

- <https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html>
- <https://www.typescriptlang.org/docs/handbook/2/conditional-types.html>

---
*Generated at 2026-02-04 23:06:50*
