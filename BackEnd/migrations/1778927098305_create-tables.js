/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = {
    id: { type: 'serial', primaryKey: true },
    created_at: { type: 'timestamp', notNull: true, default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'timestamp', notNull: true, default: 'CURRENT_TIMESTAMP' }
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {

    // Membuat jenis data enumerasi untuk mengelompokkan pilihan yang tersedia dalam sistem
    pgm.createType('role_pengguna', ['dinas', 'sekolah', 'csr']);
    pgm.createType('jenjang_sekolah', ['SD', 'SMP', 'SMA', 'SMK']);
    pgm.createType('tingkat_akreditasi', ['A', 'B', 'C', 'Belum Terakreditasi']);
    pgm.createType('kondisi_bangunan', ['Baik', 'Rusak Ringan', 'Rusak Sedang', 'Rusak Berat']);
    pgm.createType('status_sekolah', ['Aktif', 'Tidak Aktif']);
    pgm.createType('kategori_risiko', ['Tinggi', 'Sedang', 'Rendah']);
    pgm.createType('jenis_bantuan', ['Infrastruktur', 'Beasiswa', 'Perangkat Digital', 'Buku', 'Lainnya']);
    pgm.createType('status_pengajuan', ['Pending', 'Approved', 'Rejected', 'Completed']);
    pgm.createType('status_submission', ['Pending', 'Approved', 'Rejected']);
    pgm.createType('tipe_notifikasi', ['info', 'warning', 'success', 'error']);

    // Membangun tabel kecamatan sebagai entitas wilayah administratif
    pgm.createTable('kecamatan', {
        id: 'id',
        nama_kecamatan: { type: 'varchar(100)', notNull: true },
        luas_wilayah_km2: { type: 'decimal(8,2)' },
        jumlah_penduduk: { type: 'integer' },
        data_geojson: { type: 'text' }
    });

    // Membangun tabel perusahaan CSR sebagai entitas mitra penyedia bantuan
    pgm.createTable('perusahaan_csr', {
        id: 'id',
        nama_perusahaan: { type: 'varchar(150)', notNull: true },
        bidang_usaha: { type: 'varchar(100)' },
        kontak_person: { type: 'varchar(100)' },
        email_kontak: { type: 'varchar(150)' },
        telepon_kontak: { type: 'varchar(20)' },
        alamat_kantor: { type: 'text' },
        sudah_diverifikasi: { type: 'boolean', default: false },
        created_at: 'created_at',
        updated_at: 'updated_at'
    });

    // Membangun tabel sekolah sebagai entitas utama penerima manfaat
    pgm.createTable('sekolah', {
        id: 'id',
        nama_sekolah: { type: 'varchar(150)', notNull: true },
        npsn: { type: 'varchar(20)', notNull: true, unique: true },
        kecamatan_id: { type: 'integer', references: 'kecamatan(id)', onDelete: 'SET NULL' },
        jenjang: { type: 'jenjang_sekolah', notNull: true },
        akreditasi: { type: 'tingkat_akreditasi', notNull: true },
        jumlah_siswa: { type: 'integer', default: 0 },
        jumlah_siswa_rentan: { type: 'integer', default: 0 },
        jumlah_penerima_pip: { type: 'integer', default: 0 },
        jumlah_guru: { type: 'integer', default: 0 },
        jumlah_ruang_kelas: { type: 'integer', default: 0 },
        kondisi_bangunan: { type: 'kondisi_bangunan', notNull: true },
        latitude: { type: 'decimal(10,8)' },
        longitude: { type: 'decimal(11,8)' },
        alamat_lengkap: { type: 'text' },
        nomor_telepon: { type: 'varchar(20)' },
        email_sekolah: { type: 'varchar(150)' },
        nama_kepala_sekolah: { type: 'varchar(100)' },
        status_operasional: { type: 'status_sekolah', default: 'Aktif' },
        data_terverifikasi: { type: 'boolean', default: false },
        created_at: 'created_at',
        updated_at: 'updated_at'
    });

    // Membangun tabel pengguna sebagai entitas pengakses sistem
    pgm.createTable('pengguna', {
        id: 'id',
        nama_lengkap: { type: 'varchar(100)', notNull: true },
        email: { type: 'varchar(150)', notNull: true, unique: true },
        kata_sandi_hash: { type: 'varchar(255)', notNull: true },
        peran: { type: 'role_pengguna', notNull: true },
        sekolah_id: { type: 'integer', references: 'sekolah(id)', onDelete: 'SET NULL' },
        perusahaan_csr_id: { type: 'integer', references: 'perusahaan_csr(id)', onDelete: 'SET NULL' },
        akun_aktif: { type: 'boolean', default: true },
        created_at: 'created_at',
        updated_at: 'updated_at'
    });

    // Membangun tabel skor risiko sekolah sebagai hasil analisis kecenderungan kerentanan
    pgm.createTable('skor_risiko_sekolah', {
        id: 'id',
        sekolah_id: { type: 'integer', notNull: true, references: 'sekolah(id)', onDelete: 'CASCADE' },
        nilai_skor: { type: 'decimal(5,2)', notNull: true },
        kategori_risiko: { type: 'kategori_risiko', notNull: true },
        versi_model_ai: { type: 'varchar(20)', notNull: true },
        waktu_perhitungan: { type: 'timestamp', notNull: true, default: 'CURRENT_TIMESTAMP' },
        data_fitur_saat_itu: { type: 'jsonb' }
    });

    // Membangun tabel skor risiko kecamatan sebagai agregasi data tingkat wilayah
    pgm.createTable('skor_risiko_kecamatan', {
        id: 'id',
        kecamatan_id: { type: 'integer', notNull: true, references: 'kecamatan(id)', onDelete: 'CASCADE' },
        rata_rata_skor: { type: 'decimal(5,2)', notNull: true },
        jumlah_risiko_tinggi: { type: 'integer', notNull: true, default: 0 },
        waktu_perhitungan: { type: 'timestamp', notNull: true, default: 'CURRENT_TIMESTAMP' },
        versi_model_ai: { type: 'varchar(20)', notNull: true }
    });

    // Membangun tabel pengajuan bantuan sebagai pencatatan permohonan dari CSR
    pgm.createTable('pengajuan_bantuan', {
        id: 'id',
        perusahaan_csr_id: { type: 'integer', notNull: true, references: 'perusahaan_csr(id)', onDelete: 'CASCADE' },
        sekolah_id: { type: 'integer', notNull: true, references: 'sekolah(id)', onDelete: 'CASCADE' },
        jenis_bantuan: { type: 'jenis_bantuan', notNull: true },
        deskripsi: { type: 'text', notNull: true },
        nominal_rupiah: { type: 'bigint', notNull: true },
        status_pengajuan: { type: 'status_pengajuan', notNull: true, default: 'Pending' },
        diverifikasi_oleh: { type: 'integer', references: 'pengguna(id)', onDelete: 'SET NULL' },
        waktu_verifikasi: { type: 'timestamp' },
        alasan_ditolak: { type: 'text' },
        created_at: 'created_at',
        updated_at: 'updated_at'
    });

    // Membangun tabel pengajuan perubahan data sebagai riwayat pembaruan informasi sekolah
    pgm.createTable('pengajuan_perubahan_data', {
        id: 'id',
        sekolah_id: { type: 'integer', notNull: true, references: 'sekolah(id)', onDelete: 'CASCADE' },
        diajukan_oleh: { type: 'integer', notNull: true, references: 'pengguna(id)', onDelete: 'CASCADE' },
        jenis_perubahan: { type: 'varchar(100)', notNull: true },
        data_sebelumnya: { type: 'jsonb' },
        data_yang_diajukan: { type: 'jsonb' },
        status_pengajuan: { type: 'status_submission', notNull: true, default: 'Pending' },
        diverifikasi_oleh: { type: 'integer', references: 'pengguna(id)', onDelete: 'SET NULL' },
        waktu_verifikasi: { type: 'timestamp' },
        created_at: 'created_at'
    });

    // Membangun tabel notifikasi sebagai sistem pemberitahuan dalam aplikasi
    pgm.createTable('notifikasi', {
        id: 'id',
        pengguna_id: { type: 'integer', notNull: true, references: 'pengguna(id)', onDelete: 'CASCADE' },
        judul_notifikasi: { type: 'varchar(200)', notNull: true },
        isi_pesan: { type: 'text', notNull: true },
        tipe_notifikasi: { type: 'tipe_notifikasi', notNull: true, default: 'info' },
        sudah_dibaca: { type: 'boolean', default: false },
        tautan_terkait: { type: 'varchar(255)' },
        created_at: 'created_at'
    });

    // Membangun indeks untuk mengoptimalkan kinerja pencarian data pada tabel-tabel utama
    pgm.createIndex('pengguna', 'email', { name: 'idx_pengguna_email' });
    pgm.createIndex('pengguna', 'peran', { name: 'idx_pengguna_peran' });
    pgm.createIndex('sekolah', 'kecamatan_id', { name: 'idx_sekolah_kecamatan' });
    pgm.createIndex('sekolah', 'npsn', { name: 'idx_sekolah_npsn' });
    pgm.createIndex('sekolah', 'jenjang', { name: 'idx_sekolah_jenjang' });
    pgm.createIndex('sekolah', 'data_terverifikasi', { name: 'idx_sekolah_verifikasi' });
    pgm.createIndex('skor_risiko_sekolah', 'sekolah_id', { name: 'idx_risiko_sekolah' });
    pgm.createIndex('skor_risiko_sekolah', 'waktu_perhitungan', { name: 'idx_risiko_waktu' });
    pgm.createIndex('skor_risiko_sekolah', 'kategori_risiko', { name: 'idx_risiko_kategori' });
    pgm.createIndex('pengajuan_bantuan', 'status_pengajuan', { name: 'idx_bantuan_status' });
    pgm.createIndex('pengajuan_bantuan', 'sekolah_id', { name: 'idx_bantuan_sekolah' });
    pgm.createIndex('pengajuan_bantuan', 'perusahaan_csr_id', { name: 'idx_bantuan_perusahaan' });
    pgm.createIndex('notifikasi', 'pengguna_id', { name: 'idx_notifikasi_user' });
    pgm.createIndex('notifikasi', 'sudah_dibaca', { name: 'idx_notifikasi_belum_dibaca' });
    pgm.createIndex('notifikasi', 'created_at', { name: 'idx_notifikasi_tanggal' });
    pgm.createIndex('pengajuan_perubahan_data', 'sekolah_id', { name: 'idx_perubahan_sekolah' });
    pgm.createIndex('pengajuan_perubahan_data', 'status_pengajuan', { name: 'idx_perubahan_status' });

    console.log('Migrasi berhasil dijalankan. Seluruh struktur database telah terbangun.');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    console.log('Proses rollback dimulai. Menghapus seluruh struktur database...');

    pgm.dropTable('notifikasi');
    pgm.dropTable('pengajuan_perubahan_data');
    pgm.dropTable('pengajuan_bantuan');
    pgm.dropTable('skor_risiko_kecamatan');
    pgm.dropTable('skor_risiko_sekolah');
    pgm.dropTable('pengguna');
    pgm.dropTable('sekolah');
    pgm.dropTable('perusahaan_csr');
    pgm.dropTable('kecamatan');

    pgm.dropType('tipe_notifikasi');
    pgm.dropType('status_submission');
    pgm.dropType('status_pengajuan');
    pgm.dropType('jenis_bantuan');
    pgm.dropType('kategori_risiko');
    pgm.dropType('status_sekolah');
    pgm.dropType('kondisi_bangunan');
    pgm.dropType('tingkat_akreditasi');
    pgm.dropType('jenjang_sekolah');
    pgm.dropType('role_pengguna');

    console.log('Rollback berhasil. Database telah dikembalikan ke kondisi awal.');
};