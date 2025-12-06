# Challenge #191 - append-argument

**難易度**: medium  
**実施日**: 2025-12-06  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00191-medium-append-argument)

## 解法

### アプローチ

1. `Fn` を `(...args: any[]) => unknown` で制約し、関数型以外（`unknown` など）が渡された場合にエラーにする
2. Conditional Types と `infer` で引数をタプル型 `T`、戻り値を `R` として推論
3. スプレッド構文 `[...T, A]` で元の引数に新しい引数 `A` を追加した新しい関数型を返す

### 実装のポイント

- **関数型の制約**: `Fn extends (...args: any[]) => unknown` により、関数型以外を弾く
- **引数のタプル推論**: `...args: infer T` で可変長引数をタプル型として取得
- **タプルへの要素追加**: `[...T, A]` でスプレッド構文を使い、末尾に新しい引数を追加

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 関数型の引数は `(...args: infer T)` でタプル型として推論できる
- タプル型にスプレッド構文 `[...T, A]` で要素を追加できる
- 関数の引数にラベル `x: A` を付けると、型の比較時にラベルも考慮される
  - (今回はつけてもつけなくてもテストは通るが問題文にラベルの考慮が入ってないのではずす)

### つまずいたポイント

- 関数型から引数を取り出す方法につまずいた
- 関数型の制約をかける際に、引数がない場合のパターンにつまった。

### 参考リンク

- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook - Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)

---
*Generated at 2025-12-06 17:46:15*
