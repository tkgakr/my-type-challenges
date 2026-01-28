# Challenge #18220 - filter

**難易度**: medium  
**実施日**: 2026-01-28  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/18220-medium-filter)

## 解法

### アプローチ

配列`T`の各要素を順に走査し、述語型`P`に一致する要素のみを抽出して新しい配列型を構築する。

#### 解法1: スプレッド構文による結果構築

```typescript
type Filter<T extends any[], P> =
  T extends [infer First, ...infer Rest]
    ? First extends P
      ? [First, ...Filter<Rest, P>]
      : Filter<Rest, P>
    : []
```

再帰の戻り値に対してスプレッド構文で要素を追加していく方式。

#### 解法2: アキュムレータパターン

```typescript
type Filter2<T extends any[], P, Result extends any[] = []> =
  T extends [infer First, ...infer Rest]
    ? First extends P
      ? Filter2<Rest, P, [...Result, First]>
      : Filter2<Rest, P, Result>
    : Result
```

第3型パラメータ`Result`に結果を蓄積していく末尾再帰的な方式。

### 再帰コストの比較

**解法1の方が再帰コストが高い。**

#### 理由

- **解法1**: 各再帰呼び出しの戻り値に対して`[First, ...Filter<Rest, P>]`のスプレッド操作を行う。これにより、再帰が深くなるほど**コールスタック上に未解決の型計算が積み上がる**。最終的に最深部から順に解決され、各レベルでスプレッド操作が実行される。
- **解法2**: アキュムレータに結果を蓄積しながら再帰するため、**末尾再帰最適化（TCO）の恩恵を受けやすい**構造。TypeScriptの型システムは完全なTCOをサポートしているわけではないが、この形式は再帰の各ステップで中間結果が確定しており、スタックの消費が抑えられる。

#### 具体例（配列`[1, 2, 3]`でフィルタ条件にすべて一致する場合）

| 解法 | 展開過程 |
|------|----------|
| 解法1 | `[1, ...[2, ...[3, ...[]]]]` → 内側から順に解決 |
| 解法2 | `Filter2<[2,3], P, [1]>` → `Filter2<[3], P, [1,2]>` → `Filter2<[], P, [1,2,3]>` → `[1,2,3]` |

解法1は再帰の深さ分だけ遅延評価が発生するのに対し、解法2は各ステップで結果が確定する。

### 実装のポイント

- `infer`を使った配列の先頭要素と残りの分解パターン
- 条件型による要素のフィルタリング
- 空配列`[]`を終端条件として使用

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 型レベルの再帰でもアキュムレータパターンを使うことで効率的な実装が可能
- スプレッド構文を戻り値に使う方式は直感的だが、再帰が深い場合にコストが高くなる
- TypeScriptの型再帰制限（デフォルトで約50回程度）を考慮すると、アキュムレータパターンの方が安全

### つまずいたポイント

- 両解法とも機能的には同等だが、パフォーマンス特性が異なる点の理解

### 参考リンク

特になし

---
*Generated at 2026-01-28 21:04:02*
