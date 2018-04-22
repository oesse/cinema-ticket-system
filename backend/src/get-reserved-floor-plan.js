function skipPlaceholders(row, pos) {
  let realPos = 0
  let currentPos = 0
  while (currentPos <= pos) {
    if (row.charAt(realPos) !== ' ') {
      currentPos += 1
    }
    realPos += 1
  }

  return realPos - 1
}


function replaceSeatAt(row, pos, newSeat) {
  const realPos = skipPlaceholders(row, pos)
  return row.substr(0, realPos) + newSeat + row.substr(realPos + 1)
}
function replaceRowAt(floorPlan, rowNumber, newRow) {
  return [...floorPlan.slice(0, rowNumber - 1), newRow, ...floorPlan.slice(rowNumber)]
}

export default function getReservedFloorPlan(floorPlanLayout, reserverations, userId) {
  const reservationKeys = Object.keys(reserverations)

  return reservationKeys.reduce((floorPlan, key) => {
    const { row, number, userId: resUserId } = reserverations[key]
    const reservationSign = userId === resUserId ? 'r' : 'n'
    const newRow = replaceSeatAt(floorPlan[row - 1], number - 1, reservationSign)
    return replaceRowAt(floorPlan, row, newRow)
  }, floorPlanLayout)
}
