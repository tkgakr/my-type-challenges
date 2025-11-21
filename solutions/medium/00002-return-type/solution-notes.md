# Challenge #2 - return-type

**難易度**: medium  
**実施日**: 2025-11-21  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00002-medium-return-type)

## 解法

### アプローチ

1. 型引数 `T` を受け取る Conditional Type を用意し、`T` が関数型かどうかを判定する。
2. 関数型であれば `infer R` を戻り値に適用し、推論した `R` をそのまま返す。
3. 関数型でなければ `never` を返して「戻り値を取り出せない」ケースを表現する。

### 実装のポイント

- `(...args: any) => infer R` というパターンを使い、引数の詳細には依存せず戻り値だけを抽出。
- Conditional Type の偽側で `never` を返すことで、非関数型に対して安全な失敗を表現。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと

特になし。easy の Parameters と考え方は同じだった。

なお、組み込みの [ReturnType](https://github.com/microsoft/TypeScript/blob/60e99ecee46767e9f37e6f60dd48b71cd45c099a/src/lib/es5.d.ts#L1632) の実装は以下

```ts
type ReturnType<T extends (...args: any) => any> =
 T extends (...args: any) => infer R ? R : any;
```

### つまずいたポイント

関数型を Conditional Types で判定する方法を思い出すこと

### 参考リンク

[TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)  
[ReturnType | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/utility-types/return-type)

[deepwiki (ReturnType)](https://deepwiki.com/search/-returntypet_90f24955-cf19-4f56-b01d-fbcf3aca405b?mode=fast)

---
*Generated at 2025-11-21 21:46:19*
