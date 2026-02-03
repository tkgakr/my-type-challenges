# Challenge #26401 - json-schema-to-typescript

**難易度**: medium  
**実施日**: 2026-02-03  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/26401-medium-json-schema-to-typescript)

## 解法

### アプローチ

JSON Schemaの`type`フィールドに基づいて、TypeScriptの型に変換する。主に以下の3つのケースを処理：

1. **プリミティブ型** (`string`, `number`, `boolean`) - `enum`がある場合はユニオン型に
2. **オブジェクト型** - `properties`と`required`を考慮してマップ
3. **配列型** - `items`があれば要素の型を再帰的に解決

### 実装のポイント

1. **`Primitives`マッピング型**: JSON Schemaの型名をTypeScriptの型にマッピング

   ```typescript
   type Primitives = {
     string: string;
     number: number;
     boolean: boolean;
   };
   ```

2. **`HandlePrimitives`**: `enum`がある場合は`T['enum'][number]`でユニオン型を生成

3. **`HandleObject`**:
   - `properties`がない場合は`Record<string, unknown>`
   - `required`配列に含まれるキーは必須、それ以外はオプショナル
   - `Omit<..., never>`で交差型を単一のオブジェクト型に整形

4. **`HandleArray`**: `items`があれば再帰的に型を解決し配列化、なければ`unknown[]`

5. **`JSONSchema2TS`**: メインのディスパッチャー。`type`フィールドで分岐

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [x] Union Types
- [x] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `T['enum'][number]`でタプル型からユニオン型を生成できる
- `Omit<A & B, never>`で交差型を見た目上フラットなオブジェクト型に変換できる
- `infer`と`extends`を組み合わせて、存在するプロパティを安全に抽出できる

### つまずいたポイント

- `required`と`properties`の両方を考慮したオブジェクト型の生成が複雑
- 交差型のままだとテストが通らないため、`Omit<..., never>`で整形が必要だった

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at 2026-02-03 21:03:07*
