import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  HeartHandshake, 
  ChevronRight,
  Printer,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/ethnoscienceData';

interface Module4InteractiveQuizProps {
  onComplete?: () => void;
}

export const Module4InteractiveQuiz: React.FC<Module4InteractiveQuizProps> = ({ onComplete }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const currentQ = QUIZ_QUESTIONS[activeQuestionIndex];

  const handleSelectOption = (questionId: number, optionLabel: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / QUIZ_QUESTIONS.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    if (onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setActiveQuestionIndex(0);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 p-6 sm:p-8 border border-amber-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>MODUL 4 • EVALUASI KOGNITIF & PENALARAN KRITIS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Kuis Interaktif Bioteknologi & Etnosains Jamu Kebonagung
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              5 Soal terstandar: Soal 1-2 (Bioteknologi Pangan & Bio-preservasi), Soal 3-4 (Analisis Etnosains & Senyawa Rempah), dan Soal 5 (Penalaran Kritis CRT Pelestarian Budaya Pasuruan).
            </p>
          </div>

          {/* Quick Score Badge if submitted */}
          {submitted && (
            <div className="p-4 rounded-2xl bg-stone-950/90 border border-amber-500/50 text-center shrink-0">
              <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider block">Skor Akhir Siswa:</span>
              <span className={`text-3xl font-extrabold ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                {score} / 100
              </span>
              <span className="block text-[11px] text-stone-300 mt-1">
                {score >= 80 ? '🎉 Istimewa (Pakar Muda Pasuruan)' : score >= 60 ? '👍 Baik, Pelajari Pembahasan' : '📚 Terus Semangat Belajar'}
              </span>
            </div>
          )}
        </div>

        {/* Question Navigation Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
          <div className="flex items-center space-x-2">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const isAnswered = !!userAnswers[q.id];
              const isCurrent = idx === activeQuestionIndex;
              const isCorrect = submitted && userAnswers[q.id] === q.correctAnswer;
              const isWrong = submitted && userAnswers[q.id] && userAnswers[q.id] !== q.correctAnswer;

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-amber-400 scale-105'
                      : ''
                  } ${
                    submitted
                      ? isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                        : isWrong
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500'
                        : 'bg-stone-800 text-stone-400 border border-stone-700'
                      : isAnswered
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-stone-950 text-stone-400 border border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            {!submitted ? (
              <button
                disabled={answeredCount < QUIZ_QUESTIONS.length}
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Kirim Jawaban Kuis ({answeredCount}/5)</span>
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Ulangi Kuis</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Question Card */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Category & Difficulty Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div className="flex items-center space-x-2.5">
            <span className="px-3 py-1 rounded-lg bg-amber-500/15 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
              SOAL {currentQ.id} DARI 5
            </span>
            <span className="text-xs text-stone-300 font-medium">
              Topik: <strong className="text-white">{currentQ.category}</strong>
            </span>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
            Tingkat: {currentQ.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <div className="text-base sm:text-lg font-medium text-stone-100 leading-relaxed font-serif">
          {currentQ.question}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = userAnswers[currentQ.id] === option.label;
            const isCorrectAnswer = option.label === currentQ.correctAnswer;
            const showCorrect = submitted && isCorrectAnswer;
            const showWrong = submitted && isSelected && !isCorrectAnswer;

            return (
              <div
                key={option.label}
                onClick={() => handleSelectOption(currentQ.id, option.label)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                  showCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400'
                    : showWrong
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-400'
                    : isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10'
                    : 'bg-stone-950/60 border-stone-800/80 text-stone-300 hover:bg-stone-800/60'
                }`}
              >
                <span className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  showCorrect
                    ? 'bg-emerald-500 text-stone-950'
                    : showWrong
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-amber-400 text-stone-950'
                    : 'bg-stone-800 text-stone-400'
                }`}>
                  {option.label}
                </span>

                <span className="text-xs sm:text-sm leading-relaxed flex-1">
                  {option.text}
                </span>

                {submitted && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {submitted && showWrong && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Explanations (Appears when submitted) */}
        {submitted && (
          <div className="mt-6 pt-6 border-t border-stone-800 space-y-4 animate-fadeIn">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>KUNCI JAWABAN & PEMBAHASAN MENDALAM (SOAL {currentQ.id}): JAWABAN BENAR ADALAH [{currentQ.correctAnswer}]</span>
            </div>

            {/* Scientific Explanation */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-cyan-800/40 space-y-1.5">
              <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pembahasan Ilmiah (Bioteknologi & Sains Molekuler):</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {currentQ.scientificExplanation}
              </p>
            </div>

            {/* Cultural Reflection */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-1.5">
              <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5 uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Refleksi Budaya & Etnosains Kota Pasuruan:</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {currentQ.culturalReflection}
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-800/80">
          <button
            disabled={activeQuestionIndex === 0}
            onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 text-xs font-semibold transition cursor-pointer"
          >
            ← Soal Sebelumnya
          </button>

          <span className="text-xs text-stone-500 font-mono">
            {activeQuestionIndex + 1} dari {QUIZ_QUESTIONS.length}
          </span>

          <button
            disabled={activeQuestionIndex === QUIZ_QUESTIONS.length - 1}
            onClick={() => setActiveQuestionIndex((prev) => Math.min(QUIZ_QUESTIONS.length - 1, prev + 1))}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 text-xs font-semibold transition cursor-pointer"
          >
            Soal Berikutnya →
          </button>
        </div>
      </div>
    </div>
  );
};
