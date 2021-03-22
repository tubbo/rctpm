import path from "path";
import xdg from "xdg-basedir";
import { homedir } from "os";

const XDG_BASE = xdg.config || path.join(homedir(), ".config");

export const RCTPM_CONFIG_PATH =
  process.env.RCTPM_CONFIG_PATH || path.join(XDG_BASE, "rctpm");

export const RCTPM_OPENRCT2_PATH =
  process.env.RCTPM_OPENRCT2_PATH ||
  path.join(homedir(), "Library", "OpenRCT2");

export const RCTPM_DEBUG = /rctpm:/.exec(process.env.DEBUG ?? '')

export const RCTPM_PLUGIN_PATH = path.join(RCTPM_OPENRCT2_PATH, "plugin")
