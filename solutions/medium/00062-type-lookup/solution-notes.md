# Challenge #62 - type-lookup

**難易度**: medium  
**実施日**: 2025-12-01  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00062-medium-type-lookup)

## 解法

### アプローチ

**Distributive Conditional Types** を活用する。

ジェネリクス型引数 `U` がユニオン型の場合、Conditional Types によってそれを構成する各メンバーに対して個別に条件判定が適用される。`type` プロパティにジェネリクス `T` がマッチするメンバーを返し、それ以外は `never` とすることで、`type` の適合する型のみを返す。

```typescript
type LookUp<U, T> = U extends { type: T } ? U : never
```

### 別解（Mapped Types + Index Access Types）

オリジナルリポジトリで recommended されていた別解。

```typescript
type LookUp2<U, T extends string> = {
  [K in T]: U extends { type: T } ? U : never
}[T]
```

1. `T extends string` で `T` を文字列リテラル型に制約
2. `{ [K in T]: ... }` で `T` をキーとするオブジェクト型を生成
   - 例: `T='dog'` の場合 → `{ dog: Dog | never }` → `{ dog: Dog }`
3. `[T]` で Index Access Types によりキー `T` の値型を取り出す

条件部分では `LookUp` と同様に Distributive Conditional Types が適用される。

### 実装のポイント

- `U extends { type: T }` でオブジェクトの構造的部分型を利用してフィルタリング
- Conditional Types の分配法則により、ユニオン型の各メンバーが個別に評価される
- マッチしないメンバーは `never` になり、ユニオンから自動的に除外される

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`) ※別解
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types ※別解
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- **Distributive Conditional Types**: ジェネリクス型引数がユニオン型の場合、条件型によって各メンバーに対して個別に条件判定が適用される
- `{ type: T }` のような部分的なオブジェクト型で構造的部分型のマッチングができる
- `never` はユニオン型に含まれると自動的に除外される性質を持つ

### つまずいたポイント

- Distributive Conditional Typesが使えることに気づくこと。
- 別解の Mapped Typed の用法。

### 参考リンク

[Distributive Conditional Types | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/conditional-types/distributive-conditional-types)

[Mapped Types | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/mapped-types)

[インデックスアクセス型 (indexed access types) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/indexed-access-types)

---
*Generated at 2025-12-01 21:08:32*
