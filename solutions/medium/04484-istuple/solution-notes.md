# Challenge #4484 - istuple

**難易度**: medium  
**実施日**: 2026-01-06  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04484-medium-istuple)

## 解法

### アプローチ

タプルと配列の違いは `length` プロパティの型にある。

- **配列**: `length` は `number` 型（要素数が可変）
- **タプル**: `length` は数値リテラル型（例: `0`, `1`, `2` など、要素数が固定）

この違いを利用して、`number extends T['length']` で判定する。

### 実装のポイント

1. **`never` の特別処理**: `[T] extends [never]` でタプルに包んでチェック。裸の `T extends ...` だと `never` は長さ0のユニオンと解釈され、条件型を分配して `never` を返してしまう。

2. **`readonly` 配列への対応**: `T extends readonly any[]` とすることで、ミュータブルな配列もreadonlyな配列も両方マッチする。

3. **`length` による判定**: `number extends T['length']` が `true` なら配列（`length` が `number` 型）、`false` ならタプル（`length` が数値リテラル型）。

4. **`{ length: 1 }` の除外**: 配列型でないオブジェクトは `T extends readonly any[]` で `false` になるため除外される。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- タプルと配列の `length` プロパティの型の違い（数値リテラル vs `number`）
- `number extends T['length']` のパターンで配列とタプルを区別できる
- `readonly any[]` は mutable な配列にもマッチする（共変性）

### つまずいたポイント

- 可変長配列の場合に false にする方法

### 参考リンク

- [#1042 IsNever](https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md)

---
*Generated at 2026-01-06 22:05:23*
