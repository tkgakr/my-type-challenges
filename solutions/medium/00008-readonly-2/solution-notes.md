# Challenge #8 - readonly-2

**難易度**: medium  
**実施日**: 2025-11-23  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00008-medium-readonly-2)

## 解法

### アプローチ

- `K` が指定されない場合は `keyof T` を既定値にして全プロパティを対象にする。
- `K` と それ以外のプロパティをそれぞれの Mapped Type とすることで役割を分離した。
- `{ readonly [P in K]: T[P] }` で対象プロパティのみを読み取り専用化し、`{ [P in keyof T as P extends K ? never : P]: T[P] }` でそれ以外を元の修飾子のまま維持する。
- 交差型（Intersection Type）で分離した型を再び組み合わせた。

### 実装のポイント

- `K extends keyof T = keyof T` でジェネリックパラメータにデフォルトを設定し、`K` 省略時も型安全に扱う。
- `readonly [P in K]` で対象プロパティのみ修飾し、readonly 修飾子の適用範囲を限定。
- `as P extends K ? never : P` によるキー再マッピングで `K` 以外のキーだけを残し、既存の修飾子 (optional など) を変えずに引き継ぐ。
- 2 つの型を `&` で交差させ、部分的に readonly を付与した結果を合成する。

## 使用した型機能

- [ ] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと

- ジェネリクスにデフォルト型を設定する方法
- 交差型で型を組み合わせる方法

### つまずいたポイント

- `K` が指定されていない場合に、全てのプロパティを対象にするやり方として、デフォルト型が使える点
- `K` 以外のプロパティに対して、もとのreadonly修飾子を引き継いで適用する方法
- `&` を使って、2つの型を組み合わせる方法(交差型（Intersection Type）)

### 参考リンク

[TypeScript: Documentation - Generics (Generic Parameter Defaults)](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-parameter-defaults)

[TypeScript: Documentation - Object Types (Intersection Types)](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)

[インターセクション型 (intersection type) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/intersection)

---
*Generated at 2025-11-23 11:13:49*
