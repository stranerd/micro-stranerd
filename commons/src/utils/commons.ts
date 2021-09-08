import crypto from 'crypto'

export const getRandomValue = (length = 12) => crypto.randomBytes(length).toString('hex')