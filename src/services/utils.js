export function toNice(number) {
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).replace(/,/g, ', ')
}
