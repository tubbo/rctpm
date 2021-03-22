import pino from "pino";
import { DEBUG } from "./config";

export const logger = pino({
  level: DEBUG ? 'debug' : 'info',
  prettyPrint: {
    ignore: 'pid,hostname,time',
  }
})
