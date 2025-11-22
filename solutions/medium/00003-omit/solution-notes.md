# Challenge #3 - omit

**難易度**: medium  
**実施日**: 2025-11-22  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00003-medium-omit)

## 解法

### アプローチ

- まず `Pick<T, K>` との対比で「欲しいプロパティだけ選ぶ」のではなく「不要なキーを除外する」視点に立つ
- mapped type の key remapping (`as`) と条件分岐を組み合わせ、 `keyof T` を一巡しながら除外対象を `never` に写像する
- `K` は `keyof T` に制約し、存在しないキーを指定した場合に型エラーとなるよう `extends` 制約で防御

### 実装のポイント

- `[P in keyof T as ...]` の形で key remapping を活用し、`P extends K ? never : P` という条件により不要キーを排除
- プロパティの型本体は `T[P]` からそのまま再利用することで、readonly や union など元の修飾子を保持
- `K extends keyof T` とすることで `MyOmit<T, 'invalid'>` のような無効キー指定をコンパイル時に検出

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

- key remapping (`[K in keyof T as ...]`) を用いると、プロパティ名を条件付きで書き換えたり削除できる
- remapping 式で `never` を返すと、そのキーは生成されず、事実上の除外になる
- `T[P]` のような Index Access Types を使えば、元の修飾子を崩さずにプロパティ型を再利用できる

### つまずいたポイント

- `P in keyof T` から、対象プロパティを除く方法について

### 参考リンク

[【TypeScript と友達に】Type Challenges を全問解いたのでエッセンスと推し問題を紹介してみる - 前編](https://zenn.dev/kakekakemiya/articles/2d7a3384a5faf0#3%3A-omit)

[TypeScript: Documentation - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)

---
*Generated at 2025-11-22 16:03:34*
