// src/models/index.js

const BaseModel = require('./base');
const UserModel = require('./user');
const SchoolModel = require('./school');
const DistrictModel = require('./district');
const DistrictRiskModel = require('./districtRisk');
const RiskScoreModel = require('./riskScore');
const SubmissionModel = require('./submission');
const AssistanceRequestModel = require('./assistanceRequest');
const CSRCompanyModel = require('./csrCompany');
const NotificationModel = require('./notification');
const PredictionModel = require('./prediction');
const PredictionValidationModel = require('./predictionValidation');
const CSRMatchLogModel = require('./csrMatchLog');

// Model untuk menyimpan log hasil pencocokan CSR berdasarkan fokus area dan rentang anggaran
module.exports = {
    BaseModel,
    UserModel,
    SchoolModel,
    DistrictModel,
    DistrictRiskModel,
    RiskScoreModel,
    SubmissionModel,
    AssistanceRequestModel,
    CSRCompanyModel,
    NotificationModel,
    PredictionModel,
    PredictionValidationModel,
    CSRMatchLogModel,
};