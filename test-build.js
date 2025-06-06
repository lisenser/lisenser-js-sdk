const assert = require("assert");
const fs = require("fs");
const {
    getLicenseStatus,
    getTrialStatus,
    startTrial,
    activateLicenseKey,
    requestOtpForLicenseReset,
    resetLicense,
    generate3rdPartyToken
} = require("./dist/main");

assert.equal(typeof getLicenseStatus, "function");
assert.equal(typeof getTrialStatus, "function");
assert.equal(typeof startTrial, "function");
assert.equal(typeof activateLicenseKey, "function");
assert.equal(typeof requestOtpForLicenseReset, "function");
assert.equal(typeof resetLicense, "function");
assert.equal(typeof generate3rdPartyToken, "function");

console.log("OK!");
