// src/utils/index.js

// MAPPER UNTUK TABEL KECAMATAN
const mapDistrictDBToModel = (dbRow) => ({
  id: dbRow.id,
  name: dbRow.nama_kecamatan,
  areaKm2: dbRow.luas_wilayah_km2 ? parseFloat(dbRow.luas_wilayah_km2) : null,
  population: dbRow.jumlah_penduduk,
  geojson: dbRow.data_geojson,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at
});

// MAPPER UNTUK TABEL PERUSAHAAN CSR
const mapCSRCompanyDBToModel = (dbRow) => ({
  id: dbRow.id,
  name: dbRow.nama_perusahaan,
  industry: dbRow.bidang_usaha,
  contactPerson: dbRow.kontak_person,
  contactEmail: dbRow.email_kontak,
  contactPhone: dbRow.telepon_kontak,
  address: dbRow.alamat_kantor,
  isVerified: dbRow.sudah_diverifikasi,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at
});

// MAPPER UNTUK TABEL SEKOLAH
const mapSchoolDBToModel = (dbRow) => ({
  id: dbRow.id,
  name: dbRow.nama_sekolah,
  npsn: dbRow.npsn,
  districtId: dbRow.kecamatan_id,
  districtName: dbRow.nama_kecamatan,
  level: dbRow.jenjang,
  accreditation: dbRow.akreditasi,
  studentCount: dbRow.jumlah_siswa,
  vulnerableStudentCount: dbRow.jumlah_siswa_rentan,
  pipRecipientCount: dbRow.jumlah_penerima_pip,
  teacherCount: dbRow.jumlah_guru,
  classroomCount: dbRow.jumlah_ruang_kelas,
  buildingCondition: dbRow.kondisi_bangunan,
  latitude: dbRow.latitude ? parseFloat(dbRow.latitude) : null,
  longitude: dbRow.longitude ? parseFloat(dbRow.longitude) : null,
  address: dbRow.alamat_lengkap,
  phone: dbRow.nomor_telepon,
  email: dbRow.email_sekolah,
  principalName: dbRow.nama_kepala_sekolah,
  status: dbRow.status_operasional,
  isVerified: dbRow.data_terverifikasi,
  riskScore: dbRow.risk_score ? parseFloat(dbRow.risk_score) : null,
  riskCategory: dbRow.risk_category,
  lastComputed: dbRow.last_computed,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at
});

// MAPPER UNTUK TABEL PENGGUNA
const mapUserDBToModel = (dbRow) => ({
  id: dbRow.id,
  fullName: dbRow.nama_lengkap,
  email: dbRow.email,
  passwordHash: dbRow.kata_sandi_hash,
  role: dbRow.peran,
  schoolId: dbRow.sekolah_id,
  csrCompanyId: dbRow.perusahaan_csr_id,
  isActive: dbRow.akun_aktif,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at
});

// Untuk autentikasi
const mapUserAuthToModel = (dbRow) => ({
  id: dbRow.id,
  email: dbRow.email,
  passwordHash: dbRow.kata_sandi_hash,
  role: dbRow.peran,
  schoolId: dbRow.sekolah_id,
  csrCompanyId: dbRow.perusahaan_csr_id,
  isActive: dbRow.akun_aktif
});

// Untuk response login
const mapUserLoginResponse = (dbRow, token, refreshToken = null) => ({
  user: {
    id: dbRow.id,
    name: dbRow.nama_lengkap,
    email: dbRow.email,
    role: dbRow.peran,
    schoolId: dbRow.sekolah_id,
    csrCompanyId: dbRow.perusahaan_csr_id
  },
  access_token: token,
  ...(refreshToken && { refresh_token: refreshToken })
});

// MAPPER UNTUK TABEL SKOR RISIKO SEKOLAH
const mapRiskScoreDBToModel = (dbRow) => ({
  id: dbRow.id,
  schoolId: dbRow.sekolah_id,
  schoolName: dbRow.nama_sekolah,
  score: dbRow.nilai_skor ? parseFloat(dbRow.nilai_skor) : null,
  category: dbRow.kategori_risiko,
  modelVersion: dbRow.versi_model_ai,
  computedAt: dbRow.waktu_perhitungan,
  featuresSnapshot: dbRow.data_fitur_saat_itu
});

// MAPPER UNTUK TABEL SKOR RISIKO KECAMATAN
const mapDistrictRiskDBToModel = (dbRow) => ({
  id: dbRow.id,
  districtId: dbRow.kecamatan_id,
  districtName: dbRow.nama_kecamatan,
  averageScore: dbRow.rata_rata_skor ? parseFloat(dbRow.rata_rata_skor) : null,
  highRiskCount: dbRow.jumlah_risiko_tinggi,
  computedAt: dbRow.waktu_perhitungan,
  modelVersion: dbRow.versi_model_ai
});

// MAPPER UNTUK TABEL PENGAJUAN BANTUAN
const mapAssistanceRequestDBToModel = (dbRow) => ({
  id: dbRow.id,
  csrCompanyId: dbRow.perusahaan_csr_id,
  csrCompanyName: dbRow.nama_perusahaan,
  schoolId: dbRow.sekolah_id,
  schoolName: dbRow.nama_sekolah,
  type: dbRow.jenis_bantuan,
  description: dbRow.deskripsi,
  amount: dbRow.nominal_rupiah ? parseInt(dbRow.nominal_rupiah) : 0,
  status: dbRow.status_pengajuan,
  reviewedBy: dbRow.diverifikasi_oleh,
  reviewedByName: dbRow.nama_verifikator,
  reviewedAt: dbRow.waktu_verifikasi,
  rejectionReason: dbRow.alasan_ditolak,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at
});

