# Challenge #28333 - public-type

**難易度**: medium  
**実施日**: 2026-02-09  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/28333-medium-public-type)

## 解法

### アプローチ

Mapped Types の Key Remapping（`as` 句）を使用して、`_` で始まるプロパティキーを除外する。

### 実装のポイント

1. **Key Remapping**: `[K in keyof T as ...]` 構文でキーを再マッピング
2. **Template Literal Types**: `` K extends `_${string}` `` でアンダースコアで始まるキーを判定
3. **除外**: 条件に一致するキーを `never` にすることで、そのプロパティを結果から除外

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- Mapped Types の `as` 句による Key Remapping で、特定のパターンのキーを除外できる
- Template Literal Types を使うと、文字列パターンに基づいたキーのフィルタリングが可能
- `never` を返すことでプロパティを結果から除外できる

### つまずいたポイント

特になし。Omit の解法で学んだ Key Remapping の知識を応用できた。

### 参考リンク

- [#3 Omit](https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.ja.md)
- [TypeScript: Documentation - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)

---
*Generated at 2026-02-09 21:34:44*
