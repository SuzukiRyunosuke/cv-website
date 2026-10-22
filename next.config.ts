import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  // GitHub project Pages serves this site from /cv-website/, not the domain root.
  basePath: process.env.NODE_ENV === "production" ? "/cv-website" : "",
  trailingSlash: true,
};
export default nextConfig;
