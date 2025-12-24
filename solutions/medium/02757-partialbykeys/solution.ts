/*
 * 2757 - partialbykeys
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// Kで構成されたオプショナル項目と、K以外のプロパティとで交差型を作成し合成する
// テストより、K を省略した場合は、Tの全てのプロパティを対象とする
type PartialByKeys<T, K extends keyof T = keyof T> =
  // プロパティを除去しない Omit を通すことで、交差型を1つのオブジェクトに束ねる
  Omit<
    // Kで構成されたPartial型
    Partial<Pick<T, K>>
    &
    // K以外で構成された型
    Omit<T,K>
  , never>


// 解法2 インラインでの実装
// 交差型を単一オブジェクトに変換する型関数
type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}
type PartialByKeys2<T , K extends keyof T = keyof T> = IntersectionToObj<{
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]

type cases2 = [
  Expect<Equal<PartialByKeys2<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys2<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys2<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys2<User, 'name' | 'unknown'>, UserPartialName>>,
]
