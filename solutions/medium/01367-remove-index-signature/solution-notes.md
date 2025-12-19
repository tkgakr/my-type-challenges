# Challenge #1367 - remove-index-signature

**難易度**: medium  
**実施日**: 2025-12-18  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/01367-medium-remove-index-signature)

## 解法

### アプローチ

`keyof T` に含まれるキーから **index signature 由来のキー（`string` / `number` / `symbol`）だけを除外**して、
具体的なプロパティキー（`'foo'` や `0` や `unique symbol`）だけを残す。

- **解法1（推奨・安定）**
  - `PropertyKey = string | number | symbol` を使って、`keyof T` の各 `K` が
    「広いキー型（index signature）」か「具体キー」かを判定し、前者だけを落とす。
- **解法2（テンプレート文字列型のトリック）**
  - `K extends \`\${infer ConcreteKey}\`` で「文字列として表現できる具体キー」だけ残す。
  - ただし `number` や `symbol` が絡むと期待どおりに落としきれないことがあり、今回のテストでは
    `Bar` / `FooBar` が落ちる想定で `@ts-expect-error` を付けた。

### 実装のポイント

- **解法1**
  - `keyof T` は、index signature があると `string | 'foo'` のように **広いキー型 + 具体キー** の union になる。
  - mapped type の key remapping（`as`）で `never` を返したキーは消える。
  - `P = PropertyKey` を条件型に入れることで **分配**が起き、
    `P extends K ? never : ...` が「`K` が `string/number/symbol` のときに落ちやすい」判定として働く。

- **解法2**
  - `K extends \`\${infer ConcreteKey}\`` を使うと、`K` がテンプレート文字列型にマッチした場合のみキーを残せる。
  - `string` の index signature は比較的うまく落とせる一方で、
    `number` の index signature が残ってしまったり、`symbol`（特に `unique symbol`）の具体キーが落ちてしまうなど、
    **型システム上の角ケース**がある。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [x] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `keyof` は「具体キーだけ」ではなく、index signature があると `string/number/symbol` も混ざる。
- mapped type の `as` による key remapping で、`never` に落とすとそのキー自体を消せる。
- `PropertyKey` を条件型に入れると union の **分配**が起き、
  「広いキー型（`string/number/symbol`）」を判定する手段として使える（解法1）。
- テンプレート文字列型のテクニック（解法2）は短く書けるが、
  `number` / `symbol` が絡むと期待どおりにならないケースがある。

### つまずいたポイント

- 「index signature を消す」と言っても、実際には **`keyof` に現れる `string/number/symbol` を落とす**問題だと捉える必要があった。
- 解法2（テンプレート文字列型）が全ケースで通らず、
  `Bar`（`number` index signature）と `FooBar`（`symbol` / `unique symbol`）で挙動が崩れる点の理解に時間がかかった。

### 参考リンク

- [1367 - Remove Index Signature · Issue #14662 · type-challenges/type-challenges](https://github.com/type-challenges/type-challenges/issues/14662)
- [1367 - Remove Index Signature - Template literal alternative · Issue #3542 · type-challenges/type-challenges](https://github.com/type-challenges/type-challenges/issues/3542)

---
*Generated at 2025-12-18 22:12:53*
