# Challenge #2852 - omitbytype

**難易度**: medium  
**実施日**: 2025-12-26  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02852-medium-omitbytype)

## 解法

### アプローチ

Mapped Types と Key Remapping を使用して、値の型が指定された型 `U` に代入可能なプロパティを除外する型を作成する。

```typescript
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K] : T[K]
}
```

### 実装のポイント

1. **Mapped Types でプロパティを走査**: `[K in keyof T]` で元の型 `T` の全プロパティを走査
2. **Key Remapping で条件付き除外**: `as T[K] extends U ? never : K` で値の型が `U` に代入可能な場合は `never` を返してプロパティを除外
3. **値の型を保持**: `: T[K]` で元の値の型をそのまま保持

この実装は 2595-PickByType の逆の動作を行う。PickByType では `T[K] extends U ? K : never` として一致するプロパティを選択したが、OmitByType では条件を反転させて一致しないプロパティを選択する。

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

- **Key Remapping の条件反転**: PickByType と OmitByType は条件式の真偽を反転させるだけで実装できる
- **型による絞り込みの応用**: 値の型に基づいてプロパティを選択/除外する汎用的なパターン

### つまずいたポイント

特になし。過去にやった 2595-PickByType の応用。

### 参考リンク

- [TypeScript: Documentation - Mapped Types - Key Remapping via `as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)

---
*Generated at 2025-12-26 18:27:33*
