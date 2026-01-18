# Challenge #9142 - checkrepeatedchars

**難易度**: medium  
**実施日**: 2026-01-18  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/09142-medium-checkrepeatedchars)

## 解法

### アプローチ

2つの解法を実装した。

**解法1: アキュムレータを使用するアプローチ**

- 文字列を1文字ずつ走査し、既に見た文字をアキュムレータ（Union型）に蓄積
- 現在の文字がアキュムレータに含まれていれば `true` を返す
- 2回目の出現で重複を検出

**解法2: 残りの文字列に対するパターンマッチ**

- 最初の文字が残りの文字列に含まれるかを Template Literal Types でチェック
- `Rest extends \`${string}${First}${string}\`` で First が Rest 内に存在するかを判定
- 重複が最初に現れた時点で `true` になるため、再帰回数が少ない

### 実装のポイント

- Template Literal Types の `${infer First}${infer Rest}` で文字列を先頭1文字と残りに分割
- 解法1では `A | First` で Union 型にアキュムレータを拡張
- 解法2では `${string}${First}${string}` パターンで部分文字列の存在チェック

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- Template Literal Types で `${string}${X}${string}` のパターンを使うと、文字列内に `X` が含まれるかをチェックできる
- アキュムレータに Union 型を使うことで、見た文字の集合を管理できる

### つまずいたポイント

特になし

### 参考リンク

特になし

---
*Generated at 2026-01-18 14:49:06*
