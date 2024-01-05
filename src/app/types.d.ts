type LibItem = {
  name: string;
  version: string;
};

type LibGroup = {
  name: string;
  items: LibItem[];
};

type LibData = {
  _id: string;
  _rev: string;
  name: string;
  "dist-tags": {
    [key: string]: string;
  };
  versions: {
    [key: string]: {
      name: string;
      version: string;
      description: string;
      main: string;
      homepage: string;
      scripts: {
        [key: string]: string;
      };
      keywords: string[];
      author: {
        name: string;
        email: string;
      };
      license: string;
      publishConfig: {
        registry: string;
        access: string;
      };
      dependencies: {
        [key: string]: string;
      };
      devDependencies: {
        [key: string]: string;
      };
      gitHead: string;
      _id: string;
      _nodeVersion: string;
      _npmVersion: string;
      dist: {
        integrity: string;
        shasum: string;
        tarball: string;
        fileCount: number;
        unpackedSize: number;
        "npm-signature": string;
        signatures: [
          {
            keyid: string;
            sig: string;
          }
        ];
      };
      maintainers: {
        name: string;
        email: string;
      }[];
      _npmUser: {
        name: string;
        email: string;
      };
      directories: {};
      _npmOperationalInternal: {
        host: string;
        tmp: string;
      };
      _hasShrinkwrap: boolean;
    };
  };
  time: {
    [key: string]: string;
  };
  maintainers: {
    name: string;
    email: string;
  }[];
  description: string;
  homepage: string;
  keywords: string[];
  author: {
    name: string;
    email: string;
  };
  license: string;
  readme: string;
  readmeFilename: string;
  repository: {
    type: string;
    url: string;
  };
  users: {
    [key: string]: boolean;
  };
  bugs: {
    url: string;
  };
};
