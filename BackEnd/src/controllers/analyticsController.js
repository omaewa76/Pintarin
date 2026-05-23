// src/controllers/analyticsController.js
const { responseSuccess, asyncHandler } = require('../utils/errorHandler');
const RiskScoreService = require('../services/postgres/RiskScoreService');
const DistrictRiskService = require('../services/postgres/DistrictRiskService');
const AssistanceRequestService = require('../services/postgres/AssistanceRequestService');
const SchoolService = require('../services/postgres/SchoolService');
const SubmissionService = require('../services/postgres/SubmissionService')
const AnalyticsValidator = require('../validator/analytics/index');

const getOverview = asyncHandler(async (req, res) => {
    const validated = AnalyticsValidator.validateOverview(req.query);

    // Statistik sekolah
    const schoolStats = await SchoolService.getSchoolStatistics();

    // Statistik risiko
    const riskStats = await RiskScoreService.getRiskStatistics();

    // Statistik bantuan
    const assistanceStats = await AssistanceRequestService.getAssistanceStatistics();

    // Statistik pengajuan perubahan data
    const submissionStats = await SubmissionService.getSubmissionStatistics();

    return responseSuccess(res, {
        schools: schoolStats,
        risk: riskStats,
        assistance: assistanceStats,
        submissions: submissionStats,
        period: {
            from: validated.date_from || null,
            to: validated.date_to || null
        }
    }, 'Data overview berhasil diambil');
});

const getRiskTrend = asyncHandler(async (req, res) => {
    const { months = 6 } = AnalyticsValidator.validateRiskTrend(req.query);

    // Ambil data risk score per bulan
    const trend = await RiskScoreService.getRiskTrend(months);

    return responseSuccess(res, {
        months,
        data: trend,
        labels: trend.map(t => t.month),
        series: {
            average_score: trend.map(t => t.average_score),
            high_risk_count: trend.map(t => t.high_risk_count),
            total_schools: trend.map(t => t.total_schools)
        }
    }, 'Data tren risiko berhasil diambil');
});

const getDistrictRanking = asyncHandler(async (req, res) => {
    const { limit = 10, sort = 'desc' } = AnalyticsValidator.validateDistrictRanking(req.query);

    const ranking = await DistrictRiskService.getDistrictRanking();

    const processedRanking = ranking.map((item, index) => ({
        rank: sort === 'desc' ? index + 1 : ranking.length - index,
        district_id: item.id,
        district_name: item.nama_kecamatan,
        risk_score: parseFloat(item.risk_score),
        status: item.risk_score > 70 ? 'Kritis' : item.risk_score > 40 ? 'Waspada' : 'Aman'
    }));

    const limitedRanking = sort === 'desc'
        ? processedRanking.slice(0, limit)
        : processedRanking.slice(-limit).reverse();

    return responseSuccess(res, {
        ranking: limitedRanking,
        summary: {
            total_districts: ranking.length,
            average_risk: ranking.reduce((sum, r) => sum + parseFloat(r.risk_score), 0) / ranking.length,
            highest_risk: ranking[0]?.nama_kecamatan,
            lowest_risk: ranking[ranking.length - 1]?.nama_kecamatan
        }
    }, 'Ranking kecamatan berhasil diambil');
});

const getAssistanceSummary = asyncHandler(async (req, res) => {
    const { year = new Date().getFullYear(), group_by = 'month' } = AnalyticsValidator.validateAssistanceSummary(req.query);

    let summary;
    if (group_by === 'month') {
        summary = await AssistanceRequestService.getMonthlySummary(year);
    } else {
        summary = await AssistanceRequestService.getTypeSummary(year);
    }

    const totalStats = await AssistanceRequestService.getAssistanceStatistics();

    return responseSuccess(res, {
        year,
        group_by,
        data: summary,
        total: {
            requests: parseInt(totalStats.total_requests),
            approved: parseInt(totalStats.approved),
            pending: parseInt(totalStats.pending),
            total_amount: parseInt(totalStats.total_amount)
        }
    }, 'Data ringkasan bantuan berhasil diambil');
});

const getSchoolComparison = asyncHandler(async (req, res) => {
    const { school_ids } = AnalyticsValidator.validateSchoolComparison(req.body);

    const schools = [];
    for (const id of school_ids) {
        const school = await SchoolService.getSchoolById(id);
        if (school) {
            const latestRisk = await RiskScoreService.getLatestRiskScore(id);
            schools.push({
                id: school.id,
                name: school.name,
                npsn: school.npsn,
                district: school.districtName,
                level: school.level,
                student_count: school.studentCount,
                vulnerable_count: school.vulnerableStudentCount,
                risk_score: latestRisk?.score || 0,
                risk_category: latestRisk?.category || 'Belum Terhitung'
            });
        }
    }

    return responseSuccess(res, {
        comparison: schools,
        summary: {
            total_students: schools.reduce((sum, s) => sum + s.student_count, 0),
            total_vulnerable: schools.reduce((sum, s) => sum + s.vulnerable_count, 0),
            average_risk: schools.reduce((sum, s) => sum + s.risk_score, 0) / schools.length
        }
    }, 'Perbandingan sekolah berhasil diambil');
});

module.exports = {
    getOverview,
    getRiskTrend,
    getDistrictRanking,
    getAssistanceSummary,
    getSchoolComparison
};