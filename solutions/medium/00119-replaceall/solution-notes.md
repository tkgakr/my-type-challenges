# Challenge #119 - replaceall

**難易度**: medium  
**実施日**: 2025-12-06  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00119-medium-replaceall)

## 解法

### アプローチ

#116 Replace の解法を基に、再帰を使って文字列内のすべての `From` を `To` に置換する。

1. `From` が空文字列の場合は `S` をそのまま返す（無限ループ防止）
2. Template Literal Types で `S` を `${L}${From}${R}` にパターンマッチ
3. マッチした場合、`${L}${To}${ReplaceAll<R, From, To>}` で左側を確定し、右側 `R` に対して再帰的に処理
4. マッチしなくなったら `S` を返して終了

### 実装のポイント

- **再帰の方向**: 置換後の右側部分 `R` のみに再帰することで、同じ位置を何度も処理することを防ぐ
- **空文字列のガード**: `From extends ''` を最初にチェックして無限ループを回避

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

特になし

### つまずいたポイント

特になし

### 参考リンク

特になし

---
*Generated at 2025-12-06 17:24:20*
