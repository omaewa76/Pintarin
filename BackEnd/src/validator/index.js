// src/vaidator/index.js

const AuthValidator = require('./auth');
const SchoolValidator = require('./school');
const SubmissionValidator = require('./submission');
const DistrictValidator = require('./district');
const CSRValidator = require('./csr');
const AnalyticsValidator = require('./analytics');
const AIValidator = require('./ai');
const NotificationValidator = require('./notification');
const AccountValidator = require('./account');

module.exports = {
  AuthValidator,
  SchoolValidator,
  SubmissionValidator,
  DistrictValidator,
  CSRValidator,
  AnalyticsValidator,
  AIValidator,
  NotificationValidator,
  AccountValidator
};