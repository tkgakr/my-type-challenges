# Challenge #531 - string-to-union

**難易度**: medium  
**実施日**: 2025-12-12  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00531-medium-string-to-union)

## 解法

### アプローチ
テンプレートリテラル型で `T` を先頭文字 `F` と残り `R` に分割し、`R` を再帰的に処理しながら取得した文字をユニオン型として蓄積する。空文字列に到達したら積み上げたユニオンを返すだけなので、実装は再帰と条件分岐の組み合わせで完結する。

### 実装のポイント
- `StringToUnion<T, U = never>` としてアキュムレータ `U` をデフォルト `never` で用意し、`U | F` で順次ユニオンを拡張する。
- `T extends \`${infer F}${infer R}\`` で1文字以上あるかを判定し、再帰呼び出しで残り文字列を処理する。
- 文字列をすべて消費したら `U` を返し、再帰の終端とする。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

特になし、これまでの類似問題の組み合わせ。

### つまずいたポイント

特になし

### 参考リンク

---
*Generated at 2025-12-12 22:36:50*
