/*
 * 9142 - checkrepeatedchars
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: アキュムレータを使用して、1度調べた文字が再びでてくるかをチェックするアプローチ
// 2回目の文字の登場で true を返す
type CheckRepeatedChars<T extends string, A extends string = never> =
  // 最初の文字と残りの文字列に分割
  T extends `${infer First}${infer Rest}`
    // アキュムレータ内に一致する文字があるかチェック
    ? First extends A
      // 一致する文字があったら true
      ? true
      // 一致する文字がなかったら、アキュムレータに今調べた文字を追加して再帰
      : CheckRepeatedChars<Rest, A | First>
    // 全ての文字が1度しかでてこなかったら false
    : false

// 解法2: infer による推論を2段階で行い、最初の文字が残りの文字列の中に存在するかをチェックするアプローチ
// 重複する文字が最初にでた段階で true になるので、再帰回数はこちらのほうが少ない
type CheckRepeatedChars2<T extends string> =
  // 最初の文字と残りの文字列に分割
  T extends `${infer First}${infer Rest}`
    // 最初の文字が残りの文字列に登場するかをチェック
    ? Rest extends `${string}${First}${string}`
      // 一致する文字があったら true
      ? true
      // 一致する文字がなかったら、残りの文字に対して再帰
      : CheckRepeatedChars2<Rest>
    // 全ての文字が1度しかでてこなかったら false
    : false

  /* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]

type cases2 = [
  Expect<Equal<CheckRepeatedChars2<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars2<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars2<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars2<''>, false>>,
]
