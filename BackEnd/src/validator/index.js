// src/validator/index.js

const AuthValidator = require('./auth/index.js');
const SchoolValidator = require('./school/index.js');
const SubmissionValidator = require('./submission/index.js');
const DistrictValidator = require('./district/index.js');
const CSRValidator = require('./csr/index.js');
const AnalyticsValidator = require('./analytics/index.js');
const AIValidator = require('./ai/index.js');
const NotificationValidator = require('./notification/index.js');
const AccountValidator = require('./account/index.js');
const PredictionValidator = require('./predictions/index.js');

module.exports = {
  AuthValidator,
  SchoolValidator,
  SubmissionValidator,
  DistrictValidator,
  CSRValidator,
  AnalyticsValidator,
  AIValidator,
  NotificationValidator,
  AccountValidator,
  PredictionValidator,
};