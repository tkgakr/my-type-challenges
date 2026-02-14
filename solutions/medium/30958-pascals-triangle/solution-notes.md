# Challenge #30958 - pascals-triangle

**難易度**: medium  
**実施日**: 2026-02-14  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/30958-medium-pascals-triangle)

## 解法

### アプローチ

パスカルの三角形を再帰的に1行ずつ構築する。各行は `[1, ...内側の要素, 1]` という構造を持ち、内側の要素は前の行の隣接する要素同士の和で求められる。

1. **数値の加算**: タプルの長さを利用して型レベルで加算を実現する（`Tuple` + `Add`）
2. **行の内側部分の生成**: 前の行からスライディングウィンドウ的に隣接2要素を取り出して足し合わせる（`AddRow`）
3. **三角形の構築**: 初期値 `[[1]]` から再帰的に行を追加し、行数が N に達したら終了する（`Pascal`）

### 実装のポイント

- `Tuple<N>` で数値リテラル型を長さ N のタプルに変換し、スプレッドで結合した `['length']` を取ることで加算を実現
- `AddRow` では `[A, B, ...R]` のパターンマッチで先頭2要素を取り出し、`[B, ...R]` を残りとして再帰することでスライディングウィンドウを実現
- `Pascal` の各ステップで `Last<Rows>` により最後の行を取得し、`[1, ...AddRow<最後の行>, 1]` で新しい行を生成
- `Rows['length'] extends N` で行数の終了判定を行う

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

- タプルの `['length']` を使った型レベルの算術演算パターン
- `infer` でタプルの先頭複数要素を同時にパターンマッチできる（`[infer A, infer B, ...infer R]`）
- スライディングウィンドウ的な再帰パターン: `[A, B, ...R]` から `[B, ...R]` を次の再帰に渡すことで隣接ペアを順に処理できる

### つまずいたポイント

- 新しい行の生成時に両端の `1` を付加する部分と `AddRow` の内側部分の組み合わせ方

### 参考リンク

- [Pascal's triangle - Wikipedia](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

---
*Generated at 2026-02-14 15:00:23*
