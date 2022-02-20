export class NotInitializedError extends Error {
  constructor(base: string) {
    super(`Config dir "${base}" not found. Run \`rctpm init\` to proceed.`);
  }
}

export class NotFoundError extends Error {
  constructor(name: string, entrypoint: string) {
    super(`${name}: Entrypoint "${entrypoint}" not found.`);
  }
}

export class PlatformError extends Error {
  constructor() {
    super(
      "Platform could not be detected. Set $RCTPM_OPENRCT2_PATH to proceed."
    );
  }
}

export class PluginNameError extends Error {
  constructor() {
    super("You must provide a plugin name.");
  }
}
