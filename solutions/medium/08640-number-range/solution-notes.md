# Challenge #8640 - number-range

**難易度**: medium  
**実施日**: 2026-01-15  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/08640-medium-number-range)

## 解法

### アプローチ

- 解法1: アキュムレータに結果のユニオンを蓄積しながら L〜H を走査する。
- 解法2: 0〜H のユニオンから 0〜L のユニオンを除外し、L を加え直す。
- 解法3: L に到達したら Flag を立てて結果をタプルで収集し、最後にユニオンへ変換する。

### 実装のポイント

- 解法1はユニオンをアキュムレータ側でフラットに増やし、入れ子を避ける。
- 解法2は Exclude によって L が消えるため、最後に L を戻す。
- 解法3は Flag で収集開始を制御し、`[...R, H][number]` でタプルをユニオン化する。

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

- 再帰の深さだけでなく、ユニオンの入れ子が評価コストに影響する。
- タプルをユニオン化するには `T[number]` が有効。

### つまずいたポイント

- 再帰が深くなってしまい、140でも TS2589 エラーになった点

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2026-01-15 21:37:14*
