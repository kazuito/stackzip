import axios from "axios";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import queryGitHubGQL, { reposQuery } from "../gql/repo";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(req: Request) {
  console.log("Hello");

  // const data = await req.json();

  // if (!data.owner || !data.repo) {
  //   return NextResponse.json(
  //     { error: "Please provide owner and repo" },
  //     { status: 400 }
  //   );
  // }

  const { q, keys } = reposQuery([
    { owner: "kazuito", name: "jet-words" },
    { owner: "facebook", name: "react" },
  ]);

  console.log(q);

  const res = await queryGitHubGQL(q);

  // console.log(repoData);

  return Response.json({
    data: res,
    keys,
  });
}
