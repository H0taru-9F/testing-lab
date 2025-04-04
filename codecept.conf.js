const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  "plugins": {
    "tryTo": {
      "enabled": false
    },
    "retryTo": {
      "enabled": false
    }
  },
  tests: './src/lab8/CodeceptJS/*_test.js',
  output: './src/lab8/CodeceptJS/outputs',
  helpers: {
    Puppeteer: {
      url: 'https://demoqa.com',
      show: false,
      windowSize: '1200x900'
    }
  },
  include: {
    I: './steps_file.js'
  },

  name: 'testing-lab',

}