# Challenge #21104 - findall

**難易度**: medium  
**実施日**: 2026-01-29  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/21104-medium-findall)

## 解法

### アプローチ

#### 解法1: 結果用アキュムレータに詰めるアプローチ (`FindAll`)

- 文字列を1文字ずつ処理し、現在位置からパターン `P` で始まるかをチェック
- インデックス追跡用の `Acc` と結果格納用の `Result` の2つのアキュムレータを使用
- 一致した場合は `Acc['length']` を `Result` に追加

#### 解法2: タプル内で再帰をスタックさせるアプローチ (`FindAll2`)

- スプレッド構文 `[...(条件 ? [値] : []), ...再帰]` を使用
- 結果用アキュムレータを省略し、タプルの構築と再帰を同時に行う

### 実装のポイント

1. **空文字パターンの早期リターン**: `P extends ''` で空文字の場合は `[]` を返す
2. **1文字分割と一致判定の順序**: 先に `T extends \`${infer First}${infer Rest}\`` で分割し、その後 `T extends \`${P}${string}\`` で一致判定
3. **インデックス追跡**: `Acc['length']` でタプルの長さを利用してインデックスを取得
4. **オーバーラップ対応**: `'AAAA'` で `'AA'` を検索すると `[0, 1, 2]` を返す（1文字ずつ進むため重複マッチを許容）

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types (`Acc['length']`)
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- タプルの `['length']` プロパティでインデックスを追跡できる
- `T extends \`${P}${string}\`` で文字列が特定のパターンで始まるかを判定できる
- スプレッド構文を使うと、条件付きでタプルに要素を追加しながら再帰できる（解法2）

### つまずいたポイント

- Pが空文字の時の扱い
- 一致判定と、1文字目と残りの分割をどちらを先にするか→1文字分割が先

### 参考リンク

[#298 Length of String](https://github.com/type-challenges/type-challenges/blob/main/questions/00298-medium-length-of-string/README.ja.md)

---
*Generated at 2026-01-29 22:41:50*
