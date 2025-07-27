import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the fetch function to verify cache configuration
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment variables
vi.mock('../env', () => ({
  env: {
    secret: {
      GITHUB_TOKEN: 'mock-token'
    }
  }
}));

describe('Data Cache Configuration', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should configure cache for GitHub GraphQL API calls', async () => {    
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: {
          _test: { stargazerCount: 100 }
        }
      })
    });

    const { fetchGithubReposData } = await import('../packages');
    
    const mockPackages = [{
      name: 'test-package',
      description: 'Test package',
      repository: { url: 'https://github.com/test/repo' },
      license: 'MIT',
      homepage: 'https://test.com',
      url: 'https://npmjs.com/package/test-package'
    }];

    await fetchGithubReposData(mockPackages);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/graphql',
      expect.objectContaining({
        next: { revalidate: 86400 }
      })
    );
  });

  it('should configure cache for NPM registry API calls', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        license: 'MIT',
        repository: { url: 'https://github.com/test/repo' },
        homepage: 'https://test.com'
      })
    });

    const { fetchNpmPackageData } = await import('../packages');
    
    await fetchNpmPackageData('test-package');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/test-package/latest',
      expect.objectContaining({
        next: { revalidate: 86400 }
      })
    );
  });

  it('should configure cache for GitHub raw content API calls', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({
        name: 'test-package',
        version: '1.0.0',
        dependencies: { 'dep1': '1.0.0' }
      }))
    });

    const { fetchPackageJson } = await import('../packages');
    
    await fetchPackageJson('https://github.com/test/repo/blob/main/package.json');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://raw.githubusercontent.com/test/repo/main/package.json',
      expect.objectContaining({
        next: { revalidate: 86400 }
      })
    );
  });

  it('should configure cache for GitHub REST API calls', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('# Test README')
    });

    const { fetchReadme } = await import('../github');
    
    await fetchReadme({ owner: 'test', name: 'repo' });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/test/repo/readme',
      expect.objectContaining({
        next: { revalidate: 86400 }
      })
    );
  });
});