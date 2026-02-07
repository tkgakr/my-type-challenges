# Challenge #27932 - mergeall

**難易度**: medium  
**実施日**: 2026-02-07  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/27932-medium-mergeall)

## 解法

### アプローチ

2つのアプローチで実装した。

#### 解法1: 再帰によるアキュムレータ合成

タプルを先頭から順に処理し、アキュムレータ `Result` に `Merge` で合成していく再帰アプローチ。

```ts
type MergeAll<XS extends object[], Result extends object = {}> =
  XS extends [infer First, ...infer Rest extends object[]]
    ? MergeAll<Rest, Merge<Result, First>>
    : Result
```

#### 解法2: ユニオン型への変換

タプルをユニオン型 `XS[number]` に変換し、分配条件型を使って全キーを抽出。各キーに対して該当する値をユニオンで合成する非再帰アプローチ。

```ts
type MergeAll2<
  XS extends object[],
  U = XS[number],
  Keys extends PropertyKey = U extends U ? keyof U : never
> = {
  [K in Keys]: U extends U ? U[K & keyof U] : never
}
```

### 実装のポイント

- **Merge 型**: 2つのオブジェクトを合成する補助型。同じキーがある場合はユニオン型 `F[K] | S[K]` で合成
- **分配条件型**: `U extends U ? keyof U : never` で各オブジェクトのキーを分配して取り出す
- **インデックスアクセスの安全化**: `U[K & keyof U]` で `K` が `U` のキーでない場合も安全にアクセス

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

### 新しく学んだこと、再確認したこと

- `XS[number]` でタプル型をユニオン型に変換できる
- 分配条件型 `U extends U ? ... : never` を使うと、ユニオンの各要素に対して処理を適用できる
- `K & keyof U` のようなインターセクションを使うと、型安全にインデックスアクセスできる

### つまずいたポイント

- 解法2で全キーを取り出す際、単純に `keyof U` とするとユニオン型の共通キーしか取れない。分配条件型を使う必要がある

### 参考リンク

- [#599 Merge](https://github.com/type-challenges/type-challenges/blob/main/questions/00599-medium-merge/README.ja.md)

---
*Generated at 2026-02-07 15:33:11*
