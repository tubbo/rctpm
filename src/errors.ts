export class NotInitializedError extends Error {
  constructor(base: string) {
    super(`Config dir "${base}" not found. Run \`rctpm init\` to proceed.`)
  }
}

export class NotFoundError extends Error {
  constructor(name: string, entrypoint: string) {
    super(`${name}: Entrypoint "${entrypoint}" not found.`)
  }
}
