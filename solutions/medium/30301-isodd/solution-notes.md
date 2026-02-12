# Challenge #30301 - isodd

**難易度**: medium  
**実施日**: 2026-02-12  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/30301-medium-isodd)

## 解法

### アプローチ

数値 `T` をテンプレートリテラル型で文字列化し、以下の順で判定する:

1. **小数チェック**: `${number}.${number}` にマッチすれば `false`（奇数・偶数は整数に対して定義されるため）
2. **指数表記チェック**: `Ce${E}` 形式にマッチする場合、`E` が `0` なら `C` に対して再帰、`E` が `1` 以上なら10の倍数なので `false`
3. **末尾の桁チェック**: 文字列を `ReverseString` で反転し、先頭文字（=元の末尾桁）が `1 | 3 | 5 | 7 | 9` なら `true`、それ以外は `false`

別解 `IsOdd2` は小数・指数表記を考慮せず、`` `${number | ''}${1|3|5|7|9}` `` でシンプルに末尾桁を判定する。

### 実装のポイント

- `T` は `number` 型なので、テンプレートリテラル `` `${T}` `` で文字列化してからパターンマッチする必要がある（裸の `T` を直接条件型に渡すと意図通りにマッチしない）
- `${infer First}${number}` のようなパターンは2桁以上でないとマッチしないため、1桁の数値にも対応するために `ReverseString` で反転してから `${infer First}${string}` でマッチさせている
- TypeScript の数値リテラル型は `1.0` を `1` に正規化するが、テンプレートリテラルでの文字列化では小数点が保持されるケースがあるため、小数チェックを先に行う
- 指数表記（例: `3e23`）は `${T}` で文字列化すると `"3e+23"` のようになるが、`infer E extends number` で `E` を推論する際に `+23` が `number` にマッチするため正しく動作する

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

- テンプレートリテラル型で `number` を文字列化すると、指数表記（`3e+23`）や小数（`2.3`）もそのまま文字列になる
- `infer X extends number` のように `infer` に制約を付けることで、テンプレートリテラルの部分文字列を `number` として推論できる
- `${infer First}${number}` は2桁以上の文字列にしかマッチしないため、1桁の場合は別途考慮が必要

### つまずいたポイント

- テンプレートリテラルとの条件型に 裸の T (number) を渡してしまい、意図した動きにならなかった。Tもテンプレートリテラルで文字列にすることで意図した動きになった。

### 参考リンク

- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---
*Generated at 2026-02-12 21:21:15*
