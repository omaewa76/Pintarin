// src/services/postgres/csr.js

const { PredictionModel, CSRMatchLogModel, DistrictModel } = require('../../models');
const { mapDistrictForCSRDBToModel, mapCSRMatchLogDBToModel } = require('../../utils');

class CSRService {
    // Fungsi untuk membangun alasan rekomendasi berdasarkan faktor risiko dan fokus area, dengan memberikan penjelasan yang jelas dan informatif tentang mengapa suatu kecamatan direkomendasikan untuk intervensi atau bantuan dalam program CSR, sehingga dapat membantu pengguna memahami konteks dan kebutuhan di setiap kecamatan yang direkomendasikan
    static buildReason(district, focusArea) {
        const reasons = [];

        if (district.riskLabel === 'Tinggi') {
            reasons.push(`Risiko pendidikan tinggi (score: ${district.riskScore?.toFixed(1)})`);
        }
        if (district.totalSd < 10) {
            reasons.push(`Jumlah SD terbatas (${district.totalSd} sekolah)`);
        }
        if (district.rasioPip < 15) {
            reasons.push(`Coverage PIP rendah (${district.rasioPip?.toFixed(1)}%)`);
        }

        return reasons.length > 0 ? reasons.join(', ') : 'Kebutuhan menyeluruh di semua aspek';
    }

    // Fungsi untuk menghitung skor kecocokan berdasarkan faktor risiko dan fokus area, dengan memberikan bobot yang berbeda untuk setiap faktor sesuai dengan fokus area yang dipilih, sehingga dapat memberikan rekomendasi yang lebih relevan dan tepat sasaran untuk intervensi atau bantuan yang mungkin diperlukan di setiap kecamatan
    static calculateMatchScore(district, focusArea) {
        let matchScore = (district.riskScore || 0) * 0.4;

        switch (focusArea) {
            case 'infrastruktur_sd':
                if (district.totalSd < 10) matchScore += 35;
                if (district.totalSd < 5) matchScore += 15;
                break;
            case 'beasiswa':
                if (district.rasioPip < 15) matchScore += 30;
                if (district.rasioPip < 10) matchScore += 15;
                break;
            case 'angka_putus_sekolah':
                if (district.riskLabel === 'Tinggi') matchScore += 40;
                if (district.riskLabel === 'Sedang') matchScore += 15;
                break;
            default:
                if (district.riskLabel === 'Tinggi') matchScore += 20;
                if (district.totalSd < 10) matchScore += 10;
                if (district.rasioPip < 15) matchScore += 10;
                break;
        }

        return Math.min(Math.round(matchScore), 100);
    }

    // Fungsi untuk mengambil daftar kecamatan dengan skor risiko terkini, dengan join ke tabel prediksi untuk mendapatkan informasi skor risiko terbaru, serta menyertakan informasi tambahan seperti jumlah sekolah dasar, rasio penerima PIP, dan jumlah warga rentan, sehingga dapat memberikan gambaran lengkap tentang kondisi setiap kecamatan dalam konteks risiko pendidikan dan kebutuhan intervensi atau bantuan yang mungkin diperlukan
    static async getAllDistrictsWithLatestRisk() {
        const predictions = await PredictionModel.getLatestPredictions(100);
        const districts = await DistrictModel.findAllWithRisk({ limit: 100 });

        const predictionMap = new Map();
        predictions.forEach(p => {
            predictionMap.set(p.kecamatan_id, {
                riskLabel: p.kategori_risiko,
                riskScore: p.rata_rata_skor,
                confidenceScore: p.confidence_score,
                finalLabel: p.final_label,
            });
        });

        return districts.data.map(district => {
            const pred = predictionMap.get(district.id) || {};
            return {
                districtId: district.id,
                districtName: district.nama_kecamatan,
                riskLabel: pred.riskLabel || district.current_risk_score ? 'Sedang' : 'Rendah',
                riskScore: pred.riskScore || district.current_risk_score || 0,
                confidenceScore: pred.confidenceScore || 0.5,
                totalSd: 0, 
                rasioPip: 0,
                totalWargaRentan: 0,
            };
        });
    }

    // Fungsi untuk mengambil rekomendasi kecamatan yang paling cocok untuk intervensi atau bantuan berdasarkan fokus area dan parameter lainnya, dengan menghitung skor kecocokan untuk setiap kecamatan berdasarkan faktor risiko dan kebutuhan yang relevan dengan fokus area yang dipilih, serta menyimpan log rekomendasi tersebut ke database untuk keperluan analisis dan pemantauan di masa mendatang, sehingga dapat memberikan rekomendasi yang lebih tepat sasaran dan membantu dalam pengambilan keputusan terkait intervensi atau bantuan yang diperlukan di setiap kecamatan
    static async getMatchingRecommendations(params) {
        const { focusArea = 'umum', budgetRange = 'semua', userId = null } = params;

        const districts = await this.getAllDistrictsWithLatestRisk();

        const scored = districts.map(district => ({
            kecamatan_id: district.districtId,
            nama_kecamatan: district.districtName,
            risk_label: district.riskLabel,
            risk_score: district.riskScore,
            total_sd: district.totalSd,
            rasio_pip: district.rasioPip,
            total_warga_rentan: district.totalWargaRentan,
            match_score: this.calculateMatchScore(district, focusArea),
            confidence_score: district.confidenceScore,
            alasan: this.buildReason(district, focusArea),
        }));

        const top5 = scored
            .sort((a, b) => b.match_score - a.match_score)
            .slice(0, 5);

        await this.saveMatchLog({
            focusArea,
            budgetRange,
            userId,
            results: top5,
        });

        return {
            focus_area: focusArea,
            budget_range: budgetRange,
            recommended: top5,
            generated_at: new Date().toISOString(),
        };
    }

    // Fungsi untuk menyimpan log rekomendasi kecamatan yang paling cocok untuk intervensi atau bantuan berdasarkan fokus area dan parameter lainnya, dengan menyimpan data log ke database menggunakan model CSRMatchLogModel, sehingga dapat digunakan untuk keperluan analisis dan pemantauan di masa mendatang terkait efektivitas rekomendasi yang diberikan dan kebutuhan intervensi atau bantuan di setiap kecamatan
    static async saveMatchLog(data) {
        const { focusArea, budgetRange, userId, results } = data;
        const log = await CSRMatchLogModel.create({
            focusArea,
            budgetRange,
            userId,
            results,
        });
        return mapCSRMatchLogDBToModel(log);
    }

    static async getMatchHistory(userId, limit = 10) {
        const history = await CSRMatchLogModel.getHistoryByUserId(userId, limit);
        return history.map(mapCSRMatchLogDBToModel);
    }
}

module.exports = CSRService;