import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  Copy, 
  Check, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Eye,
  FileText
} from 'lucide-react';
import { VIDEO_METADATA, VIDEO_SCENES } from '../data/ethnoscienceData';
import { VideoScene } from '../types';

interface Module1VideoTriggerProps {
  onComplete?: () => void;
}

export const Module1VideoTrigger: React.FC<Module1VideoTriggerProps> = ({ onComplete }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeScene = VIDEO_SCENES[currentSceneIndex];

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Scene autoplay timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentSceneIndex < VIDEO_SCENES.length - 1) {
          setCurrentSceneIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 7000); // 7s preview per scene
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentSceneIndex]);

  // Voice narration using Web Speech API
  const speakNarration = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = () => {
    const fullScript = `=== SKRIP VIDEO PEMANTIK (TRIGGER VIDEO) POPBL-CRT ===
Judul: ${VIDEO_METADATA.title}
Durasi: ${VIDEO_METADATA.duration}
Target: ${VIDEO_METADATA.targetAudience}

FOKUS MASALAH/KONFLIK:
${VIDEO_METADATA.conflictTheme}

RINCIAN ADEGAN DEMI ADEGAN:
${VIDEO_SCENES.map(
  (s) => `
[ADEGAN ${s.sceneNumber}: ${s.title}] (${s.timeRange})
- Visual: ${s.visual}
- Teks Layar: "${s.screenText}"
- Audio/Narasi: "${s.audioNarration}"
- Muatan Etnosains: ${s.ethnoscienceFocus}
`
).join('\n')}

PERTANYAAN PEMANTIK PROYEK:
${VIDEO_METADATA.triggerQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;
    navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadScript = () => {
    const fullScript = `=== SKRIP VIDEO PEMANTIK POPBL-CRT KOTA PASURUAN ===\nJudul: ${VIDEO_METADATA.title}\nDurasi: ${VIDEO_METADATA.duration}\n\n${VIDEO_SCENES.map(s => `ADEGAN ${s.sceneNumber} (${s.timeRange}):\nVisual: ${s.visual}\nTeks: ${s.screenText}\nNarasi: ${s.audioNarration}\n\n`).join('')}PERTANYAAN PEMANTIK:\n${VIDEO_METADATA.triggerQuestions.join('\n')}`;
    const element = document.createElement('a');
    const file = new Blob([fullScript], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Skrip_Video_Pemantik_Jamu_Kebonagung.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 p-6 sm:p-8 border border-amber-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODUL 1 • MEDIA STIMULUS POPBL-CRT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
              {VIDEO_METADATA.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300">
              <span className="flex items-center space-x-1.5 bg-stone-800/80 px-3 py-1 rounded-lg border border-stone-700/50">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Durasi: {VIDEO_METADATA.duration}</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-stone-800/80 px-3 py-1 rounded-lg border border-stone-700/50">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>SMP/MTs Kelas 9 • Etnosains Kota Pasuruan</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyScript}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'Tersalin!' : 'Salin Skrip'}</span>
            </button>
            <button
              onClick={handleDownloadScript}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 text-xs font-semibold border border-amber-500/40 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh TXT</span>
            </button>
          </div>
        </div>

        {/* Konflik Masalah Box */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-800/50 flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            <strong className="text-amber-300 font-semibold block mb-0.5">Fokus Konflik & Masalah Utama:</strong>
            {VIDEO_METADATA.conflictTheme}
          </div>
        </div>
      </div>

      {/* Interactive Storyboard Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Player Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-amber-900/40 shadow-2xl min-h-[400px] flex flex-col justify-between p-6 sm:p-8">
            {/* Ambient Background Glow matching scene */}
            <div className={`absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 ${
              currentSceneIndex === 0 ? 'bg-gradient-to-br from-amber-600 to-orange-800' :
              currentSceneIndex === 1 ? 'bg-gradient-to-br from-rose-700 to-amber-900' :
              currentSceneIndex === 2 ? 'bg-gradient-to-br from-purple-800 to-rose-950' :
              currentSceneIndex === 3 ? 'bg-gradient-to-br from-emerald-700 to-cyan-900' :
              'bg-gradient-to-br from-amber-500 to-emerald-600'
            }`} />

            {/* Top Scene Tracker */}
            <div className="relative z-10 flex items-center justify-between border-b border-stone-800/80 pb-4">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  ADEGAN {activeScene.sceneNumber} / {VIDEO_SCENES.length}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {activeScene.timeRange}
                </span>
              </div>
              <span className="text-xs font-medium text-amber-200/80 px-2 py-0.5 rounded bg-stone-900 border border-stone-800">
                {activeScene.title}
              </span>
            </div>

            {/* Middle: Visual Framing & Screen Text */}
            <div className="relative z-10 my-6 space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 backdrop-blur-sm space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400">
                  <Eye className="w-4 h-4" />
                  <span>DESKRIPSI VISUAL & ANGGEL KAMERA:</span>
                </div>
                <p className="text-sm sm:text-base text-stone-200 leading-relaxed italic">
                  "{activeScene.visual}"
                </p>
              </div>

              {/* Teks Layar (Overlay Text) */}
              <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-700/40 text-center">
                <span className="text-[10px] tracking-widest text-amber-400 uppercase font-bold block">
                  Teks Muncul di Layar (Lower Third)
                </span>
                <span className="text-base sm:text-lg font-bold text-white font-serif tracking-wide drop-shadow">
                  « {activeScene.screenText} »
                </span>
              </div>

              {/* Narasi Audio */}
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 backdrop-blur-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                    <FileText className="w-4 h-4" />
                    <span>AUDIO / SKRIP NARASI PENGISI SUARA:</span>
                  </div>
                  {speechSupported && (
                    <button
                      onClick={() => speakNarration(activeScene.audioNarration)}
                      className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isSpeaking
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeaking ? 'Hentikan Suara' : 'Dengarkan Narasi'}</span>
                    </button>
                  )}
                </div>
                <p className="text-sm sm:text-base text-stone-100 font-medium leading-relaxed">
                  "{activeScene.audioNarration}"
                </p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-10 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-stone-950" />}
                  <span>{isPlaying ? 'Jeda Simulasi' : 'Putar Simulasi'}</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentSceneIndex(0);
                    setIsPlaying(false);
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  }}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                  title="Ulangi dari Awal"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Prev / Next Scene Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentSceneIndex === 0}
                  onClick={() => setCurrentSceneIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-stone-400 font-mono">
                  {currentSceneIndex + 1} dari {VIDEO_SCENES.length}
                </span>
                <button
                  disabled={currentSceneIndex === VIDEO_SCENES.length - 1}
                  onClick={() => setCurrentSceneIndex((prev) => Math.min(VIDEO_SCENES.length - 1, prev + 1))}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scene List & Timeline */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Daftar Adegan Storyboard</span>
            </h3>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {VIDEO_SCENES.map((scene, idx) => {
                const isSelected = idx === currentSceneIndex;
                return (
                  <div
                    key={scene.sceneNumber}
                    onClick={() => {
                      setCurrentSceneIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10'
                        : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={`font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-stone-400'}`}>
                        Adegan {scene.sceneNumber}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">{scene.timeRange}</span>
                    </div>
                    <div className="text-xs font-semibold text-stone-200 line-clamp-1">
                      {scene.title}
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                      {scene.visual}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pertanyaan Pemantik di Akhir Video */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-600/40 p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">
              Pertanyaan Pemantik Proyek Siswa (Trigger Questions)
            </h2>
            <p className="text-xs text-amber-200/80">
              Digunakan guru untuk memantik diskusi kritis kelas 9 di akhir pemutaran video sebelum masuk Tahap 1 POPBL.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {VIDEO_METADATA.triggerQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-stone-950/70 border border-amber-800/40 flex flex-col justify-between space-y-3 relative group hover:border-amber-500/60 transition"
            >
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/40">
                  0{idx + 1}
                </span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Tantangan {idx + 1}
                </span>
              </div>
              <p className="text-sm font-medium text-stone-200 leading-snug">
                {q}
              </p>
              <div className="pt-2 border-t border-stone-800 text-[11px] text-amber-400 font-medium">
                → Arahkan ke Tahap {idx + 1} POPBL
              </div>
            </div>
          ))}
        </div>

        {onComplete && (
          <div className="pt-4 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Sudah selesai menelaah video pemantik dan mendiskusikan konflik etnosains?</span>
            </div>
            <button
              onClick={onComplete}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Tandai Selesai & Klaim Badge "Saksi Dilema Kebonagung" (+100 XP)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
