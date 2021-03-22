import path from "path";
import xdg from "xdg-basedir";
import { homedir } from "os";

export const XDG_BASE = xdg.config || path.join(homedir(), ".config");

let RCTPM_OPENRCT2_PATH: string = process.env.RCTPM_OPENRCT2_PATH ?? ''

if (!RCTPM_OPENRCT2_PATH) {
  switch (process.platform) {
    case "darwin":
      RCTPM_OPENRCT2_PATH = path.join(homedir(), "Library", "OpenRCT2");
      break;
    case "win32":
      RCTPM_OPENRCT2_PATH = path.join(homedir(), "Documents", "OpenRCT2");
      break;
    case "linux":
      RCTPM_OPENRCT2_PATH = path.join(XDG_BASE, "OpenRCT2");
      break;
    default:
      throw new Error(`Platform "${process.platform}" cannot be detected. Set $RCTPM_OPENRCT2_PATH to proceed.`)
  }
}


export const RCTPM_CONFIG_PATH =
  process.env.RCTPM_CONFIG_PATH || path.join(XDG_BASE, "rctpm");

export { RCTPM_OPENRCT2_PATH };

export const RCTPM_DEBUG: boolean = !!/rctpm:/.exec(process.env.DEBUG ?? '')
