import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Award,
  BookOpen,
  Layers,
  Video,
  Terminal,
  Store,
  Droplet,
  MapPin,
  QrCode,
  Medal
} from 'lucide-react';
import { AchievementBadge } from '../types';

interface BadgeUnlockCelebrationProps {
  badge: AchievementBadge | null;
  onClose: () => void;
  onViewAllBadges: () => void;
}

export const BadgeUnlockCelebration: React.FC<BadgeUnlockCelebrationProps> = ({
  badge,
  onClose,
  onViewAllBadges
}) => {
  useEffect(() => {
    if (badge) {
      // Confetti burst on unlock
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#fcd34d']
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [badge]);

  if (!badge) return null;

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

  const IconComponent = getBadgeIcon(badge.iconName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950/60 border-2 border-amber-500/70 rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-stone-100 overflow-hidden">
        
        {/* Glow backdrop ring */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-52 h-52 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-white bg-stone-800/80 hover:bg-stone-800 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Big Badge Avatar */}
        <div className="relative mx-auto w-24 h-24 mb-4">
          <div className="w-full h-full rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-emerald-400 p-1 shadow-2xl shadow-amber-500/40 animate-bounce">
            <div className="w-full h-full bg-stone-950 rounded-[22px] flex items-center justify-center">
              <IconComponent className="w-12 h-12 text-amber-400" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-stone-950 shadow-md">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Subtitle & Category */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Badge Baru Terbuka • {badge.category}</span>
        </div>

        {/* Title & CRT Honorary Rank */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif tracking-tight">
          {badge.title}
        </h3>
        
        <p className="text-xs sm:text-sm font-bold text-amber-400 mt-1 italic">
          Gelar: "{badge.crtHonoraryTitle}"
        </p>

        {/* Points & Description */}
        <div className="my-4 p-3 rounded-xl bg-stone-950/80 border border-stone-800">
          <p className="text-xs text-stone-300 leading-relaxed">
            {badge.description}
          </p>
          <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs font-semibold">
            <span className="text-stone-400">Bonus Prestasi:</span>
            <span className="font-mono text-emerald-400 font-extrabold">+{badge.points} XP Etnosains</span>
          </div>
        </div>

        {/* Cultural Significance Box */}
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/60 text-left mb-6">
          <div className="flex items-center space-x-1.5 text-amber-300 text-[11px] font-bold mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Makna Etnosains CRT Pasuruan:</span>
          </div>
          <p className="text-stone-300 text-[11px] leading-relaxed">
            {badge.culturalSignificance}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              onClose();
              onViewAllBadges();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 text-stone-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>Buka Galeri Badge & Piagam</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition-all cursor-pointer"
          >
            Lanjutkan Belajar
          </button>
        </div>

      </div>
    </div>
  );
};
