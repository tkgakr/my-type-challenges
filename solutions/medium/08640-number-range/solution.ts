/*
 * 8640 - number-range
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// この実装では140 でも再帰の上限を超えてしまった
type NumberRangeNG<L, H, I extends any[] = []> =
  I['length'] extends H
    ? H
    : I['length'] extends L
      // 再帰の戻り値にさらにユニオンを重ねることになる
      // 再帰の段数は O(n) で、解法1 と同じ深さだが、ユニオンの入れ子による評価コストが増える
      ? L | NumberRangeNG<[...I, 1]['length'], H, [...I, 1]>
      // インデックスがLに未達
      : NumberRangeNG<L, H, [...I, 1]>
// 解法1. アキュムレータに結果となるユニオンをつめるアプローチ
type NumberRange<L, H, I extends any[] = [], R = never> =
  I['length'] extends H
    ? R | H
    : I['length'] extends L
      // アキュムレータに結果となるユニオンをつめる
      // ユニオンはアキュムレータ側でフラットに増えるため、入れ子になりにくい
      ? NumberRange<[...I, 1]['length'], H, [...I, 1], R | I['length']>
      // インデックスがLに未達
      : NumberRange<L, H, [...I, 1]>

// 解法2: 0〜H のユニオンから 0〜L のユニオンを取り除き、L をユニオンに加え直すアプローチ
// 0〜T までの数をユニオンにする
type NumberUnionTo<T, I extends any[] = [], R = never> =
  I['length'] extends T
    ? R | T
    : NumberUnionTo<T, [...I, 1], R | I['length']>
type NumberRange2<L, H> =
  // Exclude によってLまでいったん除外されてしまうため、Lを加える
  L | Exclude<NumberUnionTo<H>, NumberUnionTo<L>>


// 解法3. 解法1で、L をスライドさせる代わりに、Flag でResultに加えるタイミングを管理する
// また、Result もいったんタプルで管理して、最終的に Index Access Types で ユニオンに変換
type NumberRange3<L, H, I extends any[] = [], R extends any[] = [], Flag extends boolean = I['length'] extends L ? true : false> =
  Flag extends true
    ? I['length'] extends H
      // タプルをユニオンに変換する
      ? [...R, H][number]
      : NumberRange3<L, H, [...I, 1], [...R, I['length']], true>
    // インデックスがLに未達
    : NumberRange3<L, H, [...I, 1], R, Flag>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Result1 = | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = | 0 | 1 | 2
type Result3 =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60
  | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70
  | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80
  | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90
  | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
  | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110
  | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120
  | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130
  | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140

type cases_ng = [
  Expect<Equal<NumberRangeNG<2, 9>, Result1>>,
  Expect<Equal<NumberRangeNG<0, 2>, Result2>>,
  Expect<Equal<NumberRangeNG<0, 140>, Result3>>,
]

  type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
]

  type cases2 = [
  Expect<Equal<NumberRange2<2, 9>, Result1>>,
  Expect<Equal<NumberRange2<0, 2>, Result2>>,
  Expect<Equal<NumberRange2<0, 140>, Result3>>,
]

  type cases3 = [
  Expect<Equal<NumberRange2<2, 9>, Result1>>,
  Expect<Equal<NumberRange2<0, 2>, Result2>>,
  Expect<Equal<NumberRange2<0, 140>, Result3>>,
]
