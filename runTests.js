// set-env.js
const {execSync} = require('child_process');
process.env.TESTING_MODE = 'testing';

// const exec = require('await-exec');
// await exec('node fixtures/loadAll.fix.js');

// Run the Jest test command


execSync('jest', {stdio: 'inherit'});