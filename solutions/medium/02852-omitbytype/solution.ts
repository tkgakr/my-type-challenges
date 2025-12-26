/*
 * 2852 - omitbytype
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type OmitByType<T, U> = any

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string, count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number, isReadonly: boolean, isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string, isReadonly: boolean, isEnable: boolean }>>,
]
