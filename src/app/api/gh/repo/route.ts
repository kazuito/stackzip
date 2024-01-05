import axios from "axios";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.owner || !data.repo) {
    return NextResponse.json(
      { error: "Please provide owner and repo" },
      { status: 400 }
    );
  }

  const repoData = await octokit
    .request(`GET /repos/${data.owner}/${data.repo}/contents/package.json`)
    .then((res) => res.data);

  console.log(repoData);

  return Response.json({ ...repoData });
}
