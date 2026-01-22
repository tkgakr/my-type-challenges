/*
 * 9898 - Appear only once
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// タプルTから要素Uの出現回数を数える
type CountOccurrences<T extends any[], U, A extends any[] = []> =
  T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true
      ? CountOccurrences<Rest, U,[...A, 1]>
      : CountOccurrences<Rest, U, A>
    : A['length']

type FindEles<T extends any[], U extends any[] = T, Result extends any[] = []> =
  U extends [infer First, ...infer Rest]
    // First が1度しかでていなくても以下はマッチしてしまう
    // ? T extends [...infer L, First, ...infer M, First , ...infer R]
    // タプル内の First がユニークかチェック 
    ? CountOccurrences<T, First> extends 1
      // ユニークならばアキュムレータに退避し、残りを再帰
      ? FindEles<T, Rest, [...Result, First]>
      // (ここは0にならないので2以上)重複しているならばアキュムレータはそのまま残りを再帰
      : FindEles<T, Rest, Result>
    // 要素がなくなったらアキュムレータを返す
    : Result

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<FindEles<[1, 2, number]>, [1, 2, number]>>,
  Expect<Equal<FindEles<[1, 2, number, number]>, [1, 2]>>,
  // ヘルパーのテスト
  Expect<Equal<CountOccurrences<['a', 'b', 'b'], 'a'>, 1>>,
  Expect<Equal<CountOccurrences<['a', 'b', 'b'], 'b'>, 2>>,
]

