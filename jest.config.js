module.exports = {
    roots: ['<rootDir>/src/lab3', '<rootDir>/src/lab4'],
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/"],
};