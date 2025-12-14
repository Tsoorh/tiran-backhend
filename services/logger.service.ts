import fs from 'fs'

type logArgs = any[]
type logLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export const loggerService = {
    debug(...args: logArgs) {
        doLog('DEBUG', ...args)
    },
    info(...args: logArgs) {
        doLog('INFO', ...args)
    },
    warn(...args: logArgs) {
        doLog('WARN', ...args)
    },
    error(...args: logArgs) {
        doLog('ERROR', ...args)
    }
}


const logsDir: string = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

//define the time format
function getTime() {
    let now: Date = new Date()
    return now.toLocaleString('he')
}

function isError(e: Error) {
    return e && e.stack && e.message
}

function doLog(level: logLevel, ...args: logArgs) {

    const strs: string[] = args.map(arg =>
        (typeof arg === 'string' || isError(arg)) ? arg : JSON.stringify(arg)
    )
    var line: string = strs.join(' | ')
    line = `${getTime()} - ${level} - ${line}\n`
    console.log(line)
    fs.appendFile('./logs/backend.log', line, (err) => {
        if (err) console.log('FATAL: cannot write to log file')
    })
}

