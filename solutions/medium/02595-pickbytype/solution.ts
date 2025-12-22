/*
 * 2595 - pickbytype
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type PickByType<T, U> = {
  // 値型が U に代入可能なプロパティだけを抽出する
  [P in keyof T as T[P] extends U ? P : never] : T[P]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean, isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]
