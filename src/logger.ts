import pino from "pino";
import { RCTPM_DEBUG } from "./config";

export const logger = pino({
  level: RCTPM_DEBUG ? 'debug' : 'info',
  prettyPrint: {
    ignore: 'pid,hostname,time',
  }
})
