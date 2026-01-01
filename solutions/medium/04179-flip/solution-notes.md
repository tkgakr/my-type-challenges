# Challenge #4179 - flip

**難易度**: medium  
**実施日**: 2026-01-01  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04179-medium-flip)

## 解法

### アプローチ

Mapped Types の Key Remapping (`as` 節) を使って、元のオブジェクトの「値」を新しいオブジェクトの「キー」に、「キー」を「値」に入れ替える。

### 実装のポイント

1. **型引数の制約**: `T extends Record<string, string | number | boolean>` で値をプロパティキーに変換可能な型に制限
2. **Key Remapping**: `[K in keyof T as ${T[K]}]` で元の値を新しいキーとして使用
3. **テンプレートリテラル**: `${T[K]}` により `true`/`false` などの boolean 値も文字列キーに変換

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
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

- Mapped Types の `as` 節を使った Key Remapping でキーを動的に変更できる
- テンプレートリテラル `${...}` は boolean や number を文字列に変換するのに便利

### つまずいたポイント

- `true`/`false` をキーにする際、そのままだとプロパティキーとして使えない → テンプレートリテラルで文字列化することで解決

### 参考リンク

- [Record<Keys, Type> | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/utility-types/record)
- [TypeScript: Documentation - Utility Types - Record<Keys, Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)
- [TypeScript: Documentation - Mapped Types - Key Remapping via `as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)
- [TypeScript: Documentation - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---
*Generated at 2026-01-01 17:16:10*
