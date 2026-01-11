# Challenge #5153 - indexof

**難易度**: medium  
**実施日**: 2026-01-11  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/05153-medium-indexof)

## 解法

### アプローチ

配列 `T` を先頭から走査しつつ、現在のインデックス長を表すタプル `Index` をアキュムレーターとして再帰的に伝搬させる。各ステップで先頭要素と検索対象 `U` を `Equal` で比較し、一致した時点で `Index['length']` を返し、最後まで一致しなければ `-1` を返す方針。

### 実装のポイント

1. `IndexOf` にデフォルト型引数で空タプルを渡し、`Index['length']` を数値リテラルとして扱えるようにしている。
2. `T extends [infer First, ...infer Rest]` で配列分解し、`Equal<First, U>` が `true` なら即座に現在インデックスを返す。
3. 一致しなかった場合は `Index` にダミー要素を追加して長さを +1 し、残り配列で再帰。走査が尽きれば `-1` を返す。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと
<!-- 新しい発見や学びを記述 -->

### つまずいたポイント

- Uと各要素との一致チェックにつまずいたため、@type-challenges/utils の `Equal<T, U>` を使用した

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2026-01-11 17:55:00*
