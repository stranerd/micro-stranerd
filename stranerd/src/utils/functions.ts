export const catchDivideByZero = (num: number, den: number) => den === 0 ? 0 : num / den

export const getPercentage = (num: number, den: number) => 100 * (catchDivideByZero(num, den) > 1 ? 1 : catchDivideByZero(num, den))
