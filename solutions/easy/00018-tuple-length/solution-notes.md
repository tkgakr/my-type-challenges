# Challenge #18 - tuple-length

**難易度**: easy  
**実施日**: 2025-11-13  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00018-easy-tuple-length)

## 解法

### アプローチ

タプルに限定したジェネリクス `T` に対してインデックスアクセスで `length` プロパティを取得し、そのまま返すだけで長さを求める。

### 実装のポイント

- `T extends readonly any[]` とすることで、`Length<5>` などタプルでない値を弾く。
- タプルの `length` はリテラル型として推論されるため、そのまま戻り値の型として利用できる。

## 使用した型機能

- [x] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

改めてジェネリクスの制約を理解することができた。

### つまずいたポイント

制約に `readonly` を含める必要があった。
TypeScript では readonly [1, 2] は通常の any[] には代入できないため、T extends any[] だけだと readonly なタプルが型制約を満たさず、型推論が失敗する。  
制約に readonly を含めることで、[1, 2] のような可変タプルと readonly [1, 2] のような不変タプルの両方を扱えるようにしている
> TypeScript の構造的型付けでは、[number, number] のような可変タプルも readonly [number, number] の部分型として扱われます。そのため T extends readonly any[] という制約は、「読み取り専用として扱える配列（タプル）であれば可変・不変のどちらでも受け入れる」という意味になります。可変タプルは readonly 版よりも制約が強い（書き込みが可能）ため、より弱い readonly 条件を満たして代入可能になるのです。

### 参考リンク

[型引数の制約 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/generics/type-parameter-constraint#%E5%9E%8B%E5%BC%95%E6%95%B0%E3%81%AB%E5%88%B6%E7%B4%84%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B)

---
*Generated at 2025-11-13 21:51:31*
