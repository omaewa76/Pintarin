// src/services/postgres/index.js

const UserService = require('./user');
const SchoolService = require('./school');
const DistrictService = require('./district');
const DistrictRiskService = require('./districtRisk');
const RiskScoreService = require('./riskScore');
const SubmissionService = require('./submission');
const AssistanceRequestService = require('./assistanceRequest');
const CSRCompanyService = require('./csrCompany');
const NotificationService = require('./notification');
const PredictionService = require('./prediction');
const CSRService = require('./csr');

module.exports = {
    UserService,
    SchoolService,
    DistrictService,
    DistrictRiskService,
    RiskScoreService,
    SubmissionService,
    AssistanceRequestService,
    CSRCompanyService,
    NotificationService,
    PredictionService,
    CSRService,
};