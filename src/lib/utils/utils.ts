import dayjs, { Dayjs } from "dayjs";

export function summarizeDownloads(data: any[]) {
  data = data.reverse();

  const summary = [];
  for (let i = 0; i < data.length; i += 7) {
    if (i + 7 > data.length) break;

    const weekData = data.slice(i, i + 7);

    const totalDownloads = weekData.reduce(
      (sum, current) => sum + current.downloads,
      0
    );
    summary.push({ dayEnd: weekData[0].day, downloads: totalDownloads });
  }

  return summary.reverse();
}

export function formatNumberWithCommas(num?: number): string | null {
  if (typeof num !== "number") return null;

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function rmGitUrlPrefix(url = "") {
  return url.replace(/^git[:+@](?=https?|git)/i, "");
}

export function rmUrlProtocol(url = "") {
  return url.replace(/^(?:https?|git):\/\//i, "");
}

export function parseGitHubUrl(url?: string) {
  if (!url) return { owner: "", repo: "" };

  url = url.replace(/#[^/]*$/, "");
  url = url.replace(/\.git$/i, "");

  const [_, owner, repo] =
    url.match(/(?:github|ghub).com[/:]([^/]+)\/([^/?&#]+)/i) ?? [];

  return { owner, repo };
}

export function isGitHubUrl(url: string) {
  const newUrl = rmUrlProtocol(rmGitUrlPrefix(url));
  return /^(?:github|ghub)\.com/i.test(newUrl);
}

export function dayDiffText(start?: Dayjs, end?: Dayjs) {
  if (!start || !end) return "";

  const diff = end.diff(start, "hour");

  console.log(diff);

  let [val, unit] = ((): [number | null, string] => {
    if (diff < 24) return [diff, "hour"];
    if (diff < 48) return [null, "day"];
    if (diff < 168) return [Math.floor(diff / 24), "day"];
    if (diff < 720) return [Math.floor(diff / 168), "week"];
    if (diff < 8760) return [Math.floor(diff / 720), "month"];
    return [Math.floor(diff / 8760), "year"];
  })();

  if (!val) return unit;

  if (val > 1) unit += "s";

  return `${val} ${unit} ago`;
}
