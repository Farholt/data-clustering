/**
 *
 * @param a blog a
 * @param b blog b
 * @param totalWords
 */
const pearson = (a: any, b: any) => {
  let sumA: number = 0,
    sumB: number = 0,
    sumAsq: number = 0,
    sumBsq: number = 0,
    pSum: number = 0,
    cntA: number,
    cntB: number

  const n = 706

  for (let i = 0; i < n; i++) {
    cntA = a.wordCount[i]
    cntB = b.wordCount[i]
    sumA += cntA
    sumB += cntB
    sumAsq += cntA ** 2
    sumBsq += cntB ** 2
    pSum += cntA * cntB
  }

  const num = pSum - (sumA * sumB) / n
  const den = Math.sqrt((sumAsq - sumA ** 2 / n) * (sumBsq - sumB ** 2 / n))

  return 1 - num / den
}

export default pearson
