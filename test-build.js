const assert = require("assert");
const fs = require("fs");
const { getLicenseStatus, getTrialStatus, startTrial, activateLicenseKey } = require("./dist/main");

assert.equal(typeof getLicenseStatus, "function");
assert.equal(typeof getTrialStatus, "function");
assert.equal(typeof startTrial, "function");
assert.equal(typeof activateLicenseKey, "function");

console.log("OK!");
