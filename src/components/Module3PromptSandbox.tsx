import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  RotateCcw, 
  Save, 
  HelpCircle, 
  History, 
  CheckCircle2, 
  Loader2, 
  Cpu,
  BookOpen
} from 'lucide-react';
import { STUDENT_PROMPTS } from '../data/ethnoscienceData';
import { PromptTemplate } from '../types';

interface ExperimentHistoryItem {
  timestamp: string;
  templateTitle: string;
  prompt: string;
  output: string;
}

interface Module3PromptSandboxProps {
  onComplete?: () => void;
}

export const Module3PromptSandbox: React.FC<Module3PromptSandboxProps> = ({ onComplete }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(STUDENT_PROMPTS[0]);
  const [promptText, setPromptText] = useState<string>(STUDENT_PROMPTS[0].promptText);
  const [studentName, setStudentName] = useState<string>('Siswa Kelas 9');
  const [groupName, setGroupName] = useState<string>('Kelompok 1 - Laskar Kebonagung');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);
  const [history, setHistory] = useState<ExperimentHistoryItem[]>([]);

  const handleSelectTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setPromptText(template.promptText);
    setAiOutput('');
    setErrorMsg('');
  };

  const handleRunPrompt = async () => {
    if (!promptText.trim()) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/prompt-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          studentName,
          groupName,
          topic: selectedTemplate.title,
        }),
      });

      if (!res.ok) {
        throw new Error(`Gagal menghubungi server (${res.status})`);
      }

      const data = await res.json();
      const output = data.output || 'Respon kosong.';
      setAiOutput(output);

      // Add to history
      const newHistoryItem: ExperimentHistoryItem = {
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        templateTitle: selectedTemplate.title,
        prompt: promptText,
        output,
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 4)]);
      if (onComplete) {
        onComplete();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat memproses prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    if (onComplete) {
      onComplete();
    }
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(aiOutput);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-indigo-950 p-6 sm:p-8 border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>MODUL 3 • PANDUAN INTEGRASI PROMPT SISWA & LIVE SANDBOX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Eksperimen Prompt Generative AI untuk Etnosains
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Siswa dapat menguji contoh prompt siap pakai atau memodifikasi teks prompt mereka sendiri untuk menganalisis kandungan bioaktif rempah Jamu Kebonagung dan menciptakan copywriting kemasan ber-Smart QR.
          </p>
        </div>
      </div>

      {/* Template Selector Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Pilih Templat Prompt AI Siap Pakai (Mandatori Siswa)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STUDENT_PROMPTS.map((template) => {
            const isSelected = template.id === selectedTemplate.id;
            return (
              <div
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400'
                    : 'bg-stone-900 border-stone-800 hover:bg-stone-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
                      {template.category}
                    </span>
                    <span className="text-[10px] text-stone-400">Gemini 3.8 Flash</span>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-2">
                    {template.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                    {template.explanation}
                  </p>
                </div>

                <div className="text-[11px] font-semibold text-indigo-300 flex items-center space-x-1">
                  <span>Klik untuk memuat ke editor →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sandbox Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Prompt Editor */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 font-bold">
                <Cpu className="w-4 h-4" />
                <span>STUDENT PROMPT WORKSPACE</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedPrompt ? 'Disalin' : 'Salin Teks'}</span>
                </button>
              </div>
            </div>

            {/* Student Metadata Inputs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Nama Siswa / Peneliti:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-stone-200 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Nama Kelompok:</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-stone-200 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>
            </div>

            {/* Prompt Textarea */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center justify-between">
                <span>Perintah Prompt Siswa (Dapat Diedit):</span>
                <span className="text-[11px] text-stone-500 font-mono">{promptText.length} karakter</span>
              </label>
              <textarea
                rows={9}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Tuliskan instruksi prompt Anda di sini..."
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-4 text-stone-200 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:border-indigo-500 transition resize-y"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPromptText(selectedTemplate.promptText)}
                className="flex items-center space-x-1.5 text-xs text-stone-400 hover:text-stone-200 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Templat Awal</span>
              </button>

              <button
                disabled={isLoading || !promptText.trim()}
                onClick={handleRunPrompt}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition transform active:scale-95 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Menganalisis dengan AI...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Jalankan Eksperimen AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Output & Feedback */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-5 sm:p-6 space-y-4 shadow-xl min-h-[460px] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>RESPON GENERATIVE AI (PASURA-BIO)</span>
                </div>
                {aiOutput && (
                  <button
                    onClick={handleCopyOutput}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition cursor-pointer"
                  >
                    {copiedOutput ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{copiedOutput ? 'Tersalin' : 'Salin Jawaban'}</span>
                  </button>
                )}
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
                  {errorMsg}
                </div>
              )}

              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3 text-stone-400">
                  <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                  <p className="text-xs font-mono">PASURA-BIO AI sedang menalar data bioteknologi etnosains...</p>
                </div>
              ) : aiOutput ? (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/80 text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-[380px] overflow-y-auto font-sans">
                  {aiOutput}
                </div>
              ) : (
                <div className="py-16 text-center space-y-3 text-stone-500">
                  <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <p className="text-xs max-w-sm mx-auto">
                    Pilih salah satu templat prompt di atas, lalu klik <strong>"Jalankan Eksperimen AI"</strong> untuk melihat hasil analisis bioteknologi pangan atau draf copywriting label jamu.
                  </p>
                </div>
              )}
            </div>

            {/* Prompt Engineering Coaching Note */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-200/90 flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Prinsip Prompt Siswa Kelas 9:</strong> Berikan peran spesifik ("Bertindaklah sebagai..."), sebutkan objek lokal Pasuruan, dan minta analogi yang mudah dipahami agar jawaban saintifik terarah!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* History of Experiments */}
      {history.length > 0 && (
        <div className="rounded-3xl bg-stone-900 border border-stone-800 p-5 space-y-3 shadow-xl">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Riwayat Eksperimen Prompt Siswa Sesi Ini ({history.length})</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {history.map((h, i) => (
              <div key={i} className="p-3 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-500 text-[10px]">
                  <span>{h.templateTitle}</span>
                  <span>{h.timestamp}</span>
                </div>
                <p className="text-stone-300 font-mono text-[11px] line-clamp-2 italic">
                  "{h.prompt}"
                </p>
                <div className="text-[10px] text-emerald-400 font-semibold line-clamp-1">
                  ✓ Berhasil dianalisis AI
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
