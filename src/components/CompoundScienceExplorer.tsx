import React, { useState } from 'react';
import { 
  Atom, 
  Sparkles, 
  ExternalLink, 
  FlaskConical, 
  Thermometer, 
  ShieldCheck, 
  Loader2, 
  Info,
  Layers
} from 'lucide-react';
import { SPICE_COMPOUNDS } from '../data/ethnoscienceData';
import { SpiceCompound } from '../types';

export const CompoundScienceExplorer: React.FC = () => {
  const [selectedSpice, setSelectedSpice] = useState<SpiceCompound>(SPICE_COMPOUNDS[0]);
  const [targetMicrobe, setTargetMicrobe] = useState<string>('Bacillus cereus & Staphylococcus aureus (Bakteri pembusuk jamu)');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');

  const handleDeepAnalyze = async () => {
    setIsAnalyzing(true);
    setAiAnalysisResult('');
    try {
      const res = await fetch('/api/ai/compound-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spiceName: `${selectedSpice.indonesianName} (${selectedSpice.latinName})`,
          chemicalCompound: selectedSpice.mainCompound,
          targetMicrobe,
        }),
      });
      const data = await res.json();
      setAiAnalysisResult(data.analysis || 'Analisis selesai.');
    } catch (err: any) {
      console.error(err);
      setAiAnalysisResult('Gagal menganalisis senyawa. Silakan coba kembali.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 p-6 sm:p-8 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Atom className="w-3.5 h-3.5" />
            <span>SAINS BIOAKTIF REMPAH • INTEGRASI PUBCHEM DATABASE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Eksplorasi Molekuler Rempah Jamu Kebonagung
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Menghubungkan kearifan lokal Pasuruan dengan struktur kimia dan data bioaktivitas internasional (PubChem CIDs, SMILES, dan aksi antimikroba alami untuk bio-preservasi).
          </p>
        </div>
      </div>

      {/* Spice Selector Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {SPICE_COMPOUNDS.map((spice) => {
          const isSelected = spice.id === selectedSpice.id;
          return (
            <button
              key={spice.id}
              onClick={() => {
                setSelectedSpice(spice);
                setAiAnalysisResult('');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-300'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:bg-stone-850'
              }`}
            >
              <span>{spice.indonesianName}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                isSelected ? 'bg-stone-900 text-emerald-300 font-mono' : 'bg-stone-800 text-stone-400'
              }`}>
                CID: {spice.pubChemCid}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 2D Chemical Structure & Properties */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 space-y-5 shadow-xl text-center">
            {/* 2D Molecular Image from PubChem */}
            <div className="p-4 rounded-2xl bg-white flex items-center justify-center border border-stone-300 mx-auto max-w-[260px] shadow-inner">
              <img
                src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${selectedSpice.pubChemCid}/PNG`}
                alt={`Struktur Kimia ${selectedSpice.mainCompound}`}
                className="max-h-48 object-contain"
                loading="lazy"
              />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                PubChem CID: {selectedSpice.pubChemCid}
              </span>
              <h3 className="text-xl font-bold text-white font-serif mt-1">
                {selectedSpice.mainCompound}
              </h3>
              <p className="text-xs text-stone-400 italic">
                {selectedSpice.latinName} ({selectedSpice.pasuruanLocalName})
              </p>
            </div>

            {/* Physicochemical Specs */}
            <div className="grid grid-cols-2 gap-2 text-left text-xs pt-2">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-500 block uppercase">Rumus Kimia:</span>
                <strong className="text-emerald-300 font-mono text-sm">{selectedSpice.chemicalFormula}</strong>
              </div>
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-[10px] text-stone-500 block uppercase">Massa Molekul:</span>
                <strong className="text-stone-200 font-mono text-sm">{selectedSpice.molecularWeight}</strong>
              </div>
              <div className="col-span-2 p-3 rounded-xl bg-stone-950 border border-stone-800 overflow-hidden">
                <span className="text-[10px] text-stone-500 block uppercase">Canonical SMILES:</span>
                <code className="text-[11px] text-amber-300/90 font-mono break-all">{selectedSpice.canonicalSmiles}</code>
              </div>
            </div>

            <a
              href={`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedSpice.pubChemCid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 underline font-medium"
            >
              <span>Buka Data Lengkap di PubChem NCBI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Ethnoscience Reconstruction & AI Deep Dive */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-7 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2 pb-2 border-b border-stone-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bioaktivitas & Kearifan Etnosains Jamu Kebonagung</span>
            </h3>

            {/* Traditional Practice in Pasuruan */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/40 space-y-1.5">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Praktik Tradisional Perajin Kebonagung:
              </span>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {selectedSpice.traditionalPreparationInKebonagung}
              </p>
            </div>

            {/* Modern Science Equivalence */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Penjelasan Ekivalensi Bioteknologi Modern:
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedSpice.modernScienceEquivalence}
              </p>
            </div>

            {/* Antimicrobial Mechanism */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-800/40 space-y-1.5">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Mekanisme Antimikroba Molekuler:
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedSpice.antimicrobialMechanism}
              </p>
            </div>

            {/* Optimal Temperature */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs">
              <span className="text-stone-400 flex items-center space-x-1.5">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span>Suhu Ekstraksi Termal Optimal:</span>
              </span>
              <strong className="text-amber-300 font-mono">{selectedSpice.optimalExtractionTemp}</strong>
            </div>

            {/* Deep Analysis with AI */}
            <div className="pt-2">
              <button
                disabled={isAnalyzing}
                onClick={handleDeepAnalyze}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                    <span>Menganalisis Molekul dengan PASURA-BIO AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>Analisis Interaksi Senyawa Ini dengan Bakteri Pembusuk</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Analysis Box */}
            {aiAnalysisResult && (
              <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-500/40 text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto font-sans animate-fadeIn">
                {aiAnalysisResult}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
