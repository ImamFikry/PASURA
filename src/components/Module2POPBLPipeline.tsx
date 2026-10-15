import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle, 
  CheckCircle2,
  Circle, 
  BookOpen, 
  Sparkles, 
  Download, 
  Award, 
  ArrowRight, 
  Compass, 
  FileCheck2,
  Users,
  Lightbulb,
  Trophy,
  Target,
  Clock,
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { POPBL_STAGES } from '../data/ethnoscienceData';

interface Module2POPBLPipelineProps {
  onComplete?: () => void;
}

export const Module2POPBLPipeline: React.FC<Module2POPBLPipelineProps> = ({ onComplete }) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [completedMilestones, setCompletedMilestones] = useState<Record<number, boolean>>({
    1: true,
  });
  const [teamName, setTeamName] = useState<string>('Kelompok Peneliti Cilik Pasuruan');
  const [projectTitle, setProjectTitle] = useState<string>('Inovasi Jamu Kebonagung Pasteurisasi LTLT Smart QR');

  const activeStage = POPBL_STAGES.find((s) => s.id === selectedStageId) || POPBL_STAGES[0];

  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const totalStages = POPBL_STAGES.length;
  const progressPercent = Math.round((completedCount / totalStages) * 100);

  const getAchievementBadge = (percent: number) => {
    if (percent >= 100) return { title: 'Duta Pelestari Jamu Kebonagung', icon: Trophy, color: 'text-amber-400 bg-amber-500/20 border-amber-500/40' };
    if (percent >= 80) return { title: 'Desainer Smart Packaging UMKM', icon: Award, color: 'text-purple-400 bg-purple-500/20 border-purple-500/40' };
    if (percent >= 60) return { title: 'Inovator Bioteknologi Pangan', icon: Sparkles, color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40' };
    if (percent >= 40) return { title: 'Penjelajah Sains Etnomedisin', icon: Compass, color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40' };
    return { title: 'Peneliti Pemula Budaya Pasuruan', icon: Target, color: 'text-stone-300 bg-stone-800 border-stone-700' };
  };

  const badge = getAchievementBadge(progressPercent);

  const toggleMilestone = (stageId: number) => {
    const nextState = !completedMilestones[stageId];
    const updated = {
      ...completedMilestones,
      [stageId]: nextState,
    };
    setCompletedMilestones(updated);

    const newCompletedCount = Object.values(updated).filter(Boolean).length;
    if (newCompletedCount === totalStages && nextState) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleDownloadLKPD = () => {
    const lkpdContent = `========================================================================
LEMBAR KERJA PESERTA DIDIK (LKPD) PROYEK BIOTEKNOLOGI ETNOSAINS
MODEL: PROBLEM AND PROJECT-ORIENTED BASED LEARNING (POPBL)
PENDEKATAN: CULTURALLY RESPONSIVE TEACHING (CRT)
TOPIK: BIOPRESERVASI JAMU KEBONAGUNG KHAS KOTA PASURUAN
TARGET: KELAS 9 SMP/MTs
========================================================================

NAMA KELOMPOK : ....................................................
ANGGOTA       : 1. .................................................
                2. .................................................
                3. .................................................
                4. .................................................
KELAS / SEKOLAH: ....................................................

${POPBL_STAGES.map(
  (stage) => `
------------------------------------------------------------------------
${stage.stageName}
------------------------------------------------------------------------
DIMENSI CRT     : ${stage.crtDimension}
TUJUAN          : ${stage.objective}
KONSEP SAINS    : ${stage.scienceConcept}
INTEGRASI AI    : ${stage.aiIntegration}
TARGET ARTEFAK  : ${stage.expectedArtifact}

AKTIVITAS PENYELIDIKAN SISWA:
${stage.studentActivities.map((act, i) => `  [ ] ${i + 1}. ${act}`).join('\n')}

CATATAN REFLEKSI GURU & KELOMPOK:
........................................................................
........................................................................
`
).join('\n')}
========================================================================
PASURA-BIO AI - Media Pembelajaran Etnosains Kota Pasuruan
`;
    const blob = new Blob([lkpdContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LKPD_POPBL_CRT_Jamu_Kebonagung_Pasuruan.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* INTERACTIVE PROGRESS TRACKER (PELACAK KEMAJUAN PROYEK SISWA) */}
      <div className="rounded-3xl bg-stone-900 border-2 border-emerald-500/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header of Progress Tracker */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30 flex items-center space-x-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>STUDENT PROJECT PROGRESS TRACKER</span>
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Model POPBL & Pendekatan CRT
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-serif tracking-tight">
              Pelacak Kemajuan Proyek Etnosains Jamu Kebonagung
            </h2>
          </div>

          {/* Achievement Badge */}
          <div className={`px-4 py-2 rounded-2xl border flex items-center space-x-2.5 shadow-md ${badge.color}`}>
            {React.createElement(badge.icon, { className: 'w-5 h-5 shrink-0' })}
            <div>
              <span className="text-[10px] text-stone-400 font-mono uppercase block">Tingkat Pencapaian:</span>
              <strong className="text-xs sm:text-sm font-bold tracking-tight block">{badge.title}</strong>
            </div>
          </div>
        </div>

        {/* Student Team & Project Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Nama Kelompok Siswa:
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-transparent text-white font-bold text-xs focus:outline-none focus:text-emerald-300"
              placeholder="Ketik nama kelompok..."
            />
          </div>
          <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Judul Inovasi Produk Jamu:
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full bg-transparent text-white font-bold text-xs focus:outline-none focus:text-emerald-300"
              placeholder="Ketik judul inovasi..."
            />
          </div>
        </div>

        {/* Visual 5-Stage Stepper with Connecting Line */}
        <div className="relative py-2">
          {/* Horizontal Connecting Track Line */}
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-stone-800 -translate-y-1/2 z-0 hidden sm:block">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
              style={{ width: `${(completedCount / totalStages) * 100}%` }}
            />
          </div>

          {/* Stepper Nodes */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-5 gap-3">
            {POPBL_STAGES.map((stage) => {
              const isCompleted = !!completedMilestones[stage.id];
              const isCurrent = stage.id === selectedStageId;

              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center space-y-2 ${
                    isCurrent
                      ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-400/30 shadow-lg shadow-emerald-500/20'
                      : isCompleted
                      ? 'bg-stone-950/80 border-emerald-800/80 hover:bg-stone-850'
                      : 'bg-stone-950/50 border-stone-800/80 hover:bg-stone-850 opacity-75'
                  }`}
                >
                  {/* Step Node Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-md transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-stone-950'
                      : isCurrent
                      ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/20 animate-pulse'
                      : 'bg-stone-800 text-stone-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stage.id}
                  </div>

                  {/* Stage Label */}
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold">
                      Tahap 0{stage.id}
                    </span>
                    <span className={`text-xs font-bold leading-tight line-clamp-1 ${isCurrent ? 'text-emerald-300' : 'text-stone-200'}`}>
                      {stage.stageName.split(':')[1]?.split('(')[0]?.trim() || `Tahap ${stage.id}`}
                    </span>
                  </div>

                  {/* Completion Status Pill */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMilestone(stage.id);
                    }}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 transition ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-stone-800 text-stone-400 border border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Selesai</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3 h-3" />
                        <span>Belum</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar & Quick Action Strip */}
        <div className="space-y-2 pt-2 border-t border-stone-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-300 font-medium flex items-center space-x-1.5">
              <span>Progres Keseluruhan Proyek:</span>
              <strong className="text-emerald-400 font-mono font-extrabold">{completedCount} dari {totalStages} Tahapan ({progressPercent}%)</strong>
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleMilestone(selectedStageId)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer ${
                  completedMilestones[selectedStageId]
                    ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md shadow-emerald-500/20'
                }`}
              >
                {completedMilestones[selectedStageId] ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                    <span>Tandai Belum Selesai</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Tandai Tahap {selectedStageId} Selesai</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCompletedMilestones({ 1: true })}
                className="p-1.5 rounded-xl bg-stone-950 text-stone-500 hover:text-stone-300 border border-stone-800 transition cursor-pointer"
                title="Reset Progres Belajar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Animated Progress Bar Track */}
          <div className="w-full bg-stone-950 rounded-full h-3 p-0.5 border border-stone-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-700 shadow-md"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 p-6 sm:p-8 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>MODUL 2 • KERANGKA KERJA POPBL & CRT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              5 Tahapan Proyek Siswa Berbasis Budaya Pasuruan
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Memadukan Problem and Project-Oriented Based Learning (POPBL) dengan Culturally Responsive Teaching (CRT). Siswa tidak hanya belajar konsep bioteknologi pengawetan alami, namun juga memecahkan dilema nyata perajin Jamu Kebonagung Kota Pasuruan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadLKPD}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Format LKPD</span>
            </button>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {POPBL_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            const isCompleted = completedMilestones[stage.id];
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/20'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-emerald-300' : 'text-stone-400'}`}>
                    Tahap {stage.id}
                  </span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMilestone(stage.id);
                    }}
                    title={isCompleted ? 'Tahap selesai' : 'Tandai selesai'}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-600 hover:text-stone-400" />
                    )}
                  </div>
                </div>
                <div className="text-xs font-bold text-stone-200 line-clamp-2">
                  {stage.stageName.split(':')[1]?.trim() || stage.stageName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Detail Content for Selected Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stage Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Stage Title & CRT Dimension */}
            <div className="space-y-3 pb-4 border-b border-stone-800">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
                <Compass className="w-4 h-4" />
                <span>PANDUAN LENGKAP PELAKSANAAN • TAHAP {activeStage.id}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                {activeStage.stageName}
              </h2>

              {/* CRT Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-200">
                  <strong className="font-semibold block text-amber-300">Dimensi Culturally Responsive Teaching (CRT):</strong>
                  {activeStage.crtDimension}
                </div>
              </div>
            </div>

            {/* Objective */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>Tujuan Pembelajaran Tahap Ini</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-medium">
                {activeStage.objective}
              </p>
            </div>

            {/* Student Inquiry Activities */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Aktivitas Kolaboratif Siswa (Inquiry & Action)</span>
              </h3>
              <div className="space-y-2.5">
                {activeStage.studentActivities.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-start space-x-3 group hover:border-emerald-500/40 transition"
                  >
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {act}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Science & AI Integration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Konsep Sains & Bioteknologi</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeStage.scienceConcept}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Peran & Integrasi Generative AI</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activeStage.aiIntegration}
                </p>
              </div>
            </div>

            {/* Teacher Coaching Tips */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-dashed border-stone-700 flex items-start space-x-3 text-xs text-stone-300">
              <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300 block font-semibold mb-0.5">Tips Refleksi Guru Pembimbing:</strong>
                {activeStage.teacherTips}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Expected Artifact & Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Target Artifact Card */}
          <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border border-amber-800/40 p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4" />
              <span>Target Artefak Nyata</span>
            </div>
            <h4 className="text-lg font-bold text-white font-serif">
              {activeStage.expectedArtifact}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Artefak ini dievaluasi pada Modul 5 dengan 3 indikator: Meaningful, Creative, dan Impactful bagi UMKM Kebonagung.
            </p>

            <button
              onClick={() => toggleMilestone(activeStage.id)}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer ${
                completedMilestones[activeStage.id]
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 shadow-md'
              }`}
            >
              {completedMilestones[activeStage.id] ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Tahap Ini Sudah Tercapai</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Tandai Selesai Tahap Ini</span>
                </>
              )}
            </button>
          </div>

          {/* Etnosains Reconstruction Table Summary */}
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-5 space-y-3 shadow-xl">
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Jembatan Etnosains vs Sains Modern</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">Kearifan Pasuruan:</span>
                <p>"Digodhog geni alon, dicampur gula aren legi kenthel"</p>
                <span className="text-[10px] text-emerald-400 font-bold uppercase block pt-1">Sains Bioteknologi:</span>
                <p>Ekstraksi maserasi senyawa aktif eugenol/piperin + penurunan aw via tekanan osmotik Brix 20-25°.</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">Kearifan Pasuruan:</span>
                <p>"Disaring kain mori suci, dibotoli pas anget kuku"</p>
                <span className="text-[10px] text-emerald-400 font-bold uppercase block pt-1">Sains Bioteknologi:</span>
                <p>Filtrasi mikropartikel kontaminan + hot-filling pasteurisasi LTLT untuk membunuh bakteri vegetatif.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
