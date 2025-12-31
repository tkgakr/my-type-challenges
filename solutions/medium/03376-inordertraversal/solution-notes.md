# Challenge #3376 - inordertraversal

**難易度**: medium  
**実施日**: 2025-12-31  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03376-medium-inordertraversal)

## 解法

### アプローチ

二分木の中間順走査（Inorder Traversal）を型レベルで実装する。中間順走査は「左部分木 → 現在ノード → 右部分木」の順で走査するアルゴリズム。

条件型と再帰を使い、`T` が `TreeNode` の場合は左部分木・現在値・右部分木をスプレッド構文で結合し、`null` の場合は空配列を返す。

### 実装のポイント

1. **Union Distribution の防止**: `[T] extends [TreeNode]` とタプルで囲むことで、`T` がユニオン型の場合でも分配を防ぎ、全体を1つの型として評価する
2. **再帰的な型定義**: `InorderTraversal<T['left']>` と `InorderTraversal<T['right']>` で左右の部分木を再帰的に走査
3. **スプレッド構文**: `[...left, val, ...right]` の形で結果を結合

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `[T] extends [U]` のようにタプルで囲むと、条件型の Union Distribution を防止できる
- 型レベルでもスプレッド構文 `[...A, ...B]` でタプルを結合できる
- 再帰型で木構造を走査する際、終了条件（`null` の場合に `[]` を返す）が重要

### つまずいたポイント

- `T extends null` でアーリーリターンにしようとした場合、T のプロパティを参照しようとしてエラーになった。

### 参考リンク

- [バイナリツリー_インオーダー走査(Inorder Traversal)の実装　#442｜ゆーき|YM202110](https://note.com/ym202110/n/n7daa8a8cc3d6)

---
*Generated at 2025-12-31 17:04:14*
