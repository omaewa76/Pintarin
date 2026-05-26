// src/services/postgres/assistanceRequest.js

const { AssistanceRequestModel, CSRCompanyModel, SchoolModel } = require('../../models');
const { mapAssistanceRequestDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

class AssistanceRequestService {
    static async getAllRequests(filters) {
        const result = await AssistanceRequestModel.findAllWithDetails(filters);
        return {
            data: result.data.map(mapAssistanceRequestDBToModel),
            pagination: result.pagination,
        };
    }

    static async getRequestById(id) {
        const requests = await AssistanceRequestModel.findAllWithDetails({});
        const request = requests.data.find(r => r.id === parseInt(id));
        if (!request) return null;
        return mapAssistanceRequestDBToModel(request);
    }

    static async createRequest(data) {
        const { csrCompanyId, schoolId, type, description, amount } = data;

        const newRequest = await AssistanceRequestModel.create({
            perusahaan_csr_id: csrCompanyId,
            sekolah_id: schoolId,
            jenis_bantuan: type,
            deskripsi: description,
            nominal_rupiah: amount,
            status_pengajuan: 'Pending',
        });

        return this.getRequestById(newRequest.id);
    }

    static async approveRequest(id, reviewerId) {
        const request = await AssistanceRequestModel.approve(id, reviewerId);
        if (!request) return null;
        return this.getRequestById(id);
    }

    static async rejectRequest(id, reviewerId, rejectionReason) {
        const request = await AssistanceRequestModel.reject(id, reviewerId, rejectionReason);
        if (!request) return null;
        return this.getRequestById(id);
    }

    static async getAssistanceStatistics() {
        const requests = await AssistanceRequestModel.findAllWithDetails({});
        const data = requests.data;

        return {
            total_requests: data.length,
            approved: data.filter(r => r.status_pengajuan === 'Approved').length,
            pending: data.filter(r => r.status_pengajuan === 'Pending').length,
            completed: data.filter(r => r.status_pengajuan === 'Completed').length,
            total_amount: data.reduce((sum, r) => sum + (r.nominal_rupiah || 0), 0),
        };
    }

    static async getMonthlySummary(year) {
        const requests = await AssistanceRequestModel.findAllWithDetails({});
        const data = requests.data.filter(r => new Date(r.created_at).getFullYear() === year);

        const monthly = {};
        for (let i = 1; i <= 12; i++) {
            monthly[i] = { total: 0, amount: 0 };
        }

        data.forEach(r => {
            const month = new Date(r.created_at).getMonth() + 1;
            monthly[month].total++;
            monthly[month].amount += r.nominal_rupiah || 0;
        });

        return Object.entries(monthly).map(([month, stats]) => ({
            month: parseInt(month),
            total_requests: stats.total,
            total_amount: stats.amount,
        }));
    }
}

module.exports = AssistanceRequestService;