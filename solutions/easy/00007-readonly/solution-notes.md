# Challenge #7 - readonly

**難易度**: easy  
**実施日**: 2025-11-10  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00007-easy-readonly)

## 解法

### アプローチ

- #4 Pick でも使用した Mapped Types を使用し、すべてのプロパティを展開
- 各プロパティに readonly をつける

### 実装のポイント

- Mapped Types で readonly をつける

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- ユーティリティ型の `Readonly<T>` → イミュータブルなオブジェクト定義で常用したい。  
[TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)
- Mapped Types に readonly をつけることが可能なこと

### つまずいたポイント

特になかったが、実施前に `Readonly<T>` をホバーした特に答えが先に見えてしまった。

### 参考リンク

[解法 Readonly](https://ghaiklor.github.io/type-challenges-solutions/ja/easy-readonly.html)  
[Readonly<T> | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/utility-types/readonly)  
[TypeScript: Documentation - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)  
[Mapped Types | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/mapped-types)

---
*Generated at 2025-11-10 22:11:03*
