import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  X, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Star, 
  BookOpen, 
  Printer, 
  Share2, 
  ArrowRight,
  Filter,
  Medal,
  Calendar,
  Layers,
  Video,
  Terminal,
  Droplet,
  MapPin,
  QrCode,
  Store,
  FlaskConical
} from 'lucide-react';
import { AchievementBadge, UserSession } from '../types';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: AchievementBadge[];
  currentUser: UserSession | null;
  onNavigateToModule: (moduleId: string) => void;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  onClose,
  achievements,
  currentUser,
  onNavigateToModule
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const totalPoints = achievements
    .filter(a => a.isUnlocked)
    .reduce((sum, a) => sum + a.points, 0);
  const maxPoints = achievements.reduce((sum, a) => sum + a.points, 0);
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  // Student Rank calculation
  const getRank = (points: number) => {
    if (points >= 800) {
      return {
        level: 4,
        rankTitle: 'Duta Pelestari Jamu Pusaka Pasuruan (Master CRT)',
        color: 'from-amber-500 via-amber-400 to-emerald-400',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        nextMilestone: 'Tingkat Tertinggi Dicapai!'
      };
    } else if (points >= 500) {
      return {
        level: 3,
        rankTitle: 'Cendekia Bioteknologi Pangan Pasuruan',
        color: 'from-cyan-500 to-blue-500',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        nextMilestone: `${800 - points} XP menuju Duta Pelestari Jamu`
      };
    } else if (points >= 250) {
      return {
        level: 2,
        rankTitle: 'Inovator Madya Etnosains Kebonagung',
        color: 'from-purple-500 to-indigo-500',
        badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        nextMilestone: `${500 - points} XP menuju Cendekia Bioteknologi`
      };
    } else {
      return {
        level: 1,
        rankTitle: 'Peneliti Pemula Etnomedisin Pasuruan',
        color: 'from-stone-500 to-amber-600',
        badgeBg: 'bg-stone-800 text-stone-300 border-stone-700',
        nextMilestone: `${250 - points} XP menuju Inovator Madya`
      };
    }
  };

  const currentRank = getRank(totalPoints);

  const filteredAchievements = achievements.filter(badge => {
    if (filterCategory === 'unlocked') return badge.isUnlocked;
    if (filterCategory === 'locked') return !badge.isUnlocked;
    if (filterCategory !== 'all') return badge.category === filterCategory;
    return true;
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return Video;
      case 'Layers': return Layers;
      case 'Terminal': return Terminal;
      case 'CheckCircle2': return CheckCircle2;
      case 'Award': return Award;
      case 'Store': return Store;
      case 'Droplet': return Droplet;
      case 'MapPin': return MapPin;
      case 'QrCode': return QrCode;
      default: return Medal;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-amber-900/50 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Certificate View Modal Subscreen */}
        {showCertificate ? (
          <div className="p-6 sm:p-8 bg-stone-900 text-stone-100">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Award className="w-5 h-5" />
                <span>Piagam Prestasi Etnosains & Bioteknologi Siswa</span>
              </div>
              <button
                onClick={() => setShowCertificate(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white bg-stone-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Certificate Board */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950/40 border-4 border-double border-amber-500/60 shadow-2xl text-center relative print:border-black">
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/80"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/80"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/80"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/80"></div>

              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase">
                PIAGAM PENGHARGAAN ETNOSAINS PASURUAN
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white mt-1">
                PASURA-BIO AI ACHIEVEMENT
              </h2>
              <p className="text-xs text-stone-400 italic mt-0.5">
                Model Pembelajaran Problem and Project-Oriented Based Learning (POPBL) • Pendekatan Culturally Responsive Teaching (CRT)
              </p>

              <div className="my-6 py-4 border-y border-stone-800">
                <p className="text-xs text-stone-400">Diberikan dengan bangga kepada:</p>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-300 font-serif my-1">
                  {currentUser?.name || 'Siswa Peneliti Etnosains'}
                </h3>
                <p className="text-xs text-stone-300">
                  {currentUser?.groupName || 'Kelompok Jamu Kebonagung'} • {currentUser?.schoolOrOrg || 'Kota Pasuruan'}
                </p>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                  Peringkat: {currentRank.rankTitle}
                </div>
              </div>

              <p className="text-xs text-stone-300 max-w-xl mx-auto leading-relaxed">
                Telah berhasil menyelesaikan rangkaian modul eksplorasi bioteknologi bio-preservasi, kajian senyawa aktif 6 rempah Kebonagung, pengoperasian Generative AI, dan simulasi pengawetan alami untuk memberdayakan UMKM Jamu Tradisional Kota Pasuruan.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-stone-800/80 text-xs">
                <div>
                  <p className="text-stone-400 text-[10px]">Badge Diraih</p>
                  <p className="font-extrabold text-amber-300 text-sm">{unlockedCount} / {totalCount}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-[10px]">Total Skor Etnosains</p>
                  <p className="font-extrabold text-emerald-400 text-sm">{totalPoints} XP</p>
                </div>
                <div>
                  <p className="text-stone-400 text-[10px]">Kota & Tanggal</p>
                  <p className="font-bold text-stone-200 text-xs">Pasuruan, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg cursor-pointer transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Piagam (PDF)</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer transition-all"
              >
                Kembali ke Galeri
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold font-serif text-white">
                      Galeri Badge Pencapaian Siswa
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      GAMIFIKASI CRT
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Penghargaan capaian belajar etnosains Jamu Kebonagung & bioteknologi Kelas 9
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCertificate(true)}
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold cursor-pointer transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Lihat Piagam</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-800/80 hover:bg-stone-800 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Rank & XP Summary Banner */}
            <div className="p-6 bg-stone-950/60 border-b border-stone-800">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Level Card */}
                <div className="md:col-span-5 p-4 rounded-2xl bg-stone-900 border border-stone-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Status Level Pengkaji
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentRank.badgeBg}`}>
                      Level {currentRank.level}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-100 font-serif">
                    {currentRank.rankTitle}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {currentRank.nextMilestone}
                  </p>
                </div>

                {/* Progress Bar & Stats */}
                <div className="md:col-span-7 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-300 font-semibold">
                      Kemajuan Badge: <strong className="text-amber-400">{unlockedCount}</strong> dari {totalCount} Terbuka
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {totalPoints} / {maxPoints} XP ({progressPercent}%)
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-700 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>Pengguna: <strong>{currentUser?.name || 'Siswa'}</strong></span>
                    <span>Kelompok: <strong>{currentUser?.groupName || 'Kelompok 1'}</strong></span>
                  </div>
                </div>

              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="px-6 py-3 bg-stone-900/90 border-b border-stone-800 flex items-center space-x-2 overflow-x-auto no-scrollbar">
              <span className="text-xs text-stone-400 font-semibold flex items-center space-x-1 shrink-0 mr-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {[
                { id: 'all', label: 'Semua (9)' },
                { id: 'unlocked', label: `Terbuka (${unlockedCount})` },
                { id: 'locked', label: `Terkunci (${totalCount - unlockedCount})` },
                { id: 'CRT Budaya', label: 'CRT Budaya' },
                { id: 'Bioteknologi', label: 'Bioteknologi' },
                { id: 'Inovasi AI', label: 'Inovasi AI' },
                { id: 'Dampak UMKM', label: 'Dampak UMKM' },
                { id: 'Eksplorasi 3D', label: 'Eksplorasi 3D' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    filterCategory === tab.id
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Badges Grid View */}
            <div className="p-6 max-h-[480px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAchievements.map((badge) => {
                const IconComponent = getBadgeIcon(badge.iconName);
                const isUnlocked = badge.isUnlocked;

                return (
                  <div
                    key={badge.id}
                    className={`relative rounded-2xl p-4 border transition-all ${
                      isUnlocked
                        ? 'bg-stone-950/80 border-amber-500/40 shadow-lg shadow-amber-500/5'
                        : 'bg-stone-950/40 border-stone-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      {/* Badge Icon Badge */}
                      <div className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 border ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 border-amber-300 shadow-md shadow-amber-500/20'
                          : 'bg-stone-900 text-stone-600 border-stone-800'
                      }`}>
                        {isUnlocked ? (
                          <IconComponent className="w-6 h-6" />
                        ) : (
                          <Lock className="w-6 h-6 text-stone-500" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                            isUnlocked 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : 'bg-stone-800 text-stone-500 border border-stone-700'
                          }`}>
                            {badge.category}
                          </span>
                          <span className="font-mono text-xs font-bold text-emerald-400">
                            +{badge.points} XP
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-stone-100 font-serif mt-1">
                          {badge.title}
                        </h4>
                        
                        <p className="text-[11px] font-medium text-amber-400/90 italic">
                          "{badge.crtHonoraryTitle}"
                        </p>

                        <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                          {badge.description}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                          {isUnlocked ? (
                            <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Terbuka • {badge.unlockedAt || 'Hari ini'}</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1 text-stone-500">
                              <Lock className="w-3.5 h-3.5" />
                              <span>Selesaikan modul terkait</span>
                            </span>
                          )}

                          <button
                            onClick={() => {
                              onClose();
                              onNavigateToModule(badge.moduleId);
                            }}
                            className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer transition-colors"
                          >
                            <span>Buka Modul</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Gamifikasi CRT: Memotivasi siswa meneliti sains tanpa kehilangan akar budaya lokal.</span>
              </span>
              <button
                onClick={() => setShowCertificate(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all cursor-pointer"
              >
                Unduh / Cetak Piagam Prestasi
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
