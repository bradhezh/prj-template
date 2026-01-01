module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]sx?$": [
      "@swc/jest",
      { module: { type: "commonjs" }, jsc: { target: "es2023" } },
    ],
  },
  moduleNameMapper: { "^@shared/(.*)$": "<rootDir>/src/$1" },
  testTimeout: 5000,
};
