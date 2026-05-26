// src/services/postgres/submission.js

const { SubmissionModel, SchoolModel } = require('../../models');
const { mapSubmissionDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

class SubmissionService {
    static async getAllSubmissions(filters) {
        const result = await SubmissionModel.findAllWithDetails(filters);
        return {
            data: result.data.map(mapSubmissionDBToModel),
            pagination: result.pagination,
        };
    }

    static async getSubmissionById(id) {
        const submissions = await SubmissionModel.findAllWithDetails({});
        const submission = submissions.data.find(s => s.id === parseInt(id));
        if (!submission) return null;
        return mapSubmissionDBToModel(submission);
    }

    static async createSubmission(data) {
        const { schoolId, submittedBy, updateType, dataAfter, dataBefore } = data;

        const newSubmission = await SubmissionModel.create({
            sekolah_id: schoolId,
            diajukan_oleh: submittedBy,
            jenis_perubahan: updateType,
            data_yang_diajukan: dataAfter,
            data_sebelumnya: dataBefore,
            status_pengajuan: 'Pending',
        });

        return this.getSubmissionById(newSubmission.id);
    }

    static async approveSubmission(id, reviewerId) {
        const submission = await SubmissionModel.approve(id, reviewerId);
        if (!submission) return null;

        // Apply changes to school
        if (submission.data_yang_diajukan) {
            const schoolData = {};
            const fieldMapping = {
                jumlah_siswa: 'studentCount',
                jumlah_siswa_rentan: 'vulnerableStudentCount',
                jumlah_penerima_pip: 'pipRecipientCount',
                jumlah_guru: 'teacherCount',
                jumlah_ruang_kelas: 'classroomCount',
                kondisi_bangunan: 'buildingCondition',
                alamat_lengkap: 'address',
                nomor_telepon: 'phone',
                email_sekolah: 'email',
                nama_kepala_sekolah: 'principalName',
            };

            for (const [dbField, modelField] of Object.entries(fieldMapping)) {
                if (submission.data_yang_diajukan[modelField] !== undefined) {
                    schoolData[dbField] = submission.data_yang_diajukan[modelField];
                }
            }

            if (Object.keys(schoolData).length > 0) {
                await SchoolModel.updateById(submission.sekolah_id, schoolData);
            }
        }

        return this.getSubmissionById(id);
    }

    static async rejectSubmission(id, reviewerId) {
        const submission = await SubmissionModel.reject(id, reviewerId);
        if (!submission) return null;
        return this.getSubmissionById(id);
    }

    static async getSubmissionStatistics() {
        const submissions = await SubmissionModel.findAllWithDetails({});
        const data = submissions.data;

        return {
            total: data.length,
            pending: data.filter(s => s.status_pengajuan === 'Pending').length,
            approved: data.filter(s => s.status_pengajuan === 'Approved').length,
            rejected: data.filter(s => s.status_pengajuan === 'Rejected').length,
        };
    }
}

module.exports = SubmissionService;