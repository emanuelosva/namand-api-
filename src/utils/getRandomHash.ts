import { nanoid } from 'nanoid'

export const getRandomeHash = (size = 21) => nanoid(size)
