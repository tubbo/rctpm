export type Package = {
  dependencies: {
    [name: string]: string;
  };
};

export type PackageIterator = (name: string, version: string) => void;

export type PluginCommandArgs = {
  PLUGIN: string;
};
