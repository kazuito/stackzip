import axios from "axios";
import { getNpmRegistryData } from "../utils/npm";

export default async function parsePackageJson(
  text: string
): Promise<LibGroup[]> {
  const json = JSON.parse(text);

  const groups: LibGroup[] = [];

  const groupNames = [
    {
      name: "dependencies",
      displayName: "Dependencies",
    },
    {
      name: "devDependencies",
      displayName: "Dev Dependencies",
    },
  ];

  for await (const g of groupNames) {

    console.log(g);

    const packageRegistries = await Promise.all(
      Object.entries(json?.[g.name] ?? [])?.map(async ([name, version]) => {
        const registryData = await getNpmRegistryData(name);

        return {
          lib: registryData,
          usingVersion: version as string,
        };
      })
    );

    const packageRepos = await axios
      .post("/api/gh/repo", {
        repos: packageRegistries.map((d) => ({
          owner: d?.lib?.publisher?.username ?? "",
          name: d?.lib?.name ?? "",
        })),
      })
      .then((res) => res.data.keys.map((k: string) => res.data.data[k]));

    if (packageRegistries.length === 0) continue;

    const groupData = {
      name: g.displayName,
      items: packageRegistries.map((r, i) => {
        return {
          ...r,
          repo: packageRepos[i],
        };
      }),
    };

    groups.push(groupData);
  };

  return groups;
}
