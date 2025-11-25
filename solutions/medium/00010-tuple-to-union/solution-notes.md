# Challenge #10 - tuple-to-union

**難易度**: medium  
**実施日**: 2025-11-25  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00010-medium-tuple-to-union)

## 解法

### アプローチ

1. **添字アクセス型で展開 (TupleToUnion)**  
   タプル `T` に対し `T[number]` を利用すると、`number` インデックスが取り得るすべての位置にある型がユニオンとして得られる。タプルへのアクセスも配列と同じルールで評価される点を活用した最小構成の実装。
2. **infer を使った抽出 (TupleToUnion2)**  
   `T extends Array<infer I>` で配列要素型 `I` を推論し、そのまま返す。配列アクセス `Array<I>[number]` がユニオンになる性質から、推論された `I` が求めるユニオン型と一致する。条件付き型を挟むため、将来的な制約追加にも対応しやすい。

### 実装のポイント

- `T extends any[]` の制約でタプル・配列のみを受け付け、誤用を防止。SRP を守るため、型の責務をユニオン抽出のみに限定。
- `TupleToUnion2` では条件付き型の `true` 側だけで完結させ、`never` にフォールバックすることで型安全性を担保。
- どちらの実装も副作用を持たない純粋な型計算なので、差し替えやすく OCP に沿う。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- タプルも配列と同様に `number` インデックスでアクセスでき、添字アクセス型だけでユニオン化できるという単純さを再確認。
- `infer` を介した抽象化により、将来的に `readonly` 配列などへ条件を広げる余地がある点を理解。

### つまずいたポイント


### 参考リンク

- [TypeScript Handbook - Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

---
*Generated at 2025-11-25 22:57:05*
