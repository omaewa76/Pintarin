// src/services/postgres/district.js

const { DistrictModel } = require('../../models');
const { mapDistrictDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');

class DistrictService {
    static async getAllDistricts(filters) {
        const result = await DistrictModel.findAllWithRisk(filters);
        return {
            data: result.data.map(mapDistrictDBToModel),
            pagination: result.pagination,
        };
    }

    static async getDistrictById(id) {
        const district = await DistrictModel.findByIdWithSchools(id);
        if (!district) return null;
        return mapDistrictDBToModel(district);
    }

    static async createDistrict(data) {
        const newDistrict = await DistrictModel.create({
            nama_kecamatan: data.name,
            luas_wilayah_km2: data.areaKm2,
            jumlah_penduduk: data.population,
            data_geojson: data.geojson,
        });
        return mapDistrictDBToModel(newDistrict);
    }

    static async updateDistrict(id, data) {
        const updateData = {};
        if (data.name) updateData.nama_kecamatan = data.name;
        if (data.areaKm2 !== undefined) updateData.luas_wilayah_km2 = data.areaKm2;
        if (data.population !== undefined) updateData.jumlah_penduduk = data.population;
        if (data.geojson) updateData.data_geojson = data.geojson;

        const updatedDistrict = await DistrictModel.updateById(id, updateData);
        if (!updatedDistrict) return null;
        return mapDistrictDBToModel(updatedDistrict);
    }

    static async deleteDistrict(id) {
        return await DistrictModel.deleteById(id);
    }

    static async validateDistrictExists(id) {
        const district = await this.getDistrictById(id);
        if (!district) {
            throw new InvariantError('Kecamatan tidak ditemukan', 404);
        }
        return district;
    }
}

module.exports = DistrictService;