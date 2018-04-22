import { LocalDateTime, Instant } from 'js-joda'

export function now() {
  return LocalDateTime.ofInstant(Instant.now()).toString()
}

export function isExpired(date, timeLimitInMinutes, nowValue) {
  return LocalDateTime.parse(date)
    .plusMinutes(timeLimitInMinutes)
    .compareTo(LocalDateTime.parse(nowValue)) > 0
}
