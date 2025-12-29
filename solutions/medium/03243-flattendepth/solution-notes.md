# Challenge #3243 - flattendepth

**難易度**: medium  
**実施日**: 2025-12-29  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03243-medium-flattendepth)

## 解法

### アプローチ

配列を指定した深さまでフラット化する。2つの解法を実装した。

**解法1**: `MinusOne`型を使って残り深度をカウントダウンし、0になったら再帰終了
**解法2**: 配列の長さで処理済み深度をカウントアップし、指定深度に達したら再帰終了

### 実装のポイント

- 配列を`[infer First, ...infer Rest]`で先頭と残りに分解
- `First extends any[]`で先頭要素が配列かを判定
- 配列の場合のみ深度を進めてフラット化を再帰
- 残りの要素`Rest`は同じ深度でフラット化を継続（まだフラット化していないため）
- 解法1では`MinusOne`型で数値を減算（文字列に変換→反転→減算→反転→数値に戻す）
- 解法2では`Done['length']`で配列の長さを深度カウンターとして利用

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

- 数値の減算は`MinusOne`型で実現可能
- 配列の長さ`T['length']`を数値カウンターとして使うテクニック

### つまずいたポイント

- `Rest`に対する再帰では深度を変えないことが重要（同じ階層の要素はまだフラット化していないため）

### 参考リンク

- [#459 Flatten](https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/README.ja.md)
- [#2257 MinusOne](https://github.com/type-challenges/type-challenges/blob/main/questions/02257-medium-minusone/README.md)

---
*Generated at 2025-12-29 14:01:19*
