import { NextResponse } from "next/server";
import queryGitHubGQL, { reposQuery } from "../gql/repo";

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
