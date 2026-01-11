# Challenge #5310 - join

**難易度**: medium  
**実施日**: 2026-01-11  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/05310-medium-join)

## 解法

### アプローチ

1. `Join` はアキュムレータ `S` を持つ再帰型。`T` の先頭要素を順に取り出し、`S` が空のときはそのまま初期化、そうでなければ区切り文字 `U` を挟んで連結する。
2. `Join2` はテンプレートリテラルの中で再帰を完結させる。配列を `[First, ...Rest]` に分解し、`Rest` が空かどうかで終了条件を判定。空でなければ `${First & string}${U}${Join2<Rest, U>}` の形で再帰を進める。

### 実装のポイント

- `Join` ではアキュムレータ `S` をデフォルト空文字にしておくことで、最初の要素だけ区切り文字を挿入しない分岐をシンプルに記述。
- `Join2` は `Rest['length']` で残要素の有無を確認し、唯一要素のケースではそのまま文字列を返して再帰を終了。
- 推論した `First` をテンプレートリテラルに安全に埋め込むため、`First & string` として string にナローイングしている。

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

- `infer` で推論した型をそのままテンプレートリテラルに埋め込むと `string` でない可能性が残るため、`First & string` のように交差させて `string` に絞り込むパターンを再確認。

### つまずいたポイント

- infer で推論した変数をテンプレートリテラルで使用可能な型に限定する方法
- `First & string` によるナローイングは、`First` が既に `string` のときはそのまま、そうでないときは `never` に落ちるため、テンプレートリテラルが `string` 以外を受け取ってしまうのを抑止できる。

### 参考リンク

- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [TypeScript 4.1 Release Notes (Template Literal Types)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)

---
*Generated at 2026-01-11 18:22:28*
