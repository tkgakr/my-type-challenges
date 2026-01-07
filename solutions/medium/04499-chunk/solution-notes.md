# Challenge #4499 - chunk

**難易度**: medium  
**実施日**: 2026-01-07  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04499-medium-chunk)

## 解法

### アプローチ

配列 `T` を先頭から順に走査し、チャンク用の一時配列に要素を蓄積。チャンクの長さが `N` に達したら結果に追加してリセットする。

**解法1**: Result をアキュムレータとして使用するアプローチ
- `C`: 現在のチャンクを蓄積する配列
- `R`: 完成したチャンクを蓄積する結果配列

**解法2**: Result をアキュムレータに置かないアプローチ
- `Swap`: 現在のチャンクを蓄積する配列
- チャンクが完成したら `[Swap, ...Chunk2<T, N>]` のようにスプレッド構文で結果を構築

### 実装のポイント

1. **配列の分割**: `T extends [infer First, ...infer Rest]` で先頭要素と残りに分割
2. **長さのチェック**: `[...C, First]['length'] extends N` でチャンクが指定サイズに達したか判定
3. **端数処理**: 入力配列が空になったとき、未完成のチャンクがあれば結果に追加

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

- 配列の長さを `['length']` で取得して比較に使うテクニック

### つまずいたポイント

- 解法2では、端数のチャンクを `[Swap]` とタプルで包んで返す必要がある（スプレッドで展開されないように）

### 参考リンク

- [Lodash Documentation - chunk](https://lodash.com/docs/4.17.21#chunk)

---
*Generated at 2026-01-07 21:34:02*
