import { modExp } from './modExp'

type PublicKey = { pq: bigint; e: number }
type PrivateKey = { pq: bigint; d: number }
type KeyPair = { privateKey: PrivateKey; publicKey: PublicKey }

const fermatPrimes = [3, 5, 7, 17, 257, 65537].reverse()

const findD = (p: number, q: number, e: number) => {
  // find d such that `d⋅e % phi = 1`
  // this is the secret sauce since it depends on knowing p & q
  const phi = (p - 1) * (q - 1)
  const d = modInv(phi, e)
  return d
}

// extended GCD: returns x, y, d such that
// xa + yb = d, where d = GCD(x, y)
function xgcd(a: number | bigint, b: number | bigint) {
  const _a = BigInt(a)
  const _b = BigInt(b)
  // base case
  if (_b === 0n) return { x: 0n, y: 1n, d: a }
  // recursive case (swap x & y)
  const { x: y, y: x, d } = xgcd(_b, _a % _b)
  return {
    x: x - y * (_a / _b),
    y,
    d,
  }
}

// modular inverse: returns d such that e*d % phi(p, q) = 1
function modInv(a: number | bigint, b: number | bigint) {
  let { x, d } = xgcd(a, b)
  if (x < 0n) x += BigInt(a)
  return Number(x)
}

export const encrypt = (msg: number, key: PublicKey) => {
  const { pq, e } = key
  return modExp(msg, e, pq)
}

export const decrypt = (c: number, key: PrivateKey) => {
  const { pq, d } = key
  console.log('decrypting', { c, d, pq })
  return modExp(c, d, pq)
}

const makeKeys = (p: number, q: number): KeyPair => {
  const pq = BigInt(p) * BigInt(q)
  const phi = BigInt(p - 1) * BigInt(q - 1)
  const e = fermatPrimes.find(f => phi % BigInt(f) !== 0n && f < phi) // find the biggest one that's smaller than and relatively prime to phi
  const d = findD(p, q, e)

  return { privateKey: { pq, d }, publicKey: { pq, e } }
}

function timeToCrack(p: number, q: number, msg: number) {
  const { publicKey } = makeKeys(p, q)

  const c = encrypt(msg, publicKey)

  // now let's try to decrypt by brute force, e.g. find m from
  // we know that m^e % pq = c
  // const strength = Math.round(Math.log2((p + q) / 2))
  // console.log({ e, p, q, strength })

  console.time('time to crack')
  let guess = 0
  let matches = 0
  while (guess !== msg) {
    const c1 = encrypt(guess, publicKey)
    if (c1 === c) matches++
    guess++
  }
  console.timeEnd('time to crack')

  console.log(`${matches} false matches`)
  console.log()
}

console.clear()

function test(p: number, q: number, msg: number) {
  const { publicKey, privateKey } = makeKeys(p, q)
  const { d, pq } = privateKey
  const { e } = publicKey
  const enc = encrypt(msg, publicKey)
  const dec = decrypt(enc, privateKey)
  const symbol = msg === dec ? '✅' : '❌'
  console.log(symbol, { p, q, pq, d, e, msg, enc, dec })
}

test(23, 41, 12)
test(7919, 7907, 12)
test(23833, 57923, 123)
test(23833, 57923, 1234)
test(23833, 57923, 12345)
// test(256493, 343153, 1234567)
// test(1016681, 1152091, 123456789)
test(15385463, 15468097, 1234567890)
