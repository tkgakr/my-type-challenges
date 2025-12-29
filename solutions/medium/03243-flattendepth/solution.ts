/*
 * 3243 - flattendepth
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type ParseInt<T extends string> =
  T extends `${infer Digit extends number}` ? Digit : never
type ReverseString<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : ''
type RemoveLeadingZeros<S extends string> =
  S extends '0' ? S : S extends `${'0'}${infer R}` ? RemoveLeadingZeros<R> : S
type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never
// 数値をマイナス1する関数型
type MinusOne<T extends number> =
  ParseInt<
    RemoveLeadingZeros<
      ReverseString<
        InternalMinusOne<ReverseString<`${T}`>>
      >
    >
  >

// 解法1: 深さを減らして再帰の終了を判定するアプローチ
type FlattenDepth<T extends any[], Depth extends number = 1> =
  // 指定の深さ分処理をしたら再帰終了
  Depth extends 0
    ? T
    // 配列の最初の要素と残りにわける
    : T extends [infer First, ...infer Rest]
      // 最初の要素が配列かを判定
      ? First extends any[]
        // 最初の要素が配列の場合は、残り深度を一つ減らしてフラット化を再帰、残りの要素はフラット化してないので深度そのままにフラット化を再帰
        ? [...FlattenDepth<First, MinusOne<Depth>>, ...FlattenDepth<Rest, Depth>]
        // 最初の要素が配列でなくなったので、残りの要素を深度そのままにフラット化を再帰
        : [First, ...FlattenDepth<Rest, Depth>]
      : T

// 解法2: 処理済みの深さを配列の長さで判定するアプローチ
type FlattenDepth2<T extends any[], Depth extends number = 1, Done extends any[] = []> =
  // 指定の深さ分処理をしたら再帰終了
  Done['length'] extends Depth
    ? T
    // 配列の最初の要素と残りにわける
    : T extends [infer First, ...infer Rest]
      // 最初の要素が配列かを判定
      ? First extends any[]
        // 最初の要素が配列の場合は、処理済み深度を一つ増やしてフラット化を再帰、残りの要素はフラット化してないので処理済み深度そのままにフラット化を再帰
        ? [...FlattenDepth2<First, Depth, [...Done, 1]>, ...FlattenDepth2<Rest, Depth, Done>]
        // 最初の要素が配列でなくなったので、残りの要素を深度そのままにフラット化を再帰
        : [First, ...FlattenDepth2<Rest, Depth, Done>]
      : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { doesNotMatch } from 'assert'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

type cases2 = [
  Expect<Equal<FlattenDepth2<[]>, []>>,
  Expect<Equal<FlattenDepth2<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth2<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth2<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth2<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth2<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth2<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]
