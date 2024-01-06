import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import queryGitHubGQL, { reposQuery } from "../gql/repo";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(req: Request) {
  const data = await req.json();

  if (!data?.owner || !data?.name) {
    return NextResponse.json(
      { error: "Please provide repo info" },
      { status: 400 }
    );
  }

  const res = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: data.owner,
    repo: data.name,
  });

  return Response.json(res.data);
}
