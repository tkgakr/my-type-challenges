/*
 * 4484 - istuple
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type IsTuple<T> =
  // `T=never` のときは、裸で条件型を適用すると never を返してしまうため先にタプルで包んでチェック
  [T] extends [never]
    ? false
    // readonly を条件につけた場合は、ミュータブルな 配列T も代入可能
    : T extends readonly any[]
      // `number`が`T['length']`に代入可能かをチェック（配列なら`T['length']`は`number`型なので代入可能、タプルなら数値リテラル型なので代入不可）
      ? number extends T['length']
        // number であるということは、要素数が可変な配列
        ? false
        // 要素数が固定である場合は数値リテラルになる
        : true
      // 配列でない場合
      : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]
