/* ============================================================
   SIDEKAP — Sistem Pelaporan Insiden Keselamatan Pasien
   script.js
   ============================================================ */

/* ── DATA ── */
let INSIDEN = [
  {
    no: '001', tgl: '05/03/2026', unit: 'IGD', pelapor: 'dr. Siti R.', kat: 'KPCS',
    status: 'Terverifikasi', risiko: 'Tinggi',
    formData: {
      tipe: 'withPatient',
      pasien: { mr: 'RM-2026-001', nama: 'Budi Santoso', kelamin: 'Laki-laki', umur: '45', kelompokUmur: '18–59 tahun (Dewasa)', penanggung: 'BPJS Kesehatan', tglMasuk: '2026-03-01' },
      kejadian: { tglWaktu: '2026-03-05T08:30', insiden: 'Pasien jatuh dari tempat tidur', kronologis: 'Pasien post-op hari ke-2 mencoba turun sendiri dari tempat tidur saat perawat keluar ruangan. Rail tempat tidur tidak terpasang.', jenisInsiden: 'KPCS', pelaporPertama: 'Perawat', menyangkut: 'Pasien Rawat Inap', tempat: 'Ruang Flamboyan Lantai 2', spesialisasi: 'Bedah', unitTerkait: 'IGD', akibat: 'Cedera ringan', tindakan: 'Pasien dibantu kembali, luka dibersihkan, dokter dihubungi, rail dipasang kembali.', tindakanOleh: 'Tim / Dokter + Perawat', pernahTerjadi: 'Tidak' },
      pelapor: { tglLapor: '2026-03-05T09:00', pembuat: 'Ns. Dewi Rahayu, S.Kep — Kepala Ruangan Flamboyan' }
    }
  },
  {
    no: '002', tgl: '04/03/2026', unit: 'Rawat Inap', pelapor: 'Ns. Budi S.', kat: 'KTD',
    status: 'Menunggu', risiko: 'Sedang',
    formData: {
      tipe: 'withPatient',
      pasien: { mr: 'RM-2026-002', nama: 'Sari Wulandari', kelamin: 'Perempuan', umur: '32', kelompokUmur: '18–59 tahun (Dewasa)', penanggung: 'Asuransi Swasta', tglMasuk: '2026-03-02' },
      kejadian: { tglWaktu: '2026-03-04T14:15', insiden: 'Pemberian obat tidak sesuai dosis', kronologis: 'Pasien menerima Amoxicillin 500mg 2 tablet, padahal resep dokter tertulis 1 tablet.', jenisInsiden: 'KTD', pelaporPertama: 'Perawat', menyangkut: 'Pasien Rawat Inap', tempat: 'Ruang Mawar Lantai 3', spesialisasi: 'Penyakit Dalam', unitTerkait: 'Rawat Inap', akibat: 'Tidak ada cedera', tindakan: 'Pasien diobservasi, dokter diberitahu, laporan farmasi dibuat.', tindakanOleh: 'Perawat', pernahTerjadi: 'Ya' },
      pelapor: { tglLapor: '2026-03-04T16:00', pembuat: 'Ns. Budi Setiawan, AMK — Perawat Pelaksana' }
    }
  },
  {
    no: '003', tgl: '03/03/2026', unit: 'Poli Umum', pelapor: 'dr. Rina P.', kat: 'KNC',
    status: 'Terverifikasi', risiko: 'Rendah',
    formData: {
      tipe: 'noPatient',
      kejadian: { tglWaktu: '2026-03-03T10:00', insiden: 'Hampir terjadi salah identitas pasien', kronologis: 'Dua pasien dengan nama mirip hampir tertukar rekam medisnya.', jenisInsiden: 'KNC', pelaporPertama: 'Dokter', menyangkut: 'Pasien Rawat Jalan', tempat: 'Poli Umum', spesialisasi: 'Penyakit Dalam', unitTerkait: 'Poli Umum', akibat: 'Tidak ada cedera', tindakan: 'Identitas diverifikasi ulang, SOP identifikasi pasien ditinjau.', tindakanOleh: 'Dokter', pernahTerjadi: 'Tidak' },
      pelapor: { tglLapor: '2026-03-03T11:30', pembuat: 'dr. Rina Puspita — Dokter Umum Poli' }
    }
  },
  {
    no: '004', tgl: '01/03/2026', unit: 'ICU', pelapor: 'Ns. Ayu M.', kat: 'KPCS',
    status: 'Ditolak', risiko: 'Tinggi',
    formData: {
      tipe: 'withPatient',
      pasien: { mr: 'RM-2026-004', nama: 'Hendra Kusuma', kelamin: 'Laki-laki', umur: '67', kelompokUmur: '≥60 tahun (Lansia)', penanggung: 'BPJS Kesehatan', tglMasuk: '2026-02-27' },
      kejadian: { tglWaktu: '2026-03-01T03:20', insiden: 'Kematian pasien tidak terduga pasca operasi', kronologis: 'Pasien laparotomi hari ke-2 mengalami cardiac arrest tiba-tiba.', jenisInsiden: 'KPCS', pelaporPertama: 'Dokter', menyangkut: 'Pasien Rawat Inap', tempat: 'ICU', spesialisasi: 'Bedah', unitTerkait: 'ICU', akibat: 'Kematian', tindakan: 'RJP dilakukan, keluarga diberitahu, investigasi internal dimulai.', tindakanOleh: 'Tim / Dokter + Perawat', pernahTerjadi: 'Tidak' },
      pelapor: { tglLapor: '2026-03-01T06:00', pembuat: 'Ns. Ayu Maharani, S.Kep — Perawat ICU' }
    }
  },
  {
    no: '005', tgl: '28/02/2026', unit: 'Farmasi', pelapor: 'Apt. Hendra K.', kat: 'KNC',
    status: 'Menunggu', risiko: 'Sedang',
    formData: {
      tipe: 'noPatient',
      kejadian: { tglWaktu: '2026-02-28T13:45', insiden: 'Hampir terjadi kesalahan dispensing obat LASA', kronologis: 'Losartan hampir diberikan sebagai pengganti Loratadine karena kemiripan nama.', jenisInsiden: 'KNC', pelaporPertama: 'Apoteker', menyangkut: 'Pasien Rawat Jalan', tempat: 'Instalasi Farmasi', spesialisasi: 'Penyakit Dalam', unitTerkait: 'Farmasi', akibat: 'Tidak ada cedera', tindakan: 'Obat dikembalikan, label LASA ditambahkan, briefing staf dilakukan.', tindakanOleh: 'Apoteker', pernahTerjadi: 'Ya' },
      pelapor: { tglLapor: '2026-02-28T14:30', pembuat: 'Apt. Hendra Kurniawan, S.Farm — Apoteker Pelaksana' }
    }
  },
];

