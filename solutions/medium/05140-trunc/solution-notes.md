# Challenge #5140 - trunc

**難易度**: medium  
**実施日**: 2026-01-10  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/05140-medium-trunc)

## 解法

### アプローチ

数値/文字列をテンプレートリテラルで文字列化し、`.` を含むかどうかで整数部と小数部に分割する。条件型で「小数部を切り捨てた文字列」を選び出し、整数部のみを返して Math.trunc と同じ挙動を再現する。

### 実装のポイント

1. `` `${T}` extends `${infer I}.${infer D}` `` で小数点の有無を判定しつつ整数部 `I` を抽出する。
2. `I` が空文字または符号のみ（`.3` や `-.3`）の場合は `0` を補って `'0'` / `'-0'` を返す。
3. 小数点がない場合は元の文字列をそのまま返し、整数や整数文字列をそのまま扱う。

## 使用した型機能

- [ ] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [x] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [x] Type Inference (`infer`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- テンプレートリテラル型で符号のみの整数部（`''` / `'-'`）を扱う場合、`infer` の結果が空文字になる点を利用して補正できる。

### つまずいたポイント

- 負の小数で整数部が空になるケースを見落として、0を補完する必要があった点

### 参考リンク

[Math.trunc() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)

---
*Generated at 2026-01-10 18:24:34*
