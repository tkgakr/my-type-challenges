# Challenge #2946 - objectentries

**難易度**: medium  
**実施日**: 2025-12-26  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02946-medium-objectentries)

## 解法

### アプローチ

**解法1: 条件型の分配法則を利用**

```typescript
type ObjectEntries<T, K extends keyof T = keyof T> =
  K extends keyof T
    ? [K, Required<T>[K] extends never ? undefined : Required<T>[K]]
    : never
```

- ジェネリクスのデフォルト値 `K extends keyof T = keyof T` でキーのユニオン型を取得
- 条件型 `K extends keyof T` で分配法則を適用し、各キーに対してタプルを生成

**解法2: インデックスアクセス型を利用**

```typescript
type ObjectEntries2<T, U = Required<T>> = {
  [K in keyof U]: [K, U[K] extends never ? undefined : U[K]]
}[keyof U]
```

- Mapped Types で各キーに対してタプル型を持つオブジェクト型を生成
- インデックスアクセス型 `[keyof U]` で全ての値型をユニオン型として取得

### 実装のポイント

1. **`Required<T>` の使用**: `Partial<T>` で optional になったプロパティから `undefined` を除去するために使用
2. **`never` チェック**: `undefined` 型のプロパティは `Required` 適用後に `never` になるため、`undefined` に戻す処理が必要
3. **ユニオン型への変換**: 解法1は分配法則、解法2はインデックスアクセス型で実現

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
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `Required<T>` を適用すると `undefined` 型は `never` になる
- 条件型の分配法則とインデックスアクセス型は、どちらもユニオン型を生成する手段として使える
- ジェネリクスのデフォルト値を使って分配法則を適用するテクニック

### つまずいたポイント

- `Partial<T>` を渡した場合に `undefined` が値型に含まれてしまう問題 → `Required<T>` で解決
- `{ key?: undefined }` のようなケースで `never` になる問題 → `extends never` チェックで `undefined` に戻す

### 参考リンク

- [TypeScript: Documentation - Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [インデックスアクセス型 (indexed access types) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/indexed-access-types)

---
*Generated at 2025-12-26 21:12:42*
