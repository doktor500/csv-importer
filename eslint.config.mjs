import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next", "next/core-web-vitals", "next/typescript", "plugin:prettier/recommended"],
    plugins: ["prettier", "jsx-a11y"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          semi: true,
          tabWidth: 2,
          singleQuote: false,
          printWidth: 120,
          endOfLine: "auto",
          arrowParens: "always",
          plugins: ["prettier-plugin-tailwindcss"],
        },
        {
          usePrettierrc: false,
        },
      ],
      "react/react-in-jsx-scope": "off",
    },
  }),
]

export default eslintConfig;
