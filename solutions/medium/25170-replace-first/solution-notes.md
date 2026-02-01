# Challenge #25170 - replace-first

**難易度**: medium  
**実施日**: 2026-02-01  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/25170-medium-replace-first)

## 解法

### アプローチ

配列内で最初にマッチした要素を置換する型を実装する問題。2つのアプローチで解決:

#### 解法1: 再帰スタック方式

- 配列を先頭から順に走査
- 最初にマッチした要素を置換したら再帰を終了
- マッチしない要素は保持しながら再帰を継続

#### 解法2: アキュムレータ方式

- 処理済み要素をアキュムレータに蓄積
- マッチした要素を見つけたら、アキュムレータ + 置換後の要素 + 残りの要素を結合
- より明示的だが、型パラメータが1つ増える

### 実装のポイント

1. **Conditional Typesでの分岐**
   - `T extends [infer First, ...infer Rest]` で配列を分解
   - `First extends S` で要素がマッチするかチェック

2. **再帰の終了条件**
   - マッチした要素を見つけたら `[R, ...Rest]` で置換して終了
   - 配列が空になったら `[]` を返す

3. **型の保持**
   - `readonly unknown[]` で読み取り専用配列にも対応
   - Spread演算子で元の配列構造を保持

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- **再帰スタック vs アキュムレータ**: 同じ問題でも異なるアプローチで解決可能
  - 再帰スタック: シンプルだが、型の展開順序が逆向き
  - アキュムレータ: 順方向の処理で直感的だが、パラメータが増える
- **最初のマッチのみ置換**: 再帰を早期終了することで、最初のマッチのみを処理

### つまずいたポイント

特になし。配列の走査と条件分岐の基本的なパターンで実装できた。

### 参考リンク

- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

---
*Generated at 2026-02-01 15:03:08*
