function isExpired(date, timeLimitInMinutes, now) {
  return date.plusMinutes(timeLimitInMinutes).compareTo(now) > 0
}

export default function removeExpiredReservations(reservations, timeLimitInMinutes, now) {
  const filteredEntries = Object.entries(reservations)
    .filter(([, value]) => isExpired(value.date, timeLimitInMinutes, now))

  // Keep reference when nothing is filtered out
  if (filteredEntries.length === Object.keys(reservations).length) {
    return reservations
  }
  return filteredEntries
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {})
}
