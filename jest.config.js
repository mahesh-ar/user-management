module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  coverageDirectory: './jest-report/coverage',
  reporters: [
    'default',
    [
      'jest-stare',
      {
        resultDir: './jest-report/jest-stare',
        reportTitle: 'broker 2 broker transaction api - Unit Test Report',
        additionalResultsProcessors: [
          'jest-html-reporter'
        ],
        coverageLink: './../coverage/lcov-report/index.html'
      }
    ]
  ]
};