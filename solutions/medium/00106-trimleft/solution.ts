/*
 * 106 - trimleft
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// テストを見ると、改行もタブ文字も空白に含める
type Space = ' ' | '\n' | '\t'
// テンプレートリテラル型とinfer で 条件に当てはめる(とれる文字は1文字)
// 再帰的に、左側の空白がなくなるまで続ける
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R> //スペースを1文字取り除いた残りの文字列に対して、再帰処理
  : S // 左側にスペースがなければそのまま返す

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]
