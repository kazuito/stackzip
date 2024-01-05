import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatNumberWithCommas } from "@/lib/utils/utils";
import { IconStar } from "@tabler/icons-react";

type Props = {
  groups: LibGroup[];
  setLibData: React.Dispatch<React.SetStateAction<LibItem | undefined>>;
  loading?: boolean;
};

const LibList = ({ groups, setLibData, loading }: Props) => {
  const [activeItemId, setActiveItemId] = useState<number>(0);

  console.log(loading);

  return (
    <div className="flex flex-col gap-4 mt-4 max-w-7xl mx-auto">
      {loading && (
        <div className="text-slate-400 animate-pulse mt-10 text-center">
          Loading...
        </div>
      )}
      {!loading &&
        groups.map((group, i) => {
          return (
            <div key={i}>
              <h3 className="text-slate-400 pb-2 text-lg font-semibold">
                {group.name}
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
        "flex flex-col p-4 pb-2 rounded-lg bg-slate-800 cursor-pointer transition-all active:scale-[0.98] hover:bg-slate-700 lg:min-h-32",
        props.isActive && "!bg-blue-800 hover:!bg-blue-700"
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
        <div className="font-mono text-slate-100 truncate">{item.lib.name}</div>
      </div>
      <div className="text-slate-400 text-sm mt-2.5 overflow-hidden h-10 shrink-0">
        {item.lib.description}
      </div>
      <div className="flex gap-4 mt-2.5 h-full text-slate-500 text-xs justify-self-end">
        {/* <span>{item.lib.license || "N/A"}</span> */}
        <span className="flex gap-1 items-center">
          <IconStar size={10} />
          {formatNumberWithCommas(item?.repo?.stargazerCount) || "-"}
        </span>
        <span className="ml-auto font-mono">{item.usingVersion}</span>
      </div>
    </div>
  );
};

export default LibList;
