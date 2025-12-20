/*
 * 2070 - drop-char
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type DropChar<S, C extends string> =
  // テンプレートリテラル型と infer による推定で C の左右の文字列を推定
  S extends `${infer L}${C}${infer R}`
    // C を含む場合は、マッチした C を除き、左側は保持したまま右側の文字列を再帰処理
    ? `${L}${DropChar<R,C>}`
    // C が見つからなければ再帰終了（ただし C が '' の場合は常にマッチして終了しない）
    : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]
