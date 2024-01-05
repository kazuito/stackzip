import useLibIcon from "@/app/hooks/useLibIcon";
import getLibIcon from "@/lib/utils/getLibIcon";
import {
  IconBox,
  IconCertificate,
  IconCode,
  IconCodePlus,
  IconDownload,
  IconId,
  IconMan,
  IconPackage,
  IconRocket,
  IconTool,
  IconUser,
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
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  formatNumberWithCommas,
  rmGitUrlPrefix,
  rmUrlProtocol,
  summarizeDownloads,
} from "@/lib/utils/utils";
import CountUp from "react-countup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip
  // Legend
);

type Props = {
  data?: LibData;
};

const LibDetails = ({ data }: Props) => {
  // const iconUrl = useLibIcon(data?.homepage);
  const [iconUrl, setIconUrl] = useState<string>("/npm.png");
  const [yearlyDownloads, setYearlyDownloads] = useState<any>([]);
  const [weeklyDownloads, setWeeklyDownload] = useState<number>(0);
  const [preWeeklyDownloads, setPreWeeklyDownload] = useState<number>(0);

  useEffect(() => {
    if (!data) return;

    console.log(data);

    setIconUrl(
      data?.homepage
        ? `${new URL(data?.homepage).origin}/favicon.ico`
        : "/npm.png"
    );

    axios
      .get(`https://api.npmjs.org/downloads/range/last-year/${data.name}`, {
        responseType: "json",
      })
      .then((res) => {
        console.log(res.data);

        const summarizedDownloads = summarizeDownloads(res.data.downloads);

        setYearlyDownloads(summarizedDownloads);
        setPreWeeklyDownload(weeklyDownloads);
        setWeeklyDownload(summarizedDownloads?.at(-1)?.downloads);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [data]);

  return (
    <div className="flex flex-col bg-slate-800 px-4 py-6 rounded-lg w-full h-[calc(100vh-2rem)] sticky top-4 shrink-0">
      <div className="flex gap-3 items-center">
        <img
          src={iconUrl}
          className="w-6 h-6"
          onError={() => {
            setIconUrl("/npm.png");
          }}
        />
        <h2 className="font-mono text-slate-100">{data?.name}</h2>
      </div>
      <p className="mt-6 leading-normal text-slate-200">{data?.description}</p>
      <div className="flex flex-wrap gap-1 mt-6 -ml-1">
        {data?.keywords?.map((keyword, i) => {
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
      <div className="mt-auto">
        <Line
          datasetIdKey="id"
          options={{
            responsive: true,
            interaction: {
              mode: "index",
              intersect: false,
            },
            scales: {
              x: {
                // display: false,
                ticks: {
                  display: false,
                },
              },
              y: {
                // display: false,
                ticks: {
                  display: false,
                },
              },
            },
          }}
          data={{
            labels: yearlyDownloads.map((item: any) => ""),
            datasets: [
              {
                data: yearlyDownloads.map((item: any) => item.downloads),
                fill: true,
                tension: 0.5,
                // backgroundColor: "#0f0",
                // borderColor: "#00f",
              },
            ],
          }}
        />
      </div>
      <div className="px-2 text-slate-300 flex flex-col gap-1 my-2">
        <div className="text-xs gap-2 flex items-center text-slate-500">
          <IconDownload size={14} />
          <div>Weekly downloads</div>
        </div>
        <CountUp
          start={preWeeklyDownloads}
          end={weeklyDownloads}
          duration={0.8}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <ItemWithIcon
          icon={<IconWorld size={20} />}
          value={data?.homepage}
          href={data?.homepage}
          tooltip="Homepage"
        />
        <ItemWithIcon
          icon={<IconBox size={20} />}
          value={`${data?._id}`}
          href={`https://www.npmjs.com/package/${data?._id}`}
          tooltip="npm"
        />
        <ItemWithIcon
          icon={<IconCode size={20} />}
          value={rmGitUrlPrefix(data?.repository?.url)}
          href={rmGitUrlPrefix(data?.repository?.url)}
          tooltip="Git repository"
        />
        <ItemWithIcon
          icon={<IconCertificate size={20} />}
          value={data?.license}
          tooltip="License"
        />
        <ItemWithIcon
          icon={<IconRocket size={20} />}
          value={dayjs(data?.time.created).format("YYYY-MM-DD")}
          tooltip="Created at"
        />
        <ItemWithIcon
          icon={<IconTool size={20} />}
          value={dayjs(data?.time.modified).format("YYYY-MM-DD")}
          tooltip="Last modified at"
        />
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
