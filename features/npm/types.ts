export interface NpmPackage {
  name: string;
  description?: string;
  license?: string;
  homepage?: string;
  repository?: {
    type?: string;
    url?: string;
  };
  "dist-tags": {
    latest: string;
    [tag: string]: string;
  };
  time: {
    modified: string;
    created: string;
    [version: string]: string;
  };
}

export interface NpmDownloads {
  downloads: number;
  start: string;
  end: string;
  package: string;
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
  downloads: number;
  outdatedStatus: OutdatedStatus;
  range: string;
}
