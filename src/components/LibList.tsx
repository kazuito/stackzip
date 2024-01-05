import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { isGitHubUrl, parseGitHubUrl } from "@/lib/utils/utils";

type Props = {
  groups: LibGroup[];
  setLibData: React.Dispatch<React.SetStateAction<LibData | undefined>>;
};

const LibList = ({ groups, setLibData }: Props) => {
  const [activeItemId, setActiveItemId] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4 mt-4 max-w-7xl mx-auto">
      {groups.map((group, i) => {
        return (
          <div key={i}>
            <h3 className="text-slate-400 pb-2 text-lg font-semibold">
              {group.name}
            </h3>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 xl:grid-cols-3  sm:gap-2">
              {group.items.map((item, j) => {
                return (
                  <LibItem
                    key={`${i}_${j}`}
                    item={item}
                    setLibData={setLibData}
                    onClick={() => {
                      setActiveItemId(i * 10000 + j);
                    }}
                    isFirst={j === 0 && i === 0}
                    isActive={activeItemId === i * 10000 + j}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LibItem = (props: {
  item: LibItem;
  isFirst?: boolean;
  isActive?: boolean;
  setLibData: React.Dispatch<React.SetStateAction<LibData | undefined>>;
  onClick: () => void;
}) => {
  const [libData, setLibData] = useState<any>();
  const [iconUrl, setIconUrl] = useState<string>("aaa.png");
  // const [repoData, setRepoData] = useState<any>();

  useEffect(() => {
    axios
      .get(`https://registry.npmjs.org/${props.item.name}`, {
        responseType: "json",
      })
      .then((res) => {
        // console.log(res.data);
        setLibData(res.data);

        if (props.isFirst) props.setLibData(res.data);
      });
  }, [props.item.name]);

  useEffect(() => {
    if (!libData) return;

    // if (libData?.repository?.url) {
    //   const { owner, repo } = parseGitHubUrl(libData.repository.url);

    //   console.log(owner, repo);

    //   axios
    //     .get(`https://api.github.com/repos/${owner}/${repo}`, {
    //       responseType: "json",
    //     })
    //     .then((res) => {
    //       setRepoData(res.data);
    //     });
    // }

    if (!libData?.homepage) return;

    if (isGitHubUrl(libData.homepage)) return;

    setIconUrl(`${new URL(libData?.homepage).origin}/favicon.ico`);
  }, [libData]);

  return (
    <div
      className={cn(
        "flex flex-col p-4 pb-2 rounded-lg bg-slate-800 cursor-pointer transition-all active:scale-[0.98] hover:bg-slate-700 lg:min-h-32",
        props.isActive && "!bg-blue-800 hover:!bg-blue-700"
      )}
      onClick={() => {
        props.setLibData(libData);
        props.onClick();
      }}
    >
      <div className="flex gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={iconUrl}
          src={iconUrl}
          alt=""
          className="w-6 h-6 shrink-0 rounded-md"
          onError={() => {
            // const ghUsername = parseGitHubUrl(libData?.repository?.url)?.owner;

            // console.log(libData?.repository?.url, ghUsername);

            // if (!ghUsername) {
            setIconUrl("/npm.png");
            //   return;
            // }

            // axios
            //   .get(`https:/api.github.com/users/${ghUsername}`, {
            //     responseType: "json",
            //   })
            //   .then((res) => {
            //     let d = res.data;
            //     if (d.type === "Organization") setIconUrl(d.avatar_url);
            //     else setIconUrl("/npm.png");
            //   });
          }}
        />
        <div className="font-mono text-slate-100 truncate">
          {props.item.name}
        </div>
      </div>
      <div className="text-slate-400 text-sm mt-2.5 overflow-hidden h-10 shrink-0">
        {libData?.description}
      </div>
      <div className="flex gap-4 mt-2.5 h-full text-slate-500 text-xs font-mono justify-self-end">
        <span>{libData?.license || "N/A"}</span>
        <span className="ml-auto">{props.item.version}</span>
      </div>
    </div>
  );
};

export default LibList;
