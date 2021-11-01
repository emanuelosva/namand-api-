/* eslint-disable max-len */
import { checkIfBlockedTime } from './checkIfBlockedTime'

describe('checkIfBlockedTime', () => {
  test('Given two ranges without intersection the function must return false', () => {
    // Arrange
    const period = {
      startTime: new Date('2021-06-01T18:00:00'),
      endTime: new Date('2021-06-01T20:00:00'),
    }
    const blockedTime = {
      startRef: new Date('2021-06-01T09:00:00'),
      endRef: new Date('2021-06-01T10:00:00'),
    }

    // Act
    const isBlocked = checkIfBlockedTime({ ...period, ...blockedTime })

    // Asserts
    expect(isBlocked).toEqual(false)
  })
  test('Given two ranges with intersection (start in refs) the function must return true', () => {
    // Arrange
    const period = {
      startTime: new Date('2021-06-01T18:00:00'),
      endTime: new Date('2021-06-01T20:00:00'),
    }
    const blockedTime = {
      startRef: new Date('2021-06-01T17:00:00'),
      endRef: new Date('2021-06-01T19:00:00'),
    }

    // Act
    const isBlocked = checkIfBlockedTime({ ...period, ...blockedTime })

    // Asserts
    expect(isBlocked).toEqual(true)
  })
  test('Given two ranges with intersection (end in refs) the function must return true', () => {
    // Arrange
    const period = {
      startTime: new Date('2021-06-01T18:00:00'),
      endTime: new Date('2021-06-01T20:00:00'),
    }
    const blockedTime = {
      startRef: new Date('2021-06-01T19:00:00'),
      endRef: new Date('2021-06-01T21:00:00'),
    }

    // Act
    const isBlocked = checkIfBlockedTime({ ...period, ...blockedTime })

    // Asserts
    expect(isBlocked).toEqual(true)
  })
  test('Given two ranges with intersection (refs in period) the function must return true', () => {
    // Arrange
    const period = {
      startTime: new Date('2021-06-01T18:00:00'),
      endTime: new Date('2021-06-01T20:00:00'),
    }
    const blockedTime = {
      startRef: new Date('2021-06-01T18:30:00'),
      endRef: new Date('2021-06-01T19:00:00'),
    }

    // Act
    const isBlocked = checkIfBlockedTime({ ...period, ...blockedTime })

    // Asserts
    expect(isBlocked).toEqual(true)
  })
  test('Given two ranges with intersection (refs === period) the function must return true', () => {
    // Arrange
    const period = {
      startTime: new Date('2021-06-01T18:00:00'),
      endTime: new Date('2021-06-01T20:00:00'),
    }
    const blockedTime = {
      startRef: new Date('2021-06-01T18:00:00'),
      endRef: new Date('2021-06-01T20:00:00'),
    }

    // Act
    const isBlocked = checkIfBlockedTime({ ...period, ...blockedTime })

    // Asserts
    expect(isBlocked).toEqual(true)
  })
})
