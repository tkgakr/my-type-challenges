# Challenge #34007 - compare-array-length

**難易度**: medium  
**実施日**: 2026-02-16  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/34007-medium-compare-array-length)

## 解法

### 解法1: 再帰で要素を1つずつ消費

- T と U の先頭要素を同時に取り除き、再帰的に比較する
- 先に空になった方が短い。同時に空になれば同じ長さ
- 直感的だが、タプルが長いと再帰の深さ制限に引っかかる可能性がある

### 解法2: `T['length']` と `keyof T` を利用（再帰不要）

1. `T['length'] extends U['length']` で長さが等しいかを判定 → 等しければ `0`
2. `${U['length']}` をテンプレートリテラルで文字列化し、`keyof T` に含まれるか判定
   - タプルの `keyof` にはインデックス `"0" | "1" | ... | "length-1"` が含まれる
   - `U['length']` が T の有効インデックス内なら T の方が長い (`1`)
   - そうでなければ T の方が短い (`-1`)

### 解法3: `keyof` 同士の部分集合関係で比較（再帰不要）

- 長いタプルの `keyof` は短いタプルの `keyof` を包含する（インデックスが多いため）
- `keyof T extends keyof U` と `keyof U extends keyof T` の双方向チェックで大小を判定

### 実装のポイント

- タプルの `keyof` は数値インデックスの文字列リテラル型（`"0"`, `"1"`, ...）を含む
- `T['length']` は具体的なタプルに対して数値リテラル型を返す（例: `[1,2,3]` → `3`）
- テンプレートリテラル `` `${数値}` `` で数値リテラル型を文字列リテラル型に変換できる

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

- タプル型の `keyof` が数値インデックスの文字列リテラル型を返すこと
  - 例: `keyof [1, 2, 3]` → `"0" | "1" | "2" | "length" | "push" | ...`
- `` `${U['length']}` extends keyof T `` で「U の長さが T の有効インデックス内か」を判定できること
- `keyof` 同士の `extends` で部分集合関係を利用した長さ比較ができること
- 再帰を使わない解法は再帰深度制限を回避できるメリットがある

### つまずいたポイント

- 解法2 の `` `${U['length']}` extends keyof T `` がなぜ長さ比較になるのかが直感的にわかりにくかった
  - `keyof` が返すインデックスの範囲（`0` 〜 `length-1`）と `length` の値の関係を整理することで理解できた

### 参考リンク

---
*Generated at 2026-02-16 22:41:27*
