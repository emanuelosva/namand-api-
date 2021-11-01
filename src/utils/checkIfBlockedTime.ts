import { isEqual, isAfter, isBefore } from 'date-fns'

export type checkIfBlockedTimeInput = {
  startTime: Date | number
  endTime: Date | number
  startRef: Date | number
  endRef: Date | number
}

export const checkIfBlockedTime = ({
  startTime,
  endTime,
  startRef,
  endRef,
}: checkIfBlockedTimeInput) => {
  const startsAreEquals = isEqual(startTime, startRef)
  const endsAreEquals = isEqual(endTime, endRef)

  const refsBetween =
    (startsAreEquals || isAfter(startRef, startTime)) &&
    (endsAreEquals || isBefore(endRef, endTime))
  const startInRefs =
    (startsAreEquals || isAfter(startTime, startRef)) &&
    isBefore(startTime, endRef)
  const endInRefs =
    isAfter(endTime, startRef) && (endsAreEquals || isBefore(endTime, endRef))

  return refsBetween || startInRefs || endInRefs
}
