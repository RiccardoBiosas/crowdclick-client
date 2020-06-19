export const isWhatPercentage = (x, y) => {
    const percentage = (x * 100) / y;
    const percentageToTwoDecimals = percentage.toFixed(2);
    return percentageToTwoDecimals
}

export const whatIsXPercentOfY = (x, y) => {
    const result = (x / 100) * y
    return result
}