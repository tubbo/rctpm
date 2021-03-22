#!/usr/bin/env node

import rctpm from "./";
import yargs from "yargs";
import pkg from "../package.json";
import { logger } from "./logger";
import { RCTPM_OPENRCT2_PATH, RCTPM_CONFIG_PATH } from "./config";

try {
  const { argv } = yargs
    .scriptName("rctpm")
    .usage(`${pkg.description}\n\nUsage: ${pkg.name} COMMAND [OPTIONS]`)
    .command(
      ["install", "$0"],
      "Install OpenRCT2 plugins in manifest",
      () => {},
      () => {
        logger.info("Installing OpenRCT2 plugins...")
        rctpm.install();
        logger.info(`${rctpm.count} plugins installed.`);
      }
    )
    .command(
      "add PLUGIN",
      "Add a new plugin to the manifest",
      (yargs) => {
        yargs.positional("name", {
          type: "string",
          describe: "Name of the plugin",
        });
      },
      ({ PLUGIN }) => {
        if (!PLUGIN) throw new Error('You need to specify a plugin name')
        rctpm.add(PLUGIN as string)
        logger.info(`Installed plugin "${PLUGIN}"`);
      },
    )
    .command(
      "remove PLUGIN",
      "Remove a plugin from the manifest",
      (yargs) => {
        yargs.positional("name", {
          type: "string",
          describe: "Name of the plugin",
        });
      },
      ({ PLUGIN }) => {
        if (!PLUGIN) throw new Error('You need to specify a plugin name')
        rctpm.remove(PLUGIN as string);
        logger.info(`Removed plugin "${PLUGIN}"`);
      }
    )
    .command(
      "list",
      "List all plugins in the manifest",
      () => {},
      () => {
        logger.info("List Installed Plugins:")
        rctpm.forEach((name, version) => logger.info(`${name} (${version})`))
        logger.info(`${rctpm.count} Plugins Installed.`)
      }
    )
    .command(
      "upgrade",
      "Download new plugin versions",
      () => {},
      () => {
        rctpm.upgrade();
        logger.info(`Upgraded ${rctpm.count} plugins.`);
      }
    )
    .version(pkg.version)
    .help()
    .epilogue(`Configuration:\n  $RCTPM_CONFIG_PATH: ${RCTPM_CONFIG_PATH}\n  $RCTPM_OPENRCT2_PATH: ${RCTPM_OPENRCT2_PATH}`)

  logger.debug(argv)
} catch (error) {
  logger.error(error.message)
  if (logger.level === 'debug') console.error(error)
}
