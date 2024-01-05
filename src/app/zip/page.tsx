"use client";

import LibList from "@/components/LibList";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import parsePackageJson from "@/lib/parse/package-json";
import LibDetails from "@/components/LibDetails";

export default function Home() {
  const [url, setUrl] = useState("https://github.com/tldraw/tldraw");
  const [libGroups, setLibGroups] = useState<LibGroup[]>([]);

  const [libData, setLibData] = useState<LibData>();

  const onSubmit = () => {
    const [_, owner, repo] = url.match(/github.com\/(.*)\/(.*)/) || [];

    const branch = "master";
    const path = "package.json";

    if (!owner || !repo) {
      console.error("Invalid URL");
      return;
    }

    // axios
    //   .post("/api/gh/repo", {
    //     owner,
    //     repo,
    //   })
    //   .then((res) => res.data)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    const fileData = axios
      .get(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`,
        {
          responseType: "text",
        }
      )
      .then((res) => {
        console.log(res.data);
        const { dependencies, devDependencies } = parsePackageJson(
          res.data as string
        );
        setLibGroups([
          {
            name: "Dependencies",
            items: dependencies,
          },
          {
            name: "Dev Dependencies",
            items: devDependencies,
          },
        ]);
      });
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

      {/* <div className="flex gap-4 px-4"> */}
      <div className="row-start-1 row-span-2 col-start-1 p-4">
        <LibDetails data={libData} />
      </div>
      <div className="row-start-2 col-start-2 pr-4 pb-4">
        <LibList groups={libGroups} setLibData={setLibData} />
      </div>
      {/* </div> */}
    </main>
  );
}
