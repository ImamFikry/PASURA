import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Compass, 
  Mountain, 
  Waves, 
  Trees, 
  Leaf, 
  Volume2, 
  VolumeX, 
  Route, 
  Info, 
  Layers, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  Sun, 
  Droplets,
  BarChart3,
  Activity,
  Flame,
  Award,
  FlaskConical,
  Globe,
  Navigation
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Cell 
} from 'recharts';
import { PASURUAN_SPICE_LOCATIONS } from '../data/ethnoscienceData';
import { SpiceLocationNode } from '../types';

export const SPICE_ANTIOXIDANT_METRICS = [
  {
    name: 'Cengkeh',
    latin: 'Syzygium aromaticum',
    tpc: 245.8, // mg GAE/g
    scavenging: 94.2, // % DPPH scavenging
    ic50: 12.5, // µg/mL (semakin rendah = semakin kuat)
    antibacterialZone: 26.5, // mm
    primaryCompound: 'Eugenol (85%)',
    color: '#a855f7',
    highlight: 'Antioksidan Ultra-Potent & Perusak Membran Mikroba',
  },
  {
    name: 'Kayu Manis',
    latin: 'Cinnamomum burmannii',
    tpc: 212.4,
    scavenging: 89.6,
    ic50: 18.2,
    antibacterialZone: 22.0,
    primaryCompound: 'Sinamaldehid (75%)',
    color: '#f59e0b',
    highlight: 'Polifenol & Penghambat Sintesis Dinding Sel',
  },
  {
    name: 'Cabe Jamu',
    latin: 'Piper retrofractum',
    tpc: 88.5,
    scavenging: 72.4,
    ic50: 52.1,
    antibacterialZone: 17.5,
    primaryCompound: 'Piperin (5-8%)',
    color: '#f43f5e',
    highlight: 'Bioenhancer Penyerapan & Termogenik Panas',
  },
  {
    name: 'Kapulaga',
    latin: 'Amomum compactum',
    tpc: 64.2,
    scavenging: 61.8,
    ic50: 68.4,
    antibacterialZone: 14.2,
    primaryCompound: '1,8-Sineol (40-50%)',
    color: '#10b981',
    highlight: 'Monoterpen Volatil Ekspektoran Pernapasan',
  },
  {
    name: 'Serai Wangi',
    latin: 'Cymbopogon citratus',
    tpc: 54.0,
    scavenging: 58.2,
    ic50: 74.6,
    antibacterialZone: 15.8,
    primaryCompound: 'Sitronelal & Geraniol',
    color: '#06b6d4',
    highlight: 'Penangkal Radikal Bebas & Deodorizer Alami',
  },
  {
    name: 'Gula Aren Grati',
    latin: 'Arenga pinnata',
    tpc: 32.6,
    scavenging: 41.5,
    ic50: 115.0,
    antibacterialZone: 9.0,
    primaryCompound: 'Polifenol Nira Aren',
    color: '#eab308',
    highlight: 'Antioksidan Karamelisasi & Penstabil Tekanan Osmotik',
  },
];

const RADAR_DATA_KAPULAGA_VS_CENGKEH = [
  { dimension: 'Penangkal Radikal (%)', cengkeh: 94, kapulaga: 62 },
  { dimension: 'Total Fenolik TPC', cengkeh: 98, kapulaga: 35 },
  { dimension: 'Zona Antibakteri (mm)', cengkeh: 92, kapulaga: 50 },
  { dimension: 'Aroma Volatil Ekspektoran', cengkeh: 58, kapulaga: 96 },
  { dimension: 'Sinergi Rasa Aren Pasuruan', cengkeh: 72, kapulaga: 94 },
  { dimension: 'Kelarutan Minyak Eteris', cengkeh: 80, kapulaga: 86 },
];

