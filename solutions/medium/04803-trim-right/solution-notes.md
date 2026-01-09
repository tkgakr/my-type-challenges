# Challenge #4803 - trim-right

**難易度**: medium  
**実施日**: 2026-01-09  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04803-medium-trim-right)

## 解法

### アプローチ

文字列の右端から空白文字（スペース、改行、タブ）を再帰的に削除する。Template Literal Types を使って末尾が空白文字かどうかを判定し、空白文字であれば再帰的に `TrimRight` を呼び出す。

### 実装のポイント

1. **空白文字の定義**: `Space = ' ' | '\n' | '\t'` としてユニオン型で定義
2. **パターンマッチング**: `` S extends `${infer L}${Space}` `` で末尾が空白文字かを判定
3. **再帰処理**: 末尾が空白文字なら `TrimRight<L>` で再帰的に処理を続ける
4. **終了条件**: 末尾が空白文字でなければそのまま `S` を返す

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

- リテラルタイプでの一致確認はユニオンも使える

### つまずいたポイント

特になし

### 参考リンク

[#106 Trim Left](https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md)
[#108 Trim](https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md)

---
*Generated at 2026-01-09 18:42:51*
