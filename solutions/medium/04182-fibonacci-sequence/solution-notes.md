# Challenge #4182 - fibonacci-sequence

**難易度**: medium  
**実施日**: 2026-01-02  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/04182-medium-fibonacci-sequence)

## 解法

### アプローチ

タプルの要素数（`length`）を利用して加算を実現する。

- TypeScriptの型レベルには直接的な数値演算がないため、タプルの長さを数値として扱う
- フィボナッチ数列の漸化式 `F(n) = F(n-1) + F(n-2)` を、タプルのスプレッド構文 `[...Prev, ...Current]` で表現

### 実装のポイント

1. **3つの状態を保持**: 現在のインデックス（1始まり）、ひとつ前の値、現在の値
2. **初期値**: `CurrentIndex = [1]`, `Prev = []`, `Current = [1]` で F(1) = 1 を表現
3. **終了条件**: `CurrentIndex['length'] extends T` でインデックスが目標に到達したかチェック
4. **再帰処理**: インデックスをインクリメントしながら、`Prev` と `Current` を更新
5. **制約**: タプルの長さの上限を超える値は計算できない

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- タプルの `length` プロパティを使って型レベルで数値を表現できる
- スプレッド構文 `[...A, ...B]` でタプルを結合することで、型レベルの加算を実現できる
- 再帰型で状態を引き回すことで、ループ処理を表現できる

### つまずいたポイント

- 型で加算する方法がない中でどうやって実現するか

### 参考リンク

- [TypeScript: Documentation - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---
*Generated at 2026-01-02 14:30:45*
