# Challenge #2257 - minusone

**難易度**: medium  
**実施日**: 2025-12-21  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/02257-medium-minusone)

## 解法

### アプローチ

数値を **テンプレートリテラル型で文字列化**し、各桁を操作して 1 を減算、最後に `ParseInt` で数値リテラルへ戻す。

#### 解法1: 末尾桁をパターンマッチで処理

- 末尾が `1`〜`9` の場合は単純に 1 減らした文字列を作成
- 末尾が `0` の場合は繰り下げが必要なので、上位桁を再帰的に `MinusOne` してから末尾を `9` にする

#### 解法2: 文字列反転で下位桁から処理（issue #13507）

- 文字列を反転して「先頭」から繰り下げ処理を行う
- `InternalMinusOne` が反転済み文字列の先頭桁を 1 減らし、`0` なら `9` にして次桁へ繰り下げ
- 処理後に再度反転し、先頭の `0` を除去してから `ParseInt`

### 実装のポイント

- **`ParseInt<T>`**: 文字列を数値リテラルに変換するヘルパー型
  - TypeScript 4.8+ の `infer Digit extends number` を利用
  - 先頭に `0` があると `number` に widen してしまうため、再帰的に除去
  - 空文字 `''` は `0` として扱う（繰り下げで `L` が空になるケース対応）
- **繰り下げ処理**: 末尾が `0` のとき、上位桁を `MinusOne` して末尾を `9` に
- **タプルによる減算マップ**: `[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]` で `Digit - 1` を実現

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- `infer Digit extends number` で文字列から数値リテラルを直接推論できる（TS 4.8+）
- 先頭に `0` がある文字列（例: `"09"`）は `number` に widen しやすいため、除去が必要
- タプルのインデックスアクセス `[9, 0, 1, ...][Digit]` で減算マップを表現できる
- 文字列反転により、末尾からの繰り下げ処理を「先頭から」の再帰で実装できる

### つまずいたポイント

テンプレートリテラルでやろうとしたが、2桁以上の数の場合に number で結果を返すことができなかった

### 参考リンク

[2257 - MinusOne (Works up to 9007199254740991 using v4.8.0+) · Issue #13507 · type-challenges/type-challenges](https://github.com/type-challenges/type-challenges/issues/13507)

---
*Generated at 2025-12-21 15:12:31*
