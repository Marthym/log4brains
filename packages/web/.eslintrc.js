module.exports = {
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json"
  },
  plugins: ["react"],
  extends: [
    "../../.eslintrc",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb/hooks",
    "prettier/react"
  ],
  rules: {
    // [Next.js] we don't have to import React explicitly
    "react/react-in-jsx-scope": "off",
    // [Project-specific] prefer React function components (@adr-todo)
    "react/prefer-stateless-function": [2, { ignorePureComponents: false }],
    // [Project-specific] harmonize React function component types (@adr-todo)
    "react/function-component-definition": [
      2,
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function"
      }
    ]
  },
  overrides: [
    // Specific rules for TSX only
    {
      files: ["*.tsx"],
      rules: {
        // [Project-specific] avoid React.FC (@adr-0006)
        "@typescript-eslint/explicit-module-boundary-types": "off"
      }
    },
    // Specific rules for Next.js pages only
    {
      files: ["src/pages/**/*.tsx"],
      rules: {
        // [Project-specific] avoid React.FC (@adr-0006)
        "import/no-default-export": "off"
      }
    }
  ],
  globals: {
    // [Next.js] we don't have to import React explicitly
    React: "writable"
  }
};