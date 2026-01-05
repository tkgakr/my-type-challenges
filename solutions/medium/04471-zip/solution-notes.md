# Challenge #4471 - zip

**難易度**: medium  
**実施日**: 2026-01-05  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04471-medium-zip)

## 解法

### アプローチ

2つの配列を受け取り、同じインデックスの要素をペアにした配列を返す型を実装する。

#### 解法1: infer による推論アプローチ
- 両方の配列の先頭要素を `infer` で推論し、ペアを作成
- 残りの要素に対して再帰的に処理を行う
- どちらかの配列が空になった時点で終了

#### 解法2: アキュムレータによるインデックス指定アプローチ
- 結果を蓄積するアキュムレータ `Result` を用意
- `Result['length']` をインデックスとして使用し、両配列の要素を取得
- アキュムレータの長さがどちらかの配列の長さに達したら終了

### 実装のポイント

- **終了条件**: 短い方の配列の長さに合わせて処理を終了する
- **解法2の終了条件**: `Result['length'] extends T['length'] | U['length']` で union 型を使うことで、どちらかの長さに達した時点で終了できる

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- union 型を使った終了条件で「どちらか一方」を表現できる
- `T['length']` は Index Access Types の構文で、「型 T の length プロパティの型」つまり、タプルの長さを表す数値リテラル型を取得できる

### つまずいたポイント

特になし

### 参考リンク

- [Indexed Access Types - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

---
*Generated at 2026-01-05 21:26:56*