export const PasuruanSpiceMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SpiceLocationNode>(PASURUAN_SPICE_LOCATIONS[0]);
  const [filterZone, setFilterZone] = useState<string>('all');
  const [showSupplyRoutes, setShowSupplyRoutes] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [chartMetric, setChartMetric] = useState<'scavenging' | 'tpc' | 'antibacterialZone'>('scavenging');
  const [chartViewMode, setChartViewMode] = useState<'bar' | 'radar' | 'headToHead'>('bar');
  const [mapDisplayMode, setMapDisplayMode] = useState<'svg' | 'googleMaps' | 'split'>('svg');
  const [mapLayerType, setMapLayerType] = useState<'roadmap' | 'satellite'>('satellite');


  const filteredLocations = filterZone === 'all'
    ? PASURUAN_SPICE_LOCATIONS
    : PASURUAN_SPICE_LOCATIONS.filter((loc) => loc.zoneType === filterZone);

  const kebonagungNode = PASURUAN_SPICE_LOCATIONS.find((n) => n.id === 'kebonagung') || PASURUAN_SPICE_LOCATIONS[0];

  const handleSpeakWisdom = (text: string) => {
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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 p-6 sm:p-8 border border-amber-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>EKSPLORASI ETNOSAINS • GEOSPASIAL REMPAH PASURUAN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
              Peta Persebaran Rempah & Sentra Jamu Pasuruan
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Jelajahi lanskap agroekologi Kota & Kabupaten Pasuruan dari pesisir Selat Madura (0 mdpl) hingga kaldera vulkanik Bromo & Arjuno (1.850 mdpl) tempat bertumbuhnya rempah botani penyusun Jamu Kebonagung.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="p-4 rounded-2xl bg-stone-950/90 border border-amber-500/40 flex items-center space-x-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider block">Gradien Ketinggian</span>
              <span className="text-lg font-extrabold text-amber-300 font-mono">1 – 1.850 MDPL</span>
              <span className="block text-[10px] text-stone-400">4 Zona Agroekosistem</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Route Toggle */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs text-stone-400 font-medium mr-1.5">Filter Zona:</span>
            {[
              { id: 'all', label: 'Semua Zona' },
              { id: 'Sentra Jamu', label: 'Sentra Kebonagung' },
              { id: 'Dataran Tinggi', label: 'Dataran Tinggi (Bromo/Arjuno)' },
              { id: 'Dataran Rendah', label: 'Dataran Rendah (Cabe Jamu)' },
              { id: 'Perkebunan Aren', label: 'Sentra Aren (Grati)' },
              { id: 'Pesisir / Sejarah', label: 'Pesisir & Pelabuhan' },
            ].map((z) => (
              <button
                key={z.id}
                onClick={() => setFilterZone(z.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  filterZone === z.id
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-950/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSupplyRoutes(!showSupplyRoutes)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                showSupplyRoutes
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-stone-950 text-stone-400 border-stone-800'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>{showSupplyRoutes ? 'Sembunyikan Rantai Pasok' : 'Tampilkan Rantai Pasok'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map & Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Cartographic SVG Map & Google Maps Iframe */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-stone-950 border border-stone-800 p-4 sm:p-6 shadow-2xl relative overflow-hidden space-y-4">
            {/* Map Top Bar with Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {mapDisplayMode === 'googleMaps' ? 'Google Maps Lokasi Nyata' : 'Peta Topografi & Etnosains'}
                </span>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="flex items-center space-x-1.5 bg-stone-900 p-1 rounded-xl border border-stone-800">
                <button
                  onClick={() => setMapDisplayMode('svg')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center space-x-1 ${
                    mapDisplayMode === 'svg'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Topografi (SVG)</span>
                </button>
                <button
                  onClick={() => setMapDisplayMode('googleMaps')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center space-x-1 ${
                    mapDisplayMode === 'googleMaps'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Google Maps Nyata</span>
                </button>
                <button
                  onClick={() => setMapDisplayMode('split')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center space-x-1 hidden sm:flex ${
                    mapDisplayMode === 'split'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Dual View</span>
                </button>
              </div>
            </div>

            {/* Display Mode 1: Interactive SVG Map Canvas */}
            {(mapDisplayMode === 'svg' || mapDisplayMode === 'split') && (
              <div className="space-y-3">
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-stone-900 via-stone-925 to-stone-950 border border-stone-800/60 overflow-hidden shadow-inner flex items-center justify-center">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full select-none"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                  >
                    {/* Coastal Sea Area: Selat Madura (North) */}
                    <path
                      d="M 0 0 L 100 0 L 100 22 Q 75 25 50 20 Q 25 24 0 18 Z"
                      fill="#0c2538"
                      opacity="0.8"
                    />
                    <text x="50" y="8" fill="#38bdf8" fontSize="2.8" textAnchor="middle" fontWeight="bold" letterSpacing="0.2">
                      SELAT MADURA (PESISIR UTARA PASURUAN)
                    </text>

                    {/* Land Topographic Contours (Lowlands to Mountains) */}
                    {/* Coastal Plain (Lowland) */}
                    <path
                      d="M 0 18 Q 25 24 50 20 Q 75 25 100 22 L 100 50 Q 60 48 30 52 L 0 45 Z"
                      fill="#1c1917"
                      opacity="0.9"
                    />

                    {/* Foothills (Tutur / Winongan / Grati) */}
                    <path
                      d="M 0 45 L 30 52 Q 60 48 100 50 L 100 75 Q 70 70 35 76 L 0 68 Z"
                      fill="#1f2923"
                      opacity="0.9"
                    />

                    {/* High Volcanic Mountains (Gunung Arjuno-Welirang & Bromo-Tengger) */}
                    <path
                      d="M 0 68 L 35 76 Q 70 70 100 75 L 100 100 L 0 100 Z"
                      fill="#292524"
                      opacity="0.9"
                    />

                    {/* Mountain Ridge Highlights */}
                    {/* Arjuno-Welirang Peak Area (Southwest) */}
                    <circle cx="18" cy="78" r="14" fill="#047857" opacity="0.15" />
                    <path d="M 12 85 L 18 68 L 24 85 Z" fill="#059669" opacity="0.2" />
                    <text x="18" y="94" fill="#6ee7b7" fontSize="2.2" textAnchor="middle" fontStyle="italic">
                      Gn. Arjuno-Welirang (3.339 m)
                    </text>

                    {/* Bromo-Tengger Peak Area (Southeast) */}
                    <circle cx="50" cy="88" r="16" fill="#d97706" opacity="0.15" />
                    <path d="M 42 95 L 48 76 L 56 95 Z" fill="#b45309" opacity="0.2" />
                    <text x="50" y="98" fill="#fcd34d" fontSize="2.2" textAnchor="middle" fontStyle="italic">
                      Kaldera Gn. Bromo (2.329 m)
                    </text>

                    {/* Danau Ranu Grati Water Body */}
                    <ellipse cx="76" cy="48" rx="5" ry="3" fill="#0284c7" opacity="0.4" />
                    <text x="76" y="53" fill="#7dd3fc" fontSize="1.8" textAnchor="middle">
                      Danau Ranu Grati
                    </text>

                    {/* River Gembong Pathway */}
                    <path
                      d="M 46 80 Q 48 55 50 36 L 54 18"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="0.8"
                      strokeDasharray="2,1"
                      opacity="0.6"
                    />

                    {/* Supply Routes to Kebonagung (Dashed Animated Lines) */}
                    {showSupplyRoutes && (
                      <g className="animate-pulse">
                        {/* Tosari to Kebonagung */}
                        <path
                          d="M 44 82 Q 46 58 50 36"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="0.9"
                          strokeDasharray="2,1"
                        />
                        {/* Tutur to Kebonagung */}
                        <path
                          d="M 22 64 Q 35 50 50 36"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="0.9"
                          strokeDasharray="2,1"
                        />
                        {/* Kraton to Kebonagung */}
                        <path
                          d="M 32 34 L 50 36"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="0.9"
                          strokeDasharray="2,1"
                        />
                        {/* Grati to Kebonagung */}
                        <path
                          d="M 74 46 Q 62 42 50 36"
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="0.9"
                          strokeDasharray="2,1"
                        />
                        {/* Pelabuhan to Kebonagung */}
                        <path
                          d="M 54 16 L 50 36"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="0.9"
                          strokeDasharray="2,1"
                        />
                      </g>
                    )}

                    {/* Map Nodes Pins */}
                    {filteredLocations.map((loc) => {
                      const isSelected = selectedNode.id === loc.id;
                      const isKebonagung = loc.id === 'kebonagung';

                      return (
                        <g
                          key={loc.id}
                          className="cursor-pointer transition-transform"
                          onClick={() => setSelectedNode(loc)}
                        >
                          {/* Pulse Circle */}
                          <circle
                            cx={loc.mapCoords.x}
                            cy={loc.mapCoords.y}
                            r={isSelected ? 4.5 : isKebonagung ? 3.8 : 2.8}
                            fill={isKebonagung ? '#f59e0b' : '#10b981'}
                            opacity={isSelected ? 0.4 : 0.25}
                          />

                          {/* Main Node Point */}
                          <circle
                            cx={loc.mapCoords.x}
                            cy={loc.mapCoords.y}
                            r={isKebonagung ? 2.6 : 2}
                            fill={isKebonagung ? '#fbbf24' : isSelected ? '#34d399' : '#e2e8f0'}
                            stroke="#0c0a09"
                            strokeWidth="0.7"
                          />

                          {/* Node Label Text */}
                          <text
                            x={loc.mapCoords.x}
                            y={loc.mapCoords.y - 3.2}
                            fill={isSelected ? '#fef08a' : '#f1f5f9'}
                            fontSize="2.4"
                            fontWeight="bold"
                            textAnchor="middle"
                            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.9))"
                          >
                            {loc.name.split('(')[0].trim()}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Legend Box in Corner */}
                  <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-stone-950/85 backdrop-blur-sm border border-stone-800 text-[10px] space-y-1 text-stone-300 pointer-events-none">
                    <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Episentrum Jamu Kebonagung</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Rempah Dataran Tinggi</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span>Cabe Jamu Dataran Rendah</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span>Sentra Nira Aren Grati</span>
                    </div>
                  </div>
                </div>

                {mapDisplayMode === 'svg' && (
                  <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-stone-300">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>Ingin melihat visual satelit nyata perkebunan & sentra jamu?</span>
                    </div>
                    <button
                      onClick={() => setMapDisplayMode('googleMaps')}
                      className="px-3 py-1 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 font-semibold border border-cyan-500/40 transition cursor-pointer"
                    >
                      Buka Google Maps Nyata →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Display Mode 2: Integrated Real Google Maps Iframe */}
            {(mapDisplayMode === 'googleMaps' || mapDisplayMode === 'split') && (
              <div className="space-y-3 animate-fadeIn">
                {/* Google Maps Layer Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-stone-400 font-medium">Tampilan Google Maps:</span>
                    <button
                      onClick={() => setMapLayerType('satellite')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        mapLayerType === 'satellite'
                          ? 'bg-cyan-500 text-stone-950 font-bold'
                          : 'bg-stone-950 text-stone-400 border border-stone-800'
                      }`}
                    >
                      🛰️ Citra Satelit Bumi
                    </button>
                    <button
                      onClick={() => setMapLayerType('roadmap')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        mapLayerType === 'roadmap'
                          ? 'bg-cyan-500 text-stone-950 font-bold'
                          : 'bg-stone-950 text-stone-400 border border-stone-800'
                      }`}
                    >
                      🗺️ Peta Jalan & Medan
                    </button>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedNode.geoCoordinates?.mapQuery || selectedNode.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 text-amber-300 border border-stone-800 transition cursor-pointer font-medium"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Buka Aplikasi Maps (GPS Navigasi)</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>
                </div>

                {/* Google Maps Embed Iframe */}
                <div className="relative w-full aspect-[4/3] rounded-2xl border border-stone-800 overflow-hidden shadow-2xl bg-stone-900">
                  <iframe
                    title={`Google Maps Nyata - ${selectedNode.name}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedNode.geoCoordinates?.mapQuery || selectedNode.name)}&t=${mapLayerType === 'satellite' ? 'k' : 'm'}&z=${selectedNode.id === 'kebonagung' ? '16' : '13'}&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen={false}
                  />

                  {/* Location Floating Pill */}
                  <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-stone-950/90 backdrop-blur-md border border-stone-800 text-xs shadow-lg max-w-sm pointer-events-none">
                    <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedNode.geoCoordinates?.placeLabel || selectedNode.name}</span>
                    </div>
                    {selectedNode.geoCoordinates && (
                      <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                        Koordinat GPS: {selectedNode.geoCoordinates.lat.toFixed(4)}°, {selectedNode.geoCoordinates.lng.toFixed(4)}°
                      </div>
                    )}
                  </div>
                </div>

                {/* Real Geographic Description Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-xs text-stone-300 leading-relaxed">
                  <strong className="text-amber-300 block mb-0.5">
                    {selectedNode.id === 'kebonagung' ? '📍 Eksplorasi Visual Sentra Jamu Kebonagung Pasuruan:' : `📍 Lanskap Nyata: ${selectedNode.name}`}
                  </strong>
                  {selectedNode.id === 'kebonagung' ? (
                    <span>
                      Di kawasan Kebonagung, Kecamatan Purworejo, Kota Pasuruan (tepat di tepi aliran Sungai Gembong), kamu dapat melihat deretan pemukiman tempat perajin sepuh mengolah jamu tradisional, menjemur simplisia rimpang, dan menggodok gula aren Grati di atas kuali gerabah.
                    </span>
                  ) : (
                    <span>
                      {selectedNode.soilAndClimate}. Wilayah ini menjadi penyuplai simplisia rempah bermutu tinggi yang diangkut ke Sentra Kebonagung untuk diformulasikan.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Elevation Slider Indicator */}
            <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs flex items-center justify-between text-stone-300">
              <div className="flex items-center space-x-2">
                <Mountain className="w-4 h-4 text-amber-400" />
                <span>Ketinggian Tempat Terpilih:</span>
              </div>
              <span className="px-3 py-1 rounded-lg bg-stone-950 text-amber-300 font-mono font-bold border border-stone-800">
                {selectedNode.altitudeMdpl}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Botanical & Ethnoscience Inspector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-7 space-y-5 shadow-xl">
            {/* Header Inspector */}
            <div className="space-y-2 pb-4 border-b border-stone-800">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold border border-amber-500/30">
                  {selectedNode.zoneType}
                </span>
                <span className="text-xs text-stone-400 font-mono">{selectedNode.altitudeMdpl}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-serif">
                {selectedNode.name}
              </h3>
              <p className="text-xs text-stone-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{selectedNode.district}</span>
              </p>
            </div>

            {/* Primary Crop & Latin Taxonomy */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Komoditas Botani Utama:
              </span>
              <h4 className="text-sm font-bold text-amber-300 font-serif">
                {selectedNode.primaryCrop}
              </h4>
              <p className="text-xs text-emerald-400 italic">
                {selectedNode.latinName}
              </p>
              <div className="pt-1.5 text-[11px] text-stone-300 flex flex-wrap gap-2">
                <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  Famili: <strong>{selectedNode.plantFamily}</strong>
                </span>
                <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  Organ: <strong>{selectedNode.plantPartUsed}</strong>
                </span>
              </div>
            </div>

            {/* Botanical Anatomy Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Morfologi & Anatomi Organ Botani</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Batang & Daun:</span>
                  <p className="text-stone-300 leading-relaxed">{selectedNode.botanicalFeatures.stemLeaf}</p>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Bunga & Buah:</span>
                  <p className="text-stone-300 leading-relaxed">{selectedNode.botanicalFeatures.flowerFruit}</p>
                </div>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Kelenjar Sekretori & Minyak Atsiri:</span>
                  <p className="text-stone-300 leading-relaxed">{selectedNode.botanicalFeatures.activeGland}</p>
                </div>
              </div>
            </div>

            {/* Agroecology Soil & Climate */}
            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-stone-400 font-bold uppercase text-[10px]">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Karakteristik Tanah & Iklim Mikro:</span>
              </div>
              <p className="text-stone-300 leading-relaxed">{selectedNode.soilAndClimate}</p>
            </div>

            {/* Ethnoscience Wisdom & Audio Button */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kearifan Lokal Etnosains:</span>
                </span>
                <button
                  onClick={() => handleSpeakWisdom(selectedNode.ethnoscienceWisdom)}
                  className="flex items-center space-x-1 text-[11px] text-amber-300 hover:text-amber-200 transition cursor-pointer"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Hentikan' : 'Dengarkan Narasi'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic">
                "{selectedNode.ethnoscienceWisdom}"
              </p>
            </div>

            {/* Role in Kebonagung */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-emerald-800/40 text-xs text-stone-300 space-y-1">
              <strong className="text-emerald-300 block font-semibold text-[10px] uppercase">
                Peran Spesifik dalam Resep Jamu Kebonagung:
              </strong>
              <p className="leading-relaxed">{selectedNode.roleInKebonagung}</p>
            </div>
          </div>
        </div>
      </div>

      {/* RECHARTS DATA VISUALIZATION SECTION: KOMPARASI ANTIOKSIDAN REMPAH KEBONAGUNG */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>VISUALISASI DATA LAB • RECHARTS ANALYTICS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-serif tracking-tight">
              Profil & Komparasi Kapasitas Antioksidan Rempah Kebonagung
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Analisis kuantitatif uji laboratorium DPPH (Radical Scavenging Activity) dan Total Phenolic Content (TPC) sebagai landasan sains bio-preservasi alami.
            </p>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center space-x-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-800">
            <button
              onClick={() => setChartViewMode('bar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                chartViewMode === 'bar'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Grafik Batang Komparatif
            </button>
            <button
              onClick={() => setChartViewMode('radar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                chartViewMode === 'radar'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Radar Kapulaga vs Cengkeh
            </button>
            <button
              onClick={() => setChartViewMode('headToHead')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                chartViewMode === 'headToHead'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Head-to-Head Sains CRT
            </button>
          </div>
        </div>

        {/* View 1: Bar Chart Mode */}
        {chartViewMode === 'bar' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Metric Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-stone-400 font-medium">Pilih Indikator Sains:</span>
                <button
                  onClick={() => setChartMetric('scavenging')}
                  className={`px-3 py-1 rounded-lg font-semibold border transition cursor-pointer ${
                    chartMetric === 'scavenging'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  % Penangkal Radikal (DPPH)
                </button>
                <button
                  onClick={() => setChartMetric('tpc')}
                  className={`px-3 py-1 rounded-lg font-semibold border transition cursor-pointer ${
                    chartMetric === 'tpc'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  Total Fenolik (TPC - mg GAE/g)
                </button>
                <button
                  onClick={() => setChartMetric('antibacterialZone')}
                  className={`px-3 py-1 rounded-lg font-semibold border transition cursor-pointer ${
                    chartMetric === 'antibacterialZone'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:bg-stone-800'
                  }`}
                >
                  Zona Hambat Bakteri (mm)
                </button>
              </div>

              <span className="text-[11px] text-stone-400 font-mono">
                Satuan: {chartMetric === 'scavenging' ? '% Scavenging (100 ppm)' : chartMetric === 'tpc' ? 'mg GAE / g Ekstrak' : 'Diameter Zona Bening (mm)'}
              </span>
            </div>

            {/* Recharts BarChart Canvas */}
            <div className="w-full h-80 sm:h-96 bg-stone-950 p-4 rounded-2xl border border-stone-800/80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={SPICE_ANTIOXIDANT_METRICS}
                  margin={{ top: 20, right: 20, left: -10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#a8a29e" 
                    fontSize={11} 
                    tickLine={false}
                    interval={0}
                    tick={{ fill: '#d6d3d1' }}
                  />
                  <YAxis 
                    stroke="#a8a29e" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-700 shadow-2xl text-xs space-y-1.5 max-w-xs">
                            <div className="flex items-center justify-between">
                              <strong className="text-white text-sm font-serif">{data.name}</strong>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-amber-300 font-mono">
                                {data.primaryCompound}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 italic">{data.latin}</p>
                            <div className="pt-1.5 border-t border-stone-800 space-y-1">
                              <div className="flex justify-between">
                                <span className="text-stone-400">Penangkal Radikal DPPH:</span>
                                <strong className="text-purple-300 font-mono">{data.scavenging}%</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-stone-400">Total Fenolik (TPC):</span>
                                <strong className="text-amber-300 font-mono">{data.tpc} mg GAE/g</strong>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-stone-400">Zona Hambat Mikroba:</span>
                                <strong className="text-emerald-300 font-mono">{data.antibacterialZone} mm</strong>
                              </div>
                            </div>
                            <div className="text-[10px] text-stone-300 pt-1 text-emerald-400 font-medium">
                              ★ {data.highlight}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey={chartMetric}
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  >
                    {SPICE_ANTIOXIDANT_METRICS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* View 2: Radar Chart Mode (Kapulaga vs Cengkeh Multi-Dimensional) */}
        {chartViewMode === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-fadeIn">
            <div className="lg:col-span-7 w-full h-80 sm:h-96 bg-stone-950 p-4 rounded-2xl border border-stone-800/80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_DATA_KAPULAGA_VS_CENGKEH}>
                  <PolarGrid stroke="#44403c" />
                  <PolarAngleAxis 
                    dataKey="dimension" 
                    stroke="#a8a29e" 
                    fontSize={11} 
                    tick={{ fill: '#d6d3d1' }}
                  />
                  <PolarRadiusAxis stroke="#57534e" angle={30} domain={[0, 100]} />
                  <Radar
                    name="Cengkeh (Eugenol)"
                    dataKey="cengkeh"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.45}
                  />
                  <Radar
                    name="Kapulaga (1,8-Sineol)"
                    dataKey="kapulaga"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.45}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px' }} 
                    formatter={(value) => <span className="text-xs text-stone-200 font-semibold">{value}</span>}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-3 rounded-xl bg-stone-900 border border-stone-700 text-xs space-y-1">
                            <strong className="text-white block font-serif">{payload[0]?.payload?.dimension}</strong>
                            <div className="text-purple-300 font-mono">
                              Cengkeh: <strong>{payload[0]?.value} / 100</strong>
                            </div>
                            <div className="text-emerald-300 font-mono">
                              Kapulaga: <strong>{payload[1]?.value} / 100</strong>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Kesimpulan Radar: Sinergisme Etnosains</span>
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Grafik radar memperlihatkan bagaimana <strong className="text-purple-300">Cengkeh</strong> mendominasi kapasitas antioksidan murni dan perusakan membran patogen, namun <strong className="text-emerald-300">Kapulaga</strong> secara mutlak unggul dalam keharuman volatil ekspektoran dan keharmonisan rasa manis dengan gula aren Grati.
                </p>
                <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400">
                  Resep Kebonagung menggabungkan keduanya sehingga tercipta perlindungan daya simpan pangan sekaligus cita rasa yang nyaman diminum siswa dan masyarakat.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 3: Head-to-Head Detailed Comparison (Kapulaga vs Cengkeh) */}
        {chartViewMode === 'headToHead' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {/* Cengkeh Card */}
            <div className="p-6 rounded-3xl bg-stone-950 border-2 border-purple-800/60 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">
                    JUARA ANTIOKSIDAN PRIMER
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif mt-1">Cengkeh Kebonagung</h3>
                  <p className="text-xs text-stone-400 italic">Syzygium aromaticum (Myrtaceae)</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
                  94%
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-stone-300">
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Senyawa Bioaktif Inti:</span>
                  <strong className="text-purple-300 font-mono">Eugenol (80 – 90%)</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Aktivitas Penangkal Radikal:</span>
                  <strong className="text-emerald-400 font-mono">94.2% DPPH Scavenging</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Total Fenolik (TPC):</span>
                  <strong className="text-amber-300 font-mono">245.8 mg GAE/g (Tertinggi)</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Zona Hambat Bakteri:</span>
                  <strong className="text-cyan-400 font-mono">26.5 mm (Sangat Kuat)</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200/90 leading-relaxed">
                <strong>Mekanisme Biopreservasi:</strong> Gugus fenolik hidroksil (-OH) eugenol merusak membran ganda fosfolipid bakteri pembusuk pangan (*Bacillus cereus*), menyebabkan isi sitoplasma bocor dan sel mikroba mati.
              </div>
            </div>

            {/* Kapulaga Card */}
            <div className="p-6 rounded-3xl bg-stone-950 border-2 border-emerald-800/60 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    JUARA AROMA & EKSPEKTORAN
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif mt-1">Kapulaga Jawa (Puspo)</h3>
                  <p className="text-xs text-stone-400 italic">Amomum compactum (Zingiberaceae)</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                  62%
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-stone-300">
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Senyawa Bioaktif Inti:</span>
                  <strong className="text-emerald-300 font-mono">1,8-Sineol & Terpinil Asetat</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Aktivitas Penangkal Radikal:</span>
                  <strong className="text-emerald-400 font-mono">61.8% DPPH Scavenging</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Total Fenolik (TPC):</span>
                  <strong className="text-amber-300 font-mono">64.2 mg GAE/g</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                  <span className="text-stone-400">Zona Hambat Bakteri:</span>
                  <strong className="text-cyan-400 font-mono">14.2 mm (Moderat)</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed">
                <strong>Mekanisme Etnosains:</strong> Monoterpen 1,8-sineol bekerja merilekskan otot bronkus paru-paru (ekspektoran masuk angin) dan menyamarkan getir menyengat cabe jamu, sehingga jamu terasa segar harum di lidah.
              </div>
            </div>
          </div>
        )}

        {/* Analytical Science Reflection for CRT */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-start space-x-3 text-xs text-stone-300">
          <FlaskConical className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-300 block font-semibold mb-0.5">Refleksi Pembelajaran Siswa (POPBL-CRT):</strong>
            Meskipun Cengkeh memiliki kapasitas antioksidan dan antibakteri 1,5x lebih tinggi dari Kapulaga (94.2% vs 61.8%), Jamu Kebonagung Pasuruan tidak boleh hanya mengandalkan Cengkeh. Tanpa Kapulaga, rasa jamu akan terlalu getir dan pedas menyengat. Perpaduan keduanya adalah manifestasi nyata <em>Hurdle Technology</em> bioteknologi alami yang selaras dengan kearifan rasa leluhur Pasuruan.
          </div>
        </div>
      </div>
    </div>
  );
};

