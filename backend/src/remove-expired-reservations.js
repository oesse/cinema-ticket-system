import { isExpired, now as getNow } from './time'

export default function removeExpiredReservations(
  reservations,
  timeLimitInMinutes,
  now = getNow(),
) {
  const filteredEntries = Object.entries(reservations)
    .filter(([, value]) => isExpired(value.date, timeLimitInMinutes, now))

  // Keep reference when nothing is filtered out
  if (filteredEntries.length === Object.keys(reservations).length) {
    return reservations
  }
  return filteredEntries
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {})
}
