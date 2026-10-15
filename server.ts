import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set in environment.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const SYSTEM_INSTRUCTION_PASURA = `Anda adalah "PASURA-BIO AI", seorang Pakar Edukasi Bioteknologi dan Pengembang Media Pembelajaran Interaktif berbasis Etnosains Kota Pasuruan.
Anda membimbing guru dan siswa SMP/MTs (Kelas 9) dalam mengimplementasikan model Problem and Project-Oriented Based Learning (POPBL) dengan pendekatan Culturally Responsive Teaching (CRT).

Fokus Anda:
1. Jamu Kebonagung khas Pasuruan: warisan leluhur Pasuruan yang menggunakan 6-7 rempah utama (Kapulaga, Cabe Jamu/Lempuyangan, Kayu Manis, Cengkeh, Sereh, Gula Aren murni Grati/Pasuruan).
2. Konsep Sains & Bioteknologi Modern: Bio-preservasi (antimikroba alami eugenol, sinamaldehid, piperin), ekstraksi maserasi/infus, pengendalian derajat keasaman (pH ~4.0 - 5.5), total padatan terlarut (Brix 18-25°), pasteurisasi suhu rendah (LTLT 65°C 30 menit atau HTST 72°C 15 detik), serta pengemasan steril/vakum.
3. Pendekatan CRT: Menghormati kearifan lokal perajin Jamu Kebonagung Pasuruan, menghubungkan tradisi leluhur dengan literasi sains modern, memberdayakan UMKM lokal agar jamu tidak punah dan disukai generasi Gen Z.
4. Gaya Bahasa: Edukatif, inspiratif, komunikatif, solutif, 100% Bahasa Indonesia baku yang ramah siswa kelas 9 SMP.`;

// API Routes
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, message } = req.body;
    const ai = getAIClient();

    // Format chat history
    let promptText = message || '';
    if (messages && Array.isArray(messages) && messages.length > 0) {
      const historySummary = messages
        .map((m: { sender: string; text: string }) => `${m.sender === 'user' ? 'Siswa/Guru' : 'PASURA-BIO AI'}: ${m.text}`)
        .join('\n');
      promptText = `${historySummary}\nSiswa/Guru: ${message}\nPASURA-BIO AI:`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_PASURA,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Maaf, terjadi kendala saat merespon. Silakan coba lagi.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Gagal memproses pesan AI',
      details: error.message || String(error),
    });
  }
});

// Run Prompt Experiment Endpoint
app.post('/api/ai/prompt-run', async (req: Request, res: Response) => {
  try {
    const { prompt, studentName, groupName, topic } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt tidak boleh kosong' });
    }

    const ai = getAIClient();
    const promptWithContext = `Konteks: Proyek Siswa POPBL-CRT SMP Pasuruan
Topik: ${topic || 'Etnosains Jamu Kebonagung'}
Kelompok: ${groupName || 'Kelompok Peneliti Cilik'} (${studentName || 'Siswa'})

Instruksi Prompt Siswa:
"${prompt}"

Tolong berikan respon yang:
1. Menjawab langsung perintah prompt siswa secara ilmiah dan aplikatif untuk Jamu Kebonagung Pasuruan.
2. Memberikan 'Tips Refleksi Guru/AI': 1-2 saran perbaikan prompt agar siswa belajar teknik Prompt Engineering yang lebih terarah dan saintifik.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptWithContext,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_PASURA,
        temperature: 0.7,
      },
    });

    res.json({ output: response.text });
  } catch (error: any) {
    console.error('Prompt run error:', error);
    res.status(500).json({
      error: 'Gagal mengeksekusi eksperimen prompt',
      details: error.message || String(error),
    });
  }
});

// Deep Compound & Ethnoscience Analysis
app.post('/api/ai/compound-analyze', async (req: Request, res: Response) => {
  try {
    const { spiceName, chemicalCompound, targetMicrobe } = req.body;
    const ai = getAIClient();

    const query = `Analisis saintifik dan etnosains untuk rempah Jamu Kebonagung Pasuruan:
Rempah: ${spiceName}
Senyawa Bioaktif Utama: ${chemicalCompound}
Mikroba Sasaran: ${targetMicrobe || 'Bakteri pembusuk pangan (Bacillus cereus, Staphylococcus aureus, Aspergillus sp.)'}

Sajikan dalam format terstruktur:
1. Mekanisme Bio-preservasi Molekuler (Bagaimana senyawa ini merusak membran atau menghambat enzim mikroba).
2. Kearifan Lokal Pasuruan (Mengapa sesepuh Kebonagung memasukkan rempah ini dalam takaran khusus).
3. Parameter Optimal (Suhu ekstraksi, pH stabil, konsentrasi efektif).
4. Rekomendasi Desain Produk Generasi Z.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_PASURA,
        temperature: 0.5,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Compound analysis error:', error);
    res.status(500).json({
      error: 'Gagal menganalisis senyawa rempah',
      details: error.message || String(error),
    });
  }
});

// Shelf Life Simulation Engine
app.post('/api/ai/shelf-life-simulate', async (req: Request, res: Response) => {
  try {
    const { ph, brix, pasteurization, packaging, bioactiveExtractLevel } = req.body;
    const ai = getAIClient();

    const query = `Hitung dan simulasikan masa simpan (shelf life) Jamu Kebonagung Pasuruan berdasarkan kombinasi parameter rekayasa bioteknologi berikut:
- pH Larutan: ${ph}
- Kadar Gula Terlarut (TDS / Brix): ${brix}° Brix
- Metode Pasteurisasi: ${pasteurization}
- Jenis Kemasan: ${packaging}
- Konsentrasi Ekstrak Rempah Bioaktif (Eugenol, Sinamaldehid, Piperin): ${bioactiveExtractLevel}%

Berikan analisis prediktif mencakup:
1. Estimasi Masa Simpan Suhu Ruang (hari) dan Suhu Kulkas 4°C (hari).
2. Status Kelayakan Sensoris (Rasa, Aroma, Warna endapan).
3. Risiko Kontaminasi Mikroba Utama (Kapang, Khamir, Bakteri Asam Laktat).
4. Penjelasan Saintifik Mengapa kombinasi variabel ini menghasilkan masa simpan tersebut.
5. Rekomendasi Aksi Nyata untuk UMKM Kebonagung Pasuruan.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: query,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_PASURA,
        temperature: 0.3,
      },
    });

    res.json({ simulationResult: response.text });
  } catch (error: any) {
    console.error('Shelf life simulation error:', error);
    res.status(500).json({
      error: 'Gagal melakukan simulasi masa simpan',
      details: error.message || String(error),
    });
  }
});

// Serve frontend in dev or prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PASURA-BIO AI server running on http://localhost:${PORT}`);
  });
}

startServer();
