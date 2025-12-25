# Challenge #2759 - requiredbykeys

**難易度**: medium  
**実施日**: 2025-12-25  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02759-medium-requiredbykeys)

## 解法

### アプローチ

指定されたキー `K` のプロパティのみを必須にし、それ以外のプロパティは元の型のまま保持する型を作成する。

1. **交差型による分割統治**:
   - `K` で指定されたプロパティを `Required` にしたオブジェクト型
   - `K` 以外のプロパティを元のまま保持したオブジェクト型
   - これらを交差型（`&`）で結合

2. **交差型の正規化**:
   - 交差型をそのまま返すと型表示が複雑になるため、`IntersectionToObj` で単一のオブジェクト型に変換

### 実装のポイント

#### 解法1: ユーティリティ型の組み合わせ

```typescript
type RequiredByKeys<T, K extends keyof T = keyof T> = IntersectionToObj<
  Required<Pick<T, K>>
  &
  Omit<T, K>
>
```

- `Required<Pick<T, K>>`: `K` で指定されたプロパティのみを抽出し、必須化
- `Omit<T, K>`: `K` 以外のプロパティを元のまま保持
- `IntersectionToObj`: 交差型を単一のオブジェクト型に変換して可読性を向上

#### 解法2: インラインでの実装

```typescript
type RequiredByKeys2<T, K extends keyof T = keyof T> = IntersectionToObj<
  {[P in K]-?: T[P]}
  &
  {[P in keyof T as P extends K ? never: P]: T[P]}
>
```

- `{[P in K]-?: T[P]}`: Mapped Types で `K` のプロパティを必須化（`-?` でオプショナルを除去）
- `{[P in keyof T as P extends K ? never: P]: T[P]}`: Key Remapping で `K` 以外のプロパティを抽出
- より低レベルな実装で、ユーティリティ型に依存しない

#### IntersectionToObj の役割

```typescript
type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}
```

交差型 `A & B` を単一のオブジェクト型に変換する。これにより、型のホバー表示が見やすくなる。

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- **交差型の正規化**: 交差型 `A & B` は機能的には問題ないが、型表示が複雑になる。Mapped Types で再マッピングすることで単一のオブジェクト型として表示できる
- **Mapped Types の `-?` 修飾子**: `[K in keyof T]-?: T[K]` でオプショナルプロパティを必須化できる
- **Key Remapping**: `[P in keyof T as P extends K ? never : P]` で条件に応じてキーをフィルタリングできる
- **デフォルト型パラメータ**: `K extends keyof T = keyof T` で、`K` が省略された場合は全てのキーを対象にできる

### つまずいたポイント

得になし。前回の PatialByKeys の応用問題だった。

### 参考リンク

- [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)
- [Required<T> | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/utility-types/required)

---
*Generated at 2025-12-25 18:08:45*