let USERS = [
  { id: 1, nama: 'Administrator Sistem', username: 'admin',         email: 'admin@rsud.go.id',  role: 'Super Admin',    unit: 'Semua Unit', status: 'Aktif',    lastLogin: '10/03/2026 08:14', isMe: true,  color: '#dc2626' },
  { id: 2, nama: 'dr. Siti Rahayu',      username: 'siti.rahayu',  email: 'siti@rsud.go.id',   role: 'Admin',          unit: 'Semua Unit', status: 'Aktif',    lastLogin: '10/03/2026 07:55', isMe: false, color: '#1d4ed8' },
  { id: 3, nama: 'Ns. Budi Setiawan',    username: 'budi.setiawan',email: 'budi@rsud.go.id',   role: 'Kepala Ruangan', unit: 'Rawat Inap', status: 'Aktif',    lastLogin: '09/03/2026 14:30', isMe: false, color: '#15803d' },
  { id: 4, nama: 'dr. Rina Puspita',     username: 'rina.puspita', email: 'rina@rsud.go.id',   role: 'Kepala Ruangan', unit: 'Poli Umum',  status: 'Aktif',    lastLogin: '09/03/2026 09:00', isMe: false, color: '#15803d' },
  { id: 5, nama: 'Ns. Ayu Maharani',     username: 'ayu.maharani', email: 'ayu@rsud.go.id',    role: 'Kepala Ruangan', unit: 'ICU',        status: 'Aktif',    lastLogin: '08/03/2026 21:10', isMe: false, color: '#15803d' },
  { id: 6, nama: 'Apt. Hendra Kurniawan',username: 'hendra.apt',   email: 'hendra@rsud.go.id', role: 'Pelapor',        unit: 'Farmasi',    status: 'Aktif',    lastLogin: '08/03/2026 15:45', isMe: false, color: '#57534e' },
  { id: 7, nama: 'dr. Wahyu Nugroho',    username: 'wahyu.nugroho',email: 'wahyu@rsud.go.id',  role: 'Pelapor',        unit: 'IGD',        status: 'Aktif',    lastLogin: '07/03/2026 11:20', isMe: false, color: '#57534e' },
  { id: 8, nama: 'Ns. Dewi Rahayu',      username: 'dewi.rahayu',  email: 'dewi@rsud.go.id',   role: 'Kepala Ruangan', unit: 'Rawat Inap', status: 'Nonaktif', lastLogin: '01/03/2026 08:00', isMe: false, color: '#15803d' },
  { id: 9, nama: 'dr. Fajar Santoso',    username: 'fajar.santoso',email: 'fajar@rsud.go.id',  role: 'Pelapor',        unit: 'Laboratorium',status:'Aktif',    lastLogin: '10/03/2026 09:30', isMe: false, color: '#57534e' },
  { id:10, nama: 'Ns. Maya Sari',         username: 'maya.sari',    email: 'maya@rsud.go.id',   role: 'Pelapor',        unit: 'ICU',        status: 'Nonaktif', lastLogin: '25/02/2026 16:00', isMe: false, color: '#57534e' },
];

/* ── LOOKUP MAPS ── */
let activeRoleFilter  = 'semua';
let editingUserId     = null;
let currentDetailIdx  = null;

const KAT_CSS  = { KNC: 'kat-knc', KTD: 'kat-ktd', KPCS: 'kat-kpcs' };
const STS_CSS  = { Terverifikasi: 'badge-s', Menunggu: 'badge-w', Ditolak: 'badge-d' };
const STS_ICO  = { Terverifikasi: '✓', Menunggu: '⏳', Ditolak: '✗' };
const RISK_DOT = { Tinggi: 'dot-h', Sedang: 'dot-m', Rendah: 'dot-l' };
const ROLE_CSS = { 'Super Admin': 'rb-superadmin', Admin: 'rb-admin', 'Kepala Ruangan': 'rb-karu', Pelapor: 'rb-pelapor' };
const ROLE_ICO = { 'Super Admin': '👑', Admin: '🛡️', 'Kepala Ruangan': '🏥', Pelapor: '📋' };
const AVCOL    = ['#1d4ed8','#15803d','#b45309','#7c3aed','#0284c7','#b91c1c','#0f766e','#c2410c'];

/* ── BADGE HELPERS ── */
function katBadge(k)  { return `<span class="kat ${KAT_CSS[k] || ''}">${k}</span>`; }
function stsBadge(s)  { return `<span class="badge ${STS_CSS[s] || ''}">${STS_ICO[s]} ${s}</span>`; }
function riskHtml(r)  { return `<span class="dot ${RISK_DOT[r] || ''}"></span>${r}`; }
function roleBadge(r) { return `<span class="role-badge ${ROLE_CSS[r] || ''}">${ROLE_ICO[r] || ''} ${r}</span>`; }
function initials(n)  { return n.split(' ').map(w => w[0] || '').join('').substring(0, 2).toUpperCase(); }

/* ════════════════════════════════════════
   SIDEBAR BUILDER
   ════════════════════════════════════════ */
const mkSidebar = (active) => `
  <div class="sb-head">
    <div class="sb-icon">🏥</div>
    <div>
      <div style="font-family:'DM Serif Display',serif;font-size:18px;color:#fff">SIDEKAP</div>
      <div style="font-size:9px;color:rgba(255,255,255,.3);letter-spacing:1.5px;text-transform:uppercase">Admin Panel</div>
    </div>
  </div>
  <nav class="sb-nav">
    <div class="sb-sec">Beranda</div>
    <div class="nav-item ${active === 'dashboard' ? 'active' : ''}" onclick="showPage('dashboardAdmin')"><span>📊</span> Dashboard</div>
    <div class="sb-sec">Master Data</div>
    <div class="nav-item ${active === 'pengguna' ? 'active' : ''}" onclick="showPage('pengguna')"><span>👤</span> Pengguna</div>
    <div class="nav-item" onclick="showMasterData('Jenis Insiden')"><span>📂</span> Jenis Insiden</div>
    <div class="nav-item" onclick="showMasterData('Kelompok Umur')"><span>👶</span> Kelompok Umur</div>
    <div class="nav-item" onclick="showMasterData('Ruangan')"><span>🏥</span> Ruangan</div>
    <div class="nav-item" onclick="showMasterData('Tingkat Risiko')"><span>⚠️</span> Tingkat Risiko</div>
    <div class="nav-item" onclick="showMasterData('Dampak Klinis')"><span>📉</span> Dampak Klinis</div>
    <div class="nav-item" onclick="showMasterData('Probabilitas')"><span>🎲</span> Probabilitas</div>
    <div class="nav-item" onclick="showMasterData('Matriks Grading')"><span>📐</span> Matriks Grading</div>
    <div class="sb-sec">Laporan</div>
    <div class="nav-item ${active === 'laporan' ? 'active' : ''}" onclick="showPage('laporan')"><span>📋</span> Tabel Pelaporan</div>
  </nav>
  <div class="sb-foot">
    <div class="sb-user">
      <div class="sb-avatar">A</div>
      <div style="flex:1;min-width:0"><div class="sb-uname">Administrator</div><div class="sb-urole">Super Admin</div></div>
      <button onclick="showPage('landing')" title="Keluar"
        style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.12);cursor:pointer;font-size:15px;flex-shrink:0;transition:all .2s"
        onmouseover="this.style.background='rgba(220,38,38,.25)';this.style.borderColor='rgba(220,38,38,.4)'"
        onmouseout="this.style.background='rgba(255,255,255,.08)';this.style.borderColor='rgba(255,255,255,.12)'">🚪</button>
    </div>
  </div>`;

