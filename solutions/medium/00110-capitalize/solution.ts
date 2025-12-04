/*
 * 110 - capitalize
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// テンプレートリテラル型とinfer を使った力技
type MyCapitalize<S extends string> =
  S extends `a${infer R}` ? `A${R}` :
  S extends `b${infer R}` ? `B${R}` :
  S extends `c${infer R}` ? `C${R}` :
  S extends `d${infer R}` ? `D${R}` :
  S extends `e${infer R}` ? `E${R}` :
  S extends `f${infer R}` ? `F${R}` :
  S extends `g${infer R}` ? `G${R}` :
  S extends `h${infer R}` ? `H${R}` :
  S extends `i${infer R}` ? `I${R}` :
  S extends `j${infer R}` ? `J${R}` :
  S extends `k${infer R}` ? `K${R}` :
  S extends `l${infer R}` ? `L${R}` :
  S extends `m${infer R}` ? `M${R}` :
  S extends `n${infer R}` ? `N${R}` :
  S extends `o${infer R}` ? `O${R}` :
  S extends `p${infer R}` ? `P${R}` :
  S extends `q${infer R}` ? `Q${R}` :
  S extends `r${infer R}` ? `R${R}` :
  S extends `s${infer R}` ? `S${R}` :
  S extends `t${infer R}` ? `T${R}` :
  S extends `u${infer R}` ? `U${R}` :
  S extends `v${infer R}` ? `V${R}` :
  S extends `w${infer R}` ? `W${R}` :
  S extends `x${infer R}` ? `X${R}` :
  S extends `y${infer R}` ? `Y${R}` :
  S extends `z${infer R}` ? `Z${R}` :
  S

// 別解 : 組み込みの Uppercase 型を使う
type MyCapitalize2<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S

/**
 * 別解 : TypeScript 4.7以降で有効な「infer extends」構文を使った解法
 *
 * ポイント:
 * 1. ToUpperCase インターフェースで小文字→大文字のマッピングテーブルを定義
 * 2. LowerCase 型で ToUpperCase のキー（小文字 a-z）をユニオン型として取得
 * 3. `infer F extends LowerCase` で先頭文字を推論しつつ、LowerCase に制約
 *    - この制約により F は必ず ToUpperCase のキーとして使える
 *    - 先頭が大文字や数字の場合はマッチしないので S がそのまま返る
 * 4. ToUpperCase[F] でマッピングテーブルから対応する大文字を取得
 */
interface ToUpperCase {
    a: "A"
    b: "B"
    c: "C"
    d: "D"
    e: "E"
    f: "F"
    g: "G"
    h: "H"
    i: "I"
    j: "J"
    k: "K"
    l: "L"
    m: "M"
    n: "N"
    o: "O"
    p: "P"
    q: "Q"
    r: "R"
    s: "S"
    t: "T"
    u: "U"
    v: "V"
    w: "W"
    x: "X"
    y: "Y"
    z: "Z"
}

// ToUpperCase のキーを取得 → "a" | "b" | ... | "z"
type LowerCase = keyof ToUpperCase

// S の先頭文字 F が LowerCase に含まれる場合のみマッチし、大文字に変換
// 例: "foobar" → F="f", R="oobar" → ToUpperCase["f"]="F" → "Foobar"
// 例: "FOOBAR" → 先頭"F"は LowerCase に含まれないのでマッチせず → "FOOBAR"
type MyCapitalize3<S extends string> = S extends `${infer F extends LowerCase}${infer R}` ? `${ToUpperCase[F]}${R}` : S


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]

type cases2 = [
  Expect<Equal<MyCapitalize2<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize2<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize2<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize2<''>, ''>>,
  Expect<Equal<MyCapitalize2<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize2<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize2<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize2<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize2<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize2<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize2<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize2<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize2<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize2<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize2<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize2<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize2<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize2<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize2<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize2<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize2<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize2<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize2<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize2<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize2<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize2<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize2<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize2<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize2<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize2<'z'>, 'Z'>>,
]

type cases3 = [
  Expect<Equal<MyCapitalize3<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize3<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize3<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize3<''>, ''>>,
  Expect<Equal<MyCapitalize3<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize3<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize3<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize3<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize3<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize3<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize3<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize3<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize3<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize3<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize3<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize3<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize3<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize3<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize3<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize3<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize3<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize3<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize3<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize3<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize3<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize3<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize3<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize3<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize3<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize3<'z'>, 'Z'>>,
]
