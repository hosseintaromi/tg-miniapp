import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  output: "standalone" as const,
  /* config options here */
};

export default withNextIntl(nextConfig);
