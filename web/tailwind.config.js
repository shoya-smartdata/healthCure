export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-blue-500',
    'text-center', // Add all dynamic or conditionally applied classes here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
