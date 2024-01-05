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

export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function rmGitUrlPrefix(url = "") {
  return url.replace(/^git[:+@](?=http)/i, "");
}

export function rmUrlProtocol(url = "") {
  return url.replace(/^(?:(https?|git):\/\/)?/i, "");
}

export function parseGitHubUrl(url: string) {
  if (!url) return { owner: "", repo: "" };

  url = url.replace(/\.git$/i, "");

  const [_, owner, repo] =
    url.match(/(?:github|ghub).com\/([^/]+)\/([^/]+)/i) ?? [];

  return { owner, repo };
}

export function isGitHubUrl(url: string) {
  const newUrl = rmGitUrlPrefix(rmUrlProtocol(url));
  return /^(?:github|ghub)\.com\//i.test(newUrl);
}
