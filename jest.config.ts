import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./"
});

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!next-intl).+\\.(js|jsx|ts|tsx)$"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default createJestConfig(config);
