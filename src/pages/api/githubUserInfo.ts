import { NextApiRequest, NextApiResponse } from 'next';

type GitHubUserInfo = {
  success: boolean;
  username: string | null;
  avatarUrl: string | null;
  error?: string;
};

export default async function githubUserInfo(req: NextApiRequest, res: NextApiResponse<GitHubUserInfo>) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      const response = await fetch(`https://api.github.com/search/users?q=${email}`);
      const data = await response.json();

      if (response.ok) {
        if (data.total_count > 0) {
          // Extract username and avatar URL from the search results
          const user = data.items[0];
          const githubInfo: GitHubUserInfo = {
            success: true,
            username: user.login,
            avatarUrl: user.avatar_url,
          };
          
          return res.status(200).json(githubInfo);
        } else {
          // User not found with the provided email
          const githubInfo: GitHubUserInfo = {
            success: false,
            username: null,
            avatarUrl: null,
          };
          return res.status(404).json(githubInfo);
        }
      } else {
        // GitHub API request failed
        console.error('GitHub API request failed:', data.message);
        return res.status(500).json({
          success: false,
          username: null,
          avatarUrl: null,
          error: 'Error fetching GitHub user info'
        });
      }
    } catch (error) {
      console.error('Error fetching GitHub user info:', error);
      return res.status(500).json({
        success: false,
        username: null,
        avatarUrl: null,
        error: 'Error fetching user info',
      });
    }
  } else {
    return res.status(405).json({
      error: 'Method not allowed',
      success: false,
      username: null,
      avatarUrl: null,

    });
  }
}