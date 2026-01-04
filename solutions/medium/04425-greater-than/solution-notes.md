# Challenge #4425 - greater-than

**難易度**: medium  
**実施日**: 2026-01-04  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04425-medium-greater-than)

## 解法

### アプローチ

3つの解法を検討した。

#### 解法1: カウントアップ方式 (`GreaterThan1`)

配列の長さをカウントアップして、先にどちらの数値に到達するかで比較する。

- カウンターが先に T に到達 → T ≤ U → `false`
- カウンターが先に U に到達 → T > U → `true`

**制約**: 配列の長さの上限（再帰深度制限）が T, U の上限になる。

#### 解法2: 桁ごと比較方式 (`GreaterThan2`)

数値を文字列に変換し、最上位桁から順に比較する。

- 上位桁が大きければその時点で `true`
- 上位桁が小さければその時点で `false`
- 同じなら次の桁へ再帰

**前提**: 桁数が同じ場合のみ正しく動作する。

#### 最終解法 (`GreaterThan`)

解法1と解法2を組み合わせる。

1. まず `NumberOfDigits` で桁数を求める
2. 桁数を `GreaterThan1` で比較（桁数は小さいので再帰深度制限に引っかからない）
3. 桁数が同じ場合のみ `GreaterThan2` で桁ごと比較

#### 解法3: カウントダウン方式 (`GreaterThan3`) ※参考

`MinusOne` を使って両方の数値を1ずつ減らし、先に0になった方を判定する。

**問題点**: 再帰回数が数値の大きさに比例するため、大きな数値（1000以上）では TS2589 エラー（再帰深度制限）が発生する。

### 実装のポイント

- **`NumberOfDigits`**: Template Literal Types で文字列化し、1文字ずつ配列に追加して長さを取得
- **`ParseInt`**: `infer Digit extends number` で文字列から数値型を抽出
- **`MinusOne`**: 文字列を反転→最下位桁から繰り下がり処理→反転→先頭ゼロ除去

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `infer Digit extends number` で文字列から直接数値型を推論できる

### つまずいたポイント

- 配列につめていくことで比較していく場合、数がタプルの要素数上限よりも大きい場合にエラーになった点
- カウントダウン方式（解法3）は直感的だが、大きな数値では再帰深度制限（TS2589）に引っかかる

### 参考リンク

[#2257 MinusOne](https://github.com/type-challenges/type-challenges/blob/main/questions/02257-medium-minusone/README.md)

---
*Generated at 2026-01-04 14:33:31*
