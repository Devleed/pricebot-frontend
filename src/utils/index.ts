export const shortenAddress = (address: string, subStart = 8, subEnd = 8) => {
  return (
    address.substring(0, subStart) +
    '...' +
    address.substring(address.length - subEnd, address.length)
  )
}
