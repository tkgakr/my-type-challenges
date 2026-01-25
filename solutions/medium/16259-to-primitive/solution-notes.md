# Challenge #16259 - to-primitive

**難易度**: medium  
**実施日**: 2026-01-25  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/16259-medium-to-primitive)

## 解法

### アプローチ

オブジェクト内のリテラル型（`'Tom'`, `30`, `false` など）をプリミティブ型（`string`, `number`, `boolean`）に変換する。

1. **関数型の処理**: 関数は `Function` 型に変換
2. **オブジェクト型の処理**: 各プロパティに再帰的に `ToPrimitive` を適用
3. **プリミティブ型の処理**: `valueOf` メソッドの戻り値型を推論してプリミティブ型を取得

### 実装のポイント

#### 解法1: Function を先にチェック

```typescript
type ToPrimitive<T> =
  T extends Function ? Function
  : T extends object ? { [K in keyof T]: ToPrimitive<T[K]> }
  : T extends { valueOf(): infer P } ? P
  : T
```

- `Function` は `object` のサブタイプなので、先にチェックする必要がある

#### 解法2: object を先にチェック

```typescript
type ToPrimitive2<T> =
  T extends object
    ? (T extends (...args: any[]) => any ? Function : { [K in keyof T]: ToPrimitive2<T[K]> })
    : (T extends { valueOf: () => infer P } ? P : T)
```

- `object` を先にチェックし、その中で関数かどうかを判定

#### valueOf の仕組み

- `valueOf` は JavaScript の `Object.prototype` に定義されているメソッド
- プリミティブラッパー（`String`, `Number`, `Boolean`）はこのメソッドをオーバーライドしてプリミティブ値を返す
- TypeScript ではリテラル型 `'Tom'` も構造的に `{ valueOf: () => string }` を満たす
- これにより `'Tom' → string`, `30 → number`, `false → boolean` のように変換される

#### 配列（タプル）が正しく処理される理由

配列（タプル）も `object` として扱われるため、Mapped Types `{ [K in keyof T]: ToPrimitive<T[K]> }` が適用される。

```typescript
// 例: hobbies: ['sing', 'dance']
type Hobbies = ['sing', 'dance']
// keyof Hobbies = '0' | '1' | 'length' | 'push' | ... (配列のキーとメソッド)
```

ポイント:

- TypeScript の Mapped Types は配列/タプルに対して特別な挙動をする
- `{ [K in keyof T]: ... }` を配列に適用すると、**配列の構造を保持したまま**各要素に変換が適用される
- `['sing', 'dance']` に適用すると `[string, string]` になる（配列のメソッドは変換されない）
- `readonly ['test']` も同様に `readonly [string]` として構造が保持される

これは TypeScript が Mapped Types を配列に適用する際、インデックスシグネチャ（`0`, `1`, ...）のみを変換し、配列としての型構造を維持するためである。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- リテラル型からプリミティブ型への変換に `valueOf` メソッドの戻り値型推論が使える
- TypeScript の構造的型付けにより、リテラル型もプリミティブラッパーのメソッドを持つ型として扱える
- `Function` は `object` のサブタイプなので、条件分岐の順序に注意が必要

### つまずいたポイント

- `Function` と `object` のチェック順序を間違えると、関数が `Function` ではなくオブジェクトとして処理されてしまう
- 配列（タプル）が正しく処理される理由を理解できなかった

### 参考リンク

- [MDN - Object.prototype.valueOf()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
- [MDN - String.prototype.valueOf()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/valueOf)
- [MDN - Number.prototype.valueOf()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/valueOf)
- [MDN - Boolean.prototype.valueOf()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Boolean/valueOf)
- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

---
*Generated at 2026-01-25 15:09:20*
