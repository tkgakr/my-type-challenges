/*
 * 9 - deep-readonly
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */

// ユニオンでも個別に評価されるよう条件付き型で判定する
// `T extends ... ? ... : ...` という条件付き型の形にした場合、
// T がユニオン型だと構成要素ごとに分配される (distributive conditional types) 
type DeepReadonly<T> = T extends (...args: any[]) => any // (ユニオン型の各要素の対して)関数か？
  ? T //関数はそのまま返す
  : T extends { [k in string]: any } // オブジェクトか？(別解)
    ? { readonly [P in keyof T]: DeepReadonly<T[P]> } // オブジェクトなら再帰的に readonly する
    : T // それ以外はそのまま返す

// 【別解】オブジェクトかどうかの判定に `key of T` で T がプロパティをもつか否かを判定する
type DeepReadonly2<T> = T extends Function // (ユニオン型の各要素の対して)関数か？
  ? T //関数はそのまま返す
  : keyof T extends never // 非オブジェクトか？
    ? T // 非オブジェクトはそのまま返す
    : { readonly [P in keyof T]: DeepReadonly<T[P]> } // オブジェクトなら再帰的に readonly する

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
  Expect<Equal<DeepReadonly2<X1>, Expected1>>,
  Expect<Equal<DeepReadonly2<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
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

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
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

type Expected2 = { readonly a: string } | { readonly b: number }

// 問題文より
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}
// IDEでホバーして確認
type Todo = DeepReadonly<X> // should be same as `Expected`
