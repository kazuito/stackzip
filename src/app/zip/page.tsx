"use client";

import LibDetails from "@/components/LibDetails";
import LibList from "@/components/LibList";
import Overview from "@/components/Overview";
import { parseQuery } from "@/lib/utils/utils";
import { IconGitBranchDeleted, IconMoodSad } from "@tabler/icons-react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import useLibGroups from "../hooks/usePackageJson";

export default function Home() {
  const [libData, setLibData] = useState<LibItem>();

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");

  const [repo, setRepo] = useState<GitHubRepo>();

  const [error, setError] = useState<{
    message: ReactNode;
    icon: ReactNode;
  } | null>();

  const { groups: libGroups, setGroups, setFileContents } = useLibGroups();

  useEffect(() => {
    const q = params.get("q");

    if (!q) return;

    submit(true);
    setQuery(q);
  }, []);

  useEffect(() => {
    if (!repo) return;

    const path = "package.json";

    axios
      .get(
        `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${path}`,
        {
          responseType: "text",
        }
      )
      .then((res) => {
        setFileContents(res.data as string);

        setLoading(false);
        // parsePackageJson(res.data as string).then((res) => {
        // setLibGroups(res);
        //   setLibData(res[0].items[0]);
        // });
      })
      .catch((err) => {
        // alert("Invalid URL");
        console.error(err);
        // setLibGroups([]);
        setLibData(undefined);
        setLoading(false);
      });
  }, [repo]);

  const submit = (first = false) => {
    const { owner, repo } = parseQuery(query);

    if (!owner || !repo) {
      setError({
        message:
          query.length > 0 ? (
            <>
              <span className="text-zinc-600">{query}</span>{" "}
              <span className="text-nowrap">is invalid input</span>
            </>
          ) : (
            "Enter a GitHub URL or paste package.json content"
          ),
        icon: <IconMoodSad size={80} />,
      });
      router.push(`/zip`);
      return;
    }

    if (!first && query === params.get("q")) {
      return;
    }

    setLoading(true);

    router.push(`zip/?q=${query}`);

    axios
      .post("/api/gh/repo", {
        owner: owner,
        name: repo,
      })
      .then((res) => {
        setError(null);
        // setGroups([]);
        setRepo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError({
          message: <>Repository not found</>,
          icon: <IconGitBranchDeleted size={80} />,
        });

        setLoading(false);
      });
  };

  return (
    <main className="grid grid-cols-[max(30%,400px),auto] grid-rows-[auto,1fr]">
      <form
        className="row-start-1 row-end-2 col-start-2 flex gap-2 h-fit w-full grow py-4 ml-0 pr-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="text"
          className="bg-zinc-800 py-2.5 px-4 text-zinc-100 text-base rounded-lg w-full outline-none"
          value={query}
          placeholder="Enter GitHub repository"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="text-black font-semibold text-sm py-2 px-5 text-nowrap bg-white rounded-lg hover:bg-opacity-90">
          Zip
        </button>
      </form>

      <div className="row-start-1 row-span-2 col-start-1 p-4">
        <LibDetails item={libData} />
      </div>
      <div className="row-start-2 col-start-2 pr-4 pb-4">
        {loading && (
          <div className="text-zinc-500 animate-pulse font-medium text-center mt-20">
            Loading...
          </div>
        )}
        {!loading && error && (
          <div className="mt-20 text-zinc-500 flex flex-col items-center gap-4 max-w-md break-all mx-auto px-4 text-center">
            {error.icon}
            <div className="font-medium">{error.message}</div>
          </div>
        )}
        {!loading && !error && (
          <>
            {repo && <Overview repo={repo} />}
            <LibList groups={libGroups} setLibData={setLibData} />
          </>
        )}
      </div>
    </main>
  );
}
