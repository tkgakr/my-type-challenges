# Challenge #5360 - unique

**難易度**: medium  
**実施日**: 2026-01-12  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/05360-medium-unique)

## 解法

### アプローチ

2つの解法を実装した。

**解法1: アキュムレータを配列として使用**
- `Result` 配列に既出の要素を蓄積していく
- `Exists` ヘルパー型で `Result` 内に要素が存在するかをチェック
- 存在しなければ `Result` に追加、存在すればスキップ

**解法2: アキュムレータをユニオンとして使用**
- `U` ユニオン型に既出の要素を蓄積していく
- 分配条件型 (`U extends U ? ...`) を使って各要素と比較
- 結果の配列は再帰的に構築 (`[First, ...Unique2<Rest, U | [First]>]`)

### 実装のポイント

- **`Equal` 型の使用**: 厳密な型比較のために `Equal` を使用。`extends` だけでは `any` や `unknown` の比較が正しく行えない
- **配列でのラップ**: 解法2では要素を `[First]` のように配列でラップしてユニオンに追加。これによりユニオン型の分配を防ぎ、要素全体を1つの単位として比較できる
- **分配条件型の活用**: `U extends U ? Equal<U, [First]> : never` でユニオンの各要素に対して比較を分配実行

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- ユニオン型をアキュムレータとして使う場合、要素を配列でラップすることで分配を制御できる
- `true extends (SomeUnion)` のパターンで、ユニオンの中に `true` が含まれるかをチェックできる

### つまずいたポイント

- 解法2のユニオン型の分配条件型の挙動の理解
- 解法2でアキュムレータへの追加時に配列でラップする必要性の理解

### 参考リンク

特になし

---
*Generated at 2026-01-12 20:18:30*
