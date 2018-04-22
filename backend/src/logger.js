import bunyan from 'bunyan'

const logLevel = process.env.LOG_LEVEL || bunyan.DEBUG

const logger = bunyan.createLogger({
  name: 'backend',
  serializers: bunyan.defaultSerializers,
  level: logLevel,
})

const muteLogger = (l) => { l.level(bunyan.FATAL + 1) }
if (process.env.NODE_ENV === 'test') {
  muteLogger(logger)
}

export default logger
