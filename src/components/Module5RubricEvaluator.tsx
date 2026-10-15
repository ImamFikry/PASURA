import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  Sparkles, 
  Printer, 
  Download, 
  Save, 
  UserCheck, 
  Star,
  FileSpreadsheet
} from 'lucide-react';
import { RUBRIC_CRITERIA } from '../data/ethnoscienceData';

interface Module5RubricEvaluatorProps {
  onComplete?: () => void;
}

export const Module5RubricEvaluator: React.FC<Module5RubricEvaluatorProps> = ({ onComplete }) => {
  const [groupName, setGroupName] = useState<string>('Kelompok 2 - Sang Penjaga Kebonagung');
  const [productTitle, setProductTitle] = useState<string>('Sirup Jamu Kebonagung Pasteurisasi LTLT Smart QR');
  const [scores, setScores] = useState<Record<string, number>>({
    meaningful: 4,
    creative: 3,
    impactful: 4,
  });
  const [evaluatorNotes, setEvaluatorNotes] = useState<string>(
    'Kombinasi formulasi Brix 22° dan pasteurisasi 65°C terbukti efektif memperpanjang umur simpan jamu hingga 25 hari. Desain label Smart QR sangat digemari perajin Kebonagung karena memuat profil UMKM dan uji antioksidan laboratorium.'
  );

  const handleScoreChange = (criterionId: string, score: number) => {
    setScores((prev) => ({
      ...prev,
      [criterionId]: score,
    }));
  };

  const totalRawScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxRawScore = RUBRIC_CRITERIA.length * 4; // 3 * 4 = 12
  const finalScore100 = Math.round((totalRawScore / maxRawScore) * 100);

  const getPredicate = (finalScore: number) => {
    if (finalScore >= 90) return { label: 'Sangat Memuaskan (A+ / Teladan Kebonagung)', color: 'text-emerald-400' };
    if (finalScore >= 80) return { label: 'Memuaskan (A / Inovator Muda Etnosains)', color: 'text-cyan-400' };
    if (finalScore >= 70) return { label: 'Baik (B / Memenuhi Standar POPBL)', color: 'text-amber-400' };
    return { label: 'Perlu Penguatan (C / Remedial Pendampingan)', color: 'text-rose-400' };
  };

  const predicate = getPredicate(finalScore100);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const reportText = `========================================================================
LEMBAR PENILAIAN PROYEK ETNOSAINS BIOTEKNOLOGI JAMU KEBONAGUNG
MODEL POPBL - PENDEKATAN CULTURALLY RESPONSIVE TEACHING (CRT)
SMP / MTs KOTA PASURUAN
========================================================================

NAMA KELOMPOK : ${groupName}
JUDUL PRODUK  : ${productTitle}
TANGGAL       : ${new Date().toLocaleDateString('id-ID')}

HASIL PENILAIAN 3 INDIKATOR MANDATORI:
1. Meaningful (Bermakna & Berakar Budaya)   : Skor ${scores.meaningful} / 4
2. Creative (Inovatif Berbantuan AI)       : Skor ${scores.creative} / 4
3. Impactful (Berdampak bagi UMKM Pasuruan): Skor ${scores.impactful} / 4

------------------------------------------------------------------------
TOTAL SKOR MENTAH: ${totalRawScore} / ${maxRawScore}
NILAI AKHIR (SKALA 100): ${finalScore100}
PREDIKAT: ${predicate.label}
------------------------------------------------------------------------

CATATAN EVALUASI & FEEDBACK GURU:
"${evaluatorNotes}"

========================================================================
Tanda Tangan Guru Penilai:                       Ketua Kelompok:

(...............................)               (...............................)
`;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nilai_Proyek_${groupName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 p-6 sm:p-8 border border-amber-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>MODUL 5 • RUBRIK PENILAIAN KELOMPOK POPBL-CRT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Rubrik Evaluasi: Meaningful, Creative, & Impactful
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Instrumen asesmen autentik untuk menilai kinerja kelompok siswa dalam memecahkan dilema ketahanan simpan Jamu Kebonagung Pasuruan dan pemberdayaan UMKM lokal.
            </p>
          </div>

          {/* Quick Score Card */}
          <div className="p-5 rounded-2xl bg-stone-950/90 border border-amber-500/50 text-center shrink-0 min-w-[200px] shadow-lg">
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block">Nilai Akhir (Skala 100):</span>
            <span className="text-4xl font-extrabold text-amber-400 my-1 block">
              {finalScore100}
            </span>
            <span className={`text-xs font-bold ${predicate.color}`}>
              {predicate.label.split('(')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Group Info Editor */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
          <UserCheck className="w-4 h-4 text-amber-400" />
          <span>Informasi Kelompok & Produk Inovasi yang Dinilai</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-stone-400 mb-1 font-medium">Nama Kelompok Siswa:</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-stone-400 mb-1 font-medium">Nama Inovasi Produk / Artefak Jamu:</label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 3 Criteria Interactive Scoring Table */}
      <div className="space-y-6">
        {RUBRIC_CRITERIA.map((criterion, index) => {
          const currentScore = scores[criterion.id] || 4;

          return (
            <div
              key={criterion.id}
              className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-7 space-y-5 shadow-xl"
            >
              {/* Criteria Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">
                    {criterion.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {criterion.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-400 font-mono">Skor Dipilih:</span>
                  <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-mono text-sm font-extrabold border border-amber-500/40">
                    {currentScore} / 4
                  </span>
                </div>
              </div>

              {/* Descriptor Buttons (1 to 4) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {criterion.descriptors.map((desc) => {
                  const isSelected = currentScore === desc.score;
                  return (
                    <div
                      key={desc.score}
                      onClick={() => handleScoreChange(criterion.id, desc.score)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                          : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-800/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                            isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {desc.score}
                          </span>
                          <span className={`text-[11px] font-bold ${isSelected ? 'text-amber-300' : 'text-stone-400'}`}>
                            {desc.title}
                          </span>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed mt-2">
                          {desc.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="pt-2 border-t border-amber-500/30 text-[10px] text-amber-400 font-bold flex items-center space-x-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Pilihan Aktif</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Evaluator Notes & Actions */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 space-y-4 shadow-xl">
        <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
          Catatan Refleksi & Feedback Konstruktif Guru / Penilai:
        </label>
        <textarea
          rows={4}
          value={evaluatorNotes}
          onChange={(e) => setEvaluatorNotes(e.target.value)}
          placeholder="Tuliskan apresiasi dan saran perbaikan untuk kelompok ini..."
          className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-4 text-stone-200 text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-amber-500 resize-y"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-stone-400">
            Predikat: <strong className={predicate.color}>{predicate.label}</strong>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-400" />
              <span>Cetak Halaman</span>
            </button>
            <button
              onClick={handleDownloadReport}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Lembar Penilaian (TXT)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
