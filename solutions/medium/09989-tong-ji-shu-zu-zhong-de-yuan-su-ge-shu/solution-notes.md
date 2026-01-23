# Challenge #9989 - Count Element Number To Object

**難易度**: medium  
**実施日**: 2026-01-23  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/09989-medium-tong-ji-shu-zu-zhong-de-yuan-su-ge-shu)

## 解法

### アプローチ

2つの解法を実装した。

**解法1**: `Flatten` + `Count` の2段階アプローチ

1. ネストされた配列を再帰的にフラット化
2. フラット化された配列から各要素の出現回数をカウント

**解法2**: フラット化とカウントを同時に行う1パスアプローチ

- 配列を走査しながら、配列要素は展開し、非配列要素はカウント用オブジェクトに追加

### 実装のポイント

- **never のハンドリング**: `[First] extends [never]` でチェック（分配を防ぐため配列でラップ）
- **タプルでカウント**: 数値リテラルの加算ができないため、`[1, 1, 1]` のようなタプルで要素数を管理し、最後に `['length']` で数値に変換
- **解法1の Count**: `Omit<R, First> & Record<First, [...R[First], 1]>` で既存キーの値を更新
- **解法2の Mapped Types**: `[P in keyof R | (First & PropertyKey)]` で既存キーと新規キーを同時に処理

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 型レベルでのカウントはタプルの長さを利用するパターンが定番
- `Omit` + 交差型で既存プロパティの値を更新できる
- Mapped Types の `in` 句でユニオンを使うと、複数のキーソースを同時に処理できる

### つまずいたポイント

- `never` の分配条件型での挙動（配列でラップして回避）
- 既存キーの値更新時に交差型だけでは上書きにならない（`Omit` が必要）

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2026-01-23 21:48:22*
