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
      name: "peerDependencies",
      displayName: "Peer Dependencies",
    },
    {
      name: "dependencies",
      displayName: "Dependencies",
    },
    {
      name: "devDependencies",
      displayName: "Dev Dependencies",
    },
    {
      name: "resolutions",
      displayName: "Resolutions",
    },
  ];

  for await (const g of groupNames) {
    const packageRegistries = await Promise.all(
      Object.entries(json?.[g.name] ?? [])?.map(async ([name, version]) => {
        if ((version as string).startsWith("npm:")) return null;

        const registryData = await getNpmRegistryData(name);

        if (!registryData) return null;

        return {
          lib: registryData,
          usingVersion: version as string,
        };
      })
    );

    const packageRepos: RepoData[] = await axios
      .post("/api/gh/repos", {
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

    if (packageRepos.length === 0) continue;

    const groupData = {
      name: g.displayName,
      items: packageRegistries
        .map((registry, i) => {
          if (!registry) return null;

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
        })
        .filter((d) => d) as LibItem[],
    };

    groups.push(groupData);
  }

  return groups;
}
