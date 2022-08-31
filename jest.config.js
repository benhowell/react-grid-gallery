module.exports = {
  testEnvironment: "jsdom",
  preset: "jest-puppeteer",
  testPathIgnorePatterns: [".publish"],
  setupFilesAfterEnv: ["./setup-jest.js"],
};
