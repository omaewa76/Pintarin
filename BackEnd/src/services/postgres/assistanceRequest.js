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

    // Fungsi untuk mengambil detail pengajuan bantuan berdasarkan ID, dengan join ke tabel perusahaan CSR, sekolah, dan pengguna untuk mendapatkan nama verifikator, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
    static async getRequestById(id) {
        const requests = await AssistanceRequestModel.findAllWithDetails({});
        const request = requests.data.find(r => r.id === parseInt(id));
        if (!request) return null;
        return mapAssistanceRequestDBToModel(request);
    }

    // Fungsi untuk membuat pengajuan bantuan baru, dengan menyimpan data pengajuan ke database dan kemudian mengambil detail pengajuan tersebut berdasarkan ID yang baru dibuat, dengan join ke tabel perusahaan CSR, sekolah, dan pengguna untuk mendapatkan nama verifikator, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
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

    // Fungsi untuk mengambil detail pengajuan bantuan berdasarkan ID, dengan join ke tabel perusahaan CSR, sekolah, dan pengguna untuk mendapatkan nama verifikator, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
    static async approveRequest(id, reviewerId) {
        const request = await AssistanceRequestModel.approve(id, reviewerId);
        if (!request) return null;
        return this.getRequestById(id);
    }

    // Fungsi untuk menolak pengajuan bantuan dengan menyimpan alasan penolakan, serta mengambil detail pengajuan bantuan berdasarkan ID setelah penolakan dilakukan, dengan join ke tabel perusahaan CSR, sekolah, dan pengguna untuk mendapatkan nama verifikator, sehingga memberikan gambaran lengkap tentang status pengajuan bantuan yang telah ditolak dan informasi terkait lainnya
    static async rejectRequest(id, reviewerId, rejectionReason) {
        const request = await AssistanceRequestModel.reject(id, reviewerId, rejectionReason);
        if (!request) return null;
        return this.getRequestById(id);
    }

    // Fungsi untuk mengambil statistik pengajuan bantuan, termasuk total jumlah pengajuan, jumlah yang disetujui, jumlah yang masih pending, jumlah yang sudah selesai, serta total nominal bantuan yang diajukan, sehingga dapat memberikan gambaran umum tentang kondisi pengajuan bantuan dalam sistem dan membantu dalam pengambilan keputusan terkait intervensi atau bantuan yang mungkin diperlukan
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

    // Fungsi untuk mengambil statistik pengajuan bantuan berdasarkan bulan dalam satu tahun, dengan menghitung total jumlah pengajuan dan total nominal bantuan yang diajukan untuk setiap bulan, sehingga dapat memberikan gambaran tentang tren pengajuan bantuan sepanjang tahun dan membantu dalam perencanaan intervensi atau bantuan yang mungkin diperlukan di masa mendatang
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