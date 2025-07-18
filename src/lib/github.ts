type Repo = {
  owner: string | null;
  name: string | null;
};

export async function fetchRepoStars(repos: Repo[]) {
  if (repos.length === 0) {
    return [];
  }

  const repositoryQueries = repos
    .map((repo, index) => {
      const alias = `repo${index}`;
      return `
        ${alias}: repository(owner: "${repo.owner}", name: "${repo.name}") {
          stargazerCount
        }
      `;
    })
    .join("\n");

  const query = `
    query {
      ${repositoryQueries}
    }
  `;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "github-stars-fetcher",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    };

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
    }

    return repos.map((repo, index) => {
      const alias = `repo${index}`;
      const repoData = data.data?.[alias];

      if (!repoData) {
        return {
          ...repo,
          stars: 0,
          // error: "Repository not found or access denied",
        };
      }

      return {
        ...repo,
        stars: (repoData.stargazerCount || 0) as number,
      };
    });
  } catch (error) {
    console.error("Error fetching repository stars:", error);

    return repos.map((repo) => ({
      ...repo,
      stars: 0,
    }));
  }
}
