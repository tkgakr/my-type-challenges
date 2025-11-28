# Challenge #15 - last

**難易度**: medium  
**実施日**: 2025-11-28  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00015-medium-last)

## 解法

### アプローチ

#14 First の別解（infer を使った解法）を前後反転させる考え方。

Conditional Types と可変長タプル型（Variadic Tuple Types）を利用して、配列を「最後の要素」と「それ以外」に分解する。

### 実装のポイント

```typescript
type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never
```

- `[...infer _, infer L]` で最後の要素 `L` を抽出
- 空タプルの場合はパターンマッチに失敗し `never` を返す

#### 別解

```typescript
type Last2<T extends any[]> = T extends [infer First, ...infer Rest] ? T[Rest['length']] : never;
```

- 先頭に番兵を差し込んだタプルを用意し、元のタプル長をインデックスとして参照するアイデアの改良版
- `Rest['length']` は元のタプルの最後の要素のインデックスと一致する
- 空タプルの場合は条件分岐で `never` を返す

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- 可変長タプル型（Variadic Tuple Types）を使うと `[...infer _, infer L]` のように配列の前後を柔軟に分解できる
- `infer _` でマッチさせつつ不要な部分を捨てるパターン
- タプルの `['length']` プロパティを利用してインデックスアクセスに活用できる

### つまずいたポイント

- スプレッド構文の扱い
- タプルの最後の要素番号の取得方法

### 参考リンク

[TypeScript: Documentation - TypeScript 4.0 - Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html)

[配列のスプレッド構文「...」(spread syntax) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/array/spread-syntax-for-array)

---
*Generated at 2025-11-28 22:16:39*
