// src/services/postgres/index.js

const DistrictService = require('./DistrictService');
const CSRCompanyService = require('./CSRCompanyService');
const SchoolService = require('./SchoolService');
const UserService = require('./UserService');
const RiskScoreService = require('./RiskScoreService');
const DistrictRiskService = require('./DistrictRiskService');
const AssistanceRequestService = require('./AssistanceRequestService');
const SubmissionService = require('./SubmissionService');
const NotificationService = require('./NotificationService');

module.exports = {
    DistrictService,
    CSRCompanyService,
    SchoolService,
    UserService,
    RiskScoreService,
    DistrictRiskService,
    AssistanceRequestService,
    SubmissionService,
    NotificationService
};