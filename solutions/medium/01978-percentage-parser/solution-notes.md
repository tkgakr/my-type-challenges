# Challenge #1978 - percentage-parser

**難易度**: medium  
**実施日**: 2025-12-19  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/01978-medium-percentage-parser)

## 解法

### アプローチ

文字列 `A` を「符号(+/-)」「数値部分」「% の有無」の3要素に分解してタプルで返す。

実装は2通り。

- **解法1**: 判定用の型（型レベル関数）を分けて、テンプレートリテラル型で段階的に分解する
- **解法2**: 条件分岐をインラインで書き、`infer ... extends ...` を使って分岐を読みやすくする

### 実装のポイント

#### 解法1（`CheckPrefix` / `CheckSuffix` を分離）

- **`CheckPrefix<T>`**
  - `T extends '+' | '-' ? T : never` で、符号ならそのまま返し、そうでなければ `never`
- **`CheckSuffix<T>`**
  - `T extends `${infer P}%` ? [P, '%'] : [T, '']` で末尾の `%` を剥がす
- **`PercentageParser<A>`**
  - `A extends `${CheckPrefix<infer L>}${infer R}`` によって、先頭が符号の場合だけマッチさせ、
    マッチしたら `[L, ...CheckSuffix<R>]`（符号 + 残りを % 判定）
  - 符号が無い場合は `['', ...CheckSuffix<A>]`
  - `...CheckSuffix<...>` の `...` は **タプルの展開（variadic tuple）** で、3要素タプルを組み立てている

#### 解法2（インラインで素直に分岐）

- `A extends `${infer S extends '+' | '-'}${infer R}`` で「先頭を取り出す」と「符号の制約」を同時に書ける
- 符号がある場合は `R` について `%` の有無を判定
- 符号がない場合も同様に `%` の有無を判定

どちらの解法も、`'%'` のように数値部分が空になるケース（`['', '', '%']`）を素直に扱える。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- テンプレートリテラル型は「文字列を分解する」用途で強力だが、正規表現のようなことは基本的にできない（分岐を組み合わせて表現する）
- `infer S extends U` を使うと、取り出した型変数に制約をかけながら分岐できて読みやすい
- `never` を使ったマッチの失敗（`CheckPrefix`）で、条件付きのパターンマッチを表現できる

### つまずいたポイント

最初、テンプレートリテラルに正規表現を組み合わせる方法がないか探したが不可であることがわかった。

### 参考リンク

---
*Generated at 2025-12-19 10:54:48*
