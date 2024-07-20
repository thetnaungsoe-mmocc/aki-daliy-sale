/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  // Use the `GITHUB_REPOSITORY` environment variable to determine the repository name
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}
const nextConfig = {
  images: {
    unoptimized: true, // Disable image optimization for static site hosting
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
};

export default nextConfig;
