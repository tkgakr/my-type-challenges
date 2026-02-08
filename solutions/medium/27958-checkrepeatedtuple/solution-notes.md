# Challenge #27958 - checkrepeatedtuple

**難易度**: medium  
**実施日**: 2026-02-08  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/27958-medium-checkrepeatedtuple)

## 解法

### アプローチ

タプル内に重複する要素があるかを判定する問題。2つの解法を実装した。

**解法1: アキュムレータ方式**

- チェック済みの要素を `Checked` 配列に蓄積
- 各要素が `Checked` に含まれるかを `Includes` でチェック
- 重複が見つかった場合（後側の要素で検出）に `true` を返す

**解法2: 後続要素チェック方式**

- 各要素が後続の `Rest` に含まれるかをチェック
- 重複が見つかった場合（最初の要素で検出）に `true` を返す
- アキュムレータ不要でシンプル

### 実装のポイント

- `Includes` ヘルパー型で `Equal` を使用し、厳密な型比較を行う
- `infer` と rest パターン `[infer First, ...infer Rest]` でタプルを分解
- 再帰の終了条件は空タプルになった時点で `false` を返す

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

### 新しく学んだこと、再確認したこと

- タプルの分解パターン `[infer First, ...infer Rest]` の活用
- 2つのアプローチの違い：重複検出のタイミング（最初 vs 後側）
- `Equal` を使った厳密な型比較の重要性（`extends` だけでは不十分なケースがある）

### つまずいたポイント

特になし

### 参考リンク

[#898 Includes](https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.ja.md)

---
*Generated at 2026-02-08 14:14:22*
