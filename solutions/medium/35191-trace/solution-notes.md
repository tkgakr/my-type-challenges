# Challenge #35191 - trace

**難易度**: medium
**実施日**: 2026-02-19

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/35191-medium-trace)

行列（2次元タプル）の**主対角成分**（左上から右下の対角線上の要素）のユニオン型を返す `Trace<T>` を実装する。

## 解法

### 解法1: 再帰でユニオン型を形成するアプローチ

補助タプル `Index` の長さを対角インデックスとして使い、行列を1行ずつ処理しながら再帰的にユニオン型を構築する。

```ts
type Trace<T extends any[][], Index extends any[] = []> =
  T extends [infer First extends any[], ...infer Rest extends any[][]]
    ? First[Index['length']] | Trace<Rest, [...Index, 1]>
    : never
```

- `T extends [infer First, ...infer Rest]` で先頭行と残りを分割
- `Index['length']` が現在の対角インデックス（0, 1, 2, ...）を表す
- `[...Index, 1]` でインデックスを1進めて再帰
- 行がなくなったら `never` を返す（ユニオンの単位元）

### 解法2: Mapped Type によって主対角成分を取得するアプローチ

Mapped Type でタプル全行を一度にマップし、各行 `P` から `P` 列目の要素を取り出す。

```ts
type TupleToUnion<T extends any[]> = T[number]
type Trace2<T extends any[][]> = TupleToUnion<
  {[P in keyof T]: T[P][P & keyof T[P]]}
>
```

- `keyof T` はタプルの行インデックス (`"0" | "1" | ...`) のユニオン型
- `T[P]` は P 番目の行
- `P & keyof T[P]` は行インデックス P を列インデックスとして `T[P]` に渡すための交差型。TypeScript が型エラーなく `T[P][P]` としてアクセスできるようにしている
- `TupleToUnion` で結果タプルを `T[number]` によりユニオン型に変換

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
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- タプルに対する `keyof` は `"0" | "1" | ...` の文字列リテラル型になる
- `P & keyof T[P]` という交差型パターンで、文字列インデックスを型安全に別の型のキーとして再利用できる
- 再帰型で補助タプルの長さをカウンターとして使うテクニック（`Index['length']`）

### つまずいたポイント

- 解法2で `T[P][P]` と直接書くと型エラーになる。`keyof T` の P は `keyof T[P]` の制約を満たさないため、`P & keyof T[P]` で交差を取る必要がある

### 参考リンク

---
*Generated at 2026-02-19 20:56:56*