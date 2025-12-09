# Challenge #459 - flatten

**難易度**: medium  
**実施日**: 2025-12-09  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00459-medium-flatten)

## 解法

### アプローチ

1. 配列 `T` をタプル分解し、先頭と残りを `infer` で取り出す。
2. 先頭要素が配列なら再帰的にフラット化した結果を結合し、そうでなければ要素をそのまま結果配列に積む。
3. `T` が空配列になるときに再帰が停止し、これまでに積み上げた要素が完成形となる。

補足として、GitHub から引用した 2 つの亜種:

- `Flatten2` は型制約を付けずに書かれており、配列以外の入力を受け取るとエラーが起きない点が課題。
- `Flatten3` はアキュムレータを導入して順次結果を溜める実装で、298 length-of-string と同じテクニックを活用している。

### 実装のポイント

- `T extends any[]` で入力を配列に制約し、余計なケースを排除。
- `T extends [infer F, ...infer R]` によりタプル分解し、`F extends any[]` でネストを判定。
- スプレッド構文を使い `Flatten<F>` と `Flatten<R>` の結果を結合することで、要素の順序を保ったままフラット化。
- アキュムレータ方式の `Flatten3` では `Flatten3<[...R], [...T, F]>` のように結果配列を段階的に構築する。

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

- タプル分解＋再帰で配列を操作する際、要素の順序を崩さずに結合するにはスプレッド構文を両側に使えばよい。
- アキュムレータを導入すると、深いネストをフラット化する処理を段階的に説明しやすい。

### つまずいたポイント

- 再帰的にフラット化した配列を最終的にどう積み上げるかが難しかった。

### 参考リンク

- [GitHub issue #511: Flatten alternative](https://github.com/type-challenges/type-challenges/issues/511)
- [GitHub issue #1314: Accumulator approach](https://github.com/type-challenges/type-challenges/issues/1314)

---
*Generated at 2025-12-09 21:57:34*
