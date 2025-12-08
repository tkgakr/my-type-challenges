# Challenge #298 - length-of-string

**難易度**: medium  
**実施日**: 2025-12-08  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00298-medium-length-of-string)

## 解法

### アプローチ

TypeScriptの型システムでは数値を直接インクリメントできないため、**配列の長さ（`T['length']`）を利用してカウント**するテクニックを使用。

1. Template Literal Types で文字列を先頭1文字と残りに分解
2. 分解した文字を配列に追加しながら再帰呼び出し
3. 文字列が空になったら配列の長さを返す

### 実装のポイント

- **アキュムレータパターン**: 第2型引数 `T extends string[] = []` で処理済みの文字を蓄積
- **Template Literal Types によるパターンマッチ**: `` S extends `${infer F}${infer R}` `` で先頭1文字(F)と残り(R)を抽出
- **再帰の終了条件**: 空文字列 `''` は `` `${infer F}${infer R}` `` にマッチしないため、自然に再帰が終了

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

- 型レベルで数値をカウントするには配列の `length` プロパティを利用する
- Template Literal Types は空文字列に対してパターンマッチが失敗する（再帰の終了条件として利用可能）
- スプレッド構文 `[...T, F]` は型レベルでも配列への要素追加として機能する

### つまずいたポイント

- 型レベルでのカウント方法（配列の長さを使うアイデア）

### 参考リンク

- [TypeScript Handbook - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- [TypeScript 3.0 - Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#optional-elements-in-tuple-types) - タプル型の `length` プロパティがリテラル型として取得できることの説明
- [インデックスアクセス型 (indexed access types) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/indexed-access-types)

---
*Generated at 2025-12-08 22:32:29*
