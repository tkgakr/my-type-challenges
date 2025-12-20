# Challenge #2070 - drop-char

**難易度**: medium  
**実施日**: 2025-12-20  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02070-medium-drop-char)

## 解法

### アプローチ

テンプレートリテラル型で `S` を `${L}${C}${R}` の形に分解できるかを判定し、見つかった `C` を1つ落として再帰する。

`S extends `${infer L}${C}${infer R}`` にマッチした場合は、左側の `L` はそのまま結果に採用し、右側の `R` に対して同じ処理を繰り返すことで、文字列全体から指定文字 `C` を除去。

なお、この実装は `C` が空文字 `''` の場合に常にマッチしてしまい終了しないため、テストでは `@ts-expect-error` でそれを明示している。  
エラーとしないためには、`C` が空文字の場合はそのまま `S` を返して再帰を終了するようになる。

### 実装のポイント

- `S extends `${infer L}${C}${infer R}`` による分解で、`C` の前後をそれぞれ `L`, `R` として取り出す
- マッチしたら `C` 自体は捨てて `${L}${DropChar<R, C>}` とし、`L` を積み上げつつ `R` 側だけ再帰する
- マッチしない（`C` が見つからない）場合は `S` をそのまま返して再帰を終了する

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

特になし。以前に実施した #119 ReplaceAll とほぼ同じアプローチで解けた。

### つまずいたポイント

特になし。

### 参考リンク

[#119 ReplaceAll](https://github.com/type-challenges/type-challenges/blob/main/questions/00119-medium-replaceall/README.ja.md)

---
*Generated at 2025-12-20 09:28:01*