/* ════════════════════════════════════════
   FORM FIELD HELPERS
   ════════════════════════════════════════ */
function ffRow(n, l, f, top = false) {
  return `<div class="ff-row${top ? ' ff-row-top' : ''}"><div class="ff-num">${n}.</div><div class="ff-lbl">${l}</div><div class="ff-field">${f}</div></div>`;
}
function ffIn(t = 'text') { return `<input type="${t}" class="ff-in">`; }
function ffSel(opts)      { return `<select class="ff-in">${opts.map(o => `<option>${o}</option>`).join('')}</select>`; }
function ffTA(r = 3, p = '') { return `<textarea class="ff-in ff-ta" rows="${r}" placeholder="${p}"></textarea>`; }
function ffTTD(id) {
  return `<div class="ttd-box" id="${id}">Area Tanda Tangan</div>
          <button type="button" class="ttd-reset" onclick="document.getElementById('${id}').textContent='Area Tanda Tangan'">↺ Reset</button>`;
}

const FP_FIELDS = [
  [1, 'Nomor MR *',       ffIn()],
  [2, 'Nama Pasien',      ffIn()],
  [3, 'Jenis Kelamin',    ffIn()],
  [4, 'Umur',             ffIn()],
  [5, 'Kelompok Umur',    ffSel(['','0–1 tahun (Bayi)','2–12 tahun (Anak)','13–17 tahun (Remaja)','18–59 tahun (Dewasa)','≥60 tahun (Lansia)'])],
  [6, 'Penanggung Pasien',ffSel(['','BPJS Kesehatan','Asuransi Swasta','Umum / Mandiri'])],
  [7, 'Tanggal Masuk RS', ffIn('date')],
];

const FK_FIELDS = [
  [1,  'Tanggal & Waktu',    ffIn('datetime-local')],
  [2,  'Insiden',            ffTA(2), 'top'],
  [3,  'Kronologis',         ffTA(3,'Uraikan kronologi...'), 'top'],
  [4,  'Jenis Insiden *',    ffSel(['','KNC — Kejadian Nyaris Cedera','KTD — Kejadian Tidak Diharapkan','KPCS — Kejadian Potensial Cedera Signifikan','KTC — Kejadian Tidak Cedera','KS — Kejadian Sentinel'])],
  [5,  'Pelapor Pertama',    ffSel(['','Dokter','Perawat','Bidan','Apoteker','Analis','Radiografer','Pasien','Keluarga','Lainnya'])],
  [6,  'Menyangkut',         ffSel(['','Pasien Rawat Inap','Pasien Rawat Jalan','Pasien UGD','Lainnya'])],
  [7,  'Tempat Insiden',     ffIn()],
  [8,  'Spesialisasi',       ffSel(['','Penyakit Dalam','Anak','Bedah','Obstetri Ginekologi','THT','Mata','Saraf','Lainnya'])],
  [9,  'Unit Terkait',       ffSel(['','IGD','Rawat Inap','ICU','Poli Umum','Farmasi','Laboratorium','Radiologi','Kamar Operasi'])],
  [10, 'Akibat Insiden *',   ffSel(['','Tidak ada cedera','Cedera ringan','Cedera sedang','Cedera berat','Kematian'])],
  [11, 'Tindakan Segera',    ffTA(3,'Uraikan tindakan...'), 'top'],
  [12, 'Tindakan Oleh *',    ffSel(['','Dokter','Perawat','Bidan','Tim / Dokter + Perawat','Lainnya'])],
  [13, 'Pernah di Unit Lain?', ffSel(['Tidak','Ya'])],
];

function mkPelapor(id) {
  return [
    ffRow(1, 'Tanggal Lapor *',    `<input type="datetime-local" class="ff-in" id="${id}-tgl">`),
    ffRow(2, 'Pembuat Laporan *',  ffTA(4, 'Nama dan jabatan...'), 'top'),
    ffRow(3, 'Paraf / TTD *',      ffTTD(id), 'top'),
  ].join('');
}

/* ════════════════════════════════════════
   RENDER FUNCTIONS
   ════════════════════════════════════════ */
function renderSidebars() {
  document.getElementById('sb-dashboard').innerHTML = mkSidebar('dashboard');
  document.getElementById('sb-laporan').innerHTML   = mkSidebar('laporan');
  document.getElementById('sb-pengguna').innerHTML  = mkSidebar('pengguna');
}

function renderStats() {
  const cards = [
    { i:'📋', c:'si-blue',   v:30, l:'Total Insiden'   },
    { i:'✅', c:'si-green',  v:20, l:'Terverifikasi'   },
    { i:'⏳', c:'si-yellow', v:7,  l:'Menunggu Review' },
    { i:'🔴', c:'si-red',    v:3,  l:'Risiko Tinggi'   },
  ];
  document.getElementById('stat-grid').innerHTML = cards.map(x =>
    `<div class="stat-card">
       <div class="stat-icon ${x.c}">${x.i}</div>
       <div><div class="stat-val">${x.v}</div><div class="stat-lbl">${x.l}</div></div>
     </div>`
  ).join('');
}

function renderDashRows() {
  document.getElementById('dash-rows').innerHTML = INSIDEN.slice(0, 3).map(d =>
    `<tr>
       <td style="color:var(--muted);font-weight:700;font-size:12px">#${d.no}</td>
       <td style="font-size:12px;color:var(--muted)">${d.tgl}</td>
       <td><b>${d.unit}</b></td>
       <td>${katBadge(d.kat)}</td>
       <td>${stsBadge(d.status)}</td>
       <td>${riskHtml(d.risiko)}</td>
     </tr>`
  ).join('');
}

