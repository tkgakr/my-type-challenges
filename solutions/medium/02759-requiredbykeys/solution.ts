/*
 * 2759 - requiredbykeys
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 交差型を単一オブジェクトに変換する型関数
type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}
// K で構成された Required なオブジェクトと、K以外で構成されたオブジェクトとで交差型を作成して合成する
type RequiredByKeys<T, K extends keyof T = keyof T> = IntersectionToObj<
  Required<Pick<T, K>>
  &
  Omit<T, K>
>

// 解法2 : インラインでの実装
type RequiredByKeys2<T, K extends keyof T = keyof T> = IntersectionToObj<
  {[P in K]-?: T[P]}
  &
  {[P in keyof T as P extends K ? never: P]: T[P]}
>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
]

type cases2 = [
  Expect<Equal<RequiredByKeys2<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys2<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys2<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys2<User, 'name' | 'unknown'>, UserRequiredName>>,
]
