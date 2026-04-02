export function binarySearch(sortedArray: number[], key: number): boolean {
  let start = 0
  let end = sortedArray.length - 1

  while (start <= end) {
    let middle = Math.floor((start + end) / 2)
    const val = sortedArray[middle]
    if (val === key) {
      return true
    }
    if (val < key) {
      start = middle + 1
    } else {
      end = middle - 1
    }
  }
  return false
}


