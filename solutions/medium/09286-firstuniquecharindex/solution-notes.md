# Challenge #9286 - firstuniquecharindex

**難易度**: medium  
**実施日**: 2026-01-19  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/09286-medium-firstuniquecharindex)

## 解法

### アプローチ

2つの解法を実装した。

#### 解法1: アキュムレータで処理済み文字を管理

- 処理済みの文字を配列 `A` に保存しておく
- 現在の文字 `First` が過去に登場したか (`First extends A[number]`) をチェック
- 過去に登場していなければ、残りの文字列 `Rest` に `First` が含まれるかをチェック
- 前後どちらにも登場しなければ、`A['length']` が現在のインデックスなのでそれを返す

#### 解法2: 元の文字列全体で重複チェック

- 元の文字列 `T` を保持しつつ、処理用の文字列 `U` を1文字ずつ消費
- 現在の文字 `C` が `T` に2回以上登場するか (`T extends \`${string}${C}${string}${C}${string}\``) をチェック
- 2回以上登場しなければ、`Index['length']` を返す

### 実装のポイント

- **インデックスの管理**: タプルの `length` プロパティを利用してインデックスをカウント
- **重複チェック**: Template Literal Types のパターンマッチングで文字の存在を確認
- **解法1 vs 解法2**: 解法1は前後を別々にチェック、解法2は元の文字列全体で2回登場するかを一度にチェック

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

- Template Literal Types で `${string}${C}${string}${C}${string}` のようなパターンを使うと、文字 `C` が2回以上登場するかを一度にチェックできる
- タプルの `length` を使ったインデックス管理は型レベルプログラミングの定番テクニック
- `A[number]` でタプルをユニオン型に変換し、`extends` で存在チェックができる

### つまずいたポイント

特になし

### 参考リンク

- [LeetCode 387 - First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/)

---
*Generated at 2026-01-19 10:56:17*
