import React from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  Video, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Award, 
  QrCode, 
  Atom, 
  MapPin,
  Droplet,
  MessageSquareText,
  LogOut,
  UserCheck,
  Store,
  Trophy
} from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
  currentUser?: UserSession | null;
  onLogout?: () => void;
  unlockedBadgeCount?: number;
  totalBadgeCount?: number;
  onOpenAchievements?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenChat,
  currentUser,
  onLogout,
  unlockedBadgeCount = 0,
  totalBadgeCount = 9,
  onOpenAchievements
}) => {
  const tabs = [
    { id: 'modul-1', label: 'Modul 1: Video Pemantik', icon: Video, badge: 'CRT' },
    { id: 'modul-2', label: 'Modul 2: Alur POPBL', icon: Layers, badge: '5 Tahap' },
    { id: 'modul-3', label: 'Modul 3: Prompt AI', icon: Terminal, badge: 'Sandbox' },
    { id: 'modul-4', label: 'Modul 4: Kuis Etnosains', icon: CheckCircle2, badge: '5 Soal' },
    { id: 'modul-5', label: 'Modul 5: Rubrik Evaluasi', icon: Award, badge: 'Penilaian' },
    { id: 'tur-warung-3d', label: 'Tur Warung 3D', icon: Store, badge: 'Three.js' },
    { id: 'lab-ph', label: 'Lab Simulasi pH Jamu', icon: Droplet, badge: 'Asam/Basa' },
    { id: 'peta-rempah', label: 'Peta Rempah Pasuruan', icon: MapPin, badge: 'Geospasial' },
    { id: 'lab-biopreservasi', label: 'Lab Bio-Preservasi', icon: FlaskConical, badge: 'Simulasi' },
    { id: 'smart-qr', label: 'Smart QR Kemasan', icon: QrCode, badge: 'UMKM' },
    { id: 'sains-rempah', label: 'Sains Rempah PubChem', icon: Atom, badge: 'Molekuler' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/40 text-stone-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('modul-1')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-600/30">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-serif">
                  PASURA<span className="text-amber-400">-BIO</span> AI
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider">
                  SMP KELAS 9
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Etnosains Jamu Kebonagung Pasuruan • Model POPBL & Pendekatan CRT
              </p>
            </div>
          </div>

          {/* User Profile & Quick Actions */}
          <div className="flex items-center space-x-2.5">
            {currentUser && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  currentUser.role === 'guru' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : currentUser.role === 'umkm'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-amber-600/20 text-amber-300 border border-amber-600/40'
                }`}>
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-stone-200 max-w-[120px] md:max-w-[160px] truncate">
                      {currentUser.name}
                    </span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                      currentUser.role === 'guru'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : currentUser.role === 'umkm'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-amber-900/60 text-amber-300 border border-amber-700/60'
                    }`}>
                      {currentUser.role === 'guru' ? 'Guru' : currentUser.role === 'umkm' ? 'UMKM' : 'Siswa'}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 truncate max-w-[150px] md:max-w-[200px]">
                    {currentUser.groupName || currentUser.schoolOrOrg}
                  </p>
                </div>
              </div>
            )}

            {onOpenAchievements && (
              <button
                onClick={onOpenAchievements}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all cursor-pointer shadow-sm shadow-amber-500/10"
                title="Buka Galeri Badge & Pencapaian Etnosains"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs">{unlockedBadgeCount}/{totalBadgeCount}</span>
                <span className="hidden lg:inline text-[11px] font-semibold text-amber-200/80">Badge</span>
              </button>
            )}

            <button
              onClick={onOpenChat}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-600/30 transition-all transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950 animate-pulse" />
              <span className="hidden md:inline">Tanya PASURA-BIO AI</span>
              <span className="md:hidden">AI</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                title="Keluar dari akun"
                className="flex items-center space-x-1.5 px-2.5 py-2 rounded-xl bg-stone-950/90 hover:bg-red-950/50 border border-stone-800 hover:border-red-800/80 text-stone-400 hover:text-red-300 text-xs font-medium transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Keluar</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2.5 no-scrollbar border-t border-stone-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm shadow-amber-500/10'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-amber-400 text-stone-950 font-semibold' : 'bg-stone-800 text-stone-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
