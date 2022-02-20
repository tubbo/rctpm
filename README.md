# rctpm

The [OpenRCT2][] plugin manager.

`rctpm` is a package manager for OpenRCT2 plugins hosted on NPM. It uses
[Yarn][] under the hood to obtain the most up-to-date versions of each
plugin, and copies the specified `"main"` output file to your OpenRCT2
plugins directory. Because it can leverage Yarn's lockfile system,
`rctpm` can be used to rehydrate a plugins directory from any state,
enabling fast upgrades and installs.

**`rctpm` takes over your plugin directory and will remove any existing plugins that it doesn't manage.**

## Installation

You'll need [Yarn][] installed to use `rctpm`.
If you don't already have it installed, run:

    npm install -g yarn

To install the `rctpm` CLI, run;

    yarn global add rctpm

## Usage

`rctpm` can be used both as a CLI as well as a library.

### Basic Usage

Install a new plugin from NPM:

    rctpm add openrct2-benchwarmer

Or, from GitHub:

    rctpm add https://github.com/mgovea/openrct2-ride-price-manager

Or, from your local filesystem: (**NOTE:** All paths must be absolute)

    rctpm add ~/my-plugin

List all plugins:

    rctpm list

Uninstall a plugin:

    rctpm remove openrct2-benchwarmer

Upgrade all plugins:

    rctpm upgrade

For more info, run:

    rctpm --help

### Configuration

You can configure the CLI by way of environment variables:

- **$RCTPM_CONFIG_PATH** is the path to your package config for `rctpm`.
  This is typically `~/.config/rctpm`.
- **$RCTPM_OPENRCT2_PATH** is the path to your OpenRCT2 installation.
  This differs per platorm, and `rctpm` will try and detect the OS you're
  using in order to automatically discover this value.
- The CLI also respects the **$DEBUG** "standard" of using a string in
  this variable value to denote whether the user wants debug log
  messages. Add `rctpm:*` to this value to get debug logs in the CLI.

### Programmatic Usage

To use `rctpm` within your own [NodeJS][] program, add it to your
project's dependencies and import it like so:

```typescript
import rctpm from "rctpm";

rctpm.add("some-package");
```

The API is very similar to that of the CLI. By default, it uses
the same environment variable configuration. You can override this by
configuring the `Manifest` object from the module:

```typescript
import rctpm from "rctpm";

rctpm.base = "path/to/rctpm/config";
rctpm.artifact = "path/to/openrct2/data";

rctpm.install();
```

[openrct2]: https://openrct2.org/
[yarn]: https://yarnpkg.com/
