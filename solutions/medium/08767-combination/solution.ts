/*
 * 8767 - combination
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// All は、タプルの各要素をユニオンに変換したもの
type Combination<T extends string[], All = T[number], Items = All> = 
  // 各要素を分配(ユニオンなのか分配後の要素なのかをわかりやすくするため、infer Item で名称をわける)
  Items extends infer Item extends string
    // テンプレートリテラルの中の変数がユニオンになる場合、結果文字列もユニオンになる
    // 例['A', 'B', 'C'] の場合
    /* A の分配
       'A' | `A ${Combination<[], 'B' | 'C'>}`
     → 'A' | 'A B' | `A B ${Combination<[], 'C'>}` | 'A C' | `A C ${Combination<[], 'B'>}`
     → 'A' | 'A B' | 'A B C'                       | 'A C' | 'A C B'
    */
    /* B の分配
       'B' | `B ${Combination<[], 'A' | 'C'>}`
     → 'B' | 'B A' | `B A ${Combination<[], 'C'>}` | 'B C' | `B C ${Combination<[], 'A'>}`
     → 'B' | 'B A' | 'B A C'                       | 'B C' | 'B C A'
    */
    /* C の分配
       'C' | `C ${Combination<[], 'A' | 'B'>}`
     → 'C' | 'C A' | `C A ${Combination<[], 'B'>}` | 'C B' | `C B ${Combination<[], 'A'>}`
     → 'C' | 'C A' | 'C A B'                       | 'C B' | 'C B A'
    */
    // 再帰処理においては ユニオンを使用するため、T はもう使わない
    ? Item | `${Item} ${Combination<[], Exclude<All, Item>>}`
    // 要素がなくなったら再帰終了
    // `${Item} ${never}` は never になり、文字列を返さない
    : never
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>, 'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
  Expect<Equal<Combination<['apple', 'banana', 'cherry']>, 'apple' | 'banana' | 'cherry' |
  'apple banana' | 'apple cherry' | 'banana apple' | 'banana cherry' | 'cherry apple' | 'cherry banana' |
  'apple banana cherry' | 'apple cherry banana' | 'banana apple cherry' | 'banana cherry apple' | 'cherry apple banana' | 'cherry banana apple'>>,
  Expect<Equal<Combination<['red', 'green', 'blue', 'yellow']>, 'red' | 'green' | 'blue' | 'yellow' |
  'red green' | 'red blue' | 'red yellow' | 'green red' | 'green blue' | 'green yellow' | 'blue red' | 'blue green' | 'blue yellow' | 'yellow red' | 'yellow green' | 'yellow blue' |
  'red green blue' | 'red green yellow' | 'red blue green' | 'red blue yellow' | 'red yellow green' | 'red yellow blue' |
  'green red blue' | 'green red yellow' | 'green blue red' | 'green blue yellow' | 'green yellow red' | 'green yellow blue' |
  'blue red green' | 'blue red yellow' | 'blue green red' | 'blue green yellow' | 'blue yellow red' | 'blue yellow green' |
  'yellow red green' | 'yellow red blue' | 'yellow green red' | 'yellow green blue' | 'yellow blue red' | 'yellow blue green' |
  'red green blue yellow' | 'red green yellow blue' | 'red blue green yellow' | 'red blue yellow green' | 'red yellow green blue' | 'red yellow blue green' |
  'green red blue yellow' | 'green red yellow blue' | 'green blue red yellow' | 'green blue yellow red' | 'green yellow red blue' | 'green yellow blue red' |
  'blue red green yellow' | 'blue red yellow green' | 'blue green red yellow' | 'blue green yellow red' | 'blue yellow red green' | 'blue yellow green red' |
  'yellow red green blue' | 'yellow red blue green' | 'yellow green red blue' | 'yellow green blue red' | 'yellow blue red green' | 'yellow blue green red'>>
  ,
  Expect<Equal<Combination<['one', 'two']>, 'one' | 'two' |
  'one two' | 'two one'>>,
  // 追加テスト
  Expect<Equal<Combination<['one']>, 'one'>>,
  Expect<Equal<Combination<[]>, never>>,
]
