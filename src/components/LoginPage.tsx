import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  GraduationCap, 
  Users, 
  Store, 
  ArrowRight, 
  Lock, 
  User, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Eye, 
  EyeOff, 
  Sparkle,
  Compass,
  MapPin,
  HeartHandshake
} from 'lucide-react';
import { UserSession } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: UserSession) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<'siswa' | 'guru' | 'umkm'>('siswa');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>('');
  const [identifier, setIdentifier] = useState<string>(''); // NISN or Email/NUPTK or Phone
  const [schoolOrOrg, setSchoolOrOrg] = useState<string>('SMP Negeri 1 Pasuruan');
  const [groupOrClass, setGroupOrClass] = useState<string>('Kelompok 1 (Cabe Jamu Kebonagung)');
  const [password, setPassword] = useState<string>('pasura123');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Quick Preset Logins
  const handleQuickLogin = (preset: 'siswa' | 'guru' | 'umkm') => {
    let user: UserSession;
    if (preset === 'siswa') {
      user = {
        name: 'Ahmad Rizky Fauzi',
        email: 'ahmad.rizky@smpn1pasuruan.sch.id',
        role: 'siswa',
        schoolOrOrg: 'SMP Negeri 1 Kota Pasuruan',
        gradeLevel: 'Kelas IX-A',
        groupName: 'Kelompok 1 - Cabe Jamu Kebonagung',
        loginAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
    } else if (preset === 'guru') {
      user = {
        name: 'Pak Imam Fanani, S.Pd., M.Si.',
        email: 'imamfanani88@guru.smp.belajar.id',
        role: 'guru',
        schoolOrOrg: 'SMP Negeri 1 Kota Pasuruan (Fasilitator IPA/POPBL)',
        gradeLevel: 'Pendidik IPA & Etnosains',
        groupName: 'Koordinator Riset CRT Jamu',
        loginAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
    } else {
      user = {
        name: 'Ibu Hj. Siti Rohmah',
        email: 'kebonagung.jamu@pasuruankota.go.id',
        role: 'umkm',
        schoolOrOrg: 'Sentra Jamu Tradisional Kebonagung',
        gradeLevel: 'Mitra Perajin Etnosains',
        groupName: 'Paguyuban Jamu Kebonagung Lestari',
        loginAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
    }

    localStorage.setItem('pasura_bio_user', JSON.stringify(user));
    onLoginSuccess(user);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Harap isi Nama Lengkap Anda.');
      return;
    }
    if (!identifier.trim()) {
      setErrorMessage(
        selectedRole === 'siswa' 
          ? 'Harap isi NISN atau Nomor Absen Anda.' 
          : selectedRole === 'guru'
          ? 'Harap isi NIP / NUPTK / Akun belajar.id Anda.'
          : 'Harap isi Nomor Kontak atau ID UMKM Anda.'
      );
      return;
    }
    if (!password) {
      setErrorMessage('Harap masukkan kata sandi.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const user: UserSession = {
        name: name.trim(),
        email: identifier.includes('@') ? identifier.trim() : `${name.toLowerCase().replace(/\s+/g, '.')}@pasura-bio.edu`,
        role: selectedRole,
        schoolOrOrg: schoolOrOrg.trim() || 'Kota Pasuruan',
        gradeLevel: selectedRole === 'siswa' ? 'Kelas IX (SMP/MTs)' : selectedRole === 'guru' ? 'Guru Pendamping' : 'Mitra Industri Lokal',
        groupName: selectedRole === 'siswa' ? groupOrClass : undefined,
        loginAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      localStorage.setItem('pasura_bio_user', JSON.stringify(user));
      setIsSubmitting(false);
      onLoginSuccess(user);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-amber-700/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header bar */}
      <header className="relative z-10 border-b border-stone-800/80 bg-stone-900/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-600/30">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl font-serif tracking-tight text-white">
                PASURA<span className="text-amber-400">-BIO</span> AI
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider">
                PORTAL MASUK
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Media Pembelajaran Etnosains Bioteknologi Jamu Kebonagung Kota Pasuruan
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-stone-400">
          <span className="hidden md:flex items-center space-x-1.5 text-amber-300/80 bg-amber-950/40 border border-amber-800/50 px-2.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Kearifan Lokal Kebonagung</span>
          </span>
          <span className="hidden sm:flex items-center space-x-1 text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>POPBL & CRT Model</span>
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Educational Context & Mission */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-stone-900/90 via-stone-900/70 to-amber-950/30 border border-stone-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Kelas IX SMP/MTs • Kurikulum Merdeka</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight leading-snug mb-3">
                Jelajahi Etnosains & Bio-preservasi Jamu Pasuruan
              </h1>
              
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                Selamat datang di platform pembelajaran interaktif berbasis masalah dan proyek (<span className="text-amber-400 font-semibold">POPBL</span>) dengan pendekatan tanggap budaya (<span className="text-emerald-400 font-semibold">CRT</span>). Temukan rahasia senyawa bioaktif 6 rempah Kebonagung dan selesaikan tantangan masa simpan jamu melalui bioteknologi modern.
              </p>

              {/* Highlights Feature Pills */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-stone-200">5 Modul POPBL Mandatori</h2>
                    <p className="text-[11px] text-stone-400">Video skrip pemantik, alur 5 tahap proyek, prompt AI, kuis interaktif, & rubrik evaluasi.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-stone-200">Lab Simulasi pH & Bio-Preservasi</h2>
                    <p className="text-[11px] text-stone-400">Eksperimen virtual pH, asam sitrat/basa, Brix gula aren, & prediksi masa simpan hurdle tech.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-stone-200">Peta Rempah Geospasial & PubChem</h2>
                    <p className="text-[11px] text-stone-400">Peta sentra Jamu Kebonagung Google Maps, perbandingan antioksidan, & struktur 2D molekul.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-stone-200">Tur Warung Jamu 3D (Three.js)</h2>
                    <p className="text-[11px] text-stone-400">Pengalaman virtual 3D eksplorasi warisan perajin Kebonagung, kendi tembikar, alu ekstraksi, & audio slendro.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick 1-Click Demo Login Shortcuts */}
            <div className="pt-4 border-t border-stone-800/80">
              <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                <span>Masuk Cepat 1-Klik (Mode Demo / Evaluasi):</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('siswa')}
                  className="p-2.5 rounded-xl bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/50 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-200 group-hover:text-amber-300">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Siswa</span>
                  </div>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">Ahmad R. (9A)</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('guru')}
                  className="p-2.5 rounded-xl bg-stone-950 hover:bg-emerald-950/40 border border-stone-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-200 group-hover:text-emerald-300">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Guru</span>
                  </div>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">Pak Imam, S.Pd.</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('umkm')}
                  className="p-2.5 rounded-xl bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/50 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-200 group-hover:text-amber-300">
                    <Store className="w-3.5 h-3.5 text-amber-400" />
                    <span>UMKM</span>
                  </div>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">Bu Hj. Siti (Jamu)</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Form */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              {/* Role Selection Tabs */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-stone-300 mb-2.5 uppercase tracking-wider">
                  Pilih Peran Pengguna:
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-stone-950 rounded-2xl border border-stone-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('siswa');
                      setSchoolOrOrg('SMP Negeri 1 Pasuruan');
                      setGroupOrClass('Kelompok 1 (Cabe Jamu Kebonagung)');
                    }}
                    className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      selectedRole === 'siswa'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Siswa SMP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('guru');
                      setSchoolOrOrg('SMP Negeri 1 Pasuruan');
                      setGroupOrClass('Fasilitator IPA');
                    }}
                    className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      selectedRole === 'guru'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Guru / Pendidik</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('umkm');
                      setSchoolOrOrg('Sentra Jamu Kebonagung');
                      setGroupOrClass('Mitra Industri');
                    }}
                    className={`flex items-center justify-center space-x-2 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      selectedRole === 'umkm'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Mitra UMKM</span>
                  </button>
                </div>
              </div>

              {/* Form Title */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-stone-100 flex items-center space-x-2">
                  <span>
                    Masuk Sebagai {selectedRole === 'siswa' ? 'Siswa Peneliti Muda' : selectedRole === 'guru' ? 'Guru Pembimbing Etnosains' : 'Mitra Perajin Jamu Kebonagung'}
                  </span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Lengkapi data untuk mengakses modul pembelajaran, lab biopreservasi, dan asisten PASURA-BIO AI.
                </p>
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></div>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    Nama Lengkap <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={
                        selectedRole === 'siswa' 
                          ? 'Contoh: Dewi Sekar Arum' 
                          : selectedRole === 'guru' 
                          ? 'Contoh: Drs. Bambang Sutrisno, M.Pd.' 
                          : 'Contoh: Ibu Rusmini'
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* ID / NISN / Email */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                    {selectedRole === 'siswa' 
                      ? 'NISN / Nomor Absen Siswa' 
                      : selectedRole === 'guru'
                      ? 'NIP / NUPTK / Akun belajar.id'
                      : 'No. WhatsApp / ID Registrasi UMKM'} <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={
                        selectedRole === 'siswa' 
                          ? 'Contoh: 0092837461 atau Absen 12' 
                          : selectedRole === 'guru'
                          ? 'Contoh: imamfanani88@guru.smp.belajar.id'
                          : 'Contoh: 0812-3456-7890'
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Grid for School & Group/Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* School / Institution */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {selectedRole === 'umkm' ? 'Nama Usaha / Sentra' : 'Sekolah / Madrasah'}
                    </label>
                    <input
                      type="text"
                      value={schoolOrOrg}
                      onChange={(e) => setSchoolOrOrg(e.target.value)}
                      placeholder="Contoh: SMPN 1 Kota Pasuruan"
                      className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {/* Group / Class or Specialty */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      {selectedRole === 'siswa' 
                        ? 'Kelompok POPBL / Kelas' 
                        : selectedRole === 'guru'
                        ? 'Mata Pelajaran'
                        : 'Produk Unggulan Jamu'}
                    </label>
                    {selectedRole === 'siswa' ? (
                      <select
                        value={groupOrClass}
                        onChange={(e) => setGroupOrClass(e.target.value)}
                        className="w-full px-3 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="Kelompok 1 (Cabe Jamu Kebonagung)">Kelompok 1 (Cabe Jamu Kebonagung)</option>
                        <option value="Kelompok 2 (Cengkeh Dataran Tinggi Tutur)">Kelompok 2 (Cengkeh Tutur)</option>
                        <option value="Kelompok 3 (Kapulaga Lereng Bromo)">Kelompok 3 (Kapulaga Tosari)</option>
                        <option value="Kelompok 4 (Kayu Manis Bioaktif)">Kelompok 4 (Kayu Manis)</option>
                        <option value="Kelompok 5 (Sereh Sitronelal Grati)">Kelompok 5 (Sereh Wangi)</option>
                        <option value="Kelompok 6 (Gula Aren Osmotik Winongan)">Kelompok 6 (Gula Aren Winongan)</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={groupOrClass}
                        onChange={(e) => setGroupOrClass(e.target.value)}
                        placeholder={selectedRole === 'guru' ? 'IPA Terpadu / Biologi Kelas 9' : 'Jamu Kebonagung Botol / Instan'}
                        className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-stone-300">
                      Kata Sandi <span className="text-amber-400">*</span>
                    </label>
                    <span className="text-[10px] text-stone-500">
                      Bawaan evaluasi: <code className="text-amber-400">pasura123</code>
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi..."
                      className="w-full pl-10 pr-10 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500 hover:from-amber-500 hover:to-emerald-400 text-stone-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Menyiapkan Ruang Belajar...</span>
                    </div>
                  ) : (
                    <>
                      <span>Masuk ke Platform PASURA-BIO AI</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Micro Footer Note */}
            <div className="mt-6 pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Terintegrasi Modul Kurikulum Merdeka SMP Kelas 9</span>
              </span>
              <span className="text-stone-400">
                Kota Pasuruan, Jawa Timur
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-800/80 py-4 px-4 text-center text-xs text-stone-500">
        <p>
          PASURA-BIO AI • Pakar Edukasi Bioteknologi & Pembelajaran Berbasis Etnosains Jamu Kebonagung Pasuruan
        </p>
      </footer>
    </div>
  );
};
