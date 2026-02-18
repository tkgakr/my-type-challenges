# Challenge #35045 - longest-common-prefix

**難易度**: medium
**実施日**: 2026-02-18

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/35045-medium-longest-common-prefix)

## 解法

### アプローチ

アキュムレータ `P`（共通プレフィックス）を引数に持たせ、再帰的に1文字ずつ共通プレフィックスを伸ばしていく。

1. タプル `T` を `[First, ...Rest]` に分解する
2. `First` が `` `${P}${infer C}${string}` `` にマッチするか確認し、`P` の次の文字 `C` を推論する
3. `Rest` の全要素が `` `${P}${C}${string}` `` で始まるか確認する
4. 全要素が一致していれば `P` に `C` を追記して再帰し、一致しなければ現在の `P` を返す

### 実装のポイント

- テンプレートリテラル型 `` `${P}${infer C}${string}` `` で「`P` に続く1文字 `C`」を推論できる
- `` Rest extends `${P}${C}${string}`[] `` の分岐で残り全要素を一括チェックできる
- 再帰の引数に `T` をそのまま渡すことで、毎回全要素を先頭の文字から照合し続ける（解法1）
- 解法2では `` T extends [`${P}${infer C}${string}`, ...infer Rest] `` とまとめることで、`First` の型絞り込みと `Rest` の抽出を1ステップで行えるリファクタリングが可能

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

- テンプレートリテラル型の `infer` で「特定のプレフィックスの直後の1文字」を取り出せる
- `string[]` に対して `` extends `...`[] `` の形で全要素を一括チェックできる
- アキュムレータパターンと再帰を組み合わせることで、文字列を1文字ずつ蓄積していける

### つまずいたポイント

- タプルをユニオンに変換して、各要素をチェックしようとしたがうまく行かなかった。
- テンプレートリテラル型の配列でマッチングさせることで解決

### 参考リンク

---
*Generated at 2026-02-18 22:23:37*
