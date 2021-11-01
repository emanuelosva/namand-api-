import { conditionally } from './contiditonal.utils'

describe('conditionally', () => {
  test('some', () => {
    const isIronman = (isHim: boolean) => isHim
    const fly = () => 'I can fly'
    const walk = () => 'I walk'

    const getMovement = conditionally({
      if: isIronman,
      then: fly,
      else: walk,
    })

    expect(getMovement(true)).toEqual(fly())
    expect(getMovement(false)).toEqual(walk())
  })
})
