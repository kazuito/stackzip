import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

const endpoint = "https://api.github.com/graphql";

async function ghGQL(query: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();

  return data;
}

const reposQuery = (repos: { owner: string; name: string }[]) => {
  const keys = repos.map((r) => `_${uuid().replace(/-/g, "")}`);

  const q = `
  query {
    ${repos
      .map(
        (r, i) =>
          `
        _${i}: repository(owner: "${r.owner}", name: "${r.name}") {
          owner {
            __typename
            avatarUrl
            login
          }
          name
          createdAt
          updatedAt
          stargazerCount
          defaultBranchRef {
            name
          }
        }`
      )
      .join("\n")}
  }`;

  return { q, keys };
};

export default ghGQL;
export { reposQuery };
