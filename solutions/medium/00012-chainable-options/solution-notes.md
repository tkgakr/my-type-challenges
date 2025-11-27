# Challenge #12 - chainable-options

**難易度**: medium  
**実施日**: 2025-11-26  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00012-medium-chainable-options)

## 解法

### アプローチ

`Chainable<T>` をビルダーパターンに見立てて、`option` の呼び出しごとに累積型 `T` に新しいプロパティをマージし、最終的に `get` で構築済みの型を取り出す方針。

### 実装のポイント

1. ジェネリクス `T` をデフォルト `{}` で開始し、`option` のたびに `Omit<T, K> & Record<K, V>` でプロパティを追加。
2. `key` は `K extends keyof T ? never : K` として既存キーの上書きを型レベルで禁止。
3. `option` は常に `Chainable<...>` を返し、メソッドチェーンを維持。
4. `get` は蓄積された型 `T` をそのまま返すだけなので実装はシグネチャで十分。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと

`Record` や `Omit` を組み合わせて型を段階的に組み立てる発想、そして `never` を使ったガードで重複キーを静的に防ぐ手法。

### つまずいたポイント

キー重複の禁止をどこで表現するか分からず苦戦したが、`K extends keyof T ? never : K` のようにジェネリクス制約へ押し込むと単純化できた。

### 参考リンク

[TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
[【TypeScript と友達に】Type Challenges を全問解いたのでエッセンスと推し問題を紹介してみる - 前編](https://zenn.dev/kakekakemiya/articles/2d7a3384a5faf0#12%3A-chainable-options%EF%BC%88%E5%B0%91%E3%80%85%E6%94%B9%E9%A1%8C%EF%BC%89)

---
*Generated at 2025-11-26 21:49:34*
