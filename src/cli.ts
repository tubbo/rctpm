#!/usr/bin/env node

import rctpm from "./";
import yargs from "yargs";
import { mkdirSync } from "fs";
import pkg from "../package.json";
import { logger } from "./logger";

try {
  const { argv } = yargs
    .scriptName("rctpm")
    .usage("The OpenRCT2 Plugin Manager\nUsage: rctpm COMMAND [OPTIONS]")
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
      "init",
      "Initialize RCTPM in your home directory",
      () => {},
      () => {
        rctpm.init();
        logger.info("Initialized config directory.")
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
    .help();

  logger.debug(argv)
} catch (error) {
  logger.error(error.message)
  if (logger.level === 'debug') console.error(error)
}
