/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // "--tw-prose-bullets": theme("colors.pink[400]"),
            p: {
              margin: 0,
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // các plugin khác nếu có
  ],
};
