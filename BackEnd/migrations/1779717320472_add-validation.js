// migrations/1779717320472_add-validation.js

/**s
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    // Tambahkan kolom untuk menyimpan confidence score, level, dan flag review manusia pada tabel skor_risiko_kecamatan
    pgm.addColumns('skor_risiko_kecamatan', {
        confidence_score: { type: 'float', default: null },
        confidence_level: { type: 'varchar(10)', default: null },
        needs_human_review: { type: 'boolean', default: false },
        is_human_validated: { type: 'boolean', default: false },
        final_label: { type: 'varchar(10)', default: null },
        validation_note: { type: 'text', default: null }
    });

    // Buat tabel untuk menyimpan hasil validasi manusia terhadap prediksi
    pgm.createTable('prediction_validations', {
        id: 'id',
        prediction_id: {
            type: 'integer',
            notNull: true,
            references: '"skor_risiko_kecamatan"(id)',
            onDelete: 'CASCADE'
        },
        officer_id: {
            type: 'integer',
            notNull: true,
            references: '"pengguna"(id)',
            onDelete: 'CASCADE'
        },
        action: { type: 'varchar(20)', notNull: true },
        reason: { type: 'text' },
        corrected_label: { type: 'varchar(10)' },
        old_confidence_score: { type: 'float' },
        new_confidence_score: { type: 'float' },
        validated_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });

    // Tambahkan constraint untuk memastikan action hanya boleh approve, override, atau flag_for_review
    pgm.addConstraint('prediction_validations', 'valid_action_check', {
        check: "action IN ('approve', 'override', 'flag_for_review')"
    });

    // Tambahkan constraint untuk corrected_label hanya boleh diisi jika action = 'override'
    pgm.addConstraint('prediction_validations', 'valid_corrected_label_check', {
        check: "corrected_label IN ('Rendah', 'Sedang', 'Tinggi')"
    });

    // Buat tabel untuk menyimpan log CSR matching
    pgm.createTable('csr_match_logs', {
        id: 'id',
        focus_area: { type: 'varchar(50)' },
        budget_range: { type: 'varchar(50)' },
        user_id: { type: 'integer', references: '"pengguna"(id)', onDelete: 'SET NULL' },
        results_json: { type: 'jsonb' },
        created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });

    // Update existing records: set final_label = kategori_risiko
    pgm.sql(`
    UPDATE skor_risiko_kecamatan 
    SET final_label = kategori_risiko 
    WHERE final_label IS NULL AND kategori_risiko IS NOT NULL
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('prediction_validations');
    pgm.dropTable('csr_match_logs');
    pgm.dropColumns('skor_risiko_kecamatan', [
        'confidence_score',
        'confidence_level',
        'needs_human_review',
        'is_human_validated',
        'final_label',
        'validation_note'
    ]);
};