"use client";

import LibList from "@/components/LibList";
import axios from "axios";
import { useEffect, useState } from "react";
import parsePackageJson from "@/lib/parse/package-json";
import LibDetails from "@/components/LibDetails";
import { parseGitHubUrl } from "@/lib/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Overview from "@/components/Overview";

export default function Home() {
  const [libGroups, setLibGroups] = useState<LibGroup[]>([]);

  const [libData, setLibData] = useState<LibItem>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const params = useSearchParams();
  const [url, setUrl] = useState(params.get("q") || "");

  const [repo, setRepo] = useState<GitHubRepo>();

  useEffect(() => {
    const q = params.get("q");

    if (!q) return;

    submit(true);
    setUrl(q);
  }, []);

  useEffect(() => {
    if (!repo) return;

    const path = "package.json";

    setIsLoading(true);

    axios
      .get(
        `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${path}`,
        {
          responseType: "text",
        }
      )
      .then((res) => {
        parsePackageJson(res.data as string).then((res) => {
          setLibGroups(res);
          setLibData(res[0].items[0]);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        // alert("Invalid URL");
        console.error(err);
        setLibGroups([]);
        setLibData(undefined);
        setIsLoading(false);
      });
  }, [repo]);

  const submit = (first = false) => {
    const { owner, repo } = parseGitHubUrl(url);

    if (!owner || !repo) {
      alert("Invalid URL");
      return;
    }

    if (!first && url === params.get("q")) {
      return;
    }

    axios
      .post("/api/gh/repo", {
        owner: owner,
        name: repo,
      })
      .then((res) => {
        setRepo(res.data);
        router.push(`zip/?q=${url}`);
      })
      .catch((err) => {
        alert("Repo not found");
        router.push("/zip");
        console.error(err);
      });
  };

  return (
    <main className="grid grid-cols-[max(30%,400px),auto] grid-rows-[auto,1fr]">
      <div className="row-start-1 row-end-2 col-start-2 flex gap-2 max-w-xl mx-auto p-4 h-fit w-full">
        <input
          type="text"
          className="bg-slate-800 py-3 px-5 text-slate-100 text-base rounded-lg font-mono w-full"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button
          onClick={() => submit()}
          className="text-white py-3 px-5 text-sm font-semibold text-nowrap bg-blue-700 rounded-lg active:scale-95"
        >
          Let's Go
        </button>
      </div>

      <div className="row-start-1 row-span-2 col-start-1 p-4">
        <LibDetails item={libData} />
      </div>
      <div className="row-start-2 col-start-2 pr-4 pb-4">
        <Overview repo={repo} />
        <LibList
          groups={libGroups}
          setLibData={setLibData}
          loading={isLoading}
        />
      </div>
    </main>
  );
}
