# Challenge #10969 - integer

**難易度**: medium  
**実施日**: 2026-01-24  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/10969-medium-integer)

## 解法

### アプローチ

数値リテラル型が整数かどうかを判定する問題。3つの解法を実装した。

1. **解法1**: Template Literal Types と `infer` を使い、小数点で分割して小数部が0かどうかを判定
2. **解法2**: 解法1をシンプル化。TypeScriptは小数部が0の場合、文字列化時に自動的に整数表現になることを利用
3. **解法3**: `bigint` は整数のみを表現するため、`${bigint}` パターンにマッチするかで判定

### 実装のポイント

- **`number` プリミティブ型の除外**: `number extends T` または `Equal<T, number>` で判定。解法3では `${number}` が `` `${number}` `` のままとなり `${bigint}` にマッチしないため自動的に除外される
- **小数点以下が0の場合の処理**: `1.0` は TypeScript 内部で `1` として扱われるため、文字列化しても `"1"` になる
- **`${bigint}` の活用**: `bigint` は整数のみを表現するため、整数判定に最適

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `${bigint}` は整数リテラル文字列にのみマッチする（小数は含まない）
- `number` プリミティブ型を Template Literal Types で文字列化すると `` `${number}` `` 型になる（文字列リテラルにはならない）
- TypeScript では `1.0` と `1` は同じ型として扱われる

### つまずいたポイント

- 最初は小数部が `0` かどうかの判定を入れていたが、TypeScript が自動的に整数表現に変換してくれることに気づいた

### 参考リンク

- [TypeScript Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---
*Generated at 2026-01-24 18:52:12*
