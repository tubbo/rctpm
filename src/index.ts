import { Manifest } from "./manifest";
import { RCTPM_CONFIG_PATH, RCTPM_OPENRCT2_PATH } from "./config";

export * from "./config";
export * from "./manifest";
export * from "./types";

export default Manifest.parse(RCTPM_CONFIG_PATH, RCTPM_OPENRCT2_PATH);
