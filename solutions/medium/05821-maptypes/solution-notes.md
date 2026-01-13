# Challenge #5821 - maptypes

**難易度**: medium  
**実施日**: 2026-01-13  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/05821-medium-maptypes)

## 解法

### アプローチ

Mapped Types を使って各プロパティを走査し、プロパティの型が `R` の `mapFrom` に一致する場合は `mapTo` に変換する。`R` が union の場合に正しく対応するため、conditional type の distributive 特性を利用して `R` の各メンバーを個別に評価する。

### 実装のポイント

1. **ジェネリクス制約**: `R extends { mapFrom: any, mapTo: any }` で `R` が必要なプロパティを持つことを保証
2. **二重の conditional type**:
   - 外側: `T[K] extends R['mapFrom']` で変換対象かどうかを判定
   - 内側: `R extends { mapFrom: T[K] }` で distributive に評価し、`mapFrom` が `T[K]` に一致する `R` のメンバーだけを抽出
3. **union 対応**: 内側の conditional type により、`R` が union でも正しい `mapTo` だけが取り出される

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

### 新しく学んだこと、再確認したこと

- **Distributive Conditional Types**: `T extends U ? X : Y` の形で `T` が union のとき、各メンバーに対して個別に評価される
- `R['mapFrom']` のように Index Access で取得すると union 全体の `mapFrom` の union になるが、`R extends { mapFrom: X }` の形にすると `R` の各メンバーが個別に評価される

### つまずいたポイント

- 最初ジェネリクス `R` の制約について、考慮が漏れており、`R['mapFrom']` の指定でエラーが発生した。
- `T[K] extends R['mapFrom'] ? R['mapTo'] : T[K]` だけでは不十分。`R` が union のとき `R['mapFrom']` も union になり、`T[K]` がそのいずれかに extends すれば true となる。その結果 `R['mapTo']` は union 全体から取得され、本来関係ない `mapTo` まで含まれてしまう。

### 参考リンク

- [TypeScript Handbook - Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

---
*Generated at 2026-01-13 21:57:02*
