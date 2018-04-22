export default function removeExpiredReservations(reservations, timeLimitInMinutes, now) {
  return Object.entries(reservations)
    .filter(([, value]) => value.date.plusMinutes(timeLimitInMinutes).compareTo(now) > 0)
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {})
}
