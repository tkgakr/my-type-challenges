/*
 * 17973 - deepmutable
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type DeepMutable<T extends object> = {
  // `-` を付けて mapped type modifier を取り除く
  -readonly[K in keyof T]:
    // 関数型も object なので、先にチェック
    T[K] extends Function
      ? T[K]
      // object かチェック
      : T[K] extends object
        // オブジェクトなら再帰
        // (配列もオブジェクトだが、正しく処理される)
        ? DeepMutable<T[K]>
        // オブジェクトでなければ値を返す
        : T[K]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Test1 {
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly meta: {
    readonly author: string
  }
}
type Test2 = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 's'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
interface DeepMutableTest1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type DeepMutableTest2 = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 's'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>,
]

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>,
]
