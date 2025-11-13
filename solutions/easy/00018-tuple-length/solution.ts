/*
 * 18 - tuple-length
 * Difficulty: easy
 * 
 * タプルTを受け取り、そのタプルの長さを返す型Length<T>を実装します。
 * 
 */

/* _____________ Your Code Here _____________ */
// extends でジェネリクス T に タプルの制約をつける
// プロパティアクセスをすることで、タプルの長さを取得する
type Length<T extends readonly any[]> = T['length']

// NG解: ジェネリクス T の制約をプロパティ length を含むオブジェクトとする
// → Length<'hello world'> は length プロパティはもつもののタプルでない
// type Length<T extends { length: number }> = T['length']


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

// 問題文の例
type tesla2 = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX2 = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla2>  // expected 4
type spaceXLength = Length<spaceX2> // expected 5
