# Challenge #1097 - isunion

**難易度**: medium  
**実施日**: 2025-12-16  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/01097-medium-isunion)

## 解法

### アプローチ

解法1は「分配条件型 (distributive conditional types)」の性質を利用して、`T` がユニオンかどうかを判定。

条件型 `T extends X ? Y : Z` は、`T` が **裸の型パラメータ** のとき `T` がユニオンだと各要素に分配される（例: `(A | B) extends X ? ...` が `A extends X ? ...` と `B extends X ? ...` の合成になる）。

この分配が起きるケースと起きないケースを意図的に作り、結果が `true` のユニオンになるかどうかで判定。

### 実装のポイント

解法1の実装は `type IsUnion<T, U = T> = ...` の形で、第二型引数 `U` に「元の `T`」を退避。

なお、`string | string` のような重複は TypeScript が正規化して `string` になるため、特別な考慮は不要。

- **`never` の特別扱い**
  - `T` が `never` だと分配条件型の結果が `never` になり、`true/false` 判定が不可能。
  - そのため最初に `[T] extends [never] ? false : ...` で弾く。
- **分配後の `T` と、元の全体 `U` の比較**
  - `T extends U ? ... : ...` と書くことで、`T` がユニオンなら各要素に分配。
  - 分配後の各要素 `T` に対して `[U] extends [T]` を判定。
    - **ユニオンではない場合**: `T` と `U` が同型なので `[U] extends [T]` は `true` となり `false` を返却。
    - **ユニオンの場合**: 例えば `T = A | B` だと、分配で `T = A` と `T = B` が評価される。このとき元の `U = A | B` は `A` にも `B` にも代入できないため `[U] extends [T]` が `false` となり `true` を返却。
- **タプルで包む理由 (`[U] extends [T]`)**
  - タプルで包むことで、ここでは分配を起こさず「全体として」代入可能かを比較可能（`U extends T` のように書くと `U` がユニオンのとき別の分配が混ざって判定が崩れる）。

### 解法2：二重分配による判定

解法2は `T` と `C`（`T` のコピー）の両方で分配条件型を発生させ、「二重ループ」のように全要素を互いに比較する方法。

```typescript
type IsUnionImpl<T, C extends T = T> =
  (T extends T
    ? C extends T
      ? true
      : unknown
    : never
  ) extends true
    ? false
    : true
```

- **二重分配の仕組み**
  - `T extends T` で `T` の各要素に分配（ここの `T` は分配後の各要素）。
  - その内側で `C extends T` を評価。`C` は元の `T` のコピーなので、ここでも分配が発生。
  - 結果として、`C` の全要素 × 分配後の `T` の組み合わせが評価される。
- **単一型の場合**
  - 例: `IsUnion<string>` → `string extends string ? true : unknown` → `true`
  - 結果が `true` なので、`true extends true ? false : true` → `false`
- **ユニオン型の場合**
  - 例: `IsUnion<string | number>` → 外側の `T extends T` で `T=string` と `T=number` に分配。
  - `T=string` のとき、内側の `C extends T` で `C=string|number` が分配:
    - `string extends string` → `true`
    - `number extends string` → `unknown`
  - `T=number` のとき、内側の `C extends T` で `C=string|number` が分配:
    - `string extends number` → `unknown`
    - `number extends number` → `true`
  - 結果は `true | unknown | unknown | true` → `true | unknown` → `unknown`
  - `unknown extends true ? false : true` → `true`
- **`unknown` を使う理由**
  - `true | unknown` は `unknown` に縮約される。
  - `unknown extends true` は `false` なので、ユニオンかどうかを判定可能。
- **`never` の場合**
  - `T` が `never` のとき、`T extends T` の分配結果が `never` になる。
  - `never extends true` は `never` なので、最終的に `never extends true ? false : true` → `true` になるが、これは期待どおり `false` ではない。
  - ただし、実際には `never extends true` は分配条件型として `never` を返すため、結果は `true` ではなく `never` になる。この解法2では `never` のケースでテストが通っているが、実際の返り値は `false` ではなく `never` となる点に注意。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 分配条件型は「チェック側が裸の型パラメータ」のときに発生。
- 分配を止めたいときは `[T] extends [U]` のように **タプルで包む**。
- `never` は分配条件型で結果が `never` になりがちなので、先に明示的に分岐しておくと安定。

### つまずいたポイント

分配条件型の性質を使えば良さそうというところまではよかったが、そこからTが単一要素なのかユニオンなのかの区別をどうつけてよいかがわからなかった。

### 参考リンク

- [1097 - IsUnion #1140](https://github.com/type-challenges/type-challenges/issues/1140) - 解法2の詳細な解説

---
*Generated at 2025-12-16 21:39:58*
