import next from "eslint-config-next";

const eslintConfig = [
  {
    ignores: ["**/node_modules/**", ".next/**", "dist/**"],
  },
  ...next,
];

export default eslintConfig;
