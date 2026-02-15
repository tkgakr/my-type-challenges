/*
 * 30970 - shitariteraru
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type IsNever<T> =
  [T] extends [never]
    ? true
    : false

type IsUnion<T, B = T> =
  T extends B
    ? [B] extends [T]
      ? false
      : true
    : never

/**
 * 文字列型 S を1文字ずつ再帰的に走査し、各文字が確定した（単一の）リテラル文字であるかを検証する。
 *
 * - 空文字列に到達 → 全文字が確定済みなので true を返す。
 * - `${infer C}${infer T}` で1文字ずつ推論し、`'0' | '1' extends C` で C が広い型かを判定する。
 *   - C が単一リテラル（例: '0', 'A'）→ ユニオン全体('0'|'1')は代入不可 → false → 次の文字へ再帰
 *   - C が string 等の広い型（`${number}` や `${string}` 由来）→ '0'|'1' は代入可能 → true → false を返す
 *   ポイント: `'0' | '1' extends C` は「ユニオン全体が C に代入可能か」を判定する。
 *   C='0' のとき '1' は '0' に代入できないため false となり、誤判定しない。
 * - テンプレートリテラルにマッチしない場合（S が string そのもの等）→ false を返す。
 *
 * 注意: boolean を含むテンプレートリテラル（`${boolean}`）は TypeScript が
 * 'true' | 'false' のユニオンに展開するため、IsFixedChars に到達する前に
 * IsUnion で検出される。
 */
type IsFixedChars<S> =
  S extends ''
    ? true
    : S extends `${infer C}${infer T}`
      ? '0' | '1' extends C
        ? false
        : IsFixedChars<T>
      : false;

/**
 * 文字列型 S が「確定した文字列リテラル型」かを判定する。
 * 3段階のチェックで非確定な型を除外する:
 *   1. IsNever: never 型を除外
 *   2. IsUnion: 文字列リテラルのユニオン（'A'|'B' や `${boolean}` → 'true'|'false'）を除外
 *   3. IsFixedChars: 各文字が確定したリテラルか検証（string/number/bigint 埋め込みを検出）
 */
type IsFixedStringLiteralType<S extends string> =
  IsNever<S> extends true ? false:
  IsUnion<S> extends true ? false:
  IsFixedChars<S> extends true ? true : false

/**
 * 解法2: Record と Equal を使ったアプローチ。再帰なしで判定できる。
 *
 * ステップ1: `{} extends Record<S, 1>` — never と非確定な文字列型の除外
 *   Record<S, 1> は S の各値をキーとするオブジェクト型を生成する。
 *   - S = never → Record<never, 1> = {} → {} extends {} は true → false を返す（never 除外）
 *   - S = string → Record<string, 1> = { [k: string]: 1 } → {} はインデックスシグネチャに適合 → true → false
 *   - S = `${number}` → Record<`${number}`, 1> も同様にインデックスシグネチャ的に扱われ → true → false
 *   - S = 'ABC' → Record<'ABC', 1> = { ABC: 1 } → {} に ABC プロパティがない → false → 次のステップへ
 *   - S = 'A' | 'B' → Record<'A' | 'B', 1> = { A: 1, B: 1 } → {} に A, B がない → false → 次のステップへ
 *   つまり、キーが有限集合になるS（単一・ユニオン両方）だけがステップ2に進む。
 *
 * ステップ2: `Equal<[S], S extends unknown ? [S] : never>` — ユニオンの除外
 *   S extends unknown は Conditional Types の分配を発動させる。
 *   - S = 'ABC' → [S] = ['ABC'], 分配結果 = ['ABC'] → Equal → true
 *   - S = 'A' | 'B' → [S] = ['A' | 'B'], 分配結果 = ['A'] | ['B'] → Equal → false
 *   [S] でタプルに包むことで、左辺は分配されず、右辺だけ分配される比較になる。
 */
type IsFixedStringLiteralType2<S extends string> =
  {} extends Record<S, 1> ? false:
  Equal<[S], S extends unknown ? [S] : never>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type testcase =
  | Expect<Equal<IsFixedStringLiteralType<'0'>, true>>
  | Expect<Equal<IsFixedStringLiteralType<'ABC'>, true>>
  | Expect<Equal<IsFixedStringLiteralType<string>, false>>
  | Expect<Equal<IsFixedStringLiteralType<'ABC' | 'DEF'>, false>>
  | Expect<Equal<IsFixedStringLiteralType<never>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${string}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${string & {}}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${number}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${bigint}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${boolean}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${true}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${false}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${null}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${undefined}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string & {}}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${number}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${bigint}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${boolean}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${true}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${false}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${null}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${undefined}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${string}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${string & {}}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${number}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${bigint}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${boolean}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`${true}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${false}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${null}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`${undefined}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${string & {}}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${number}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${bigint}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${boolean}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${true}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${false}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${null}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType<`ABC${undefined}DEF`>, true>>
  | true

  type testcase2 =
  | Expect<Equal<IsFixedStringLiteralType2<'0'>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<'ABC'>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<string>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<'ABC' | 'DEF'>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<never>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${string}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${string & {}}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${number}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${bigint}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${boolean}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${true}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`${false}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`${null}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`${undefined}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${string}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${string & {}}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${number}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${bigint}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${boolean}`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${true}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${false}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${null}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${undefined}`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`${string}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${string & {}}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${number}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${bigint}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${boolean}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`${true}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`${false}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`${null}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`${undefined}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${string}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${string & {}}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${number}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${bigint}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${boolean}DEF`>, false>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${true}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${false}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${null}DEF`>, true>>
  | Expect<Equal<IsFixedStringLiteralType2<`ABC${undefined}DEF`>, true>>
  | true