// MAPPER UNTUK TABEL PENGAJUAN PERUBAHAN DATA
const mapSubmissionDBToModel = (dbRow) => ({
  id: dbRow.id,
  schoolId: dbRow.sekolah_id,
  schoolName: dbRow.nama_sekolah,
  submittedBy: dbRow.diajukan_oleh,
  submittedByName: dbRow.nama_pengaju,
  updateType: dbRow.jenis_perubahan,
  dataBefore: dbRow.data_sebelumnya,
  dataAfter: dbRow.data_yang_diajukan,
  status: dbRow.status_pengajuan,
  reviewedBy: dbRow.diverifikasi_oleh,
  reviewedByName: dbRow.nama_reviewer,
  reviewedAt: dbRow.waktu_verifikasi,
  createdAt: dbRow.created_at
});

// MAPPER UNTUK TABEL NOTIFIKASI
const mapNotificationDBToModel = (dbRow) => ({
  id: dbRow.id,
  userId: dbRow.pengguna_id,
  userName: dbRow.nama_pengguna,
  title: dbRow.judul_notifikasi,
  message: dbRow.isi_pesan,
  type: dbRow.tipe_notifikasi,
  isRead: dbRow.sudah_dibaca,
  link: dbRow.tautan_terkait,
  createdAt: dbRow.created_at
});

// MAPPER UNTUK SKOR RISIKO KECAMATAN (dengan confidence)
const mapDistrictRiskWithConfidenceDBToModel = (dbRow) => ({
  id: dbRow.id,
  districtId: dbRow.kecamatan_id,
  districtName: dbRow.nama_kecamatan,
  riskScore: dbRow.rata_rata_skor ? parseFloat(dbRow.rata_rata_skor) : null,
  riskCategory: dbRow.kategori_risiko,
  predictedLabel: dbRow.kategori_risiko,
  finalLabel: dbRow.final_label,
  confidenceScore: dbRow.confidence_score ? parseFloat(dbRow.confidence_score) : null,
  confidenceLevel: dbRow.confidence_level,
  needsHumanReview: dbRow.needs_human_review,
  isHumanValidated: dbRow.is_human_validated,
  validationNote: dbRow.validation_note,
  computedAt: dbRow.waktu_perhitungan,
  modelVersion: dbRow.versi_model_ai,
  createdAt: dbRow.created_at,
  updatedAt: dbRow.updated_at
});

// MAPPER UNTUK PREDICTION VALIDATIONS
const mapPredictionValidationDBToModel = (dbRow) => ({
  id: dbRow.id,
  predictionId: dbRow.prediction_id,
  officerId: dbRow.officer_id,
  officerName: dbRow.officer_name || dbRow.nama_petugas,
  action: dbRow.action,
  reason: dbRow.reason,
  correctedLabel: dbRow.corrected_label,
  oldConfidenceScore: dbRow.old_confidence_score ? parseFloat(dbRow.old_confidence_score) : null,
  newConfidenceScore: dbRow.new_confidence_score ? parseFloat(dbRow.new_confidence_score) : null,
  validatedAt: dbRow.validated_at
});

// MAPPER UNTUK CSR MATCH LOGS
const mapCSRMatchLogDBToModel = (dbRow) => ({
  id: dbRow.id,
  focusArea: dbRow.focus_area,
  budgetRange: dbRow.budget_range,
  userId: dbRow.user_id,
  userName: dbRow.nama_pengguna,
  results: dbRow.results_json,
  createdAt: dbRow.created_at
});

// MAPPER UNTUK DATA KECAMATAN UNTUK CSR MATCHING
const mapDistrictForCSRDBToModel = (dbRow) => ({
  id: dbRow.id,
  districtId: dbRow.kecamatan_id,
  districtName: dbRow.nama_kecamatan,
  riskLabel: dbRow.risk_label,
  riskScore: dbRow.risk_score ? parseFloat(dbRow.risk_score) : null,
  confidenceScore: dbRow.confidence_score ? parseFloat(dbRow.confidence_score) : null,
  totalSd: parseInt(dbRow.total_sd) || 0,
  rasioPip: parseFloat(dbRow.rasio_pip_per_rentan) || 0,
  totalWargaRentan: parseInt(dbRow.total_warga_rentan) || 0
});

// EXPORT SEMUA MAPPER
module.exports = {
  // Kecamatan
  mapDistrictDBToModel,

  // Perusahaan CSR
  mapCSRCompanyDBToModel,

  // Sekolah
  mapSchoolDBToModel,

  // Pengguna
  mapUserDBToModel,
  mapUserAuthToModel,
  mapUserLoginResponse,

  // Skor Risiko
  mapRiskScoreDBToModel,
  mapDistrictRiskDBToModel,

  // Pengajuan Bantuan
  mapAssistanceRequestDBToModel,

  // Pengajuan Perubahan Data
  mapSubmissionDBToModel,

  // Notifikasi
  mapNotificationDBToModel,

  mapDistrictRiskWithConfidenceDBToModel,
  mapPredictionValidationDBToModel,
  mapCSRMatchLogDBToModel,
  mapDistrictForCSRDBToModel
};