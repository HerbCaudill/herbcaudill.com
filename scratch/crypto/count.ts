export const count = (exp: number) => {
  let i = 0
  let n = 10 ** exp
  while (i < n) i++
  return i
}

const benchmark = (exp: number) => {
  const start = new Date().getTime()
  count(exp)
  const end = new Date().getTime()
  console.log(`10^${exp}: ${Math.round((end - start) / 100) / 10}s`)
}

benchmark(9) // billion
benchmark(10) // 10 billion
benchmark(11) // 100 billion
benchmark(12) // trillion
