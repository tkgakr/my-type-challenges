# Challenge #30970 - shitariteraru

**難易度**: medium  
**実施日**: 2026-02-15  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/30970-medium-shitariteraru)

## 解法

### 解法1: 再帰的な文字走査アプローチ

3段階のチェックで非確定な型を除外する:

1. **IsNever**: `[T] extends [never]` で never 型を除外
2. **IsUnion**: `T extends B ? [B] extends [T] ? false : true : never` でユニオンを除外
3. **IsFixedChars**: 文字列を1文字ずつ再帰的に走査し、各文字が確定したリテラルか検証

### 解法2: Record + Equal アプローチ（再帰なし）

2段階のチェック:

1. **`{} extends Record<S, 1>`**: never・string・`${number}` 等の非確定な型を除外
   - `Record<S, 1>` がインデックスシグネチャになる場合、`{}` は代入可能 → false
   - キーが有限集合の場合（確定リテラルやユニオン）、`{}` は代入不可 → 次のステップへ
2. **`Equal<[S], S extends unknown ? [S] : never>`**: ユニオンを除外
   - 左辺 `[S]` は分配されず、右辺だけ分配される比較で単一リテラルかを判定

### 実装のポイント

- **`'0' | '1' extends C` の仕組み**: 「ユニオン全体が C に代入可能か」を判定する。C が単一リテラル `'0'` のとき、`'1'` は `'0'` に代入できないため false となり誤判定しない。C が `string` 等の広い型のときだけ true になる
- **`${boolean}` の展開**: TypeScript はテンプレートリテラル内の `boolean` を `'true' | 'false'` のユニオンに展開するため、解法1では IsUnion で、解法2では Equal で検出される
- **`{} extends Record<S, 1>` の性質**: `Record<string, 1>` はインデックスシグネチャ `{ [k: string]: 1 }` となり `{}` が代入可能だが、`Record<'ABC', 1>` は `{ ABC: 1 }` となり `{}` は代入不可。この差で確定リテラルと非確定型を区別できる

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`) — 解法2の `Record<S, 1>`
- [x] Type Inference (`infer`)
- [x] Recursive Types — 解法1の `IsFixedChars`
- [x] Utility Types — `Record`, `Equal`
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `'0' | '1' extends C` のような「ユニオン extends 型変数」は、ユニオン全体が代入可能かを判定する（分配されない）
- `${boolean}` はテンプレートリテラル内で `'true' | 'false'` に展開される
- `{} extends Record<S, 1>` で S が string 等の広い型かリテラルかを区別できる。Record がインデックスシグネチャになるかどうかがポイント
- `Equal<[S], S extends unknown ? [S] : never>` で、左辺を分配させず右辺だけ分配させることでユニオン判定ができる

### つまずいたポイント

- `IsFixedChars<'0'>` が false にならないか心配になるが、`'0' | '1' extends '0'` は `'1'` が `'0'` に代入不可なので false となり問題ない

### 参考リンク

- [#1042 IsNever](https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md)
- [#1097 IsUnion](https://github.com/type-challenges/type-challenges/blob/main/questions/01097-medium-isunion/README.md)

---
*Generated at 2026-02-15 14:41:36*
