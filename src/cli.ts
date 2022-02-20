import rctpm from "./";
import yargs from "yargs";
import pkg from "../package.json";
import { logger } from "./logger";
import { RCTPM_OPENRCT2_PATH, RCTPM_CONFIG_PATH } from "./config";
import { PluginCommandArgs } from "./types";
import { PluginNameError } from "./errors";

try {
  const { argv } = yargs
    .scriptName("rctpm")
    .usage(`${pkg.description}\n\nUsage: ${pkg.name} COMMAND [OPTIONS]`)
    .command(
      ["install", "$0"],
      "Install OpenRCT2 plugins in manifest",
      () => {},
      () => {
        logger.info("Installing OpenRCT2 plugins...");
        rctpm.install();
        logger.success(`${rctpm.count} plugins installed.`);
      }
    )
    .command(
      "add PLUGIN",
      "Add a new plugin to the manifest",
      (yargs) => {
        yargs.positional("PLUGIN", {
          type: "string",
          describe: "Name of the plugin",
        });
      },
      ({ PLUGIN }: PluginCommandArgs) => {
        if (!PLUGIN) throw new PluginNameError();
        rctpm.add(PLUGIN);
        logger.info(`Installed plugin "${PLUGIN}"`);
      }
    )
    .command(
      "remove PLUGIN",
      "Remove a plugin from the manifest",
      (yargs) => {
        yargs.positional("PLUGIN", {
          type: "string",
          describe: "Name of the plugin",
        });
      },
      ({ PLUGIN }: PluginCommandArgs) => {
        if (!PLUGIN) throw new PluginNameError();
        rctpm.remove(PLUGIN);
        logger.info(`Removed plugin "${PLUGIN}"`);
      }
    )
    .command(
      "list",
      "List all plugins in the manifest",
      () => {},
      () => {
        logger.info("Installed OpenRCT2 Plugins:\n");
        rctpm.forEach((name, version) =>
          logger.info(`  * ${name} (${version})`)
        );
        logger.info(`\n${rctpm.count} Plugins Installed.`);
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
    .command(
      "outdated",
      "List all outdated plugins",
      () => {},
      () => {
        const { stdout } = rctpm.exec("yarn outdated");
        const packages = stdout.split("\n").slice(4).join("\n");

        logger.info("Outdated Plugins:");
        logger.info(packages);
      }
    )

    .version(pkg.version)
    .help()
    .epilogue(
      `Configuration:\n  $RCTPM_CONFIG_PATH: ${RCTPM_CONFIG_PATH}\n  $RCTPM_OPENRCT2_PATH: ${RCTPM_OPENRCT2_PATH}`
    );

  logger.debug(argv);
} catch (error) {
  logger.error(error);
  process.exit(1);
}
