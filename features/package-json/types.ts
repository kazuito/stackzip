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

export interface PackageJson {
  name?: string;
  version?: string;
  description?: string;
  license?: string;
  homepage?: string;
  repository?: string | { type?: string; url?: string };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}
