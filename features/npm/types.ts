export interface PackageLicense {
  type?: string;
  url?: string;
}

export interface NpmPackageLatest {
  name: string;
  description?: string;
  license?: string | PackageLicense;
  homepage?: string;
  repository?: {
    type?: string;
    url?: string;
  };
  version: string;
}

export interface NpmPackageAbbreviated {
  name: string;
  "dist-tags": {
    latest: string;
    [tag: string]: string;
  };
  modified: string;
}

export type OutdatedStatus = "current" | "minor" | "major";

export interface NpmPackageData {
  name: string;
  description?: string;
  license?: string;
  homepage?: string;
  repositoryUrl?: string;
  latest: string;
  modified: string;
  outdatedStatus: OutdatedStatus;
  range: string;
}
