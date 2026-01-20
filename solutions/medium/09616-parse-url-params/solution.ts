/*
 * 9616 - parse-url-params
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type ParseUrlParams<T> =
  // パラメータを示す `:` があるかチェック
  T extends `${infer Left}:${infer Right}`
    // パラメータの区切り文字 `/` があるかチェック
    ? Right extends `${infer P}/${infer Rest}`
      // `/` までの文字列を切り出して、残りを再帰
      ? P | ParseUrlParams<Rest>
      // 区切り文字がなければ、最後のパラメータ
      : Right
    // `:` がなければ再帰終了
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]
