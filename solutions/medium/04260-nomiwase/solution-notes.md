# Challenge #4260 - nomiwase

**難易度**: medium  
**実施日**: 2026-01-03  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04260-medium-nomiwase)

## 解法

### アプローチ

1. **文字列をユニオン型に分解**: `StringToUnion<S>` で文字列 `'AB'` を `'A' | 'B'` に変換
2. **再帰的に全組み合わせを生成**: Mapped Type を使って各文字を先頭にした組み合わせを生成し、残りの文字で再帰

### 実装のポイント

- **`[U] extends [never]` で分配を防ぐ**: `U extends never` だと分配条件型により即座に `never` を返してしまうため、タプルで囲んで判定
- **Mapped Type + インデックスアクセス**: `{[K in U]: ...}[U]` で各キーの値をユニオンとして取り出す
- **`Exclude<U, K>` で使用済み文字を除外**: 再帰時に現在の文字を除外して残りの組み合わせを生成
- **`'' |` で空文字列を含める**: 各段階で空文字列（何も選ばない選択肢）を含める

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `[T] extends [never]` パターン: ユニオン型の分配を防ぎつつ `never` を判定する方法
- Mapped Type の値をインデックスアクセスで取り出すとユニオン型になる

### つまずいたポイント

### 参考リンク

- [#531 String to Union](https://github.com/type-challenges/type-challenges/blob/main/questions/00531-medium-string-to-union/README.ja.md)

---
*Generated at 2026-01-03 19:38:43*
