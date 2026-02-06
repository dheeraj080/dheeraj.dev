export async function getGitHubRepos(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/dheeraj080/repos?sort=updated&per_page=10`,
      {
        next: { revalidate: 3600 }, // Optional: Cache for 1 hour if using Next.js
      }
    );

    if (!response.ok) throw new Error('Failed to fetch repos');

    const data = await response.json();

    // Map GitHub's API structure to your ProjectCardProps
    return data
      .filter((repo: any) => !repo.fork) // Hide forks
      .map((repo: any) => ({
        title: repo.name,
        desc: repo.description,
        stars: repo.stargazers_count,
        language: repo.language ?? 'TypeScript',
        href: repo.html_url,
      }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
