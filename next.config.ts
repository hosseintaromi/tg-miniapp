import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: "standalone" as const,
  /* config options here */
};

export default withNextIntl(nextConfig);
