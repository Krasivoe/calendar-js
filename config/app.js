const isProd = process.argv.includes('--production');
const isDev = !isProd;

export default {
  isProd: isProd,
  isDev: isDev,
  webpack: {
    mode: isProd ? 'production' : 'development',
  },
  fonts: {
    formats: ['ttf', 'woff', 'eot'],
  },
};
