# Challenge #898 - includes

**難易度**: easy  
**実施日**: 2025-11-18  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00898-easy-includes)

## 解法

### アプローチ

1. まずは `T extends [infer First, ...infer Rest]` で配列を分解し、`First extends U` で一致判定する素朴な再帰を試した。しかし `extends` は代入可能性ベースの比較のため、`{ a: 'A' }` と `{ readonly a: 'A' }` のようなケースを区別できなかった。
2. 次に `T[number]` で配列をユニオンに展開し、`U extends T[number]` で包含判定する案を検証したが、こちらも同じ理由で失敗した。
3. 最終的に関数型を用いた `IsEqual` を自前で定義し、`IsEqual<First, U>` が `true` になるかを再帰的に確認することで厳密比較を実現した。

### 実装のポイント

- 関数型を返す conditional を用いた `IsEqual` で双方向に `extends` を評価し、構造・修飾子の差異まで判定できるようにした。
- `Includes` 自体は再帰タプル分解で実装し、先頭要素が一致した時点で `true` を返し、最後まで一致しなければ `false`。
- `readonly` を保持するために入力配列を `readonly any[]` で受け取り、比較時の情報欠落を防いでいる。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- 関数型シグネチャを比較に利用すると、`readonly` を含む細かな差異まで判別できる厳密な等価判定型を構築できる。

### つまずいたポイント

- 代入可能性に頼った判定では `boolean` vs `true`、`{ a: 'A' }` vs `{ readonly a: 'A' }` が区別できず、誤って `true` になるケースがあった。`IsEqual` を導入して双方が互いに `extends` し合う関係かをチェックすることで解消。

### 参考リンク

[TypeScript: Documentation - Generics - Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

[TypeScript: Documentation - Conditional Types - Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

[TypeScript: Documentation - Type Compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#comparing-two-functions)

---
*Generated at 2025-11-18 22:47:10*
