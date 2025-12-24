# Challenge #2757 - partialbykeys

**難易度**: medium  
**実施日**: 2025-12-24  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02757-medium-partialbykeys)

## 解法

### アプローチ

指定されたキー `K` をオプショナルにし、それ以外のプロパティはそのまま保持する型を作成する。

**解法1: Utility Typesを組み合わせる方法**

1. `Pick<T, K>` で K のプロパティを抽出し、`Partial` でオプショナル化
2. `Omit<T, K>` で K 以外のプロパティを抽出
3. 両者を交差型 (`&`) で結合
4. `Omit<..., never>` を通すことで交差型を単一のオブジェクト型に変換

**解法2: Mapped Typesでインライン実装**

1. `as` 句を使った Key Remapping で K に該当するプロパティをオプショナル化
2. `Exclude` で K 以外のプロパティを必須として保持
3. 両者を交差型で結合し、`IntersectionToObj` ヘルパー型で単一オブジェクト化

### 実装のポイント

- **デフォルト型パラメータ**: `K extends keyof T = keyof T` により、K を省略した場合は全プロパティが対象になる
- **交差型の正規化**: `Omit<T, never>` や Mapped Types を使って交差型を単一のオブジェクト型に変換しないと、型の等価性チェックで失敗する
- **Key Remapping の制約**: `[P in keyof T as ...]` の中では `?` 修飾子を条件分岐できないため、オブジェクトを分割して交差型で結合する必要がある

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [x] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- **交差型の正規化が必要な理由**: `{ a?: string } & { b: number }` のような交差型は、TypeScript の型等価性チェックでは `{ a?: string; b: number }` と等価と見なされない。`Omit<T, never>` や Mapped Types を通すことで単一のオブジェクト型に変換する必要がある
- **Key Remapping の限界**: `[P in keyof T as ...]` 構文では、キーのフィルタリングはできるが、同じ Mapped Type 内で条件に応じて `?` 修飾子を付けることはできない。そのため、オプショナルと必須を別々のオブジェクトに分けて交差型で結合するアプローチが必要
- **デフォルト型パラメータの活用**: `K extends keyof T = keyof T` により、第2引数を省略した場合のデフォルト動作を定義できる

### つまずいたポイント

- 最初 `[P in keyof T as P extends K ?...]` で実装しようとしたが、as を使って[]の中でオプショナルにする方法がなかった
- 交差型をそのまま返すと型の等価性チェックで失敗するため、`Omit<T, never>` のような単一オブジェクトに変換するためのトリックが必要だった

### 参考リンク

- [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)
- [Partial<T> | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/utility-types/partial)

---
*Generated at 2025-12-24 15:30:21*
