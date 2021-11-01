export const mapDayNameWithDayNumber = (dayNumber: number) => {
  const days = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wensday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday',
  }
  return days[dayNumber]
}
