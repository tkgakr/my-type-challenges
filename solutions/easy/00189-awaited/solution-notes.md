# Challenge #189 - awaited

**難易度**: easy  
**実施日**: 2025-11-15  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00189-easy-awaited)

## 解法

### アプローチ

1. Conditional Types で `T` が `PromiseLike` かどうかを判定する。
2. `PromiseLike` であれば `infer` を使って中身の型 `R` を取り出し、再帰的にアンラップする。
3. 最終的に `PromiseLike` でない型に到達したら、その型を結果として返す。

### 実装のポイント

- 問題文が Promise "らしさ" を要求するため、`T extends PromiseLike<any>` として入力側に制約を課す。
- `infer` で取り出した型 `R` も Promise ライクである可能性があるため、再帰してすべてのラップを剥がす。
- 上記の制約により、裸の型が渡った場合は `never` になることを示せる。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- `Promise` 固有ではなく `PromiseLike` を扱うと、thenable な型にも対応できる点。

### つまずいたポイント

- `Promise` に限定してしまうと最後のテストケースが成立しない。`PromiseLike` に一般化することで解決した。

### 参考リンク

[【TypeScript と友達に】Type Challenges を全問解いたのでエッセンスと推し問題を紹介してみる - 前編](https://zenn.dev/kakekakemiya/articles/2d7a3384a5faf0#189%3A-awaited)

[Conditional Types | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/conditional-types)

[infer | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/conditional-types/infer)

---
*Generated at 2025-11-15 17:39:09*
