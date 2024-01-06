type ProjectBasics = {
  name: string;
  owner: string;
  type: string;
  url: string;
};

type LibItem = {
  lib?: LibData;
  repo?: RepoData;
  name: string;
  version: string;
  icons: string[];
};

type LibGroup = {
  name: string;
  items: LibItem[];
};

type RepoData = {
  owner: {
    __typename: string;
    avatarUrl: string;
    login: string;
  };
  name: string;
  createdAt: string;
  updatedAt: string;
  stargazerCount: number;
  defaultBranchRef: {
    name: string;
  };
};

type LibData = {
  name: string;
  _id: string;
  _rev: string;
  "dist-tags": {
    [key: string]: string;
  };
  versions: {
    [key: string]: {
      name: string;
      version: string;
      description: string;
      main: string;
      homepage: string;
      scripts: {
        [key: string]: string;
      };
      keywords?: string[];
      author: {
        name: string;
        email: string;
      };
      license: string;
      publishConfig: {
        registry: string;
        access: string;
      };
      dependencies: {
        [key: string]: string;
      };
      devDependencies: {
        [key: string]: string;
      };
      gitHead: string;
      _id: string;
      _nodeVersion: string;
      _npmVersion: string;
      dist: {
        integrity: string;
        shasum: string;
        tarball: string;
        fileCount: number;
        unpackedSize: number;
        "npm-signature": string;
        signatures: [
          {
            keyid: string;
            sig: string;
          }
        ];
      };
      maintainers: {
        name: string;
        email: string;
      }[];
      _npmUser: {
        name: string;
        email: string;
      };
      directories: {};
      _npmOperationalInternal: {
        host: string;
        tmp: string;
      };
      _hasShrinkwrap: boolean;
    };
  };
  time: {
    [key: string]: string;
  };
  maintainers: {
    name: string;
    email: string;
  }[];
  description: string;
  homepage?: string;
  keywords?: string[];
  author?: {
    name?: string;
    email?: string;
  };
  license?: string;
  readme?: string;
  readmeFilename?: string;
  repository?: {
    type?: string;
    url?: string;
  };
  users: {
    [key: string]: boolean;
  };
  bugs: {
    url: string;
  };
};

type GitHubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: false;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: 2901;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
  temp_clone_token: string;
  organization: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  network_count: number;
  subscribers_count: number;
};
