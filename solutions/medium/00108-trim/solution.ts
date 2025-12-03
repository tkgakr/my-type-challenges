/*
 * 108 - trim
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 改行とタブ文字も空白とする
type Space = ' ' | '\n' | '\t'
// 右端からスペースを1文字ずつ再帰的に取り除く
type Trim<S extends string> = S extends `${infer R}${Space}`
  ? Trim<R>
  // 右側のスペースが取り除き終わったら、左端からスペースを1文字ずつ再帰的に取り除く
  : S extends `${Space}${infer R}`
    ? Trim<R>
    : S

// 別解: 右端と左端の「どちらかに(あるいは両方)」にスペースがある条件をユニオン型で表現
type Trim2<S extends string> = S extends `${infer R}${Space}` | `${Space}${infer R}`
  // 左右どちらかにスペースがあれば1文字取り除き、再帰する
  ? Trim2<R>
  : S


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

type cases2 = [
  Expect<Equal<Trim2<'str'>, 'str'>>,
  Expect<Equal<Trim2<' str'>, 'str'>>,
  Expect<Equal<Trim2<'     str'>, 'str'>>,
  Expect<Equal<Trim2<'str   '>, 'str'>>,
  Expect<Equal<Trim2<'     str     '>, 'str'>>,
  Expect<Equal<Trim2<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim2<''>, ''>>,
  Expect<Equal<Trim2<' \n\t '>, ''>>,
]
