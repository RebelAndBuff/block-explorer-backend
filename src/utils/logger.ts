import dayjs from 'dayjs';
import logger from 'pino';
const log = logger.pino({
  transport: {
    target: 'pino-pretty',
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
