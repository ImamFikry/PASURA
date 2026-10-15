import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  Thermometer, 
  ShieldAlert, 
  Clock, 
  Play, 
  Loader2, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Droplets
} from 'lucide-react';

export const BioPreservationLab: React.FC = () => {
  const [ph, setPh] = useState<number>(4.4);
  const [brix, setBrix] = useState<number>(22);
  const [pasteurization, setPasteurization] = useState<string>('LTLT 65°C (30 Menit)');
  const [packaging, setPackaging] = useState<string>('Botol Kaca Kedap Udara (Hot-Filling)');
  const [bioactiveExtractLevel, setBioactiveExtractLevel] = useState<number>(6);

  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [aiSimulationAnalysis, setAiSimulationAnalysis] = useState<string>('');

  // Math simulation for shelf life based on hurdle technology
  const calculateMetrics = () => {
    let baseDaysRoom = 1.5;
    let baseDaysFridge = 5;

    // Brix effect: higher brix decreases water activity (aw)
    if (brix >= 20) {
      baseDaysRoom += (brix - 18) * 0.8;
      baseDaysFridge += (brix - 18) * 2.2;
    }

    // pH effect: acidic pH < 4.6 inhibits spore germination of C. botulinum and B. cereus
    if (ph <= 4.5) {
      baseDaysRoom += (4.6 - ph) * 4;
      baseDaysFridge += (4.6 - ph) * 8;
    } else {
      baseDaysRoom = Math.max(1, baseDaysRoom - (ph - 4.5) * 2);
    }

    // Pasteurization effect
    if (pasteurization.includes('LTLT 65°C')) {
      baseDaysRoom += 7;
      baseDaysFridge += 20;
    } else if (pasteurization.includes('HTST 72°C')) {
      baseDaysRoom += 8;
      baseDaysFridge += 24;
    } else if (pasteurization.includes('Didih')) {
      baseDaysRoom += 3;
      baseDaysFridge += 10;
    }

    // Bioactive extract (antimicrobial eugenol/piperine)
    baseDaysRoom += bioactiveExtractLevel * 0.9;
    baseDaysFridge += bioactiveExtractLevel * 2.0;

    // Packaging penalty
    if (packaging.includes('Terbuka')) {
      baseDaysRoom = Math.min(2, baseDaysRoom * 0.2);
      baseDaysFridge = Math.min(5, baseDaysFridge * 0.25);
    } else if (packaging.includes('Plastik PET')) {
      baseDaysRoom *= 0.7;
      baseDaysFridge *= 0.75;
    }

    const roomTempDays = Math.max(1, Math.round(baseDaysRoom));
    const fridgeDays = Math.max(2, Math.round(baseDaysFridge));
    const inhibitionZoneMm = Math.min(30, Math.round(8 + bioactiveExtractLevel * 1.8 + (4.6 - Math.min(ph, 4.6)) * 4));

    return {
      roomTempDays,
      fridgeDays,
      inhibitionZoneMm,
    };
  };

  const metrics = calculateMetrics();

  const handleSimulateWithAI = async () => {
    setIsLoadingAI(true);
    try {
      const res = await fetch('/api/ai/shelf-life-simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ph,
          brix,
          pasteurization,
          packaging,
          bioactiveExtractLevel,
        }),
      });
      const data = await res.json();
      setAiSimulationAnalysis(data.simulationResult || 'Hasil simulasi selesai.');
    } catch (err: any) {
      console.error(err);
      setAiSimulationAnalysis('Gagal mendapatkan penalaran AI. Silakan coba lagi.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-cyan-950 p-6 sm:p-8 border border-cyan-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>LABORATORIUM VIRTUAL • REKAYASA BIO-PRESERVASI PANGAN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Simulator Prediksi Masa Simpan Jamu Kebonagung
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Eksperimenkan berbagai variabel ilmiah: Derajat Brix (gula aren), pH keasaman larutan, teknik pasteurisasi, dan konsentrasi metabolit sekunder rempah antimikroba (Hurdle Technology).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Variable Sliders */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-7 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2 pb-2 border-b border-stone-800">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <span>Variabel Bebas Eksperimen Bioteknologi</span>
            </h3>

            {/* Slider 1: Brix */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200">1. Kadar Gula Aren Terlarut (Derajat Brix):</span>
                <span className="font-mono font-bold text-amber-400">{brix}° Brix</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="1"
                value={brix}
                onChange={(e) => setBrix(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>10° (Encer)</span>
                <span>20-25° (Optimal Jamu Kebonagung)</span>
                <span>30° (Sirup Sangat Kental)</span>
              </div>
            </div>

            {/* Slider 2: pH */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200">2. Derajat Keasaman (pH Larutan):</span>
                <span className="font-mono font-bold text-cyan-400">pH {ph.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="3.5"
                max="6.5"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>pH 3.5 (Asam Buah)</span>
                <span>pH 4.5 (Ambang Aman Bakteri Spore)</span>
                <span>pH 6.5 (Netral / Rawan Basi)</span>
              </div>
            </div>

            {/* Selector 3: Pasteurization */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-200">
                3. Metode Perlakuan Panas / Pasteurisasi:
              </label>
              <select
                value={pasteurization}
                onChange={(e) => setPasteurization(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 text-xs font-medium focus:outline-none focus:border-cyan-500"
              >
                <option value="Tanpa Pasteurisasi (Mentah Tradisional)">Tanpa Pasteurisasi (Metode Tradisional Terbuka)</option>
                <option value="LTLT 65°C (30 Menit)">Pasteurisasi LTLT 65°C (30 Menit - Rekomendasi)</option>
                <option value="HTST 72°C (15 Detik)">Pasteurisasi Cepat HTST 72°C (15 Detik)</option>
                <option value="Pemanasan Didih 100°C Terbuka">Didih Konvensional 100°C Terbuka (Minyak Menguap)</option>
              </select>
            </div>

            {/* Slider 4: Bioactive Extract % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200">4. Ekstrak Senyawa Bioaktif Rempah (Eugenol, Sinamaldehid, Piperin):</span>
                <span className="font-mono font-bold text-emerald-400">{bioactiveExtractLevel}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={bioactiveExtractLevel}
                onChange={(e) => setBioactiveExtractLevel(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-stone-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>1% (Rendah)</span>
                <span>5-7% (Konsentrasi Efektif Kebonagung)</span>
                <span>10% (Pekat)</span>
              </div>
            </div>

            {/* Selector 5: Packaging */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-200">
                5. Wadah Pengemasan:
              </label>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 text-xs font-medium focus:outline-none focus:border-cyan-500"
              >
                <option value="Botol Kaca Kedap Udara (Hot-Filling)">Botol Kaca Kedap Udara (Hot-Filling 70°C)</option>
                <option value="Botol Plastik PET Biasa">Botol Plastik PET Biasa Bersih</option>
                <option value="Wadah Kaca Terbuka / Klenting Tanah">Wadah Klenting Terbuka (Tradisional Tanpa Segel)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Predictive Results & AI Analysis */}
        <div className="lg:col-span-6 space-y-6">
          {/* Result Gauge Card */}
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-7 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Hasil Prediksi Daya Tahan Pangan (Shelf Life)</span>
              </span>
              <span className="text-[10px] text-stone-500 font-mono">Model Hurdle Technology</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center space-y-1">
                <span className="text-[10px] text-stone-400 uppercase font-semibold block">Suhu Ruang (25° - 30°C)</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono block">
                  {metrics.roomTempDays} <span className="text-base text-stone-400 font-sans">Hari</span>
                </span>
                <span className="text-[10px] text-stone-500 block">
                  {metrics.roomTempDays <= 2 ? '⚠️ Cepat Basi (Metode Tradisional)' : '✓ Awet Layak Edar'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-cyan-800/40 text-center space-y-1">
                <span className="text-[10px] text-cyan-300 uppercase font-semibold block">Suhu Kulkas (4°C)</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono block">
                  {metrics.fridgeDays} <span className="text-base text-stone-400 font-sans">Hari</span>
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Penyimpanan Dingin Higienis
                </span>
              </div>
            </div>

            {/* Antimicrobial Zone Preview */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-medium">Estimasi Zona Hambat Antibakteri (Kirby-Bauer):</span>
                <span className="font-mono font-bold text-emerald-400">{metrics.inhibitionZoneMm} mm</span>
              </div>
              <div className="w-full bg-stone-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (metrics.inhibitionZoneMm / 30) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-500">
                <span>&lt; 10 mm (Resisten)</span>
                <span>15-20 mm (Moderat)</span>
                <span>&gt; 20 mm (Sangat Sensitif/Kuat)</span>
              </div>
            </div>

            {/* AI Reasoning Button */}
            <button
              disabled={isLoadingAI}
              onClick={handleSimulateWithAI}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-600/20 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              {isLoadingAI ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang Menghitung dengan Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Konsultasikan Rekayasa Ini ke PASURA-BIO AI</span>
                </>
              )}
            </button>
          </div>

          {/* AI Simulation Result Box */}
          {aiSimulationAnalysis && (
            <div className="rounded-3xl bg-stone-900 border border-cyan-800/60 p-6 space-y-3 shadow-xl animate-fadeIn">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>ANALISIS SAINTIFIK & REKOMENDASI UMKM KOTA PASURUAN</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-950 text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto font-sans">
                {aiSimulationAnalysis}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
