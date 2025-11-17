# Challenge #533 - concat

**難易度**: easy  
**実施日**: 2025-11-17  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00533-easy-concat)

## 解法

### アプローチ

- 最初は単純に `type Concat<T, U> = [...T, ...U]` として配列をスプレッド構文で連結。
- 型制約なしでは、利用側でnullなど、配列以外の任意の型が渡せてしまう問題が残るため、`T` と `U` に配列制約を課した。

### 実装のポイント

- `T extends any[]` では `readonly` タプルに対応できず、`typeof tuple` のケースで失敗した。
- そこで `T extends readonly any[]` とし、可変配列と `readonly` 両方を受け入れるようにした。

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- ジェネリクスを用いた型の定義にもスプレッド構文が使えること。

### つまずいたポイント

- `any[]` 制約だけでは `readonly` タプルが弾かれてしまい、制約自体に `readonly` を含める必要があった。(再認識)

### 参考リンク

[配列のスプレッド構文「...」(spread syntax) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/array/spread-syntax-for-array)

[TypeScript: Documentation - Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)

---
*Generated at 2025-11-17 18:50:31*
