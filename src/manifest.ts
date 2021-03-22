import path from "path";
import { existsSync, readFileSync } from "fs";
import { execSync } from "child_process";
import { Package, PackageIterator } from "./types";
import { PLUGIN_PATH } from "./config";
import { logger } from "./logger";
import { NotInitializedError, NotFoundError } from "./errors";
import shell from "shelljs";

shell.config.silent = true;

export class Manifest {
  base: string;

  constructor(base: string) {
    this.base = base;
  }

  exec(command: string) {
    if (!existsSync(this.base)) throw new NotInitializedError(this.base)

    return shell.exec(command, { cwd: this.base });
  }

  get config(): Package {
    const source = readFileSync(
      path.join(this.base, "package.json"),
      "utf-8"
    )

    return JSON.parse(source)
  }

  get packageNames(): string[] {
    return Object.keys(this.config.dependencies ?? {});
  }

  get count(): number {
    return this.packageNames.length;
  }

  add(name: string) {
    this.exec(`yarn add -s ${name}`);
    this.build();
  }

  remove(name: string) {
    this.exec(`yarn remove -s ${name}`);
    this.build();
  }

  upgrade() {
    this.exec(`yarn upgrade -s`);
    this.build();
  }

  forEach(iterator: PackageIterator) {
    return this.packageNames.forEach((name) => {
      iterator(name, this.config.dependencies[name]);
    });
  }

  install() {
    this.exec("yarn install -s");
    this.build();
  }

  private build() {
    shell.rm('-rf', PLUGIN_PATH)

    this.forEach((name: string) => {
      const installation = path.join(this.base, "node_modules", name)
      const pkg = JSON.parse(
        readFileSync(path.join(installation, "package.json"), "utf-8")
      );
      const entrypoint = pkg.main || "index.js";
      const main = path.join(installation, entrypoint);
      const filename = `${name}-${pkg.version}`
      const plugin = path.join(PLUGIN_PATH, `${filename}.js`);

      shell.cp(main, plugin);

      if (!existsSync(plugin)) throw new NotFoundError(name, entrypoint)
    });
  }
}
