import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Printer, 
  Download, 
  Sparkles, 
  Tag, 
  Info, 
  ShieldCheck, 
  Leaf, 
  ExternalLink,
  Store,
  Layers
} from 'lucide-react';

export const SmartQRLabelMaker: React.FC = () => {
  const [productName, setProductName] = useState<string>('PASURA-BIO KEBONAGUNG');
  const [variant, setVariant] = useState<string>('Original Spices & Grati Palm Sugar');
  const [volume, setVolume] = useState<string>('250 mL');
  const [shelfLifeDays, setShelfLifeDays] = useState<number>(30);
  const [phLevel, setPhLevel] = useState<string>('4.5 (Stabil Alami)');
  const [brixLevel, setBrixLevel] = useState<string>('22° Brix');
  const [umkmPartner, setUmkmPartner] = useState<string>('Sentra UMKM Jamu Kebonagung RT 03/RW 02 Pasuruan');
  const [batchNo, setBatchNo] = useState<string>('BATCH-KBN-2026A');
  const [qrUrl, setQrUrl] = useState<string>('https://pasura-bio.pasuruankota.go.id/edukasi-etnosains');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    QRCode.toDataURL(qrUrl, {
      width: 160,
      margin: 1,
      color: {
        dark: '#1c1917',
        light: '#fef3c7',
      },
    }).then((url) => {
      setQrDataUrl(url);
    }).catch((err) => {
      console.error(err);
    });
  }, [qrUrl]);

  const handlePrintLabel = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 p-6 sm:p-8 border border-amber-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <QrCode className="w-3.5 h-3.5" />
              <span>ARTEFAK PROYEK TAHAP 4 • SMART PACKAGING UMKM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Generator Label Kemasan Smart QR Jamu Kebonagung
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Membantu siswa mendesain kemasan modern berstandar bioteknologi pangan dan etnosains yang terhubung dengan QR Code edukasi digital untuk mendukung UMKM Kebonagung Kota Pasuruan.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrintLabel}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh Label</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Customization */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center space-x-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Kustomisasi Identitas Label Jamu</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Nama Brand / Inovasi Produk:</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Varian / Tagline Produk:</label>
                <input
                  type="text"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Volume Isi Bersih:</label>
                  <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Estimasi Daya Simpan:</label>
                  <input
                    type="number"
                    value={shelfLifeDays}
                    onChange={(e) => setShelfLifeDays(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">pH Larutan Stabil:</label>
                  <input
                    type="text"
                    value={phLevel}
                    onChange={(e) => setPhLevel(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Tingkat Brix Gula Aren:</label>
                  <input
                    type="text"
                    value={brixLevel}
                    onChange={(e) => setBrixLevel(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Perajin UMKM Kebonagung Mitra:</label>
                <input
                  type="text"
                  value={umkmPartner}
                  onChange={(e) => setUmkmPartner(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Nomor Bets / Batch Laboratorium:</label>
                <input
                  type="text"
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">URL Tautan Smart QR Code:</label>
                <input
                  type="text"
                  value={qrUrl}
                  onChange={(e) => setQrUrl(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-200 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Bottle Label Sticker Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
            <span>Pratinjau Stiker Kemasan Siap Cetak (Waterproof Label Mockup)</span>
            <span className="text-amber-400">Dimensi Standar Botol 250mL</span>
          </div>

          {/* Printable Label Box */}
          <div 
            ref={labelRef}
            className="p-6 rounded-3xl bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 text-stone-900 border-2 border-amber-800/80 shadow-2xl relative overflow-hidden"
          >
            {/* Traditional Batik Border Motif Header */}
            <div className="border-b-2 border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-stone-900 text-amber-300 font-serif text-[10px] font-bold tracking-wider uppercase">
                  WARISAN KOTA PASURUAN
                </span>
                <span className="text-[10px] font-bold text-stone-700 tracking-wider">
                  EST. SEJAK ERA KEBONAGUNG
                </span>
              </div>
              <span className="font-mono text-[10px] font-bold text-stone-600">{batchNo}</span>
            </div>

            {/* Main Label Body */}
            <div className="grid grid-cols-12 gap-4 my-4 items-center">
              {/* Product Title & Info */}
              <div className="col-span-8 space-y-1.5">
                <h2 className="text-2xl font-extrabold font-serif text-stone-950 tracking-tight leading-none">
                  {productName}
                </h2>
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  {variant}
                </p>

                {/* 6 Essential Spices List */}
                <div className="flex flex-wrap gap-1 pt-1.5 text-[9px] font-semibold text-stone-800">
                  <span className="px-1.5 py-0.5 rounded bg-amber-200/80">Kapulaga</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-200/80">Cabe Jamu</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-200/80">Cengkeh</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-200/80">Kayu Manis</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-200/80">Sereh</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-200/80">Gula Aren Grati</span>
                </div>

                {/* Science Bio-preservation Badges */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] text-stone-900 font-medium">
                  <div className="p-1 rounded bg-white/70 border border-stone-300 text-center">
                    <span className="block text-[8px] text-stone-500 uppercase">Derajat Manis</span>
                    <strong>{brixLevel}</strong>
                  </div>
                  <div className="p-1 rounded bg-white/70 border border-stone-300 text-center">
                    <span className="block text-[8px] text-stone-500 uppercase">Keasaman</span>
                    <strong>{phLevel}</strong>
                  </div>
                  <div className="p-1 rounded bg-white/70 border border-stone-300 text-center">
                    <span className="block text-[8px] text-stone-500 uppercase">Daya Simpan</span>
                    <strong>{shelfLifeDays} Hari</strong>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="col-span-4 flex flex-col items-center justify-center p-2 rounded-2xl bg-amber-200/50 border border-amber-400/80 text-center space-y-1">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Smart QR Code Jamu Kebonagung" className="w-24 h-24 rounded-lg shadow-sm" />
                ) : (
                  <div className="w-24 h-24 bg-stone-300 rounded-lg animate-pulse" />
                )}
                <span className="text-[9px] font-bold text-stone-900 uppercase tracking-tight">
                  Pindai Khasiat & Kisah Perajin
                </span>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="border-t-2 border-stone-800 pt-2.5 flex items-center justify-between text-[10px] text-stone-700 font-medium">
              <div>
                <span className="font-bold text-stone-900">Diproduksi Bersama:</span> {umkmPartner}
              </div>
              <div className="font-extrabold text-stone-950 text-xs">
                Netto: {volume}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Nilai Edukasi Smart Packaging dalam Pendekatan CRT:</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Ketika konsumen atau teman sebaya memindai kode QR pada botol, mereka langsung membaca data sains (kadar eugenol, kapasitas antioksidan) sekaligus video wawancara perajin sepuh Kebonagung. Ini adalah wujud integrasi sains, teknologi, dan penghormatan budaya lokal secara seimbang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
