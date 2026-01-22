module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]sx?$": ["@swc/jest", { module: { type: "commonjs" } }],
  },
  moduleNameMapper: { "^@shared/(.*)$": "<rootDir>/src/$1" },
  testTimeout: 5000,
};
