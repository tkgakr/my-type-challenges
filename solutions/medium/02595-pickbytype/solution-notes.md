# Challenge #2595 - pickbytype

**難易度**: medium  
**実施日**: 2025-12-22  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02595-medium-pickbytype)

## 解法

### アプローチ
- `keyof T` を走査する mapped type を作り、各プロパティの値型が `U` に代入可能かどうかでキーを残すか捨てるかを判定する。
- キーのフィルタは key remapping (`as`) を使い、条件に合わないキーは `never` に落として除外する。

### 実装のポイント
- `T[P] extends U ? P : never` でキーを切り替える。
- mapped type の `as` は「キー名を変える」だけでなく「条件付きで除外する」にも使える点が重要。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと
- `as` を使った key remapping は、条件分岐で `never` を返すことでキーのフィルタに使える。

### つまずいたポイント

- プロパティをフィルタするための方法として、`as` が使えることを忘れていた。

### 参考リンク
- [TypeScript Handbook - Mapped Types / Key Remapping via `as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)

---
*Generated at 2025-12-22 12:40:30*
