const jestEslintPlugin = require("eslint-plugin-jest");
const prettierConfig = require("eslint-config-prettier");
const js = require("@eslint/js");
const globals = require("globals");

/* https://eslint.org/docs/latest/use/configure/migration-guide */
module.exports = [
  js.configs["recommended"],
  jestEslintPlugin.configs["flat/recommended"],
  jestEslintPlugin.configs["flat/style"],
  prettierConfig,

  {
    languageOptions: {
      ecmaVersion: 2023,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
];
