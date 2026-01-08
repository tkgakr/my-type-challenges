# Challenge #4518 - fill

**難易度**: medium  
**実施日**: 2026-01-08  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04518-medium-fill)

## 解法

### アプローチ

2つの解法を実装した。

**解法1 (Fill)**: アキュムレータ方式
- 結果配列 `R` に要素を詰めていき、`R['length']` で現在のインデックスを追跡
- `R['length'] extends Start` と `R['length'] extends End` で範囲判定

**解法2 (Fill2)**: フラグ方式
- `Index` 配列でインデックスを追跡し、`Flag` で「N で埋める範囲内か」を管理
- `Flag` のデフォルト引数で `Index['length'] extends Start ? true : false` を評価

### 実装のポイント

- **インデックス追跡**: 配列の `length` プロパティを使って数値を表現（TypeScript の型レベルでは直接的な数値演算ができないため）
- **範囲外への対応**: `Start > End` や `Start > T['length']` などの境界条件を考慮
- **End の扱い**: JavaScript の `Array.prototype.fill()` と同様に、End は含まない（半開区間 `[Start, End)`）
- **解法1の -1 トリック**: `Start === End` の場合や End 到達後、`-1` を渡すことで以降の `extends` 判定を常に false にする

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

- 配列の `length` を使ったカウンタパターンは型レベルプログラミングの基本テクニック
- デフォルト型引数を活用することで、再帰呼び出し時に条件分岐を簡潔に書ける（Fill2 の Flag）
- アキュムレータを使わずに、infer で分けた最初の項目と、残りを再帰処理のスプレッド演算子で結合するパターンの実装(解法2)

### つまずいたポイント

特になし

### 参考リンク

- [Array.prototype.fill() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

---
*Generated at 2026-01-08 21:43:01*
