export default function parsePackageJson(text: string) {
  const json = JSON.parse(text);

  const dependencies =
    Object.entries(json?.dependencies ?? [])?.map(([name, version]) => {
      return {
        name,
        version,
      } as LibItem;
    }) ?? [];

  const devDependencies =
    Object.entries(json?.devDependencies ?? [])?.map(([name, version]) => {
      return {
        name,
        version,
      } as LibItem;
    }) ?? [];

  return {
    dependencies,
    devDependencies,
  };
}
