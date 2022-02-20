import { RCTPM_DEBUG } from "./config";
import chalk from "chalk";

export type Logger = {
  info: (message: any) => void;
  warn: (message: any) => void;
  debug: (message: any) => void;
  success: (message: any) => void;
  error: (error: Error) => void;
  fatal: (error: Error) => void;
};

export const logger: Logger = {
  info: (message) => {
    console.log(message);
  },

  error: (error) => {
    if (RCTPM_DEBUG) console.error(error);

    console.error(chalk.red(error));
  },

  warn: (message) => {
    console.log(chalk.yellow(`[warning]`), message);
  },

  fatal: (error) => {
    console.error(chalk.redBright(error));
  },

  debug: (message) => {
    if (RCTPM_DEBUG) {
      console.log(chalk.cyan(`[debug]`), message);
    }
  },

  success: (message) => {
    console.log(chalk.green(message));
  },
};
