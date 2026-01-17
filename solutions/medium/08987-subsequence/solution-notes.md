# Challenge #8987 - subsequence

**難易度**: medium  
**実施日**: 2026-01-17  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/08987-medium-subsequence)

## 解法

### アプローチ

タプルの部分列（subsequence）を全て列挙するユニオン型を生成する。部分列は元の順序を保持しつつ、任意の要素を選択/非選択できる組み合わせ。

#### 解法1: ボトムアップ型（アキュムレータ使用）

アキュムレータ `Result` にタプルのユニオンを蓄積していく。各要素に対して「既存の全パターンに現在の要素を追加したもの」をユニオンで追加。

```typescript
type Subsequence<T extends any[], Result extends any[] = []> =
  T extends [infer First, ...infer Rest]
    ? Subsequence<Rest, Result | [...Result, First]>
    : Result
```

#### 解法2: トップダウン型（再帰のみ）

各要素について「含める場合」と「含めない場合」の2分岐を再帰的に展開。

```typescript
type Subsequence2<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? [First, ...Subsequence2<Rest>] | Subsequence2<Rest>
    : []
```

### 実装のポイント

- **順序の保持**: Combination と異なり、subsequence は元のタプルの順序を保持する必要がある
- **ユニオン分配**: `[...Result, First]` や `[First, ...Subsequence2<Rest>]` でユニオン型が自動的に分配される
- **空配列の扱い**: 再帰の終端で `[]` を返すことで、空の部分列も結果に含まれる

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- タプルのスプレッド構文 `[...T]` でユニオン型が自動的に分配される
- ボトムアップとトップダウンの2つのアプローチで同じ結果を得られる
- Combination（順序を問わない組み合わせ）と Subsequence（順序を保持する部分列）の違い

### つまずいたポイント

- 最初は Combination と同じアプローチ（`T[number]` でユニオン化）を試みたが、順序が保持されず失敗
- 解決: タプルを先頭から順に処理することで順序を保持

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2026-01-17 17:15:36*
