// src/services/postgres/csrCompany.js

const { CSRCompanyModel } = require('../../models');
const { mapCSRCompanyDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

class CSRCompanyService {
    static async getAllCompanies(filters) {
        const result = await CSRCompanyModel.findAllWithFilters(filters);
        return {
            data: result.data.map(mapCSRCompanyDBToModel),
            pagination: result.pagination,
        };
    }

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