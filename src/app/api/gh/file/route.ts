import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.owner || !data.repo || !data.branch || !data.path) {
    return NextResponse.json(
      { error: "Please provide owner and repo" },
      { status: 400 }
    );
  }

  const fileData = await axios
    .get(
      `https://raw.githubusercontent.com/${data.owner}/${data.repo}/${data.branch}/${data.path}`,
      {
        responseType: "text",
      }
    )
    .then((res) => {
      res.data;
    });

  return Response.json(fileData);
}
