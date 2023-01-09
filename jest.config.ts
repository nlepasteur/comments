export default {
  preset: 'ts-jest',
  verbose: true,
  modulePaths: ['src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
