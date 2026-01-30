# Challenge #21106 - zu-he-jian-lei-xing-combination-key-type

**難易度**: medium  
**実施日**: 2026-01-30  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/21106-medium-zu-he-jian-lei-xing-combination-key-type)

## 解法

### アプローチ

#### 解法1 (`Combs`)

- タプルを最初の要素 `First` と残り `Rest` に分解
- `Rest[number] extends infer Second extends string` で残りの要素をユニオン型として取得し、分配条件型で各メンバーに適用
- 再帰で残りの要素間の組み合わせもユニオンで結合

#### 解法2 (`Combs2`) - 解法1のリファクタリング

- `...infer Rest extends string[]` で `Rest` 自体を `string[]` に制約
- `Rest[number]` が自動的に `string` 型になるため、別途 `infer Second` で推論する必要がない
- テンプレートリテラル内でユニオン型を使うと分配が適用される

### 実装のポイント

1. **`infer First extends string`**: テンプレートリテラル型で使用するため、`string` 型に制約
2. **`Rest[number] extends infer Second`** (解法1): ユニオン型を `Second` という別名で推論し、分配条件型として各メンバーに適用
3. **`...infer Rest extends string[]`** (解法2): `Rest` 自体を `string[]` に制約することで、`Rest[number]` が自動的に `string` 型になる
4. **再帰とユニオンの結合**: `` `${First} ${Second}` | Combs<Rest> `` で現在の組み合わせと残りの組み合わせを結合

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types (`Rest[number]})`)
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `infer X extends string` で推論と型制約を同時に行える
- `T[number]` でタプルの全要素をユニオン型として取得できる
- 条件型の分配とテンプレートリテラル型を組み合わせると、ユニオンの各メンバーに対して文字列生成が適用される
- `...infer Rest extends string[]` のように可変長部分にも型制約を付けられる

### つまずいたポイント

- `infer First` だけだと `unknown` 型になり、テンプレートリテラル型で使用できない → `extends string` で制約を追加

### 参考リンク

- [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

---
*Generated at 2026-01-30 22:56:35*
