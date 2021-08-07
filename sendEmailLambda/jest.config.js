module.export ={
    clearMocks: false,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    // testRegex: 'test/.*\\.test\\.js$',
    testMatch: [
      '<rootDir>/test/*.test.js'
      ],
    setupFiles: ["dotenv/config"],
}