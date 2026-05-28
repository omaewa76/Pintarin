// src/services/postgres/school.js

const { SchoolModel, DistrictModel } = require('../../models');
const { mapSchoolDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

// Service untuk manajemen data sekolah, termasuk pengambilan daftar sekolah dengan filter dan pagination, pengambilan detail sekolah berdasarkan ID, pembaruan data sekolah, verifikasi sekolah, dan pengambilan statistik sekolah berdasarkan berbagai kriteria seperti jumlah siswa, kondisi bangunan, dan tingkat risiko.
class SchoolService {
    static async getAllSchools(filters) {
        const result = await SchoolModel.findAllWithDistrict(filters);
        return {
            data: result.data.map(mapSchoolDBToModel),
            pagination: result.pagination,
        };
    }

    // Fungsi untuk mengambil detail sekolah berdasarkan ID, termasuk informasi risiko terkini dan history risiko untuk periode tertentu, hanya bisa diakses oleh sekolah itu sendiri, CSR yang bekerja sama dengan sekolah tersebut, atau admin Dinas
    static async getSchoolById(id) {
        const school = await SchoolModel.findByIdWithRisk(id);
        if (!school) return null;
        return mapSchoolDBToModel(school);
    }

    static async getSchoolByUserId(userId) {
        const school = await SchoolModel.findByUserId(userId);
        if (!school) return null;
        return mapSchoolDBToModel(school);
    }

    static async verifySchool(id) {
        const school = await SchoolModel.verify(id);
        if (!school) return null;
        return mapSchoolDBToModel(school);
    }

    // Fungsi untuk memperbarui data sekolah, dengan menyimpan perubahan data ke database dan kemudian mengambil detail sekolah tersebut berdasarkan ID setelah pembaruan dilakukan, dengan join ke tabel kecamatan untuk mendapatkan nama kecamatan terkait, serta menyertakan informasi risiko terkini dan history risiko untuk memberikan gambaran lengkap tentang profil sekolah tersebut
    static async updateSchool(id, data) {
        const updateData = {};
        const fieldMapping = {
            name: 'nama_sekolah',
            npsn: 'npsn',
            districtId: 'kecamatan_id',
            level: 'jenjang',
            accreditation: 'akreditasi',
            studentCount: 'jumlah_siswa',
            vulnerableStudentCount: 'jumlah_siswa_rentan',
            pipRecipientCount: 'jumlah_penerima_pip',
            teacherCount: 'jumlah_guru',
            classroomCount: 'jumlah_ruang_kelas',
            buildingCondition: 'kondisi_bangunan',
            latitude: 'latitude',
            longitude: 'longitude',
            address: 'alamat_lengkap',
            phone: 'nomor_telepon',
            email: 'email_sekolah',
            principalName: 'nama_kepala_sekolah',
            status: 'status_operasional',
        };

        for (const [modelField, dbField] of Object.entries(fieldMapping)) {
            if (data[modelField] !== undefined) {
                updateData[dbField] = data[modelField];
            }
        }

        const updatedSchool = await SchoolModel.updateById(id, updateData);
        if (!updatedSchool) return null;
        return mapSchoolDBToModel(updatedSchool);
    }

    static async getSchoolStatistics() {
        return await SchoolModel.getStatistics();
    }

    static async validateSchoolExists(id) {
        const school = await this.getSchoolById(id);
        if (!school) {
            throw new InvariantError('Sekolah tidak ditemukan', 404);
        }
        return school;
    }
}

module.exports = SchoolService;