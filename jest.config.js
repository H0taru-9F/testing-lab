module.exports = {
    roots: ['<rootDir>/src/lab3', '<rootDir>/src/lab4','<rootDir>/src/lab7/test/api','<rootDir>/src/lab7/test/unit'],
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/"],
};