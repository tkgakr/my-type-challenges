# Challenge #4 - pick

**難易度**: easy  
**実施日**: 2025-11-09  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00004-easy-pick)

## 解法

### アプローチ

- ジェネリック型 `MyPick<T, K>` を定義し、元の型から必要なキーだけを抽出する。
- `K extends keyof T` の制約で、指定されたキーが必ず元の型に存在するよう保証する。
- Mapped Types を使い、抽出したキーに対応するプロパティ型をそのまま再利用する。

### 実装のポイント

- 制約 `K extends keyof T` により、不正なキー指定はコンパイル時に検出できる。これがなければ、`MyPick<T, 'invalid'>` がエラーにならない。
- 反復処理 `[key in K]` で、各キーに対して `T[key]` の型を割り当て、元のプロパティ型を保つ。
- 標準ユーティリティ型 `Pick` と同等の振る舞いを持つ最小限の実装を意識する。

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types
- [x] `keyof` 演算子

## 学習メモ

### 新しく学んだこと

- 組み込みの型ユーティリティPick<T, K>  
[TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)  
[Pick<T, Keys> | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/utility-types/pick)
- ジェネリクスに `extends` を使って、型の制約を明示することができる。
- `keyof` 演算子を使って、型のキーを取得することができる。
[TypeScript: Documentation - TypeScript 2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)
  - `keyof T` は型 `T` のすべてのキーをユニオン型として返す。
- 

### つまずいたポイント

最初は問題文の意味が理解できなかった。  
答えを先に見て、組み込みの Pick<T, K> の説明を読んではじめて内容がわかった。

### 参考リンク

[【TypeScript と友達に】Type Challenges を全問解いたのでエッセンスと推し問題を紹介してみる - 前編](https://zenn.dev/kakekakemiya/articles/2d7a3384a5faf0#%E5%88%9D%E7%B4%9A%E7%B7%A8)  
[Type Challenges Solutions - Pick](https://ghaiklor.github.io/type-challenges-solutions/ja/easy-pick.html)
[TypeScript: Documentation - Lookup Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)  
[TypeScript: Documentation - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)  
[TypeScript: Documentation - Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

---
*Generated at 2025-11-09 15:34:53*
