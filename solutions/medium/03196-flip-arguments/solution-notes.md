# Challenge #3196 - flip-arguments

**難易度**: medium  
**実施日**: 2025-12-28  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03196-medium-flip-arguments)

## 解法

### アプローチ

この問題では、関数の引数の順序を反転させる型を実装する必要がある。2つの解法を実装した:

**解法1: infer を使った推論によるアプローチ**
- `infer` キーワードを使って関数の引数タプルと戻り値の型を推論
- 推論した引数タプルを `Reverse` 型で反転
- 反転した引数タプルと元の戻り値の型で新しい関数型を構築

**解法2: ユーティリティ型を使ったアプローチ**
- TypeScript組み込みの `Parameters<T>` と `ReturnType<T>` を活用
- `Parameters<T>` で引数タプルを取得し、`Reverse` で反転
- より簡潔で読みやすい実装

### 実装のポイント

1. **Reverse型の実装**
   - 再帰的にタプルの先頭要素を取り出し、末尾に追加
   - `[infer First, ...infer Rest]` でタプルを分解
   - `[...Reverse<Rest>, First]` で再帰的に反転

2. **関数型の制約**
   - `T extends (...args: any) => any` で関数型のみを受け付ける
   - 関数型以外が渡された場合は型エラーとなる

3. **型推論の活用**
   - 解法1: `infer P` と `infer R` で引数と戻り値を推論
   - 解法2: `Parameters<T>` と `ReturnType<T>` で型情報を取得

4. **never型の使用**
   - 制約により到達しないブランチには `never` を使用

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- **タプルの反転は再帰的に実装できる**: `[infer First, ...infer Rest]` パターンで分解し、`[...Reverse<Rest>, First]` で再構築
- **2つのアプローチの比較**:
  - `infer` を使った推論: より低レベルで柔軟性が高い
  - ユーティリティ型: より簡潔で可読性が高い
- **`Parameters<T>` と `ReturnType<T>` の活用**: 関数型から情報を抽出する際に便利
- **関数型の制約**: `T extends (...args: any) => any` で関数型のみを受け付けることができる

### つまずいたポイント

- 関数型の引数をどうやって取り出せばいいかがわからなかった

### 参考リンク

- [Lodash Documentation - _.flip(func)](https://lodash.com/docs/4.17.15#flip)
- [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---
*Generated at 2025-12-28 11:07:18*
