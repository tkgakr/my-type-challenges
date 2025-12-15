/*
 * 949 - anyof
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// JavaScript における 偽値 をユニオン型で定義
// NaN は「型ではない」となり定義不可
// `document.all` は「名前空間が見つかりません」となり定義不可
// JavaScript において、本来 `{}` も `[]` も Truthyなのだが、問題文とテストに従いこれらも追加
// なお、単純に `{}` をFalsy に定義してしまうと、全てのオブジェクトが Falsy となってしまうため、
// `{[key: string]: never}` と定義することで、空のオブジェクトのみを Falsy とする
type Falsy = null | undefined | false | 0 | -0 | 0n | '' | [] | {[key: string]: never}

// 解法1: 配列を再帰的に展開して、要素が Falsy かどうかを判定
type AnyOf<T extends readonly any[]> =
  T extends [infer F, ...infer R]
    ? F extends Falsy
      ? AnyOf<R>
      : true
    : false

// 別解: 配列をインデックスアクセス型 T[number] でユニオン型に展開し、
// そのユニオン型全体が Falsy のサブタイプかどうかを判定
// ユニオン型の中に Falsy でない型がひとつでもあれば、全体として Falsy のサブタイプではなくなるため true となる
// なお、分配条件型（Distributive Conditional Types）は裸の型パラメータにのみ適用されるため、`T[number]`には発生しない
type AnyOf2 <T extends readonly any[]> =
  T[number] extends Falsy ? false : true

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

type cases2 = [
  Expect<Equal<AnyOf2<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf2<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf2<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf2<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf2<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf2<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf2<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf2<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf2<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf2<[]>, false>>,
]
