import semver from "semver";
import type { OutdatedStatus } from "../types";

export function getOutdatedStatus(
  range: string,
  latest: string,
): OutdatedStatus {
  if (semver.satisfies(latest, range)) {
    return "current";
  }

  const minVersion = semver.minVersion(range);
  if (minVersion && semver.major(minVersion) === semver.major(latest)) {
    return "minor";
  }

  return "major";
}
