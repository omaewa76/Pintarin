
## API ENDPOINTS

### Auth
```
POST   /api/auth/login          → {email, password} → {token, user: {id, name, role, ...}}
POST   /api/auth/logout         → invalidate token
GET    /api/auth/me             → data user yang sedang login
```

### Schools
```
GET    /api/schools             → list semua sekolah (filter: district, level, status, risk_category, search)
GET    /api/schools/:id         → detail satu sekolah + risk score terbaru
PATCH  /api/schools/:id/verify  → Dinas verifikasi sekolah
GET    /api/schools/:id/risk-history → history risk score sekolah
```

### School Data Submissions
```
GET    /api/submissions         → list semua submission (Dinas, filter status)
GET    /api/submissions/:id     → detail submission
POST   /api/submissions         → sekolah submit data baru
PATCH  /api/submissions/:id/approve → Dinas approve
PATCH  /api/submissions/:id/reject  → Dinas reject + rejection_reason
```

### Districts
```
GET    /api/districts           → list kecamatan + risk score terbaru
GET    /api/districts/:id       → detail kecamatan + sekolah di dalamnya
```

### CSR
```
GET    /api/csr/companies       → list perusahaan CSR
GET    /api/assistance          → list pengajuan bantuan (filter: status, school_id, csr_company_id)
GET    /api/assistance/:id      → detail satu pengajuan
POST   /api/assistance          → CSR buat pengajuan baru
PATCH  /api/assistance/:id/approve → Dinas approve
PATCH  /api/assistance/:id/reject  → Dinas reject
```

### Analytics
```
GET    /api/analytics/overview  → stats ringkasan (total sekolah, risiko tinggi, pending, dll)
GET    /api/analytics/risk-trend → data tren risk score per bulan (6 bulan terakhir)
GET    /api/analytics/district-ranking → ranking kecamatan berdasar risk score
GET    /api/analytics/assistance-summary → total bantuan, breakdown jenis, tren bulanan
```

### AI
```
POST   /api/ai/predict-risk     → input: school_id → output: {score, category, factors, recommendation}
POST   /api/ai/batch-predict    → recalculate semua sekolah (admin/scheduler only)
GET    /api/ai/insights         → AI-generated text insight untuk dashboard
```

### Notifications
```
GET    /api/notifications       → notifikasi milik user yang login
PATCH  /api/notifications/:id/read → tandai dibaca
PATCH  /api/notifications/read-all → tandai semua dibaca
```

### Accounts (Dinas only)
```
GET    /api/accounts            → list semua user (filter: role, status)
PATCH  /api/accounts/:id/suspend   → suspend akun
PATCH  /api/accounts/:id/activate  → aktifkan kembali
```