
export default {
  testEnvironment: 'jsdom',
  setupFiles: ['./setup-jest.js'],
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@open-wc|lit|lit-html|lit-element)/)'
  ],
}