function isExpired(date, timeLimitInMinutes, now) {
  return date.plusMinutes(timeLimitInMinutes).compareTo(now) > 0
}

export default function removeExpiredReservations(reservations, timeLimitInMinutes, now) {
  return Object.entries(reservations)
    .filter(([, value]) => isExpired(value.date, timeLimitInMinutes, now))
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {})
}
