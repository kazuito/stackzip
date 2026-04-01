export type DepType =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies";

export const DEP_TYPES: DepType[] = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

export interface DepEntry {
  name: string;
  range: string;
  type: DepType;
}

export interface PackageLicense {
  type?: string;
  url?: string;
}

export interface PackagePerson {
  name?: string;
  email?: string;
  url?: string;
}

export interface PackageBugs {
  url?: string;
  email?: string;
}

export interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  private?: boolean;
  type?: string;
  license?: string | PackageLicense;
  homepage?: string;
  author?: string | PackagePerson;
  keywords?: string[];
  packageManager?: string;
  main?: string;
  module?: string;
  types?: string;
  typings?: string;
  engines?: Record<string, string>;
  bugs?: string | PackageBugs;
  repository?: string | { type?: string; url?: string };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}
