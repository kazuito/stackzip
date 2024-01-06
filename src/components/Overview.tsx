import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  basics: ProjectBasics;
  repo?: GitHubRepo;
};

const Overview = ({ basics, repo }: Props) => {

  return (
    <div className="mt-2">
      <div className="text-slate-200 text-2xl font-semibold flex items-center">
        <a
          href={repo?.owner?.html_url}
          className="flex items-center"
          target="_blank"
        >
          <Image
            src={repo?.owner?.avatar_url ?? ""}
            alt=""
            className="w-8 h-8 rounded-full mr-3"
            width={124}
            height={124}
          />
          {basics.owner}
        </a>
        <span className="text-slate-600 text-xl px-2">/</span>
        <a href={repo?.html_url} target="_blank">
          {basics.name}
        </a>
      </div>

      <div className="mt-4">
        <p className="text-slate-200 text-sm">
          {repo?.description ?? "No description"}
        </p>
      </div>
    </div>
  );
};

export default Overview;
