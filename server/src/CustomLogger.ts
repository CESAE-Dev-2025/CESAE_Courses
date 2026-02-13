const logDate = () => new Date()
    .toISOString()
    .replace('Z', '')
    .replace('T', ' ')

export const customLogger = (logType: string, message: string, ...rest: string[]) => {
    logType = logType.toUpperCase()
    if (logType === 'ERROR') {
        console.error(`${logDate()} | ${logType}:`, message, ...rest)
    } else {
        console.log(`${logDate()} | ${logType}:`, message, ...rest)
    }
}