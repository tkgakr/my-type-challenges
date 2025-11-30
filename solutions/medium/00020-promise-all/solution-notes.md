# Challenge #20 - promise-all

**難易度**: medium  
**実施日**: 2025-11-30  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00020-medium-promise-all)

## 解法

### アプローチ

```typescript
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T
declare function PromiseAll<T extends any[]>(values: readonly [...T]):
  Promise<{ [K in keyof T]: Awaited<T[K]> }>
```

1. **タプル型の保持**: `readonly [...T]` でスプレッド演算子を使い、`as const` のリテラル情報を維持
2. **Mapped Types で変換**: `{ [K in keyof T]: ... }` で配列の各要素に対して型変換を適用
3. **Promise のアンラップ**: `Awaited<T>` ヘルパー型で Promise の中身を再帰的に抽出

### 実装のポイント

#### 1. `readonly [...T]` によるタプル型推論

```typescript
// readonly [...T] がないと、リテラル型が失われる
PromiseAll([1, 2, 3] as const) // T = [1, 2, 3] として推論される
```

#### 2. 条件型の分配法則（Distributive Conditional Types）

**問題**: `T[K]` はインデックスアクセス型であり「裸の型パラメータ」ではないため、union 型が分配されない

```typescript
// ❌ これだと union 型で失敗する
T[K] extends Promise<infer R> ? R : T[K]

// ✅ ヘルパー型を使うと T が裸の型パラメータになり分配される
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T
```

#### 3. 再帰的な Awaited

ネストした `Promise<Promise<number>>` を完全にアンラップするため、`Awaited` を再帰的に定義

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- **条件型の分配法則**: `T extends U ? X : Y` で T が「裸の型パラメータ」の場合のみ union が分配される
- **`readonly [...T]`**: スプレッド演算子を使うことでタプル型のリテラル情報を保持できる
- **`Promise.resolve` の自動フラット化**: JavaScript の Promise は自動的にネストを解消するため、型レベルでネストをテストするには明示的な型注釈が必要

### つまずいたポイント

- **インライン条件型 vs ヘルパー型**: `T[K] extends Promise<infer R>` のようにインラインで書くと、`T[K]` が裸の型パラメータではないため分配されない。ヘルパー型 `Awaited<T[K]>` を使うことで解決

### 参考リンク

- [Distributive Conditional Types | TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) - 条件型の分配法則
- [Variadic Tuple Types | TypeScript 4.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types) - `readonly [...T]` によるタプル型推論
- [Promise() コンストラクター - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise#resolve_%E9%96%A2%E6%95%B0) - Promise の自動フラット化（nested thenables の解消）
- [Promise&lt;T&gt; | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/asynchronous/promise)

---
*Generated at 2025-11-30 20:45:20*
