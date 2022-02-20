import shell from "shelljs";

import { RCTPM_DEBUG } from "./config";

shell.config.silent = !RCTPM_DEBUG;
shell.config.verbose = RCTPM_DEBUG;
shell.config.fatal = true;

export default shell;
