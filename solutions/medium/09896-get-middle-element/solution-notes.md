# Challenge #9896 - get-middle-element

**難易度**: medium  
**実施日**: 2026-01-21  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/09896-medium-get-middle-element)

## 解法

### アプローチ

配列の両端から要素を1つずつ削り、中央の要素（1つまたは2つ）が残るまで再帰的に処理する。

2つの解法を実装:
- **解法1**: `[infer L, ...infer M, infer R]` パターンで常に推論を行い、`M` が空かどうかで分岐
- **解法2**: 先に `T['length']` で要素数をチェックし、2以下ならそのまま返す（無駄な推論を省略）

### 実装のポイント

- `[infer L, ...infer M, infer R]` は要素が2つ以上ある場合にマッチ
- 要素が0個または1個の場合はパターンにマッチしないため、そのまま `T` を返す
- 偶数個の場合は中央2要素、奇数個の場合は中央1要素が残る

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

- `[infer L, ...infer M, infer R]` パターンは最低2要素が必要
- 要素数が0または1の場合はこのパターンにマッチしない
- `T['length'] extends 0 | 1 | 2` のように Union で複数の長さを一度にチェック可能

### つまずいたポイント

特になし

### 参考リンク

特になし

---
*Generated at 2026-01-21 21:02:36*
