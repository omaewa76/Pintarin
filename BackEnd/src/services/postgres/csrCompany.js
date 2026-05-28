// src/services/postgres/csrCompany.js

const { CSRCompanyModel } = require('../../models');
const { mapCSRCompanyDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

// Service untuk manajemen perusahaan CSR, termasuk pengambilan daftar perusahaan dengan filter dan pagination, pengambilan detail perusahaan berdasarkan ID, pembuatan perusahaan baru, pembaruan data perusahaan, verifikasi perusahaan, dan penghapusan perusahaan
class CSRCompanyService {
    static async getAllCompanies(filters) {
        const result = await CSRCompanyModel.findAllWithFilters(filters);
        return {
            data: result.data.map(mapCSRCompanyDBToModel),
            pagination: result.pagination,
        };
    }

    // Fungsi untuk mengambil detail perusahaan CSR berdasarkan ID, dengan join ke tabel pengguna untuk mendapatkan informasi tambahan seperti nama kontak, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
    static async getCompanyById(id) {
        const company = await CSRCompanyModel.findById(id);
        if (!company) return null;
        return mapCSRCompanyDBToModel(company);
    }

    static async getCompanyByUserId(userId) {
        const company = await CSRCompanyModel.findByUserId(userId);
        if (!company) return null;
        return mapCSRCompanyDBToModel(company);
    }

    // Fungsi untuk membuat perusahaan CSR baru, dengan menyimpan data perusahaan ke database dan kemudian mengambil detail perusahaan tersebut berdasarkan ID yang baru dibuat, dengan join ke tabel pengguna untuk mendapatkan informasi tambahan seperti nama kontak, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
    static async createCompany(data) {
        const { name, industry, contactPerson, contactEmail, contactPhone, address } = data;

        const newCompany = await CSRCompanyModel.create({
            nama_perusahaan: name,
            bidang_usaha: industry,
            kontak_person: contactPerson,
            email_kontak: contactEmail,
            telepon_kontak: contactPhone,
            alamat_kantor: address,
            sudah_diverifikasi: false,
        });

        return mapCSRCompanyDBToModel(newCompany);
    }

    // Fungsi untuk memperbarui data perusahaan CSR, dengan menyimpan perubahan data ke database dan kemudian mengambil detail perusahaan tersebut berdasarkan ID setelah pembaruan dilakukan, dengan join ke tabel pengguna untuk mendapatkan informasi tambahan seperti nama kontak, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
    static async updateCompany(id, data) {
        const updateData = {};
        if (data.name) updateData.nama_perusahaan = data.name;
        if (data.industry) updateData.bidang_usaha = data.industry;
        if (data.contactPerson) updateData.kontak_person = data.contactPerson;
        if (data.contactEmail) updateData.email_kontak = data.contactEmail;
        if (data.contactPhone) updateData.telepon_kontak = data.contactPhone;
        if (data.address) updateData.alamat_kantor = data.address;
        if (data.isVerified !== undefined) updateData.sudah_diverifikasi = data.isVerified;

        const updatedCompany = await CSRCompanyModel.updateById(id, updateData);
        if (!updatedCompany) return null;
        return mapCSRCompanyDBToModel(updatedCompany);
    }

    // Fungsi untuk memverifikasi perusahaan CSR, dengan memperbarui status verifikasi perusahaan di database dan kemudian mengambil detail perusahaan tersebut berdasarkan ID setelah verifikasi dilakukan, dengan join ke tabel pengguna untuk mendapatkan informasi tambahan seperti nama kontak, serta mendukung filter dan pagination sesuai dengan parameter yang diberikan
    static async verifyCompany(id) {
        const company = await CSRCompanyModel.verify(id);
        if (!company) return null;
        return mapCSRCompanyDBToModel(company);
    }

    static async deleteCompany(id) {
        return await CSRCompanyModel.deleteById(id);
    }

    static async validateCompanyExists(id) {
        const company = await this.getCompanyById(id);
        if (!company) {
            throw new InvariantError('Perusahaan CSR tidak ditemukan', 404);
        }
        return company;
    }
}

module.exports = CSRCompanyService;