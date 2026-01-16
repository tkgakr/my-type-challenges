# Challenge #8767 - combination

**難易度**: medium  
**実施日**: 2026-01-16  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/08767-medium-combination)

## 解法

### アプローチ

タプルをユニオンに変換した `All = T[number]` を基点に、ユニオン分配を使って各要素を先頭に置いた文字列を再帰的に構築する。`Items` を分配対象として回し、`Item` を除いた残り `Exclude<All, Item>` を次の再帰に渡す。

### 実装のポイント

- `Items extends infer Item extends string` の分配で、各要素ごとに `${Item} ${...}` を生成する。
- `Exclude<All, Item>` により、選択済み要素を除いたユニオンを次のステップに渡す。
- 再帰が `never` になった時点でテンプレートリテラルも `never` になり、自然に終了する。

## 使用した型機能

- [ ] Generics
- [ ] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- テンプレートリテラル内の変数がユニオンの場合、結果の文字列もユニオンに分配される。
- `Exclude` とユニオン分配を組み合わせると、順列的な組み合わせを型で表現できる。

### つまずいたポイント

- ユニオンの分配を使用する発送にいたらずに、`T extends [infer F, ...infer R]` での分割を起点に解こうとしていた

### 参考リンク

- [TypeScript: Documentation - Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---
*Generated at 2026-01-16 21:35:42*
