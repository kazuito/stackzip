import {
  IconBox,
  IconCertificate,
  IconCode,
  IconDownload,
  IconRocket,
  IconTool,
  IconWorld,
} from "@tabler/icons-react";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  rmGitUrlPrefix,
  rmUrlProtocol,
  summarizeDownloads,
} from "@/lib/utils/utils";
import CountUp from "react-countup";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import CodeCopyBtn from "./CodeCopyBtn";
import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

type Props = {
  item?: LibItem;
};

const LibDetails = ({ item }: Props) => {
  const [iconIndex, setIconIndex] = useState(0);
  const [readmes, setReadmes] = useState<{
    [key: string]: string;
  }>({});
  const [yearlyDownloads, setYearlyDownloads] = useState<{
    [key: string]: {
      dayEnd: string;
      downloads: number;
    }[];
  }>({});
  const [currentDatasetId, setCurrentDatasetId] = useState<string>("");
  const [weeklyDownloads, setWeeklyDownload] = useState(0);
  const [preWeeklyDownloads, setPreWeeklyDownload] = useState<number>(0);

  const [readme, setReadme] = useState<string>("");

  useEffect(() => {
    if (!item?.repo) {
      setReadmes((prev) => {
        return {
          ...prev,
          [`${item?.repo?.owner.login}/${item?.repo?.name}`]: "",
        };
      });
      return;
    }

    if (`${item?.repo?.owner.login}/${item?.repo?.name}` in readmes) return;

    axios
      .get(
        `https://raw.githubusercontent.com/${item.repo.owner.login}/${item.repo.name}/${item.repo.defaultBranchRef.name}/README.md`,
        {
          responseType: "text",
        }
      )
      .then((res) => {
        setReadmes((prev) => {
          return {
            ...prev,
            [`${item?.repo?.owner.login}/${item?.repo?.name}`]:
              res.data as string,
          };
        });
      })
      .catch((err) => {
        setReadme("");

        setReadmes((prev) => {
          return {
            ...prev,
            [`${item?.repo?.owner.login}/${item?.repo?.name}`]: "",
          };
        });
      });
  }, [item?.repo]);

  useEffect(() => {
    if (!item || !item.lib) return;

    setIconIndex(0);

    if (!(item.lib._id in yearlyDownloads)) {
      axios
        .get(
          `https://api.npmjs.org/downloads/range/last-year/${item.lib._id}`,
          {
            responseType: "json",
          }
        )
        .then((res) => {
          const summarizedDownloads = summarizeDownloads(res.data.downloads);

          setYearlyDownloads((prev) => ({
            ...prev,
            [`${item.lib?._id}`]: summarizedDownloads,
          }));
          setPreWeeklyDownload(weeklyDownloads);
          setWeeklyDownload(summarizedDownloads?.at(-1)?.downloads);
          setCurrentDatasetId(item?.lib?._id ?? "");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setPreWeeklyDownload(weeklyDownloads);
      setWeeklyDownload(yearlyDownloads[item.lib._id]?.at(-1)?.downloads ?? 0);
      setCurrentDatasetId(item.lib._id);
    }
  }, [item]);

  return (
    <div className="flex flex-col bg-slate-800 rounded-lg w-full h-[calc(100vh-2rem)] sticky top-4 shrink-0 overflow-y-auto overscroll-contain">
      <div className="h-2 w-full shrink-0"></div>
      <div className="z-10 flex gap-3 items-center sticky top-0 py-4 px-3 rounded-xl ml-1 bg-gradient-to-b from-slate-800 to-transparent">
        <img
          src={item?.icons[iconIndex]}
          className="w-6 h-6 rounded-md shrink-0"
          onError={(e) => {
            e.preventDefault();
            setIconIndex(iconIndex + 1);
          }}
        />
        <h2 className="font-mono text-slate-100">{item?.lib?.name}</h2>
      </div>
      <div className="px-3.5 py-4">
        <div className="text-slate-300 flex gap-3 my-2 mt-auto items-center pl-2">
          <div className="flex flex-col gap-1">
            <div className="text-xs gap-1 flex items-center text-slate-500">
              <IconDownload size={14} />
              <div className="whitespace-nowrap">Weekly downloads</div>
            </div>
            <CountUp
              start={preWeeklyDownloads}
              end={weeklyDownloads}
              duration={0.8}
            />
          </div>
          <div className="grow">
            <Line
              width="100%"
              height="60px"
              datasetIdKey="id"
              options={{
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                  mode: "index",
                  intersect: false,
                },
                scales: {
                  x: {
                    display: false,
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
              data={{
                labels: yearlyDownloads[currentDatasetId]?.map(
                  (item: any) => ""
                ),
                datasets: [
                  {
                    data: yearlyDownloads[currentDatasetId]?.map(
                      (item: any) => item.downloads
                    ),
                    fill: true,
                    tension: 0.5,
                    pointRadius: 0,
                    backgroundColor: "#64748b",
                    borderColor: "#64748b",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <ItemWithIcon
            icon={<IconWorld size={20} />}
            value={item?.lib?.homepage}
            href={item?.lib?.homepage}
            tooltip="Homepage"
          />
          <ItemWithIcon
            icon={<IconBox size={20} />}
            value={`${item?.lib?._id}`}
            href={`https://www.npmjs.com/package/${item?.lib?._id}`}
            tooltip="npm"
          />
          <ItemWithIcon
            icon={<IconCode size={20} />}
            value={rmGitUrlPrefix(item?.lib?.repository?.url)}
            href={rmGitUrlPrefix(item?.lib?.repository?.url)}
            tooltip="Git repository"
          />
          <ItemWithIcon
            icon={<IconCertificate size={20} />}
            value={item?.lib?.license}
            tooltip="License"
          />
          <ItemWithIcon
            icon={<IconRocket size={20} />}
            value={dayjs(item?.lib?.time.created).format("YYYY-MM-DD")}
            tooltip="Created at"
          />
          <ItemWithIcon
            icon={<IconTool size={20} />}
            value={dayjs(item?.lib?.time.modified).format("YYYY-MM-DD")}
            tooltip="Last modified at"
          />
        </div>
      </div>
      <div className="px-3.5 mt-4">
        <p className="leading-normal text-slate-200 break-words">
          {item?.lib?.description}
        </p>
        <div className="flex flex-wrap gap-1 py-6 -ml-1">
          {item?.lib?.keywords?.map((keyword, i) => {
            return (
              <Link
                href={`https://www.npmjs.com/search?q=keywords:${keyword}`}
                target="_blank"
                key={i}
                className="text-slate-500 bg-slate-900 py-1 px-2 text-xs rounded-md hover:underline cursor-pointer"
              >
                {keyword}
              </Link>
            );
          })}
        </div>
        <Markdown
          remarkPlugins={[remarkHtml, remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkRehypeOptions={{ allowDangerousHtml: true }}
          className="markdown text-slate-300"
          components={{
            pre: ({ node, children, className, ...props }) => {
              console.log(node?.children[0]);

              const id = "pre-" + uuid();

              return (
                <div className="relative group">
                  <CodeCopyBtn targetId={id} />
                  <pre {...props} id={id}>
                    {children}
                  </pre>
                </div>
              );
            },
          }}
        >
          {readmes[`${item?.repo?.owner.login}/${item?.repo?.name}`]}
        </Markdown>
      </div>
    </div>
  );
};

const ItemWithIcon = (props: {
  icon: ReactNode;
  value?: string;
  href?: string;
  tooltip: string;
}) => {
  if (!props?.value) return null;

  if (props.href)
    return (
      <Link
        href={props.href ?? ""}
        className="flex gap-2 items-center group w-fit truncate max-w-[100%] text-slate-400 hover:text-slate-100"
        target="_blank"
      >
        <div className="shrink-0">{props.icon}</div>
        <div className="group-hover:underline truncate font-mono text-sm">
          {rmUrlProtocol(props.value)}
        </div>
      </Link>
    );

  return (
    <div className="flex gap-2 items-center group w-fit truncate max-w-[100%] text-slate-400 hover:text-slate-100">
      <div className="shrink-0">{props.icon}</div>
      <div className="truncate font-mono text-sm">{props.value}</div>
    </div>
  );
};

export default LibDetails;
