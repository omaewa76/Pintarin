-- Menyimpan history setiap kali petugas melakukan validasi
CREATE TABLE prediction_validations (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  prediction_id   INT NOT NULL,
  officer_id      INT NOT NULL,
  action          ENUM('approve', 'override', 'flag_for_review') NOT NULL,
  reason          TEXT,
  corrected_label ENUM('Rendah', 'Sedang', 'Tinggi'),
  validated_at    DATETIME DEFAULT NOW(),

  FOREIGN KEY (prediction_id) REFERENCES predictions(id),
  FOREIGN KEY (officer_id)    REFERENCES users(id)
);

-- Tambah kolom baru ke tabel predictions yang sudah ada
ALTER TABLE predictions
  ADD COLUMN confidence_score    FLOAT DEFAULT NULL,
  ADD COLUMN confidence_level    ENUM('Tinggi', 'Sedang', 'Rendah') DEFAULT NULL,
  ADD COLUMN needs_human_review  BOOLEAN DEFAULT FALSE,
  ADD COLUMN is_human_validated  BOOLEAN DEFAULT FALSE,
  ADD COLUMN final_label         ENUM('Rendah', 'Sedang', 'Tinggi') DEFAULT NULL,
  ADD COLUMN validation_note     TEXT DEFAULT NULL;

-- Isi final_label dari label AI yang sudah ada (untuk data lama)
UPDATE predictions SET final_label = predicted_label WHERE final_label IS NULL;

-- Log aktivitas CSR matching — opsional, untuk analytics
CREATE TABLE csr_match_logs (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  focus_area   VARCHAR(100),
  budget_range VARCHAR(50),
  results_json JSON,
  created_at   DATETIME DEFAULT NOW()
);
```