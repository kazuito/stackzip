import { cn } from "@/lib/utils";
import { IconStar } from "@tabler/icons-react";
import { useState } from "react";
import CountUp from "react-countup";

type Props = {
  groups: LibGroup[];
  setLibData: React.Dispatch<React.SetStateAction<LibItem | undefined>>;
};

const LibList = ({ groups, setLibData }: Props) => {
  const [activeItemId, setActiveItemId] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {groups.map((group, i) => {
        if (group.items.length === 0) return null;

        return (
          <div key={i}>
            <h3 className="pb-2 space-x-2">
              <span className="text-lg font-semibold text-zinc-400">
                {group.name}
              </span>
              <span className="text-sm text-zinc-600">
                {group.items.length} packages
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 xl:grid-cols-3 sm:gap-2">
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

const LibItem = ({
  item,
  ...props
}: {
  item: LibItem;
  isFirst?: boolean;
  isActive?: boolean;
  setLibData: React.Dispatch<React.SetStateAction<LibItem | undefined>>;
  onClick: () => void;
}) => {
  const [iconUrlIndex, setIconUrlIndex] = useState(0);

  return (
    <div
      className={cn(
        "flex flex-col p-4 pb-2 rounded-lg bg-zinc-800 cursor-pointer transition-all active:scale-[0.98] hover:bg-zinc-700 lg:min-h-32",
        props.isActive && "ring-2 ring-zinc-500 hover:ring-zinc-400"
      )}
      onClick={() => {
        props.setLibData(item);
        props.onClick();
      }}
    >
      <div className="flex gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={iconUrlIndex}
          src={item.icons[iconUrlIndex]}
          alt=""
          className="w-6 h-6 shrink-0 rounded-md"
          onError={() => {
            setIconUrlIndex(iconUrlIndex + 1);
          }}
        />
        <div className="font-mono text-zinc-100 truncate">{item.name}</div>
      </div>
      <div className="text-zinc-400 text-sm mt-2.5 overflow-hidden h-10 shrink-0">
        {item.lib?.description}
      </div>
      <div className="flex gap-4 mt-2.5 h-full text-zinc-500 text-xs justify-self-end">
        {/* <span>{item.lib.license || "N/A"}</span> */}
        <span className="flex gap-1 items-center">
          <IconStar size={10} />
          {item.repo?.stargazerCount ? (
            <CountUp end={item.repo?.stargazerCount} />
          ) : (
            "-"
          )}
        </span>
        <span className="ml-auto font-mono">{item.version}</span>
      </div>
    </div>
  );
};

export default LibList;
