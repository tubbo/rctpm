import { Manifest } from "./manifest";
import { RCTPM_CONFIG_PATH } from "./config";

export * from "./config";
export * from "./manifest";
export * from "./types";

export default new Manifest(RCTPM_CONFIG_PATH);