function renderLaporan() {
  /* ── Desktop table rows ── */
  const tbody = document.getElementById('laporan-rows');
  tbody.innerHTML = INSIDEN.map((d, i) => {
    const col = AVCOL[i % AVCOL.length];
    const rep = `<div class="rep-cell"><div class="rep-av" style="background:${col}22;color:${col}">${initials(d.pelapor)}</div>${d.pelapor}</div>`;
    return `<tr>
      <td style="color:var(--muted);font-weight:700;font-size:12px">#${d.no}</td>
      <td style="font-size:12px;color:var(--muted)">${d.tgl}</td>
      <td><b>${d.unit}</b></td>
      <td>${rep}</td>
      <td>${katBadge(d.kat)}</td>
      <td>${stsBadge(d.status)}</td>
      <td>${riskHtml(d.risiko)}</td>
      <td><button class="btn btn-navy detail-btn" data-idx="${i}" style="font-size:12px;padding:6px 13px">Detail</button></td>
    </tr>`;
  }).join('');
  tbody.querySelectorAll('.detail-btn').forEach(b =>
    b.addEventListener('click', () => openDetail(INSIDEN[+b.dataset.idx], +b.dataset.idx))
  );

  /* ── Mobile card list ── */
  const cards = document.getElementById('laporan-cards');
  cards.innerHTML = INSIDEN.map((d, i) =>
    `<div class="inc-card" data-idx="${i}">
       <div class="ic-top"><div class="ic-num">#${d.no}</div>${katBadge(d.kat)}${stsBadge(d.status)}</div>
       <div style="margin-bottom:6px">
         <div class="ic-unit">🏥 ${d.unit}</div>
         <div class="ic-meta">${d.pelapor} · ${d.tgl}</div>
       </div>
       <div style="display:flex;align-items:center">
         <span class="dot ${RISK_DOT[d.risiko]}"></span>
         <span style="font-size:12px;color:var(--muted);flex:1">Risiko ${d.risiko}</span>
         <span style="font-size:18px;color:var(--muted)">›</span>
       </div>
     </div>`
  ).join('');
  cards.querySelectorAll('.inc-card').forEach(c =>
    c.addEventListener('click', () => openDetail(INSIDEN[+c.dataset.idx], +c.dataset.idx))
  );
}

function renderForms() {
  document.getElementById('ff-pasien').innerHTML      = FP_FIELDS.map(f => ffRow(f[0], f[1], f[2], f[3] === 'top')).join('');
  document.getElementById('ff-kejadian-a').innerHTML  = FK_FIELDS.map(f => ffRow(f[0], f[1], f[2], f[3] === 'top')).join('');
  document.getElementById('ff-kejadian-b').innerHTML  = FK_FIELDS.map(f => ffRow(f[0], f[1], f[2], f[3] === 'top')).join('');
  document.getElementById('ff-pelapor-a').innerHTML   = mkPelapor('ttd-a');
  document.getElementById('ff-pelapor-b').innerHTML   = mkPelapor('ttd-b');
}

/* ════════════════════════════════════════
   PENGGUNA / USER MANAGEMENT
   ════════════════════════════════════════ */
function updateUserCounts() {
  const c = { semua: USERS.length, 'Super Admin': 0, Admin: 0, 'Kepala Ruangan': 0, Pelapor: 0 };
  USERS.forEach(u => { if (c[u.role] !== undefined) c[u.role]++; });
  document.getElementById('cnt-semua').textContent      = c.semua;
  document.getElementById('cnt-superadmin').textContent = c['Super Admin'];
  document.getElementById('cnt-admin').textContent      = c['Admin'];
  document.getElementById('cnt-karu').textContent       = c['Kepala Ruangan'];
  document.getElementById('cnt-pelapor').textContent    = c['Pelapor'];
}

function renderUserStats() {
  const t  = USERS.length;
  const a  = USERS.filter(u => u.status === 'Aktif').length;
  const ad = USERS.filter(u => u.role === 'Admin' || u.role === 'Super Admin').length;
  const k  = USERS.filter(u => u.role === 'Kepala Ruangan').length;
  document.getElementById('user-stats-row').innerHTML = [
    { i:'👥', bg:'#eff6ff', v:t,  l:'Total Pengguna'       },
    { i:'✅', bg:'#f0fdf4', v:a,  l:'Akun Aktif'           },
    { i:'🛡️', bg:'#fef2f2', v:ad, l:'Admin / Super Admin'  },
    { i:'🏥', bg:'#fffbeb', v:k,  l:'Kepala Ruangan'       },
  ].map(s =>
    `<div class="us-card">
       <div class="us-icon" style="background:${s.bg}">${s.i}</div>
       <div><div class="us-val">${s.v}</div><div class="us-lbl">${s.l}</div></div>
     </div>`
  ).join('');
}

function filterRole(role) {
  activeRoleFilter = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.toggle('active', t.dataset.role === role));
  const lbl = {
    semua: 'Semua Pengguna',
    'Super Admin': 'Super Admin',
    Admin: 'Administrator',
    'Kepala Ruangan': 'Kepala Ruangan',
    Pelapor: 'Pelapor / Staf',
  };
  document.getElementById('user-table-title').textContent = lbl[role] || role;
  renderUserTable();
}

function getFilteredUsers() {
  const q    = (document.getElementById('user-search')?.value || '').toLowerCase();
  const unit = document.getElementById('user-unit-filter')?.value || '';
  const sts  = document.getElementById('user-status-filter')?.value || '';
  return USERS.filter(u => {
    const rm = activeRoleFilter === 'semua' || u.role === activeRoleFilter;
    const qm = !q || u.nama.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return rm && qm && (!unit || u.unit === unit) && (!sts || u.status === sts);
  });
}

