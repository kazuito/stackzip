import { NextResponse } from "next/server";
import ghGQL, { reposQuery } from "../gql/repo";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.repos) {
    return NextResponse.json(
      { error: "Please provide repos" },
      { status: 400 }
    );
  }

  const { q, keys } = reposQuery(body.repos);

  const res: any = await ghGQL(q);

  return Response.json(
    (body.repos as Array<any>).map((_, i) => {
      return res.data[`_${i}`];
    })
  );
}
