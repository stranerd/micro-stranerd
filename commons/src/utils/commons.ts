import crypto from 'crypto'

export const getRandomValue = () => crypto.randomBytes(24).toString('hex')