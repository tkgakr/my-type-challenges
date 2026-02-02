# Challenge #25270 - transpose

**難易度**: medium  
**実施日**: 2026-02-02  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/25270-medium-transpose)

## 解法

### アプローチ

行列の転置は、元行列の `M[Y][X]` を結果行列の `[X][Y]` に配置する操作。
Mapped Types を二重にネストして、行と列のインデックスを入れ替える。

### 実装のポイント

1. **列インデックスの取得**: `R = M[0]` で元行列の最初の行を取得し、`keyof R` で列インデックス（0, 1, 2...）を得る
2. **空配列対応**: `M['length'] extends 0 ? [] : M[0]` で空行列の場合は空配列を返す
3. **二重 Mapped Types**: 外側のループで転置後の行（= 元の列）、内側のループで転置後の列（= 元の行）を走査
4. **型安全なアクセス**: `X extends keyof M[Y]` で存在確認してから `M[Y][X]` にアクセス

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- Mapped Types をネストすることで二次元配列の変換が可能
- タプル型に対する `keyof` は数値インデックス（`"0" | "1" | ...`）を返す
- デフォルト型パラメータを使って中間結果を保持できる

### つまずいたポイント

- 配列もオブジェクトとしてMapped Types で扱える発想にいたれなかった
- 空配列のエッジケース処理が必要だった

### 参考リンク

特になし

---
*Generated at 2026-02-02 15:13:25*
