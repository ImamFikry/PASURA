import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Droplet, 
  Scale, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  BookOpen, 
  Loader2, 
  HelpCircle,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export const LabSimulasiPH: React.FC = () => {
  // Volume components in mL for a 250 mL bottle serving
  const [limeJuiceMl, setLimeJuiceMl] = useState<number>(8); // Perasan Jeruk Nipis (Citric acid)
  const [tamarindExtractMl, setTamarindExtractMl] = useState<number>(10); // Ekstrak Asam Jawa (Tartaric acid)
  const [spiceDecoctionMl, setSpiceDecoctionMl] = useState<number>(140); // Air Rebusan Rempah Primer
  const [palmSugarMl, setPalmSugarMl] = useState<number>(50); // Larutan Gula Aren Grati
  const [limeWaterMl, setLimeWaterMl] = useState<number>(0); // Air Kapur Sirih Pembasa Alami

  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<string>('');

  // Calculate dynamic pH based on acid-base titration & aqueous equilibria
  const calculatePH = () => {
    const totalVolume = limeJuiceMl + tamarindExtractMl + spiceDecoctionMl + palmSugarMl + limeWaterMl;
    if (totalVolume === 0) return 7.0;

    // Approximate hydrogen ion concentration [H+] contributions (mmol)
    // Lime juice: ~0.3 mol/L citric acid (pH ~2.2 -> [H+] ~6.3e-3 M)
    const hFromLime = limeJuiceMl * 0.007;
    // Tamarind: ~0.15 mol/L tartaric acid (pH ~2.8 -> [H+] ~1.6e-3 M)
    const hFromTamarind = tamarindExtractMl * 0.0025;
    // Spices (slight buffering at pH 5.4 -> [H+] ~4e-6 M)
    const hFromSpices = spiceDecoctionMl * 0.000004;
    // Palm sugar (pH ~6.0 -> [H+] ~1e-6 M)
    const hFromSugar = palmSugarMl * 0.000001;

    // Alkaline hydroxide neutralization from lime water (OH-)
    // Calcium hydroxide dilute: [OH-] ~0.002 mol/L
    const ohFromLimeWater = limeWaterMl * 0.003;

    const netH = Math.max(0.00000001, (hFromLime + hFromTamarind + hFromSpices + hFromSugar) - ohFromLimeWater);
    const concentrationH = netH / (totalVolume / 1000); // mol / L

    let phVal = -Math.log10(concentrationH);
    // Clamp to realistic beverage bounds
    phVal = Math.min(8.0, Math.max(2.6, phVal));
    return parseFloat(phVal.toFixed(2));
  };

  const currentPH = calculatePH();

  // Color mapping based on Universal pH Indicator / Litmus Paper
  const getPHColor = (ph: number) => {
    if (ph < 3.2) return { bg: '#dc2626', text: '#fca5a5', name: 'Merah Terang (Sangat Asam / Korosif Ringan)' };
    if (ph < 3.9) return { bg: '#ea580c', text: '#fed7aa', name: 'Jingga Kemerahan (Asam Tinggi)' };
    if (ph <= 4.5) return { bg: '#10b981', text: '#a7f3d0', name: 'Hijau Zamrud (Zona Emas Bio-Preservasi)' };
    if (ph <= 5.5) return { bg: '#eab308', text: '#fef08a', name: 'Kuning Kunyit (Asam Lemah / Rawan Basi)' };
    if (ph <= 6.5) return { bg: '#84cc16', text: '#d9f99d', name: 'Hijau Zaitun (Mendekati Netral / Basi Cepat)' };
    return { bg: '#3b82f6', text: '#bfdbfe', name: 'Biru Alkali (Basa / Menyimpang dari Tradisi)' };
  };

  const phColorInfo = getPHColor(currentPH);

  // Shelf life prediction & microbiological safety evaluation
  const getBiotechAssessment = (ph: number) => {
    if (ph < 3.8) {
      return {
        zoneName: 'Zona Asam Kuat (Over-Acidified)',
        shelfLifeRoom: '14 – 20 Hari',
        shelfLifeFridge: '45 – 60 Hari',
        microbialRisk: 'Sangat Rendah (Bakteri terinhibisi total, spora tidak dapat berkecambah).',
        tasteBalance: 'Terlalu Kecut/Asam Tajam. Menutupi kehangatan khas cabe jamu & kayu manis.',
        organolepticStatus: 'Warna sangat cerah transparan, namun rasa asam menusuk lidah.',
        sporeSafety: 'Aman 100% dari Clostridium botulinum & Bacillus cereus.',
        statusBadge: 'Terlalu Masam',
        badgeColor: 'border-orange-500/50 bg-orange-500/15 text-orange-300'
      };
    } else if (ph <= 4.5) {
      return {
        zoneName: 'Zona Emas Bio-Preservasi (Golden Standard BPOM & CRT)',
        shelfLifeRoom: '7 – 10 Hari',
        shelfLifeFridge: '25 – 35 Hari',
        microbialRisk: 'Minimal. Nilai pH < 4.6 adalah batas kritis pencegahan perkecambahan spora Clostridium botulinum.',
        tasteBalance: 'Harmonis Sempurna! Asam segar alami berpadu pas dengan manis legit aren dan pedas rempah.',
        organolepticStatus: 'Aroma rempah optimal, kejernihan stabil tanpa lendir atau gas berlebih.',
        sporeSafety: 'Terbukti aman secara bioteknologi pangan modern.',
        statusBadge: 'Optimal Sempurna',
        badgeColor: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
      };
    } else if (ph <= 5.4) {
      return {
        zoneName: 'Zona Tradisional Segar (Resiko Pembusukan Cepat)',
        shelfLifeRoom: '1 – 2 Hari Saja (48 Jam)',
        shelfLifeFridge: '5 – 8 Hari',
        microbialRisk: 'Tinggi bila disimpan di suhu ruang! Bakteri asam laktat liar dan Bacillus cereus cepat membelah.',
        tasteBalance: 'Manis pedas khas jamu tempo dulu, namun cepat menghasilkan asam laktat fermentasi liar.',
        organolepticStatus: 'Mulai timbul endapan keruh dan buih gas setelah 24 jam.',
        sporeSafety: 'Rawan di atas ambang batas pH 4.6 jika tidak dipasteurisasi.',
        statusBadge: 'Rawan Basi Cepat',
        badgeColor: 'border-amber-500/50 bg-amber-500/15 text-amber-300'
      };
    } else {
      return {
        zoneName: 'Zona Kritis / Kerusakan Total (Severe Spoilage Risk)',
        shelfLifeRoom: '< 24 Jam (Langsung Berlendir)',
        shelfLifeFridge: '2 – 3 Hari',
        microbialRisk: 'Sangat Kritis! Memasuki rentang optimal pembelahan mikroba patogen dan kapang pembusuk.',
        tasteBalance: 'Hambar, getir alkalis, atau tengik. Tidak layak konsumsi.',
        organolepticStatus: 'Cepat timbul lapisan lendir licin (ropy slime) dan bau masam busuk.',
        sporeSafety: 'Zona bahaya mikrobiologis tinggi.',
        statusBadge: 'Berbahaya / Rusak',
        badgeColor: 'border-rose-500/50 bg-rose-500/15 text-rose-300'
      };
    }
  };

  const biotechData = getBiotechAssessment(currentPH);

  // Generate 7-day bacterial growth curves for Recharts (CFU/mL log scale)
  const bacterialGrowthData = [
    { day: 'Hari 0', currentFormula: 100, traditionalUnacidified: 100 },
    { day: 'Hari 1', currentFormula: currentPH <= 4.5 ? 120 : currentPH <= 5.5 ? 4500 : 85000, traditionalUnacidified: 8500 },
    { day: 'Hari 2', currentFormula: currentPH <= 4.5 ? 150 : currentPH <= 5.5 ? 120000 : 2500000, traditionalUnacidified: 250000 },
    { day: 'Hari 3', currentFormula: currentPH <= 4.5 ? 300 : currentPH <= 5.5 ? 950000 : 15000000, traditionalUnacidified: 1800000 },
    { day: 'Hari 5', currentFormula: currentPH <= 4.5 ? 800 : currentPH <= 5.5 ? 8000000 : 80000000, traditionalUnacidified: 12000000 },
    { day: 'Hari 7', currentFormula: currentPH <= 4.5 ? 2400 : currentPH <= 5.5 ? 45000000 : 200000000, traditionalUnacidified: 75000000 },
  ];

  // Presets
  const applyPreset = (type: 'traditional' | 'golden' | 'overacid' | 'alkaline') => {
    if (type === 'traditional') {
      setLimeJuiceMl(0);
      setTamarindExtractMl(0);
      setSpiceDecoctionMl(180);
      setPalmSugarMl(70);
      setLimeWaterMl(0);
    } else if (type === 'golden') {
      setLimeJuiceMl(10);
      setTamarindExtractMl(12);
      setSpiceDecoctionMl(150);
      setPalmSugarMl(55);
      setLimeWaterMl(0);
    } else if (type === 'overacid') {
      setLimeJuiceMl(25);
      setTamarindExtractMl(25);
      setSpiceDecoctionMl(130);
      setPalmSugarMl(40);
      setLimeWaterMl(0);
    } else if (type === 'alkaline') {
      setLimeJuiceMl(0);
      setTamarindExtractMl(0);
      setSpiceDecoctionMl(160);
      setPalmSugarMl(60);
      setLimeWaterMl(8);
    }
    setAiFeedback('');
  };

  const handleConsultAI = async () => {
    setIsLoadingAI(true);
    setAiFeedback('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Sebagai Pakar Bioteknologi Pangan Etnosains Pasuruan, tolong evaluasi formulasi pH Jamu Kebonagung hasil simulasi siswa berikut:
- pH Terkalkulasi: ${currentPH}
- Komposisi: Jeruk Nipis (${limeJuiceMl} mL), Asam Jawa (${tamarindExtractMl} mL), Air Rempah (${spiceDecoctionMl} mL), Gula Aren (${palmSugarMl} mL), Air Kapur Sirih (${limeWaterMl} mL)

Berikan analisis dalam 3 butir terstruktur:
1. Keselamatan Mikrobiologis (Batas kritis pH 4.6 spora Clostridium botulinum / Bacillus cereus).
2. Dampak Sensori Rasa (Harmoni rasa asam vs kehangatan cabe jamu & cengkeh).
3. Saran Formulasi Sempurna untuk UMKM Jamu Kebonagung Pasuruan.`
        }),
      });

      const data = await res.json();
      setAiFeedback(data.reply || 'Hasil evaluasi berhasil diterima.');
    } catch (err: any) {
      console.error(err);
      setAiFeedback('Terjadi kesalahan saat menghubungi PASURA-BIO AI.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 p-6 sm:p-8 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>LABORATORIUM SIMULASI INTERAKTIF • BIOTEKNOLOGI PANGAN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
              Lab Simulasi Derajat Keasaman (pH) Jamu Kebonagung
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Uji coba formulasi asam-basa alami secara virtual. Amati bagaimana pergeseran nilai pH mempengaruhi perkecambahan spora mikroba, kestabilan masa simpan, dan cita rasa khas jamu warisan Kota Pasuruan.
            </p>
          </div>

          {/* Dynamic pH Indicator Badge */}
          <div className="p-5 rounded-2xl bg-stone-950/90 border border-stone-800 text-center shrink-0 min-w-[200px] shadow-2xl">
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block">
              Derajat Keasaman Terukur:
            </span>
            <div className="flex items-center justify-center space-x-2 my-1">
              <span className="text-4xl font-extrabold font-mono text-white">
                pH {currentPH}
              </span>
            </div>
            <div 
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block mt-1"
              style={{ backgroundColor: `${phColorInfo.bg}25`, color: phColorInfo.text, border: `1px solid ${phColorInfo.bg}60` }}
            >
              {biotechData.statusBadge}
            </div>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-400 font-medium">Muat Profil Formula Cepat:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('traditional')}
              className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 transition cursor-pointer"
            >
              Resep Murni Tradisional (pH ~5.5)
            </button>
            <button
              onClick={() => applyPreset('golden')}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold transition cursor-pointer"
            >
              ⭐ Golden Standard Bio-Preservasi (pH ~4.2)
            </button>
            <button
              onClick={() => applyPreset('overacid')}
              className="px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 transition cursor-pointer"
            >
              Formula Terlalu Asam (pH ~3.3)
            </button>
            <button
              onClick={() => applyPreset('alkaline')}
              className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 transition cursor-pointer"
            >
              Formula Basa / Kapur Berlebih (pH ~7.2)
            </button>
          </div>
        </div>
      </div>

      {/* Main Lab Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sliders for Ingredients Mixing */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-7 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Pengatur Takaran Komposisi (Basis 250 mL)</span>
              </h3>
              <button
                onClick={() => applyPreset('golden')}
                className="text-[11px] text-stone-400 hover:text-stone-200 flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Slider 1: Perasan Jeruk Nipis (Citric Acid) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>1. Perasan Jeruk Nipis Segar (Asam Sitrat):</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">{limeJuiceMl} mL</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={limeJuiceMl}
                onChange={(e) => setLimeJuiceMl(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>0 mL (Tanpa Sitrat)</span>
                <span>8–12 mL (Rekomendasi Aman)</span>
                <span>25 mL (Asam Pekat)</span>
              </div>
            </div>

            {/* Slider 2: Ekstrak Asam Jawa Pasuruan */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span>2. Ekstrak Asam Jawa Pasuruan (Asam Tartarat):</span>
                </span>
                <span className="font-mono font-bold text-amber-400">{tamarindExtractMl} mL</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={tamarindExtractMl}
                onChange={(e) => setTamarindExtractMl(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>0 mL</span>
                <span>10–15 mL (Penyeimbang Rasa)</span>
                <span>30 mL (Sangat Pekat)</span>
              </div>
            </div>

            {/* Slider 3: Air Rebusan Rempah Primer */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>3. Rebusan Rempah (Cengkeh, Kayu Manis, Cabe Jamu, Kapulaga):</span>
                </span>
                <span className="font-mono font-bold text-purple-300">{spiceDecoctionMl} mL</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={spiceDecoctionMl}
                onChange={(e) => setSpiceDecoctionMl(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>50 mL (Encer)</span>
                <span>140–160 mL (Volume Standar)</span>
                <span>200 mL (Pekat)</span>
              </div>
            </div>

            {/* Slider 4: Larutan Gula Aren Grati */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>4. Larutan Gula Aren Murni Grati (Pasuruan):</span>
                </span>
                <span className="font-mono font-bold text-amber-400">{palmSugarMl} mL</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={palmSugarMl}
                onChange={(e) => setPalmSugarMl(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>20 mL (Kurang Manis)</span>
                <span>50–60 mL (Keseimbangan Brix 20-22°)</span>
                <span>100 mL (Sangat Manis)</span>
              </div>
            </div>

            {/* Slider 5: Air Kapur Sirih (Alkali Pembasa Tradisional) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>5. Air Kapur Sirih Alami (Pembasa / Pengendap Pati):</span>
                </span>
                <span className="font-mono font-bold text-blue-300">{limeWaterMl} mL</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={limeWaterMl}
                onChange={(e) => setLimeWaterMl(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>0 mL (Alami Tanpa Kapur)</span>
                <span>2–4 mL (Penjernih)</span>
                <span>10 mL (Alkali Tinggi / Berbahaya)</span>
              </div>
            </div>
          </div>

          {/* Interactive Litmus Strip Simulator */}
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 space-y-4 shadow-xl">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
              <Droplet className="w-4 h-4 text-cyan-400" />
              <span>Simulasi Kertas Indikator Universal / Lakmus Jamu</span>
            </h4>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-16 rounded-lg shadow-lg border border-white/20 transition-all duration-500"
                  style={{ backgroundColor: phColorInfo.bg }}
                />
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">Warna Spektrum Terbaca:</span>
                  <strong className="text-white text-sm font-serif block">{phColorInfo.name}</strong>
                  <span className="text-[10px] text-stone-400">Skala Keasaman Terukur: pH {currentPH}</span>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="text-[10px] text-stone-400 uppercase block font-mono">Standar BPOM Pangan:</span>
                <strong className="text-emerald-400 font-mono">pH 4.0 – 4.5</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Biotech Predictions & Microbial Growth Curve */}
        <div className="lg:col-span-6 space-y-6">
          {/* Shelf Life & Stability Card */}
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-7 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Prediksi Daya Simpan & Analisis Bioteknologi</span>
              </span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold font-mono border ${biotechData.badgeColor}`}>
                {biotechData.zoneName.split('(')[0].trim()}
              </span>
            </h3>

            {/* Estimated Days */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">Suhu Ruang (28°C)</span>
                <strong className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono block">
                  {biotechData.shelfLifeRoom}
                </strong>
                <span className="text-[10px] text-stone-500 block">Penyimpanan Terbuka</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-800/40 text-center space-y-1">
                <span className="text-[10px] text-emerald-300 uppercase font-semibold block">Suhu Dingin (4°C)</span>
                <strong className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono block">
                  {biotechData.shelfLifeFridge}
                </strong>
                <span className="text-[10px] text-stone-500 block">Rantai Dingin Higienis</span>
              </div>
            </div>

            {/* Scientific Breakdown Points */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">
                  1. Risiko Pertumbuhan Mikroba & Spora:
                </span>
                <p className="text-stone-300 leading-relaxed">{biotechData.microbialRisk}</p>
                <div className="text-[10px] text-emerald-400 font-semibold pt-0.5">
                  ✓ {biotechData.sporeSafety}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">
                  2. Keseimbangan Sensori & Cita Rasa (Taste Balance):
                </span>
                <p className="text-stone-300 leading-relaxed">{biotechData.tasteBalance}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-stone-400 font-bold uppercase block">
                  3. Indikator Fisik Kesegaran Cairan:
                </span>
                <p className="text-stone-300 leading-relaxed">{biotechData.organolepticStatus}</p>
              </div>
            </div>

            {/* AI Consultation Button */}
            <button
              disabled={isLoadingAI}
              onClick={handleConsultAI}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isLoadingAI ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menganalisis Formulasi dengan PASURA-BIO AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Minta Rekomendasi Formulasi Ilmiah ke AI</span>
                </>
              )}
            </button>
          </div>

          {/* AI Feedback Box if available */}
          {aiFeedback && (
            <div className="rounded-3xl bg-stone-900 border border-emerald-500/50 p-6 space-y-3 shadow-xl animate-fadeIn">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>SARAN PAKAR BIOTEKNOLOGI (PASURA-BIO AI)</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950 text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto font-sans">
                {aiFeedback}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bacterial Growth Simulation Curve (Recharts) */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
          <div>
            <h3 className="text-lg font-bold text-white font-serif flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              <span>Simulasi Kurva Kinetika Pertumbuhan Bakteri Pembusuk (7 Hari)</span>
            </h3>
            <p className="text-xs text-stone-400">
              Perbandingan koloni bakteri (CFU/mL) antara Jamu Tradisional Terbuka (pH 5.6) vs Formulasi pH Terpilih Saat Ini (pH {currentPH}).
            </p>
          </div>
          <span className="text-[10px] text-stone-400 font-mono">
            Suhu Inkubasi Standar 28°C
          </span>
        </div>

        <div className="w-full h-72 sm:h-80 bg-stone-950 p-4 rounded-2xl border border-stone-800/80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bacterialGrowthData} margin={{ top: 15, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
              <XAxis dataKey="day" stroke="#a8a29e" fontSize={11} tick={{ fill: '#d6d3d1' }} />
              <YAxis 
                stroke="#a8a29e" 
                fontSize={11} 
                tick={{ fill: '#d6d3d1' }}
                tickFormatter={(val) => val >= 1000000 ? `${(val/1000000).toFixed(0)}M` : val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-3 rounded-xl bg-stone-900 border border-stone-700 text-xs space-y-1 shadow-2xl">
                        <strong className="text-white block font-serif">{payload[0]?.payload?.day}</strong>
                        <div className="text-emerald-400 font-mono">
                          Formula Saat Ini (pH {currentPH}): <strong>{payload[0]?.value?.toLocaleString('id-ID')} CFU/mL</strong>
                        </div>
                        <div className="text-rose-400 font-mono">
                          Jamu Tradisional (pH 5.6): <strong>{payload[1]?.value?.toLocaleString('id-ID')} CFU/mL</strong>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(val) => (
                  <span className="text-xs font-semibold text-stone-300">
                    {val === 'currentFormula' ? `Formula Saat Ini (pH ${currentPH})` : 'Jamu Tanpa Pengatur Asam (pH 5.6)'}
                  </span>
                )}
              />
              <Line 
                type="monotone" 
                dataKey="currentFormula" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#10b981' }}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="traditionalUnacidified" 
                stroke="#f43f5e" 
                strokeWidth={2} 
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#f43f5e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scientific Teaching Insight */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-stone-300 space-y-1">
          <strong className="text-emerald-300 block font-semibold text-[10px] uppercase">
            Teori Bioteknologi: Pengaruh pH Asam Terhadap Permeabilitas Membran Bakteri
          </strong>
          <p className="leading-relaxed">
            Pada pH asam (&lt; 4.6), molekul asam organik yang tidak terdisosiasi (*undissociated organic acids*) seperti asam sitrat dan asam tartarat dapat menembus membran sel mikroorganisme secara bebas. Di dalam sitoplasma netral bakteri, molekul tersebut melepaskan proton ($H^+$) yang menurunkan pH internal mikroba, memaksa sel menghabiskan energi ATP untuk memompa proton keluar hingga sel bakteri mati lemas atau terhenti replikasinya.
          </p>
        </div>
      </div>
    </div>
  );
};
