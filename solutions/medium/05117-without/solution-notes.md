# Challenge #5117 - without

**難易度**: medium  
**実施日**: 2026-01-09  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/05117-medium-without)

## 解法

### アプローチ

再帰的に配列を先頭から走査し、各要素が `U` に含まれるかをチェックして、含まれない要素のみを残す。

### 実装のポイント

1. **ToUnion型**: 配列を受け取った場合は `T[number]` でユニオン型に変換し、それ以外はそのまま返す。これにより `U` が配列でもユニオンや裸の型でも統一的に扱える
2. **再帰的な配列走査**: `[infer First, ...infer Rest]` で先頭要素と残りに分割し、先頭要素が `ToUnion<U>` に含まれるかを条件型で判定
3. **要素のフィルタリング**: 一致する要素は除外して `Without<Rest, U>` で再帰、一致しない要素は `[First, ...Without<Rest, U>]` で保持して再帰

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

特になし

### つまずいたポイント

特になし

### 参考リンク

特になし

---
*Generated at 2026-01-09 19:01:59*
