import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { Module1VideoTrigger } from './components/Module1VideoTrigger';
import { Module2POPBLPipeline } from './components/Module2POPBLPipeline';
import { Module3PromptSandbox } from './components/Module3PromptSandbox';
import { Module4InteractiveQuiz } from './components/Module4InteractiveQuiz';
import { Module5RubricEvaluator } from './components/Module5RubricEvaluator';
import { BioPreservationLab } from './components/BioPreservationLab';
import { LabSimulasiPH } from './components/LabSimulasiPH';
import { SmartQRLabelMaker } from './components/SmartQRLabelMaker';
import { CompoundScienceExplorer } from './components/CompoundScienceExplorer';
import { PasuruanSpiceMap } from './components/PasuruanSpiceMap';
import { VirtualJamuStallTour } from './components/VirtualJamuStallTour';
import { AIChatModal } from './components/AIChatModal';
import { UserSession } from './types';
import { 
  Sparkles, 
  MessageSquareText, 
  BookOpen, 
  HeartHandshake, 
  MapPin, 
  Layers, 
  FlaskConical, 
  ShieldCheck,
  GraduationCap,
  Users,
  Store,
  LogOut,
  Sparkle
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('pasura_bio_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('modul-1');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState<boolean>(true);

  const handleLogout = () => {
    try {
      localStorage.removeItem('pasura_bio_user');
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
  };

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    setShowWelcomeToast(true);
  };

  // If user is not authenticated, show LoginPage
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChat={() => setIsChatOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* User Session Banner */}
      {showWelcomeToast && (
        <div className="bg-gradient-to-r from-amber-950/80 via-stone-900 to-emerald-950/80 border-b border-amber-800/40 px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-stone-300">
                Sesi Aktif: <strong className="text-amber-300">{currentUser.name}</strong>
              </span>
              <span className="hidden sm:inline text-stone-500">•</span>
              <span className="hidden sm:inline text-stone-400 font-medium">
                {currentUser.groupName || currentUser.gradeLevel} ({currentUser.schoolOrOrg})
              </span>
            </div>

            <div className="flex items-center space-x-3 text-[11px]">
              <span className="text-stone-400 hidden md:inline">
                Login pukul: {currentUser.loginAt || 'Baru saja'}
              </span>
              <button
                onClick={handleLogout}
                className="text-stone-400 hover:text-red-300 flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Ganti Akun</span>
              </button>
              <button
                onClick={() => setShowWelcomeToast(false)}
                className="text-stone-500 hover:text-stone-300 ml-1 font-bold cursor-pointer"
                title="Tutup banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Dynamic Module Component */}
        {activeTab === 'modul-1' && <Module1VideoTrigger />}
        {activeTab === 'modul-2' && <Module2POPBLPipeline />}
        {activeTab === 'modul-3' && <Module3PromptSandbox />}
        {activeTab === 'modul-4' && <Module4InteractiveQuiz />}
        {activeTab === 'modul-5' && <Module5RubricEvaluator />}
        {activeTab === 'tur-warung-3d' && <VirtualJamuStallTour />}
        {activeTab === 'lab-ph' && <LabSimulasiPH />}
        {activeTab === 'peta-rempah' && <PasuruanSpiceMap />}
        {activeTab === 'lab-biopreservasi' && <BioPreservationLab />}
        {activeTab === 'smart-qr' && <SmartQRLabelMaker />}
        {activeTab === 'sains-rempah' && <CompoundScienceExplorer />}
      </main>

      {/* Floating Action Button for AI Chat */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 text-stone-950 font-bold shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 cursor-pointer border-2 border-stone-950"
        title="Tanya PASURA-BIO AI"
      >
        <Sparkles className="w-5 h-5 text-stone-950 animate-spin" />
        <span className="text-xs sm:text-sm font-extrabold pr-1 hidden sm:inline">
          Konsultasi PASURA-BIO AI
        </span>
      </button>

      {/* AI Chatbot Modal */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 bg-stone-900/80 border-t border-stone-800 py-8 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-serif font-bold text-sm border border-amber-500/30">
              P
            </div>
            <div>
              <p className="font-bold text-stone-200">
                PASURA-BIO AI • Media Pembelajaran Etnosains Kota Pasuruan
              </p>
              <p className="text-[11px] text-stone-500">
                Bioteknologi Pangan, Bio-preservasi & Nilai Budaya Jamu Kebonagung • Model POPBL & Pendekatan CRT
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center space-x-1 text-amber-300/80">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Kota Pasuruan, Jawa Timur</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-emerald-300/80">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dukungan UMKM Kebonagung</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
