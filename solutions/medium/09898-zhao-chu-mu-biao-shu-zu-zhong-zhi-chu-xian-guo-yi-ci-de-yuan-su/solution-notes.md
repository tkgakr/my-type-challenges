# Challenge #9898 - Appear only once

**難易度**: medium  
**実施日**: 2026-01-22  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/09898-medium-zhao-chu-mu-biao-shu-zu-zhong-zhi-chu-xian-guo-yi-ci-de-yuan-su)

## 解法

### アプローチ

1. **ヘルパー型 `CountOccurrences`**: タプル内の特定要素の出現回数をカウント
2. **メイン型 `FindEles`**: タプルを順に走査し、出現回数が1回の要素のみを結果に追加

### 実装のポイント

- `CountOccurrences<T, U>` で `Equal` を使い厳密な型比較を行う（`number` と `1` を区別するため）
- `FindEles` は3つの型パラメータを使用：
  - `T`: 元のタプル（出現回数チェック用に保持）
  - `U`: 走査中のタプル（初期値は `T`）
  - `Result`: アキュムレータ（ユニークな要素を蓄積）

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `T extends [...infer L, X, ...infer M, X, ...infer R]` のパターンマッチングでは、`L`, `M`, `R` が空配列にマッチできるため、**同一要素が1回しかなくてもマッチしてしまう**
- 重複チェックには出現回数をカウントするアプローチが確実

### つまずいたポイント

**問題**: `[...infer L, First, ...infer M, First, ...infer R]` で重複判定しようとしたが、`M = []` として同一要素を2回マッチさせてしまう

**解決**: `CountOccurrences` ヘルパー型を作成し、出現回数が `1` かどうかで判定する方式に変更

### 参考リンク

---
*Generated at 2026-01-22 21:28:23*
