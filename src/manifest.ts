import path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Package, PackageIterator } from "./types";
import { logger } from "./logger";
import { NotInitializedError, NotFoundError } from "./errors";
import shell from "./shell";

/**
 * Manage installed plugins.
 */
export class Manifest {
  base: string;
  artifact: string;

  constructor(base: string, artifact: string) {
    this.base = base;
    this.artifact = path.join(artifact, "plugin");

    logger.debug(`config dir: ${this.base}`);
    logger.debug(`plugin dir: ${this.artifact}`);
  }

  /**
   * Create the rctpm config dir if it doesn't already exist.
   */
  initialize() {
    if (!existsSync(this.base)) {
      const pkg = {
        private: true,
        dependencies: {},
      };
      const filename = path.join(this.base, 'package.json');
      const source = JSON.stringify(pkg, null, 2);

      shell.mkdir('-p', this.base);
      writeFileSync(filename, source, 'utf-8')
    }
  }

  /**
   * Instantiate a new `Manifest`.
   */
  static parse(base: string, artifact: string) {
    const manifest = new Manifest(base, artifact)

    manifest.initialize()

    return manifest
  }

  /**
   * Execute a command within the rctpm config directory.
   */
  exec(command: string) {
    if (!existsSync(this.base)) throw new NotInitializedError(this.base)

    logger.debug(`running "${command}"`);

    return shell.exec(command, { cwd: this.base });
  }

  /**
   * Package configuration for this user's plugins.
   */
  get config(): Package {
    const source = readFileSync(
      path.join(this.base, "package.json"),
      "utf-8"
    )

    return JSON.parse(source)
  }

  /**
   * Names of all installed packages.
   */
  get packageNames(): string[] {
    return Object.keys(this.config.dependencies ?? {});
  }

  /**
   * Number of installed packages.
   */
  get count(): number {
    return this.packageNames.length;
  }

  /**
   * Add a new plugin to the manifest.
   */
  add(name: string) {
    this.exec(`yarn add ${name}`);
    this.build();
  }

  /**
   * Remove an existing plugin from the manifest.
   */
  remove(name: string) {
    this.exec(`yarn remove ${name}`);
    this.build();
  }

  /**
   * Upgrade all dependencies to their latest version.
   */
  upgrade() {
    this.exec("yarn upgrade");
    this.build();
  }

  /**
   * Iterate over each dependency.
   */
  forEach(iterator: PackageIterator) {
    return this.packageNames.forEach((name) => {
      iterator(name, this.config.dependencies[name]);
    });
  }

  /**
   * Install dependencies.
   */
  install() {
    this.exec("yarn install");
    this.build();
  }

  /**
   * Rehydrate the OpenRCT2 plugin directory with the plugins installed
   * by rctpm.
   */
  private build() {
    logger.debug("rehydrating plugin dir");
    shell.rm('-rf', this.artifact)
    shell.mkdir('-p', this.artifact)

    this.forEach((name: string) => {
      const installation = path.join(this.base, "node_modules", name)
      const pkg = JSON.parse(
        readFileSync(path.join(installation, "package.json"), "utf-8")
      );
      const entrypoint = pkg.main || "index.js";
      const main = path.join(installation, entrypoint);
      const filename = `${name}-${pkg.version}`
      const plugin = path.join(this.artifact, `${filename}.js`);

      logger.debug(`building ${name}`);
      shell.cp(main, plugin);

      if (!existsSync(plugin)) throw new NotFoundError(name, entrypoint)
    });
  }
}
