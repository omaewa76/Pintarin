// src/services/postgres/index.js

const District = require('./District');
const CSRCompany = require('./CSRCompany');
const School = require('./School');
const User = require('./User');
const RiskScore = require('./RiskScore');
const DistrictRisk = require('./DistrictRisk');
const AssistanceRequest = require('./AssistanceRequest');
const Submission = require('./Submission');
const Notification = require('./Notification');
const Prediction = require('./prediction');
const CSR = require('./csr');

module.exports = {
    District,
    CSRCompany,
    School,
    User,
    RiskScore,
    DistrictRisk,
    AssistanceRequest,
    Submission,
    Notification,
    Prediction,
    CSR,
};