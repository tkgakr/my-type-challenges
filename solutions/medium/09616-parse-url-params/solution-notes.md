# Challenge #9616 - parse-url-params

**難易度**: medium  
**実施日**: 2026-01-20  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/09616-medium-parse-url-params)

## 解法

### アプローチ

テンプレートリテラル型で `:` が含まれるか判定し、右側（パラメータ候補）を取り出す。取り出した部分に `/` があれば、`/` までをパラメータとして切り出し、残りを再帰的に解析する。`/` が無ければ最後のパラメータとしてそのまま返す。`:` が存在しない場合は `never` で終了する。

### 実装のポイント

- `T extends ${infer Left}:${infer Right}` の形でパラメータ開始位置を検出する（`Left` は使わないが判定に必要）。
- `Right` に `/` が含まれる場合は、`P | ParseUrlParams` の形で残りを再帰し union を作る。
- `/` が無い場合は `Right` をそのまま返し、末尾パラメータを表現する。
- `:` が無い場合に `never` を返すことで、パラメータが無いケースを明示する。

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

特になし

### つまずいたポイント

この問題における「URL Params」の定義がよくわからなかったため、テストを基準に実装した。

### 参考リンク

特になし

---
*Generated at 2026-01-20 20:36:49*
