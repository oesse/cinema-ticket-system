export default function withSeatNumbers(seatsInARow) {
  const seats = []

  let currentNumber = 1
  for (const seatType of seatsInARow) {
    if (seatType === ' ') {
      seats.push({ type: seatType })
    } else {
      seats.push({ number: currentNumber, type: seatType })
      currentNumber += 1
    }
  }

  return seats
}
