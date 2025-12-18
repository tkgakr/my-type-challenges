# Challenge #1130 - replacekeys

**難易度**: medium  
**実施日**: 2025-12-18  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/01130-medium-replacekeys)

## 解法

### アプローチ

- **解法1 (`ReplaceKeys`)**
  - `U extends {}` で `U` を分配し、ユニオンの各要素ごとに mapped type を適用する。
  - 各キー `K` について `K extends T` の場合だけ置換対象とし、`K extends keyof Y ? Y[K] : never` で値型を差し替える。
  - `T` に含まれないキーは `U[K]` をそのまま保持する。
- **解法2 (`ReplaceKeys2`)**
  - 条件型で明示的に分配していないが、`{ [K in keyof U]: ... }` の形（`keyof U` / `U[K]` に依存する形）の **homomorphic mapped type** は `U` がユニオンのときに自動で分配される。
  - その結果、`ReplaceKeys2<A | B>` は `ReplaceKeys2<A> | ReplaceKeys2<B>` となり、ユニオンの各要素ごとの置換結果が得られる。

### 実装のポイント

- `U extends {}` は distributive conditional type を発動させる目的で使っている（加えて `null | undefined` を除外できる）。
- 置換対象の判定は `K extends T`。
- `Y` に置換先の型が無いキーは `never` に落とす（問題文の要件）。
- `ReplaceKeys2` が分配されない場合、`keyof (A | B)` は共通キーしか残らず `name` / `id` のような要素固有キーが消えるため、テストに通らない。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `keyof (A | B)` は「共通で安全にアクセスできるキー」だけになるため、ユニオン要素固有のキー（例: `name` / `id`）はそのままだと落ちる。
- `keyof U` / `U[K]` を使う `{ [K in keyof U]: ... }` は homomorphic mapped type として扱われ、`U` がユニオンのときに `M<A | B> = M<A> | M<B>` のように分配される。

### つまずいたポイント

- `ReplaceKeys2` が「1つのオブジェクト型」を返しているように見えるのに、なぜユニオンと一致するのかが直感に反した。
  - homomorphic mapped type の分配挙動（仕様/実装）によって説明できる。

### 参考リンク

homomorphic mapped type について

- [TypeScript: Documentation - TypeScript 2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#improved-control-over-mapped-type-modifiers)
- [Preserve modifiers in homomorphic mapped types by ahejlsberg · Pull Request #12563 · microsoft/TypeScript](https://github.com/Microsoft/TypeScript/pull/12563)

---
*Generated at 2025-12-18 20:59:02*
