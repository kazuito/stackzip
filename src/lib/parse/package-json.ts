import axios from "axios";
import { getNpmRegistryData } from "../utils/npm";
import { isGitHubUrl, parseGitHubUrl } from "../utils/utils";

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
    const packageRegistries = await Promise.all(
      Object.entries(json?.[g.name] ?? [])?.map(async ([name, version]) => {
        const registryData = await getNpmRegistryData(name);

        return {
          lib: registryData,
          usingVersion: version as string,
        };
      })
    );

    const packageRepos: RepoData[] = await axios
      .post("/api/gh/repo", {
        repos: packageRegistries.map((d) => {
          const { owner, repo } = parseGitHubUrl(d?.lib?.repository?.url ?? "");

          return {
            owner: owner,
            name: repo,
          };
        }),
      })
      .then((res) => {
        const d = res.data;

        return d.keys.map((k: string) => d.data.data[k]);
      });
    // .then((res) => res.data.keys.map((k: string) => res.data.data[k]));

    if (packageRepos.length === 0) continue;

    const groupData = {
      name: g.displayName,
      items: packageRegistries.map((registry, i) => {
        const repo = packageRepos[i];

        const icons: string[] = [];

        if (registry.lib?.homepage && !isGitHubUrl(registry.lib.homepage)) {
          const urlOrigin = new URL(registry.lib.homepage).origin;

          icons.push(urlOrigin + "/favicon.ico");
          icons.push(urlOrigin + "/favicon.png");
          icons.push(urlOrigin + "/favicon.svg");
          icons.push(urlOrigin + "/favicon.jpg");
        }

        if (repo?.owner?.__typename === "Organization") {
          icons.push(repo.owner.avatarUrl);
        }

        icons.push("./npm.png");

        return {
          ...registry,
          repo,
          icons,
        };
      }),
    };

    console.log(groupData);

    groups.push(groupData);
  }

  return groups;
}
