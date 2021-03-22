# rctpm

The [OpenRCT2][] plugin manager.

`rctpm` is a package manager for OpenRCT2 plugins hosted on NPM. It uses
[Yarn][] under the hood to obtain the most up-to-date versions of each
plugin, and copies the specified `"main"` output file to your OpenRCT2
plugins directory. Because it can leverage Yarn's lockfile system,
`rctpm` can be used to rehydrate a plugins directory from any state,
enabling fast upgrades and installs.

## Installation

You'll need [Yarn][] installed to use `rctpm`. To get it installed, run:

    yarn global add rctpm

This will install the `rctpm` command line tool and create its home
directory at **~/.config/rctpm**. This is where `rctpm` keeps all of its
configuration and source material for your installed plugins.

## Usage

Install a new plugin:

    rctpm add openrct2-benchwarmer

List all plugins:

    rctpm list

Uninstall a plugin:

    rctpm remove openrct2-benchwarmer

Upgrade all plugins:

    rctpm upgrade

For more info, run:

    rctpm --help

[OpenRCT2]: https://openrct2.org/
[Yarn]: https://yarnpkg.com/
