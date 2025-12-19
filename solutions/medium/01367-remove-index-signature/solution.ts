/*
 * 1367 - remove-index-signature
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1:
// issue #14662 の考え方（要点）:
// - `keyof T` には「具体的なプロパティ名」だけでなく、index signature がある場合は
//   `string` / `number` / `symbol` のような“広いキー型”も混ざる
//   例: `{ [key: string]: any; foo(): void }` の `keyof` は `string | 'foo'`
// - mapped type の key remapping（`as`）で、index signature 由来のキーだけを `never` にして落とす
//
// この実装のポイントは、既定引数 `P = PropertyKey (string | number | symbol)` を使って
// **分配条件型**を起こし、キー `K` が index signature かどうかを判定している点。
//
// 判定式:
// - `P extends K ? never : ...`
//   `P` が union なので分配される（`string extends K` / `number extends K` / `symbol extends K` を個別に評価）。
//   `K` が `string` や `number` や `symbol` のときは成立しやすく、ここで `never` にして除外できる。
// - それ以外（`K` が `'foo'` などの具体キー）のときは `P extends K` が成立しないので次へ。
// - `K extends P ? K : never` は「具体キーは PropertyKey に含まれるので残す」ための最終ガード。
type RemoveIndexSignature<T, P=PropertyKey> = {
  [
    K in keyof T
      as P extends K
        ? never
        : K extends P
          ? K
          : never
  ]: T[K]
}

// 解法2:
// issue #3542（Template literal alternative）の方針:
// - key remapping で `K extends \`\${infer ConcreteKey}\`` を使い、
//   **テンプレート文字列型にマッチする（= 文字列として表現できる）具体キー**だけを残す
//
// 直感的には:
// - `'foo'` / `'bar'` / `0` / `'0'` のような「具体的なキー」はマッチして残る
// - `string` / `number` / `symbol` のような「広いキー型」（index signature 由来）は
//   マッチしない（または具体化できない）ため `never` に落ち、結果として除外される
type RemoveIndexSignature2<T> = {
  [
    K in keyof T
      as K extends `${infer ConcreteKey}`
        ? ConcreteKey
        : never
  ]: T[K]
}
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  // Foo: `keyof Foo` は `string | 'foo'`（index signature 由来の `string` が混ざる）
  // - `K = string` は index signature なので除外
  // - `K = 'foo'` は具体キーなので残る
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  // Bar: `keyof Bar` は `number | 'bar' | 0`（index signature 由来の `number` が混ざる）
  // - `K = number` は除外
  // - `K = 'bar' | 0` は具体キーなので残る
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  // FooBar: `keyof FooBar` は `symbol | typeof foobar`（index signature 由来の `symbol` が混ざる）
  // - `K = symbol` は除外
  // - `K = typeof foobar`（unique symbol）は具体キーなので残る
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  // Baz: index signature が無いので `keyof Baz` は `'bar' | 'baz'` のみ（落とすものが無い）
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]

type cases2 = [
  // 解法2（issue #3542）: テンプレート文字列型にマッチする「具体キー」だけ残す。
  // - index signature 由来の `string` / `number` / `symbol` は除外される
  // - その結果、期待値は解法1と同じになる
  Expect<Equal<RemoveIndexSignature2<Foo>, { foo(): void }>>,
  // Bar が（環境によって）失敗する理由:
  // - `keyof Bar` には index signature 由来の `number` が含まれる
  // - 解法2の `K extends \`\${infer ConcreteKey}\`` は `K = number` もマッチしてしまい、
  //   `ConcreteKey` が `string` に推論されやすい（= `number` の index signature を落としきれない）
  // - その結果、`{ bar(): void; 0: string }` だけでなく「何らかの index signature」相当が残り、期待値と合わなくなる
  // @ts-expect-error
  Expect<Equal<RemoveIndexSignature2<Bar>, { bar(): void, 0: string }>>,
  // FooBar が失敗する理由:
  // - 具体キーが `typeof foobar`（unique symbol）だが、symbol はテンプレート文字列型にマッチしない
  // - よって `K = typeof foobar` が `never` に落ち、`[foobar](): void` が消えてしまい期待値と合わなくなる
  // @ts-expect-error
  Expect<Equal<RemoveIndexSignature2<FooBar>, { [foobar](): void }>>,
  // Baz は index signature が無いので、解法2でも基本的にこのケースは通る（`'bar' | 'baz'` がそのまま残る）
  Expect<Equal<RemoveIndexSignature2<Baz>, { bar(): void, baz: string }>>,
]
