# Challenge #3062 - shift

**難易度**: medium  
**実施日**: 2025-12-27  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/03062-medium-shift)

## 解法

### アプローチ

配列の先頭要素と残りの要素をタプル推論で分解し、残りだけを返す。  
`T extends any[]` で入力が配列であることを先に拘束し、`[infer First, ...infer Rest]` という条件付き型で最初の要素を取り除く。

### 実装のポイント

1. `type Shift<T extends any[]>` のようにジェネリクスに配列制約を与え、不要な呼び出し（例: `Shift<unknown>`）には `@ts-expect-error` で失敗させる。
2. `T extends [infer First, ...infer Rest] ? Rest : []` という条件で、要素が1つ以上ある場合は `Rest` を返し、空配列などでパターンにマッチしない場合は空配列を返す。
3. 返り値型は `Rest` が既にタプル型なのでそのまま返せる。`[...]` で再構築し直す必要はない。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

`infer` を使うとき、配列が空の場合は条件にマッチしないためフォールバックの分岐が必要だと再確認した。今回のように「空配列→空配列」を明示することで推論結果が期待通りになる。

### つまずいたポイント

`Shift<unknown>` をコンパイルエラーにする方法として、`T extends any[]` で配列であることを拘束する方法が思い出せなかった。

### 参考リンク

[#16 Pop](https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.ja.md)

---
*Generated at 2025-12-27 14:52:19*
