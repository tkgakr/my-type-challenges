# Challenge #110 - capitalize

**難易度**: medium  
**実施日**: 2025-12-04  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/00110-medium-capitalize)

## 解法

### アプローチ

文字列の先頭1文字を大文字に変換する。3つの解法を実装した。

#### 解法1: 力技（条件分岐の列挙）

```typescript
type MyCapitalize<S extends string> =
  S extends `a${infer R}` ? `A${R}` :
  S extends `b${infer R}` ? `B${R}` :
  // ... 26文字分の条件分岐
  S
```

テンプレートリテラル型と `infer` を使い、a-z の各文字に対して個別に条件分岐を記述する。

#### 解法2: 組み込み `Uppercase` 型の利用

```typescript
type MyCapitalize2<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S
```

TypeScript 組み込みの `Uppercase<StringType>` を使用したシンプルな解法。

#### 解法3: `infer extends` 構文 + マッピングテーブル

```typescript
interface ToUpperCase {
  a: "A"; b: "B"; /* ... */ z: "Z"
}
type LowerCase = keyof ToUpperCase
type MyCapitalize3<S extends string> = S extends `${infer F extends LowerCase}${infer R}` ? `${ToUpperCase[F]}${R}` : S
```

TypeScript 4.7以降の `infer extends` 構文を使用。先頭文字を推論しつつ `LowerCase` に制約をかけることで、マッピングテーブルから大文字を取得できる。

### 実装のポイント

- **テンプレートリテラル型での文字列分解**: `` `${infer F}${infer R}` `` で先頭1文字 `F` と残り `R` に分解
- **空文字列の処理**: パターンマッチしない場合は `S` をそのまま返す
- **`infer extends` の利点**: 推論と型制約を同時に行うことで、マッピングテーブルのキーとして安全に使用可能

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- TypeScript の Template Literal Types における組み込みの `Uppercase<StringType>` の利用方法
- TypeScript 4.7以降の `infer extends` 構文で、推論と型制約を同時に行える
- `keyof` でインターフェースのキーをユニオン型として取得し、型制約に利用できる

### つまずいたポイント

組み込みの `Uppercase<StringType>` の存在をしらずに、力技で1文字ずつ変換する実装をしてしまった

### 参考リンク

- [TypeScript: Documentation - Template Literal Types : `Uppercase<StringType>`](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)
- [TypeScript 4.7 - `infer` extends Constraints](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#extends-constraints-on-infer-type-variables)

---
*Generated at 2025-12-04 21:48:04*