function renderUserTable() {
  const filtered = getFilteredUsers();
  const tbody    = document.getElementById('user-tbody');

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><div class="es-icon">👤</div><p>Tidak ada pengguna yang sesuai filter.</p></div></td></tr>`;
  } else {
    tbody.innerHTML = filtered.map(u =>
      `<tr>
         <td>
           <div class="user-avatar-cell">
             <div class="ua-circle" style="background:${u.color}22;color:${u.color}">${initials(u.nama)}</div>
             <div>
               <div class="ua-name">${u.nama}${u.isMe ? '<span class="ua-you">Anda</span>' : ''}</div>
               <div class="ua-email">@${u.username} · ${u.email}</div>
             </div>
           </div>
         </td>
         <td>${roleBadge(u.role)}</td>
         <td><span class="unit-badge">${u.unit}</span></td>
         <td><span class="status-dot ${u.status === 'Aktif' ? 'sd-aktif' : 'sd-nonaktif'}">${u.status}</span></td>
         <td style="font-size:12px;color:var(--muted)">${u.lastLogin.replace(' ', '<br>')}</td>
         <td>
           <div class="act-btns">
             <button class="act-btn" title="Edit" onclick="openEditUserModal(${u.id})">✏️</button>
             <button class="act-btn" title="Toggle Status" onclick="toggleUserStatus(${u.id})">${u.status === 'Aktif' ? '🔒' : '🔓'}</button>
             ${!u.isMe
               ? `<button class="act-btn danger" title="Hapus" onclick="deleteUser(${u.id})">🗑️</button>`
               : '<div style="width:29px"></div>'}
           </div>
         </td>
       </tr>`
    ).join('');
  }
  document.getElementById('user-pgn-info').textContent = `Menampilkan ${filtered.length} dari ${USERS.length} pengguna`;
}

/* ── User modal ── */
function openUserModal() {
  editingUserId = null;
  document.getElementById('um-title').textContent = '👤 Tambah Pengguna Baru';
  document.getElementById('um-meta').textContent  = 'Isi data lengkap pengguna di bawah ini';
  ['uf-nama','uf-username','uf-email','uf-password'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('uf-role').value   = '';
  document.getElementById('uf-unit').value   = '';
  document.getElementById('uf-status').value = 'Aktif';
  document.getElementById('uf-unit-note').style.display = 'none';
  document.getElementById('user-modal').classList.add('open');
}

function openEditUserModal(id) {
  const u = USERS.find(x => x.id === id);
  if (!u) return;
  editingUserId = id;
  document.getElementById('um-title').textContent    = '✏️ Edit Pengguna';
  document.getElementById('um-meta').textContent     = `Mengubah data @${u.username}`;
  document.getElementById('uf-nama').value           = u.nama;
  document.getElementById('uf-username').value       = u.username;
  document.getElementById('uf-email').value          = u.email;
  document.getElementById('uf-role').value           = u.role;
  document.getElementById('uf-unit').value           = u.unit;
  document.getElementById('uf-password').value       = '';
  document.getElementById('uf-status').value         = u.status;
  handleRoleChange();
  document.getElementById('user-modal').classList.add('open');
}

function handleRoleChange() {
  const r    = document.getElementById('uf-role').value;
  const note = document.getElementById('uf-unit-note');
  if (r === 'Super Admin' || r === 'Admin') {
    document.getElementById('uf-unit').value = 'Semua Unit';
    note.style.display = 'block';
  } else {
    note.style.display = 'none';
  }
}

function closeUserModal() {
  document.getElementById('user-modal').classList.remove('open');
  editingUserId = null;
}

function saveUser() {
  const nama     = document.getElementById('uf-nama').value.trim();
  const username = document.getElementById('uf-username').value.trim();
  const email    = document.getElementById('uf-email').value.trim();
  const role     = document.getElementById('uf-role').value;
  const unit     = document.getElementById('uf-unit').value;
  const status   = document.getElementById('uf-status').value;

  if (!nama || !username || !role || !unit) {
    showToast('⚠️ Nama, username, role, dan unit wajib diisi!');
    return;
  }

  const clr = { 'Super Admin': '#dc2626', Admin: '#1d4ed8', 'Kepala Ruangan': '#15803d', Pelapor: '#57534e' };
  const now  = new Date();
  const p    = n => String(n).padStart(2, '0');
  const ll   = `${p(now.getDate())}/${p(now.getMonth()+1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;

  if (editingUserId) {
    const i = USERS.findIndex(u => u.id === editingUserId);
    if (i > -1) USERS[i] = { ...USERS[i], nama, username, email, role, unit, status, color: clr[role] || '#64748b' };
    showToast(`✅ Data ${nama} berhasil diperbarui.`);
  } else {
    USERS.push({ id: Math.max(...USERS.map(u => u.id)) + 1, nama, username, email, role, unit, status, lastLogin: ll, isMe: false, color: clr[role] || '#64748b' });
    showToast(`✅ Pengguna ${nama} berhasil ditambahkan.`);
  }

  closeUserModal();
  renderUserStats();
  updateUserCounts();
  renderUserTable();
}

function toggleUserStatus(id) {
  const u = USERS.find(x => x.id === id);
  if (!u) return;
  u.status = u.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
  showToast(`${u.status === 'Aktif' ? '✅' : '⛔'} ${u.nama} — status diubah ke ${u.status}.`);
  renderUserTable();
  renderUserStats();
  updateUserCounts();
}

function deleteUser(id) {
  const u = USERS.find(x => x.id === id);
  if (!u || u.isMe) return;
  if (!confirm(`Hapus akun "${u.nama}"?`)) return;
  USERS = USERS.filter(x => x.id !== id);
  showToast(`🗑️ Akun ${u.nama} berhasil dihapus.`);
  renderUserStats();
  updateUserCounts();
  renderUserTable();
}

/* ════════════════════════════════════════
   PAGE NAVIGATION
   ════════════════════════════════════════ */
const ADMIN_PAGES = ['dashboardAdmin','laporan','pengguna'];
const PAGE_TITLE  = { dashboardAdmin: 'Dashboard', laporan: 'Tabel Laporan', pengguna: 'Pengguna' };

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const tb = document.getElementById('g-topbar');
  const bn = document.getElementById('g-botnav');

  if (ADMIN_PAGES.includes(id)) {
    tb.classList.add('visible');
    bn.classList.add('visible');
    document.getElementById('g-page-title').textContent = PAGE_TITLE[id] || '';
  } else {
    tb.classList.remove('visible');
    bn.classList.remove('visible');
  }

  ['bn-db','bn-pg','bn-lp'].forEach(i => document.getElementById(i).classList.remove('active'));
  if (id === 'dashboardAdmin') document.getElementById('bn-db').classList.add('active');
  if (id === 'laporan')        document.getElementById('bn-lp').classList.add('active');
  if (id === 'pengguna')       document.getElementById('bn-pg').classList.add('active');

  /* Pre-fill tanggal lapor */
  if (id === 'formPublic' || id === 'formNoPatient') {
    const now = new Date(), p = n => String(n).padStart(2, '0');
    const v   = `${now.getFullYear()}-${p(now.getMonth()+1)}-${p(now.getDate())}T${p(now.getHours())}:${p(now.getMinutes())}`;
    ['ttd-a-tgl','ttd-b-tgl'].forEach(i => { const el = document.getElementById(i); if (el) el.value = v; });
  }
  window.scrollTo(0, 0);
}

/* ════════════════════════════════════════
   MODAL — DETAIL INSIDEN
   ════════════════════════════════════════ */
function renderDetailBody(d) {
  const row = (l, v) => `<div class="d-row"><div class="d-lbl">${l}</div><div class="d-val">${v || '<span style="color:#cbd5e1">—</span>'}</div></div>`;
  const sec = (t) => `<div style="background:#f8fafc;padding:7px 18px;font-size:10px;font-weight:800;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;border-top:1px solid var(--border);border-bottom:1px solid var(--border)">${t}</div>`;
  const f = d.formData || {}, p = f.pasien || {}, k = f.kejadian || {}, pel = f.pelapor || {};

  let out = `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:12px 18px;border-bottom:1px solid var(--border);background:#fafbfc">${katBadge(d.kat)} ${stsBadge(d.status)}<span style="margin-left:auto;font-size:12px;color:var(--muted);display:flex;align-items:center;gap:4px"><span class="dot ${RISK_DOT[d.risiko] || ''}"></span>Risiko ${d.risiko}</span></div>`;

  if (f.tipe === 'withPatient') {
    out += sec('A. DATA PASIEN');
    out += row('No. MR', p.mr)
         + row('Nama Pasien', p.nama ? `<b>${p.nama}</b>` : '')
         + row('Jenis Kelamin', p.kelamin)
         + row('Umur', p.umur ? p.umur + ' tahun' : '')
         + row('Kelompok Umur', p.kelompokUmur)
         + row('Penanggung', p.penanggung)
         + row('Tgl Masuk RS', p.tglMasuk);
    out += sec('B. RINCIAN KEJADIAN');
  } else {
    out += sec('A. RINCIAN KEJADIAN');
  }

  out += row('Tgl & Waktu',  (k.tglWaktu || '').replace('T', ' '))
       + row('Insiden',       k.insiden ? `<b>${k.insiden}</b>` : '')
       + row('Kronologis',    k.kronologis ? `<span style="color:var(--muted);font-size:12px;line-height:1.7;display:block">${k.kronologis}</span>` : '')
       + row('Jenis Insiden', k.jenisInsiden || d.kat)
       + row('Pelapor Pertama', k.pelaporPertama || d.pelapor)
       + row('Menyangkut',    k.menyangkut)
       + row('Tempat',        k.tempat || d.unit)
       + row('Spesialisasi',  k.spesialisasi)
       + row('Unit Terkait',  `<b>${k.unitTerkait || d.unit}</b>`)
       + row('Akibat',        k.akibat)
       + row('Tindakan',      k.tindakan ? `<span style="color:var(--muted);font-size:12px;line-height:1.7;display:block">${k.tindakan}</span>` : '')
       + row('Tindakan Oleh', k.tindakanOleh)
       + row('Pernah di Unit Lain?', k.pernahTerjadi);

  out += sec(f.tipe === 'withPatient' ? 'C. DATA PELAPOR' : 'B. DATA PELAPOR');
  out += row('Tgl Lapor', (pel.tglLapor || d.tgl || '').replace('T', ' '))
       + row('Pembuat Laporan', pel.pembuat ? `<span style="white-space:pre-line">${pel.pembuat}</span>` : d.pelapor);
  out += `<div class="d-row" style="align-items:flex-start">
            <div class="d-lbl" style="padding-top:8px">Paraf / TTD</div>
            <div class="d-val">
              <div style="border:1.5px dashed #cbd5e1;border-radius:8px;min-height:64px;background:#fafbfc;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:12px;font-style:italic;margin:4px 0">
                Tanda tangan tidak tersedia dalam tampilan digital
              </div>
            </div>
          </div>`;
  return out;
}

function openDetail(d, idx) {
  currentDetailIdx = idx;
  document.getElementById('modal-title').textContent = '📋 Detail Insiden #' + d.no;
  document.getElementById('modal-meta').textContent  = d.tgl + ' · ' + d.unit + ' · ' + d.pelapor;
  document.getElementById('modal-body').innerHTML    = renderDetailBody(d);
  document.getElementById('modal-foot').style.display = (d.status === 'Terverifikasi' || d.status === 'Ditolak') ? 'none' : 'flex';
  document.getElementById('modal').classList.add('open');
}

function verifikasiInsiden() {
  if (currentDetailIdx === null) return;
  INSIDEN[currentDetailIdx].status = 'Terverifikasi';
  closeModal();
  renderLaporan();
  renderDashRows();
  showToast('✅ Insiden berhasil diverifikasi.');
}

function tolakInsiden() {
  if (currentDetailIdx === null) return;
  INSIDEN[currentDetailIdx].status = 'Ditolak';
  closeModal();
  renderLaporan();
  renderDashRows();
  showToast('❌ Insiden ditolak.');
}

function closeModal() { document.getElementById('modal').classList.remove('open'); }

/* ── Close modals on overlay click ── */
window.addEventListener('click', e => {
  if (e.target === document.getElementById('modal'))      closeModal();
  if (e.target === document.getElementById('user-modal')) closeUserModal();
});

/* ════════════════════════════════════════
   TOAST
   ════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ════════════════════════════════════════
   FORM LOGIC
   ════════════════════════════════════════ */
function gv(el) { return el ? el.value.trim() : ''; }

function tambahInsiden(fd) {
  const now = new Date(), p = n => String(n).padStart(2, '0');
  const tgl = `${p(now.getDate())}/${p(now.getMonth()+1)}/${now.getFullYear()}`;
  const ji  = fd.kejadian.jenisInsiden || '';
  let kat   = 'KNC';
  if (ji.startsWith('KTD'))  kat = 'KTD';
  else if (ji.startsWith('KPCS') || ji.startsWith('KS')) kat = 'KPCS';
  const no      = String(INSIDEN.length + 1).padStart(3, '0');
  const pelapor = fd.pelapor.pembuat || 'Anonim';
  INSIDEN.unshift({
    no, tgl, unit: fd.kejadian.unitTerkait || 'Umum',
    pelapor: pelapor.length > 28 ? pelapor.substring(0, 28) + '…' : pelapor,
    kat, status: 'Menunggu', risiko: 'Sedang', formData: fd,
  });
}

function submitFormPublic() {
  const pi = [...document.getElementById('ff-pasien').querySelectorAll('.ff-in')];
  const ki = [...document.getElementById('ff-kejadian-a').querySelectorAll('.ff-in')];
  const li = [...document.getElementById('ff-pelapor-a').querySelectorAll('.ff-in')];
  const fd = {
    tipe: 'withPatient',
    pasien:   { mr: gv(pi[0]), nama: gv(pi[1]), kelamin: gv(pi[2]), umur: gv(pi[3]), kelompokUmur: gv(pi[4]), penanggung: gv(pi[5]), tglMasuk: gv(pi[6]) },
    kejadian: { tglWaktu: gv(ki[0]), insiden: gv(ki[1]), kronologis: gv(ki[2]), jenisInsiden: gv(ki[3]), pelaporPertama: gv(ki[4]), menyangkut: gv(ki[5]), tempat: gv(ki[6]), spesialisasi: gv(ki[7]), unitTerkait: gv(ki[8]), akibat: gv(ki[9]), tindakan: gv(ki[10]), tindakanOleh: gv(ki[11]), pernahTerjadi: gv(ki[12]) },
    pelapor:  { tglLapor: gv(li[0]), pembuat: gv(li[1]) },
  };
  if (!fd.pasien.mr && !fd.kejadian.insiden) {
    showToast('⚠️ Harap isi minimal Nomor MR dan keterangan insiden.');
    return;
  }
  tambahInsiden(fd);
  renderLaporan();
  renderDashRows();
  showPage('landing');
  showToast('✅ Formulir berhasil dikirim!');
}

function submitFormNoPatient() {
  const ki = [...document.getElementById('ff-kejadian-b').querySelectorAll('.ff-in')];
  const li = [...document.getElementById('ff-pelapor-b').querySelectorAll('.ff-in')];
  const fd = {
    tipe: 'noPatient',
    kejadian: { tglWaktu: gv(ki[0]), insiden: gv(ki[1]), kronologis: gv(ki[2]), jenisInsiden: gv(ki[3]), pelaporPertama: gv(ki[4]), menyangkut: gv(ki[5]), tempat: gv(ki[6]), spesialisasi: gv(ki[7]), unitTerkait: gv(ki[8]), akibat: gv(ki[9]), tindakan: gv(ki[10]), tindakanOleh: gv(ki[11]), pernahTerjadi: gv(ki[12]) },
    pelapor:  { tglLapor: gv(li[0]), pembuat: gv(li[1]) },
  };
  if (!fd.kejadian.insiden) {
    showToast('⚠️ Harap isi keterangan insiden.');
    return;
  }
  tambahInsiden(fd);
  renderLaporan();
  renderDashRows();
  showPage('landing');
  showToast('✅ Formulir berhasil dikirim!');
}

function resetFormPublic() {
  ['ff-pasien','ff-kejadian-a','ff-pelapor-a'].forEach(id => {
    document.getElementById(id).querySelectorAll('.ff-in').forEach(el => {
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });
  });
}

function resetFormNoPatient() {
  ['ff-kejadian-b','ff-pelapor-b'].forEach(id => {
    document.getElementById(id).querySelectorAll('.ff-in').forEach(el => {
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });
  });
}

/* ════════════════════════════════════════
   MASTER DATA MODAL
   ════════════════════════════════════════ */
const MD = {
  'Jenis Insiden': {
    icon:'📂', color:'#eff6ff', accent:'#1d4ed8',
    desc:'Kelola jenis-jenis insiden yang dapat dilaporkan.',
    cols:['Kode','Nama Jenis Insiden','Deskripsi','Status'],
    rows:[
      ['JI-001','Kejadian Jatuh','Pasien atau staf terjatuh di area RS','✅ Aktif'],
      ['JI-002','Kesalahan Obat','Pemberian obat tidak sesuai resep','✅ Aktif'],
      ['JI-003','Salah Identitas','Pasien tertukar atau salah identifikasi','✅ Aktif'],
      ['JI-004','Infeksi Nosokomial','Infeksi yang didapat selama perawatan','✅ Aktif'],
      ['JI-005','Kecelakaan Alat Medis','Malfungsi atau kesalahan penggunaan alat','⛔ Nonaktif'],
      ['JI-006','Dekubitus / Luka Tekan','Luka akibat tekanan berkepanjangan','✅ Aktif'],
    ],
  },
  'Kelompok Umur': {
    icon:'👶', color:'#f0fdf4', accent:'#15803d',
    desc:'Kelola pengelompokan usia pasien.',
    cols:['Kode','Kelompok Umur','Rentang Usia','Keterangan'],
    rows:[
      ['KU-001','Bayi','0 – 1 tahun','Neonatus hingga bayi 12 bulan'],
      ['KU-002','Anak','2 – 12 tahun','Masa kanak-kanak'],
      ['KU-003','Remaja','13 – 17 tahun','Masa pubertas'],
      ['KU-004','Dewasa','18 – 59 tahun','Usia produktif'],
      ['KU-005','Lansia','≥ 60 tahun','Berisiko tinggi insiden jatuh'],
    ],
  },
  'Ruangan': {
    icon:'🏥', color:'#fef2f2', accent:'#b91c1c',
    desc:'Kelola daftar unit dan ruangan.',
    cols:['Kode','Nama Ruangan','Lantai / Gedung','Status'],
    rows:[
      ['RU-001','IGD','Lantai 1 — Gedung A','✅ Aktif'],
      ['RU-002','Rawat Inap Mawar','Lantai 2 — Gedung B','✅ Aktif'],
      ['RU-003','Rawat Inap Flamboyan','Lantai 3 — Gedung B','✅ Aktif'],
      ['RU-004','ICU','Lantai 4 — Gedung C','✅ Aktif'],
      ['RU-005','Poli Umum','Lantai 1 — Gedung D','✅ Aktif'],
      ['RU-006','Farmasi','Lantai 1 — Gedung A','✅ Aktif'],
      ['RU-007','Laboratorium','Basement — Gedung A','✅ Aktif'],
      ['RU-008','Radiologi','Lantai 1 — Gedung C','⛔ Nonaktif'],
    ],
  },
  'Tingkat Risiko': {
    icon:'⚠️', color:'#fffbeb', accent:'#d97706',
    desc:'Kelola tingkatan risiko untuk penilaian insiden.',
    cols:['Kode','Tingkat Risiko','Skor','Deskripsi'],
    rows:[
      ['TR-001','Rendah','1 – 3','Dampak minimal'],
      ['TR-002','Sedang','4 – 6','Perlu pemantauan'],
      ['TR-003','Tinggi','7 – 9','Tindakan segera'],
      ['TR-004','Ekstrem','10 – 12','Eskalasi ke direktur'],
    ],
  },
  'Dampak Klinis': {
    icon:'📉', color:'#fef2f2', accent:'#dc2626',
    desc:'Kelola kategori dampak klinis dari suatu insiden.',
    cols:['Kode','Dampak Klinis','Level','Deskripsi'],
    rows:[
      ['DK-001','Tidak Ada Cedera','1','Tidak berdampak klinis'],
      ['DK-002','Cedera Ringan','2','Luka minor, P3K'],
      ['DK-003','Cedera Sedang','3','Perlu penanganan medis'],
      ['DK-004','Cedera Berat','4','Cedera permanen'],
      ['DK-005','Kematian','5','Pasien meninggal'],
    ],
  },
  'Probabilitas': {
    icon:'🎲', color:'#f5f3ff', accent:'#7c3aed',
    desc:'Kelola tingkat kemungkinan terulangnya insiden.',
    cols:['Kode','Probabilitas','Frekuensi','Deskripsi'],
    rows:[
      ['PR-001','Sangat Jarang','< 1x / tahun','Hampir tidak pernah'],
      ['PR-002','Jarang','1 – 2x / tahun','Kadang-kadang'],
      ['PR-003','Mungkin','3 – 5x / tahun','Bisa terjadi'],
      ['PR-004','Sering','6 – 11x / tahun','Beberapa kali setahun'],
      ['PR-005','Sangat Sering','≥ 12x / tahun','Hampir tiap bulan'],
    ],
  },
  'Matriks Grading': {
    icon:'📐', color:'#f0f9ff', accent:'#0284c7', isMatrix:true,
    desc:'Matriks risiko: kombinasi dampak dan probabilitas.',
    cols:['Probabilitas \\ Dampak','Tidak Ada (1)','Ringan (2)','Sedang (3)','Berat (4)','Kematian (5)'],
    rows:[
      ['Sangat Jarang (1)','Rendah','Rendah','Sedang','Tinggi','Ekstrem'],
      ['Jarang (2)','Rendah','Sedang','Sedang','Tinggi','Ekstrem'],
      ['Mungkin (3)','Sedang','Sedang','Tinggi','Ekstrem','Ekstrem'],
      ['Sering (4)','Sedang','Tinggi','Tinggi','Ekstrem','Ekstrem'],
      ['Sangat Sering (5)','Tinggi','Tinggi','Ekstrem','Ekstrem','Ekstrem'],
    ],
  },
};

const MX_CLR = {
  Rendah:  'background:#dcfce7;color:#15803d',
  Sedang:  'background:#fef9c3;color:#a16207',
  Tinggi:  'background:#fed7aa;color:#c2410c',
  Ekstrem: 'background:#fee2e2;color:#b91c1c',
};

function showMasterData(name) {
  const cfg = MD[name];
  if (!cfg) return;

  const old = document.getElementById('cs-modal');
  if (old) old.remove();

  const thead = cfg.cols.map(c =>
    `<th style="background:#f8fafc;color:#64748b;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:10px 14px;text-align:left;border-bottom:1px solid #e2e8f0;white-space:nowrap">${c}</th>`
  ).join('');

  const tbody = cfg.rows.map(row => {
    const cells = row.map((cell, i) => {
      let content = cell;
      if (cfg.isMatrix && i > 0 && MX_CLR[cell])
        content = `<span style="display:inline-block;padding:3px 10px;border-radius:6px;${MX_CLR[cell]};font-size:12px;font-weight:700">${cell}</span>`;
      else if (cell === '✅ Aktif')
        content = `<span style="font-size:12px;font-weight:600;color:#15803d">✅ Aktif</span>`;
      else if (cell === '⛔ Nonaktif')
        content = `<span style="font-size:12px;font-weight:600;color:#94a3b8">⛔ Nonaktif</span>`;
      else if (i === 0 && !cfg.isMatrix)
        content = `<span style="font-weight:700;color:#64748b;font-size:12px">${cell}</span>`;
      return `<td style="padding:11px 14px;font-size:13px;border-bottom:1px solid #f1f5f9;vertical-align:middle;white-space:nowrap">${content}</td>`;
    }).join('');
    return `<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">${cells}</tr>`;
  }).join('');

  const overlay = document.createElement('div');
  overlay.id   = 'cs-modal';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(11,45,82,.4);backdrop-filter:blur(4px);z-index:300;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn .2s ease both';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:18px;width:100%;max-width:820px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.18);animation:fadeUp .22s ease both;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e2e8f0;background:${cfg.color}">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:38px;height:38px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 2px 8px rgba(0,0,0,.08)">${cfg.icon}</div>
          <div><div style="font-size:15px;font-weight:800;color:#1e293b">${name}</div><div style="font-size:12px;color:#64748b;margin-top:1px">${cfg.desc}</div></div>
        </div>
        <div style="display:flex;gap:8px">
          <button style="background:${cfg.accent};color:#fff;border:none;padding:7px 13px;border-radius:8px;font-family:inherit;font-size:12px;font-weight:700;cursor:pointer">＋ Tambah</button>
          <button onclick="document.getElementById('cs-modal').remove()" style="width:30px;height:30px;border-radius:7px;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;font-size:15px;color:#64748b;display:flex;align-items:center;justify-content:center">✕</button>
        </div>
      </div>
      <div style="padding:12px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:8px">
        <div style="position:relative;flex:1;max-width:260px">
          <span style="position:absolute;left:9px;top:50%;transform:translateY(-50%);font-size:13px;color:#94a3b8">🔍</span>
          <input type="text" placeholder="Cari data..." style="width:100%;padding:7px 10px 7px 30px;border:1.5px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:13px;outline:none;background:#f8fafc">
        </div>
        <div style="margin-left:auto;font-size:12px;color:#64748b">${cfg.rows.length} data</div>
      </div>
      <div style="overflow-y:auto;flex:1"><table style="width:100%;border-collapse:collapse"><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table></div>
      <div style="padding:11px 20px;border-top:1px solid #e2e8f0;background:#f8fafc;display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:12px;color:#64748b">Menampilkan ${cfg.rows.length} data</div>
        <div style="display:flex;gap:4px">
          <button style="width:28px;height:28px;border-radius:6px;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;font-size:12px">‹</button>
          <button style="width:28px;height:28px;border-radius:6px;background:#0b2d52;color:#fff;border:none;cursor:pointer;font-size:12px;font-weight:700">1</button>
          <button style="width:28px;height:28px;border-radius:6px;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;font-size:12px">›</button>
        </div>
      </div>
    </div>`;

  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

/* ════════════════════════════════════════
   CHART.JS INITIALIZATION
   ════════════════════════════════════════ */
function initCharts() {
  /* Tren per bulan — Line */
  new Chart(document.getElementById('c1'), {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','Mei'],
      datasets: [{
        data: [5,8,12,6,9],
        borderColor: '#1a5091',
        backgroundColor: 'rgba(26,80,145,.07)',
        tension: .4,
        fill: true,
        pointBackgroundColor: '#1a5091',
        pointRadius: 4,
        pointHoverRadius: 6,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } },
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } }, beginAtZero: true },
      },
    },
  });

  /* Status verifikasi — Doughnut */
  new Chart(document.getElementById('c2'), {
    type: 'doughnut',
    data: {
      labels: ['Terverifikasi','Menunggu','Ditolak'],
      datasets: [{
        data: [20,7,3],
        backgroundColor: ['#16a34a','#d97706','#dc2626'],
        borderWidth: 0,
        hoverOffset: 5,
      }],
    },
    options: {
      cutout: '62%',
      plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } } },
    },
  });
}

/* ════════════════════════════════════════
   INIT — on DOM ready
   ════════════════════════════════════════ */
window.onload = function () {
  renderSidebars();
  renderStats();
  renderDashRows();
  renderLaporan();
  renderForms();
  renderUserStats();
  updateUserCounts();
  renderUserTable();
  initCharts();
};