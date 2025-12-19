/*
 * 1978 - percentage-parser
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 型レベルの関数を用いて正規表現を模倣
// 記号の有無を判定
type CheckPrefix<T> = T extends '+' | '-' ? T : never;
// 単位の有無を判定
type CheckSuffix<T> =  T extends `${infer P}%` ? [P, '%'] : [T, ''];
type PercentageParser<A extends string> =
  // `${CheckPrefix<infer L>}${infer R}` の `CheckPrefix<...>` は「テンプレートリテラル型の一部として評価される型」
  // 先頭1文字を `infer L` で取り出した上で、それが '+' | '-' のときだけマッチさせる（それ以外は `never` になり不一致）
  A extends `${CheckPrefix<infer L>}${infer R}`
    ? [L, ...CheckSuffix<R>]
    : ['', ...CheckSuffix<A>]

// 解法2: インラインで愚直に書く
type PercentageParser2<A extends string> =
  // `infer S extends ...` で「取り出し」と「制約(=符号)」を同時に書けるので、分岐が直感的になる
  A extends `${infer S extends '+' | '-'}${infer R}`
    ? R extends `${infer N}%`
      ? [S, N, '%']
      : [S, R, '']
    : A extends `${infer N}%`
      ? ['', N, '%']
      : ['', A, '']

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]

type cases2 = [
  Expect<Equal<PercentageParser2<''>, Case0>>,
  Expect<Equal<PercentageParser2<'+'>, Case1>>,
  Expect<Equal<PercentageParser2<'+1'>, Case2>>,
  Expect<Equal<PercentageParser2<'+100'>, Case3>>,
  Expect<Equal<PercentageParser2<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser2<'100%'>, Case5>>,
  Expect<Equal<PercentageParser2<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser2<'-100'>, Case7>>,
  Expect<Equal<PercentageParser2<'-1'>, Case8>>,
  Expect<Equal<PercentageParser2<'%'>, Case9>>,
  Expect<Equal<PercentageParser2<'1'>, Case10>>,
  Expect<Equal<PercentageParser2<'100'>, Case11>>,
]
