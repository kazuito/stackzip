"use client";

import LibList from "@/components/LibList";
import axios from "axios";
import { useEffect, useState } from "react";
import parsePackageJson from "@/lib/parse/package-json";
import LibDetails from "@/components/LibDetails";
import { parseGitHubUrl } from "@/lib/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("https://github.com/tldraw/tldraw");
  const [libGroups, setLibGroups] = useState<LibGroup[]>([]);

  const [libData, setLibData] = useState<LibItem>();

  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const q = params.get("q");

    if (!q) return;

    const { owner, repo } = parseGitHubUrl(q);

    if (!owner || !repo) {
      alert("Invalid URL");
      return;
    }

    const branch = "master";
    const path = "package.json";

    axios
      .get(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`,
        {
          responseType: "text",
        }
      )
      .then((res) => {
        parsePackageJson(res.data as string).then((res) => {
          setLibGroups(res);
        });
      }).catch((err)=>{
        alert("Invalid URL");
      });
  }, [params]);

  const onSubmit = () => {
    const { owner, repo } = parseGitHubUrl(url);

    if (!owner || !repo) {
      alert("Invalid URL");
      return;
    }

    router.push(`zip/?q=${url}`);
  };

  return (
    <main className="grid grid-cols-[max(30%,400px),auto] grid-rows-[auto,auto]">
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
          onClick={onSubmit}
          className="text-white py-3 px-5 text-sm font-semibold text-nowrap bg-blue-700 rounded-lg active:scale-95"
        >
          Let's Go
        </button>
      </div>

      <div className="row-start-1 row-span-2 col-start-1 p-4">
        <LibDetails item={libData} />
      </div>
      <div className="row-start-2 col-start-2 pr-4 pb-4">
        <LibList groups={libGroups} setLibData={setLibData} />
      </div>
    </main>
  );
}
