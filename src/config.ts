import path from "path";
import xdg from "xdg-basedir";
import { homedir, platform } from "os";
import { PlatformError } from "./errors";

export const XDG_BASE = xdg.config || path.join(homedir(), ".config");

let RCTPM_OPENRCT2_PATH: string = process.env.RCTPM_OPENRCT2_PATH ?? "";

if (!RCTPM_OPENRCT2_PATH) {
  switch (platform()) {
    case "darwin":
      RCTPM_OPENRCT2_PATH = path.join(
        homedir(),
        "Library",
        "Application Support",
        "OpenRCT2"
      );
      break;
    case "win32":
      RCTPM_OPENRCT2_PATH = path.join(homedir(), "Documents", "OpenRCT2");
      break;
    case "linux":
      RCTPM_OPENRCT2_PATH = path.join(XDG_BASE, "OpenRCT2");
      break;
    default:
      throw new PlatformError();
  }
}

export const RCTPM_CONFIG_PATH =
  process.env.RCTPM_CONFIG_PATH || path.join(XDG_BASE, "rctpm");

export { RCTPM_OPENRCT2_PATH };

export const RCTPM_DEBUG: boolean = !!/rctpm/.exec(process.env.DEBUG ?? "");
