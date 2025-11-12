# Challenge #14 - first

**難易度**: easy  
**実施日**: 2025-11-12  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00014-easy-first)

## 解法

### アプローチ

- Conditional Type で配列が空かどうかを分岐し、空なら never、要素があれば先頭要素の型を返す。

### 実装のポイント

- ジェネリック引数に `T extends any[]` の制約を付けて配列のみを受け付ける。
- `T extends [] ? never : T[0]` という分岐で空配列に対する安全性を確保し、通常時は先頭の要素型を抽出する。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- Conditional Types : `T extends U ? X : Y`
... Tの型 が U の型に割り当てることができる場合は True つまり X が返され、
そうでない場合は False つまり Y が返される。

### つまずいたポイント

- 空配列を渡した場合の対応に Conditional Types を使用することを知らなかった。

### 参考リンク

[First of Array](https://ghaiklor.github.io/type-challenges-solutions/ja/easy-first.html)  
[TypeScript: Documentation - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)  
[TypeScript: Documentation - Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

---
*Generated at 2025-11-12 22:22:36*
