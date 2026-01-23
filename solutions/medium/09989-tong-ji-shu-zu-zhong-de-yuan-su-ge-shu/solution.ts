/*
 * 9989 - Count Element Number To Object
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 先に全体をフラット化して、各重複しない要素の数を数えるアプローチ
// ネストされた配列を展開してフラット化する
type Flatten<T, Result extends any[] = []> = 
  T extends [infer First,...infer Rest]
    // 取り出した最初の要素が never かチェック
    ? [First] extends [never]
      // never の場合は無視して残りを再帰
      ? Flatten<Rest, Result>
      // 配列かをチェック
      : First extends any[]
        // 配列の場合は、Flatten を再起して展開したものをアキュムレータに追加し、残りを再帰
        ? Flatten<Rest,[...Result,...Flatten<First>]>
        // 配列でなければ、そのままアキュムレータに追加して、残りを再帰
        : Flatten<Rest,[...Result,First]>
    // 要素がなくなったらアキュムレータを返す
    :Result 

// フラットな配列に対して、要素をキーに、同じ要素の数を値にもつオブジェクトを生成する
type Count<T, R extends Record<string | number, any[]> = {} > =
  T extends [infer First extends string | number, ...infer Rest ]
    // 取り出した最初の要素が、結果Recordのキーに既に含まれていないかチェック
    ? First extends keyof R
      // 既にあるキーならば、Omitで一度プロパティを取り除いて、Value のタプル要素を1つ加えたものを交差型で付けなおす
      ? Count<Rest, Omit<R, First> & Record<First,[...R[First],1] >>
      // まだないキーならば、要素が1つのタプルをバリューにもつプロパティを追加
      : Count<Rest, R & Record<First,[1]>>
    // Tの要素がなくなったら、Result を展開しなおし、値をタプルの長さに置き換える
    :{
      [K in keyof R] : R[K]['length']
    }


type CountElementNumberToObject<T> =
  // フラット化して、指定のオブジェクトに変換
  Count<Flatten<T>>


// 解法2: フラット化も再帰のなかで行うアプローチ
type CountElementNumberToObject2<T extends any[], R extends Record<PropertyKey, any[]> = {}> =
  T extends [infer First, ...infer Rest]
    ? [First] extends [never]
      ? CountElementNumberToObject2<Rest, R>
      : First extends any[]
        // First が配列ならフラット化して再帰
        ? CountElementNumberToObject2<[...First, ...Rest], R>
        // First が配列以外
        : CountElementNumberToObject2<Rest, {
          [P in keyof R | (First & PropertyKey)]
          // P が もともとあったキー(keyof R)か、それ以外(First & PropertyKey)かをチェック
          : P extends keyof R
            // 既存キー P が現在の First と一致するかをチェック
            ? P extends First
              // Firstが既にRに存在するキーなら、バリューの要素数を1つ増やす
              ? [...R[P], 1]
              : R[P]
            // Rに存在しないキー(初出のFirst)なら、要素が1つのタプルでバリューを初期化
            : [1]
        }>
    : {
      [K in keyof R]: R[K]['length']
    }
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

type cases2 = [
  Expect<Equal<CountElementNumberToObject2<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject2<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject2<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject2<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject2<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject2<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]
