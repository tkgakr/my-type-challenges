# Challenge #106 - trimleft

**難易度**: medium  
**実施日**: 2025-12-02  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00106-medium-trimleft)

## 解法

### アプローチ

1. 先頭の空白文字（半角スペース/改行/タブ）を `Space` ユニオン型で表現する。
2. `TrimLeft` をジェネリクスで受け取り、``S extends `${Space}${infer R}``` でテンプレートリテラル型と `infer` により先頭 1 文字を切り出す。
3. 条件型で空白が検出された場合のみ再帰的に `TrimLeft<R>` を適用し、空白が無くなったら基底ケースとして残りを返す。

### 実装のポイント

- 空白に含める文字をユニオン型で明示することで、判定を 1 箇所に集約。
- テンプレートリテラル型で「先頭 1 文字 + 残り」を分解し、`infer` で残りを取り出すと実装がシンプル。
- 条件型の再帰呼び出しにより、空白を連続して除去しても処理を共通化できる。

## 使用した型機能

- [ ] Generics
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

- テンプレートリテラル型とinferの組み合わせで、スプレッド構文を使ったタプル分割のように
文字列が分解できること

### つまずいたポイント

- テンプレートリテラル型の型パズルへの応用方法

### 参考リンク

[テンプレートリテラル | TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/future-javascript/template-strings)

---
*Generated at 2025-12-02 23:10:18*
