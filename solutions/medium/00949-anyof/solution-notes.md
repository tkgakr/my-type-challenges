# Challenge #949 - anyof

**難易度**: medium  
**実施日**: 2025-12-15  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00949-medium-anyof)

## 解法

### アプローチ

1. JavaScript の Falsy 値（`null | undefined | false | 0 | -0 | 0n | ''`）に加えて、課題の想定に合わせて `[]` と空オブジェクト（`{[key: string]: never}`）だけを特別に `Falsy` 型として定義する。
2. メイン解法は配列を再帰的に展開し、先頭要素が `Falsy` かどうかを判定していく。Truthy が見つかれば即 `true`、最後まで Falsy なら `false`。
3. 代替解法として `T[number]` で配列をユニオンに展開し、そのユニオン全体が `Falsy` のサブタイプかどうかを一括で判定する。

### 実装のポイント

- 空オブジェクトのみを Falsy とみなすために `type Falsy = ... | {[key: string]: never}` とし、他のオブジェクト型への影響を避けた。
- 再帰解法では `T extends [infer F, ...infer R]` で配列を分解し、`F extends Falsy` なら残りに再帰、そうでなければ `true`。
- 代替解法は `T[number] extends Falsy ? false : true` とすることで、ユニオン内に Truthy が含まれるかどうかを一発で判定できる。
- `T[number]` は「裸の型パラメータ」ではないため分配条件型が発生せず、ユニオン全体をまとめて比較できる点がポイント。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `T[number]` のようにインデックスアクセスで得たユニオンは分配条件型にならず、ユニオン全体を一括比較できる。
- 空オブジェクトだけを Falsy とするための `{[key: string]: never}` という表現。

### つまずいたポイント

- 空のオブジェクトを Falsy に定義する方法
- インデックスアクセス型で展開したユニオンは分配条件型（Distributive Conditional Types）を発生させない点

### 参考リンク

- [組み込み関数 — Python ドキュメント - any](https://docs.python.org/ja/3/library/functions.html#any)
- [Falsy (偽値) - MDN Web Docs 用語集 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Falsy)
- [Truthy (真値) - MDN Web Docs 用語集 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Truthy)
- [truthyな値、falsyな値 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/truthy-falsy-values)

---
*Generated at 2025-12-15 11:27:30*
