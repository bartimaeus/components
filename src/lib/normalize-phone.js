export default function normalizePhone(value) {
  if (!value) return null
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) return onlyNums
  if (onlyNums.length <= 7)
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3)}`
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`
}
