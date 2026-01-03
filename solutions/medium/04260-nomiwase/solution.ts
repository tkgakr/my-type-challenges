/*
 * 4260 - nomiwase
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 文字列をユニオンに分解
type StringToUnion<S> =
  S extends `${infer F}${infer R}`
    ? F | StringToUnion<R>
    : S

type AllCombinations<S extends string, U extends string = StringToUnion<S>> =
  // U が never かどうかを判定（分配を防ぐために [] で囲む）
  [U] extends [never]
    // 残りの文字がない場合は空文字列を返す
    ? ''
    // Mapped Type を利用して U の各文字を先頭にした全組み合わせを生成し、インデックスアクセスで値を取り出す
    // 例 S = 'AB' の場合 (U = 'A' | 'B')
    // '' | {
    //   A: `A${AllCombinations<never, Exclude<'A' | 'B', 'A'>>}`,  // = `A${AllCombinations<never, 'B'>}` = `A${'' | 'B'}` = 'A' | 'AB'
    //   B: `B${AllCombinations<never, Exclude<'A' | 'B', 'B'>>}`   // = `B${AllCombinations<never, 'A'>}` = `B${'' | 'A'}` = 'B' | 'BA'
    // }['A' | 'B']
    // = '' | 'A' | 'AB' | 'B' | 'BA'
    : '' | {[K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}`}[U];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

type _ = AllCombinations<'AB'>