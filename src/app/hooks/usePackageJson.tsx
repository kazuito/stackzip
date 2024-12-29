import { getNpmRegistryData } from "@/lib/utils/npm";
import { isGitHubUrl, parseQuery } from "@/lib/utils/utils";
import axios from "axios";
import { useEffect, useState } from "react";

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
];
const usePackageJson = () => {
  const [fileContents, setFileContents] = useState<string>("");
  const [groups, setGroups] = useState<LibGroup[]>([]);

  useEffect(() => {
    let json: any = null;

    try {
      json = JSON.parse(fileContents);
    } catch (e) {
      console.log(e);
    }

    if (!json) return;

    setGroups([]);

    groupNames.map((g) => {
      if (!json[g.name]) return null;

      const entries = Object.entries(json[g.name])
        .map(([name, version]) => {
          if ((version as string).startsWith("npm:")) {
            return null;
          }

          return { name, version: version as string, icons: ["./npm.png"] };
        })
        .filter((e) => e) as LibItem[];

      setGroups((prev) => [...prev, { name: g.displayName, items: entries }]);

      let repos: {
        owner: string;
        name: string;
      }[] = [];

      Promise.all(
        entries.map(async ({ name, version, icons }, entry_i) => {
          await getNpmRegistryData(name).then((data) => {
            const { owner, repo } = parseQuery(data?.repository?.url);
            repos[entry_i] = { owner, name: repo };

            const home = data?.homepage && new URL(data.homepage).origin;

            const icons =
              home && !isGitHubUrl(home)
                ? [
                    `${home}/favicon.ico`,
                    `${home}/favicon.png`,
                    `${home}/favicon.svg`,
                    "./npm.png",
                  ]
                : ["./npm.png"];

            setGroups((prev) => {
              return prev.map((group) => {
                if (group.name !== g.displayName) return group;

                return {
                  ...group,
                  items: group.items.map((item) => {
                    if (item.name !== name) return item;

                    return {
                      ...item,
                      lib: data,
                      icons: icons,
                    };
                  }),
                };
              });
            });

            return data;
          });
        })
      ).then(() => {
        axios
          .post("/api/gh/repos", {
            repos,
          })
          .then((res) => {
            const repoDataList: RepoData[] = res.data;

            setGroups((prev) => {
              return prev.map((group) => {
                if (group.name !== g.displayName) return group;

                return {
                  ...group,
                  items: group.items.map((item, i) => {
                    let thisRepo = repoDataList[i];

                    if (!thisRepo) return item;

                    let icons = item.icons;

                    if (thisRepo.owner.__typename === "Organization") {
                      icons = [
                        ...icons.slice(0, icons.length - 1),
                        thisRepo.owner.avatarUrl + "&size=124",
                        ...icons.slice(icons.length - 1),
                      ];
                    }

                    return {
                      ...item,
                      repo: thisRepo,
                      icons: icons,
                    };
                  }),
                };
              });
            });
          });
      });
    });
  }, [fileContents]);

  return { groups, setGroups, setFileContents };
};

export default usePackageJson;
