# Challenge #35252 - isalphabet

**難易度**: medium  
**実施日**: 2026-02-20  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/35252-medium-isalphabet)

## 解法

### アプローチ

#### 解法1: ユニオン型で全アルファベットを列挙

`'A' | 'B' | ... | 'Z' | 'a' | ... | 'z'` を `Alphabet` 型として定義し、`S extends Alphabet` で判定する愚直な方法。明快だが文字数が多い。

#### 解法2: `Uppercase` / `Lowercase` ユーティリティ型を活用

TypeScript の `Uppercase<S>` / `Lowercase<S>` はASCIIラテン文字のみ変換する。この性質を利用する。

- アルファベット: `Uppercase<S>` ≠ `Lowercase<S>`（例: `'A'` vs `'a'`）
- 非アルファベット: `Uppercase<S>` = `Lowercase<S>`（例: `'9'` vs `'9'`、`''` vs `''`）

よって `Uppercase<S> extends Lowercase<S>` が `true` なら非アルファベット。

### 実装のポイント

- 解法2では文字列のリテラル型に対して `extends` はほぼ等価判定として機能する
- `Uppercase<''>` = `Lowercase<''>` = `''` なので、空文字も自然に `false` になる

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `Uppercase<S>` / `Lowercase<S>` はASCIIラテン文字（a-z, A-Z）のみを変換し、数字・記号・絵文字・空文字は変換しない
- この非対称性を使うと、アルファベット判定をユニオン列挙なしに実装できる
- `string literal extends string literal` は等価判定として使える（サブタイプではなく完全一致）

### つまずいたポイント

- 解法2の条件式は直感に反して `? false : true` の順になる（`extends` が `true` になるのは等しいとき＝非アルファベットのとき）

### 参考リンク

- [TypeScript: Documentation - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)

---
*Generated at 2026-02-20 21:50:23*
