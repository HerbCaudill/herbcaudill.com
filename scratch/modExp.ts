/**
 * Modular exponentiation uses the rule of modular multiplication, which states that
 *
 *   AB % C = (A%C)(B%C) % C
 *
 * ### Example
 *
 * Find 5^117 % 19
 *
 * First we decompose the exponent into a sum of powers of 2:
 *
 *   117
 *   = 1110101 in binary
 *   = 1(2^0) + 0(2^1) + 1(2^2) + 0(2^3) + 1(2^4) + 1(2^5) + 1(2^6)
 *   = 2^0 + 2^2 + 2^4 + 2^5 + 2^6
 *   = 1 + 4 + 16 + 32 + 64
 *
 * So we can substitute the exponent 117 for that sum:
 *
 *   5^117 % 19
 *   = 5^(1 + 4 + 16 + 32 + 64) % 19
 *
 * using the fact that `a^(b+c) = a^b * a^c`:
 *
 *   = (5^1 * 5^4 * 5^16 * 5^32 * 5^64) % 19
 *   = (5^1 % 19)(5^4 % 19)(5^16 % 19)(5^32 % 19)(5^64 % 19) % 19
 *
 * Now we only have exponents that are powers of two. Let's work out all the powers of two
 * sequentially; each result will make it easier to calculate the next.
 *
 *   5^1 % 19
 *   = 5
 *
 *   5^2 % 19
 *   = 5^(1+1) % 19
 *   = (5^1 % 19)(5^1 % 19) % 19
 *   = (5 * 5) % 19
 *   = 6
 *
 *   5^4 % 19
 *   = 5^(2+2) % 19
 *   = (5^2 % 19)(5^2 % 19) % 19 <- here we can substitute the previous result, 5^2 % 19 = 6
 *   = (6 * 6) % 19
 *   = 17
 *
 *   5^8 % 19
 *   = 5^(4+4) % 19
 *   = (5^4 % 19)(5^4 % 19) % 19
 *   = (17 * 17) % 19
 *   = 4
 *
 *   5^16 % 19
 *   = 5^(8+8) % 19
 *   = (5^8 % 19)(5^8 % 19) % 19
 *   = (4 * 4) % 19
 *   = 16
 *
 *   5^32 % 19
 *   = (5^16 % 19)(5^16 % 19) % 19
 *   = (16 * 16) % 19
 *   = 9
 *
 *   5^64 % 19
 *   = (5^32 % 19)(5^32 % 19) % 19
 *   = (9 * 9) % 19
 *   = 5
 *
 * Earlier we said that
 *
 *   5^117 % 19
 *   = (5^1 % 19)(5^4 % 19)(5^16 % 19)(5^32 % 19)(5^64 % 19) % 19
 *
 * Now we can substitute each term for the result we've found above.
 *
 *   = (5 * 17 * 16 * 9 * 5) % 19
 *   = 1
 */
export const modExp = (
  base: number | bigint,
  exp: number,
  modulus: number | bigint
): number => {
  const _base = BigInt(base)
  const _modulus = BigInt(modulus)
  // going through the exponent's binary digits from right to left,  we'll successively multiply
  // this accumulator by each term (only if this power of 2 is included in the binary expansion of
  // the exponent, i.e. if the binary digit we're on is 1). In our example with `exp=117`:
  //   117
  //   = 1110101 in binary
  //   = 2^0 + 2^2 + 2^4 + 2^5 + 2^6
  //   = 1 + 4 + 16 + 32 + 64
  // so we're including the terms corresponding to these powers of 2: 0, 2, 4, 5, 6
  // but not for these powers of 2: 1, 3
  let acc = 1n

  // this will hold each term of the expansion, e.g. (5^1 % 19), (5^2 % 19), (5^3 % 19), etc.
  let term = _base % _modulus

  // loop through while dividing the exponent by 2 each time (2 because binary expansion) until there's nothing left
  do {
    const binaryDigit = exp & 1 // value of the rightmost bit, 0 or 1 (same as `exp % 2`)
    if (binaryDigit) acc *= term
    term = (term * term) % _modulus // use this term to calculate the next, i.e. moving on to the next power of 2: (5^2 % 19), (5^3 % 19), etc.
    exp = exp >> 1 // shift the exponent to the right (same as `Math.trunc(exp/2)`) so we can see what the next binary digit is
  } while (exp > 0)
  return Number(acc % _modulus)
}

const test = (a: number, b: number, c: number) => {
  const result = modExp(a, b, c)
  const expected = Number(BigInt(a) ** BigInt(b) % BigInt(c))

  const symbol = result === expected ? '✅' : '❌'
  const actualMsg = result !== expected ? `(got ${result})` : ''
  console.log(`${symbol} ${a}^${b} % ${c} = ${expected} ${actualMsg}`)
}

console.clear()
test(5, 117, 19)
test(99, 3, 5)
test(545, 503, 943)
test(16234234234234, 5, 2341)
test(16234234234234, 6666, 2341)
// to run:
// cd scratch
// ts-node modExp.ts
