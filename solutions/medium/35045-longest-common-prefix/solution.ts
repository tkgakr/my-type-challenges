/*
 * 35045 - longest-common-prefix
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type LongestCommonPrefix<T extends string[], P extends string = ''> =
  // タプルを最初の要素と残りにわける
  T extends [infer First, ...infer Rest]
    // 最初の要素から P の次にくる文字を推論
    ? First extends `${P}${infer C}${string}`
      // 残りの要素が ${P}${C} で始まるかチェック
      ? Rest extends `${P}${C}${string}`[]
        // 共通の文字CをPに追加して再帰
        ? LongestCommonPrefix<T, `${P}${C}`>
        : P  // 一致するのP部分まで
      : P  // C の推論に失敗 → 最初の要素が P で終わる（P より長く続かない）
    : P  // Tが空配列

// 解法2: 解法1のリファクタリング
type LongestCommonPrefix2<T extends string[], P extends string = ''> =
  // タプルを最初の要素と残りにわける
  T extends [`${P}${infer C}${string}`, ...infer Rest]
      // 残りの要素が ${P}${C} で始まるかチェック
      ? Rest extends `${P}${C}${string}`[]
        ? LongestCommonPrefix2<T, `${P}${C}`>
        : P  // 一致するのP部分まで
      : P  // Tがから配列、または C の推論に失敗 → 最初の要素が P で終わる（P より長く続かない）

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LongestCommonPrefix<['flower', 'flow', 'flight']>, 'fl'>>,
  Expect<Equal<LongestCommonPrefix<['dog', 'racecar', 'race']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', '', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', '', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', 'a', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', '', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', 'a', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', '', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['', 'a', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix<['a', 'a', 'a']>, 'a'>>,
  Expect<Equal<LongestCommonPrefix<['abc', 'abcd', 'abcde']>, 'abc'>>,
  Expect<Equal<LongestCommonPrefix<[' ', ' ', ' ']>, ' '>>,
  Expect<Equal<LongestCommonPrefix<['type-challenges', 'type-hero', 'typescript']>, 'type'>>,
]

type cases2 = [
  Expect<Equal<LongestCommonPrefix2<['flower', 'flow', 'flight']>, 'fl'>>,
  Expect<Equal<LongestCommonPrefix2<['dog', 'racecar', 'race']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['', '', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['a', '', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['', 'a', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['', '', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['a', 'a', '']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['a', '', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['', 'a', 'a']>, ''>>,
  Expect<Equal<LongestCommonPrefix2<['a', 'a', 'a']>, 'a'>>,
  Expect<Equal<LongestCommonPrefix2<['abc', 'abcd', 'abcde']>, 'abc'>>,
  Expect<Equal<LongestCommonPrefix2<[' ', ' ', ' ']>, ' '>>,
  Expect<Equal<LongestCommonPrefix2<['type-challenges', 'type-hero', 'typescript']>, 'type'>>,
]
