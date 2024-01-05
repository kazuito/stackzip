import axios from "axios";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.username) {
    return NextResponse.json(
      { error: "Please provide username" },
      { status: 400 }
    );
  }

  const userData = await octokit
    .request(`GET /user/{username}`, {
      username: data.username,
    })
    .then((res) => res.data);

  console.log(userData);

  return Response.json({ ...userData });
}
