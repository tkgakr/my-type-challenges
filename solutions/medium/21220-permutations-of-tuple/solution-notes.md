# Challenge #21220 - permutations-of-tuple

**難易度**: medium  
**実施日**: 2026-01-31  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/21220-medium-permutations-of-tuple)

## 解法

### アプローチ

タプルの全順列を生成するため、各要素を先頭に固定し、残りの要素の順列を再帰的に求める。ユニオン型を活用して全パターンを網羅する。

1. タプル`T`を最初の要素`First`と残り`Rest`に分解
2. `First`を先頭に固定し、残りの要素（`Prev` + `Rest`）の順列を再帰的に求める
3. `First`を処理済み配列`Prev`に追加し、`Rest`の先頭要素を次の固定対象として再帰
4. 2と3をユニオンで結合することで、全順列を生成

### 実装のポイント

- **Prev（処理済み配列）の活用**: 現在の要素をスキップして次の要素を先頭に固定する際、スキップした要素を`Prev`に蓄積し、後続の再帰で使用
- **ユニオンによる分岐**: `|`演算子で「現在の要素を先頭に固定するパターン」と「次の要素を先頭に固定するパターン」を同時に生成
- **終了条件**: `Rest`が空の場合は次の要素への再帰を`never`で打ち切り、`T`が空の場合は空タプル`[]`を返す

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- タプルの順列生成では、「処理済み要素」を別の型パラメータで管理することで、各要素を順番に先頭に固定できる
- ユニオン型の分岐（`|`）を使うことで、再帰の各段階で複数のパターンを同時に生成できる

### つまずいたポイント

- 単純に`First`を固定して`Rest`の順列を求めるだけでは、元の順序以外のパターンが生成されない
- `Prev`を導入し、スキップした要素を後続の再帰に渡すことで解決

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2026-01-31 17:38:08*
