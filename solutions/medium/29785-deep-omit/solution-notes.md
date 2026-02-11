# Challenge #29785 - deep-omit

**難易度**: medium  
**実施日**: 2026-02-11  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/29785-medium-deep-omit)

## 解法

### アプローチ

ドット区切りのパス文字列（例: `"person.age.value"`）で指定されたネストされたプロパティを再帰的に除去する。

- **解法1**: Conditional Type でドット区切りの有無を先にチェックし、ドットがあれば Mapped Type で再帰、なければ `Omit<T, U>` で直接除去する。
- **解法2**: Key Remapping (`as` 句) を使い、トップレベルキーの除去と子要素への再帰を一つの Mapped Type 内にまとめる。

### 実装のポイント

- Template Literal Types で `U` を `${Parent}.${Child}` に分解し、親キーの特定と子パスの抽出を行う。
- 解法1 では、ドット区切りがない場合に組み込みの `Omit<T, U>` を利用してシンプルに除去する。
- 解法2 では、`[K in keyof T as K extends U ? never : K]` の Key Remapping により、Conditional Type の分岐なしでトップレベルのプロパティ除去を実現する。
- どちらも再帰呼び出しで `T[K]` に対して `Child` を渡すことで、任意の深さのネストに対応する。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [x] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [x] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- Key Remapping (`as` 句) を使うと、プロパティの除去（フィルタリング）と値の変換を一つの Mapped Type で同時に行える。
- Template Literal Types の `infer` でドット区切り文字列を `Parent` と `Child` に分解するパターンは、パス指定系のユーティリティ型で汎用的に使える。
- 解法1（条件分岐先行）と解法2（Key Remapping）は同じ結果を得られるが、構造の組み立て方が異なる。

### つまずいたポイント

特になし

### 参考リンク

- [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
- [#3 Omit](https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.ja.md)

---
*Generated at 2026-02-11 11:15:15*
