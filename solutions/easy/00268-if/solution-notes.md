# Challenge #268 - if

**難易度**: easy  
**実施日**: 2025-11-16  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00268-easy-if)

## 解法

### アプローチ

- 判定値 `C` が boolean リテラルであることを前提にし、`C extends true ? T : F` の条件付き型で返り値を選択する。
- 追加で、`C` に制約を設けない発展解として、falsy 値を網羅するユニオン型 `Falsy` を用意し、`C` が falsy かつ数値リテラルでない場合に `F` を返す条件分岐を実装した。

### 実装のポイント

- `If` 型では `C extends boolean` とすることで、問題文の前提を満たさない入力に対して型エラーを発生させるようにした。
- `MyIf` 型では falsy 値のユニオンを定義し、数値リテラルと `number` の区別を `number extends C` 判定で行うことで、`NaN` のように型で表現できない値を安全に扱えるようにした。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- リテラル型は、値で定義された「型」であって、「値」ではない
- NaN は数値リテラル型としては表現できず、型としては `number` に丸められる

### つまずいたポイント

- 単純な問題の答えについては自力で解けた
- truthy な型、falsy な型を区別するにあたって、NaN が型としては表現できないこと

### 参考リンク

[truthyな値、falsyな値 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/truthy-falsy-values)

[リテラル型 (literal type) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/literal-types)


---
*Generated at 2025-11-16 20:17:15*
