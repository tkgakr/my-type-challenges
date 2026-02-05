# Challenge #27152 - triangular-number

**難易度**: medium  
**実施日**: 2026-02-05  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/27152-medium-triangular-number)

## 解法

### アプローチ

タプルの長さを数として利用する。  
カウンタ `I`（1ずつ増えるタプル）と、和を表す `Result`（`1..I.length` の総和を要素数で表すタプル）を持ち、再帰で `I` が `N` に達するまで進める。  
`Result` は毎回 `I` と `1` を足し合わせることで「次の数を加える」ことを表現する。

### 実装のポイント

- 終了条件は `I['length'] extends N`。到達したら `Result['length']` を返す。  
- 再帰ステップでは `I` を `[..., 1]` でインクリメントし、`Result` に `...I` と `1` を追加して `(I.length + 1)` を加算する。  
- ループ変数と合計を別のアキュムレータに分けることで、三角数の定義（1 から N までの和）をそのまま表現できる。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

`Result` に `...I` と `1` を追加することで、実質的に「次の数を足す」ことをタプルの要素数として表現できる点を再確認した。

### つまずいたポイント

Triangular number　(三角数)がそもそも何なのかがわからなかったが、それが何かわかった後の実装は特につまずかなかった。

### 参考リンク

[三角数 - Wikipedia](https://ja.wikipedia.org/wiki/%E4%B8%89%E8%A7%92%E6%95%B0)

---
*Generated at 2026-02-05 21:04:39*
