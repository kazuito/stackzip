import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import queryGitHubGQL, { reposQuery } from "../gql/repo";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.repos) {
    return NextResponse.json(
      { error: "Please provide repos" },
      { status: 400 }
    );
  }

  const { q, keys } = reposQuery(data.repos);

  const res = await queryGitHubGQL(q);

  return Response.json({
    data: res,
    keys,
  });
}
