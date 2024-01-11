import { env } from "./lib/env.mjs"
import withPlugins from "next-compose-plugins"
import withBundleAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { instrumentationHook: true }
};

const config = withPlugins( [ [withBundleAnalyzer({ enabled: env.ANALYZE })] ], nextConfig)

export default config;
