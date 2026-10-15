import { VideoScene, POPBLStage, PromptTemplate, QuizQuestion, RubricCriterion, SpiceCompound, SpiceLocationNode, AchievementBadge } from '../types';

export const VIDEO_METADATA = {
  title: 'Warisan Hangat Jamu Kebonagung: Berpacu Melawan Waktu dan Kepunahan',
  duration: '1 Menit 45 Detik (01:45)',
  targetAudience: 'Siswa Kelas 9 SMP/MTs & Guru IPA / Bioteknologi',
  conflictTheme: 'Kontras kelezatan & khasiat legendaris Jamu Kebonagung Pasuruan dengan keterbatasan masa simpannya (hanya bertahan 1-2 hari pada suhu ruang) serta ancaman kepunahan minat generasi muda terhadap jamu tradisional di tengah gempuran minuman kekinian.',
  triggerQuestions: [
    'Mengapa Jamu Kebonagung yang kaya rempah antimikroba alami justru cepat berlendir dan basi dalam 24-48 jam pada pengolahan tradisional?',
    'Bagaimana konsep bioteknologi bio-preservasi (pengaturan pH, Brix gula aren, ekstraksi senyawa aktif, & pasteurisasi) dapat memperpanjang masa simpan tanpa bahan pengawet kimia sintetis?',
    'Bagaimana generasi Z Kota Pasuruan dapat memanfaatkan Generative AI dan Smart QR Packaging untuk mentransformasi jamu pusaka ini menjadi produk higienis bernilai ekonomi tinggi?'
  ]
};

export const VIDEO_SCENES: VideoScene[] = [
  {
    sceneNumber: 1,
    timeRange: '00:00 - 00:20',
    title: 'Fajar di Sentra Kebonagung & Pusaka Leluhur Pasuruan',
    visual: 'Shot sinematik pagi hari di kawasan Kebonagung, Kota Pasuruan. Uap mengepul dari kuali tanah liat kuno. Terlihat tangan terampil sesepuh perajin menumbuk kapulaga, cengkeh, dan kayu manis di atas cobek batu.',
    audioNarration: 'Sejak ratusan tahun silam di pesisir Kota Pasuruan, semerbak rempah Jamu Kebonagung telah menjadi lambang kebugaran para adipati dan rakyat jelata. Perpaduan harmonis kapulaga, cabe jamu, dan manisnya gula aren lokal menciptakan cita rasa pedas-hangat yang tiada duanya di dunia.',
    screenText: 'Pusaka Tradisi: Jamu Kebonagung khas Kota Pasuruan',
    ethnoscienceFocus: 'Kearifan lokal pemilihan rempah aromatik segar dan pemanasan lambat tradisional.'
  },
  {
    sceneNumber: 2,
    timeRange: '00:20 - 00:45',
    title: 'Dilema Sang Perajin: Terjebak 48 Jam Sebelum Basi',
    visual: 'Close-up wajah Mbah Su (perajin jamu Kebonagung) yang tampak cemas menatap botol-botol kaca jamu yang belum terjual. Ditampilkan visual jamu yang mulai berbusa, keruh, dan asam setelah 2 hari di suhu ruang terbuka.',
    audioNarration: 'Namun, ada air mata di balik kehangatan ini. Jamu segar Kebonagung hanya mampu bertahan satu hingga dua hari saja! Jika tak segera habis, mikroba pembusuk akan mengubah khasiat emas ini menjadi cairan basi berbusa. Kerugian pun tak terelakkan bagi para perajin UMKM Kebonagung.',
    screenText: 'Krisis Daya Simpan: 1 - 2 Hari Saja di Suhu Ruang',
    ethnoscienceFocus: 'Tantangan mikrobiologis: kontaminasi spora kapang dan ragi pembusuk pada sanitasi terbuka.'
  },
  {
    sceneNumber: 3,
    timeRange: '00:45 - 01:10',
    title: 'Ancaman Kepunahan: Terasing di Negeri Sendiri',
    visual: 'Transisi cepat ke deretan kafe modern di sudut kota Pasuruan. Anak-anak muda asyik menyeruput boba manis bersirup kimia artifisial, sementara gerobak jamu tradisional melintas sepi tanpa pembeli muda.',
    audioNarration: 'Bukan hanya bakteri pembusuk yang mengancam. Di tangan generasi muda hari ini, jamu sering dianggap kuno, pahit, dan tertinggal zaman. Akankah mahakarya etnosains Pasuruan ini lenyap tertelan peradaban modern?',
    screenText: 'Tantangan CRT: Ancaman Kepunahan Minat Generasi Muda',
    ethnoscienceFocus: 'Kesenjangan persepsi budaya antara generasi perajin sepuh dan generasi digital Gen-Z.'
  },
  {
    sceneNumber: 4,
    timeRange: '01:10 - 01:30',
    title: 'Jembatan Sains & Teknologi: Harapan Baru di Laboratorium Sekolah',
    visual: 'Siswa-siswi SMP berseragam di laboratorium IPA: menguji pH meter, mengukur skala Brix refraktometer, dan mengetik prompt analisis senyawa eugenol & piperin pada laptop berbantuan AI.',
    audioNarration: 'Kini giliran kita, generasi muda Kota Pasuruan! Di laboratorium sains kita, tradisi berpadu dengan inovasi bioteknologi. Bio-preservasi, kontrol kadar gula Brix, pasteurisasi terukur, dan kecerdasan artifisial siap membangkitkan kembali Jamu Kebonagung ke panggung modern!',
    screenText: 'Bioteknologi Pangan x Etnosains x Generative AI',
    ethnoscienceFocus: 'Transformasi kearifan lokal menjadi sains teruji (scientific inquiry) berbantuan AI.'
  },
  {
    sceneNumber: 5,
    timeRange: '01:30 - 01:45',
    title: 'Panggilan Aksi: Saatnya Berinovasi!',
    visual: 'Animasi kemasan Jamu Kebonagung modern ber-label Smart QR Code yang dipindai smartphone memunculkan data khasiat antioksidan dan profil perajin UMKM Pasuruan. Teks tantangan berkedip mantap.',
    audioNarration: 'Mampukah kelompokmu memperpanjang masa simpan Jamu Kebonagung hingga 30 hari tanpa bahan kimia sintetik, sekaligus mendesain kemasan pintar yang disukai anak muda? Buktikan di proyek bioteknologi ini!',
    screenText: 'Mampukah Kamu Menyelamatkan Jamu Kebonagung Pasuruan?',
    ethnoscienceFocus: 'Pertanyaan Pemantik Proyek POPBL-CRT.'
  }
];

export const POPBL_STAGES: POPBLStage[] = [
  {
    id: 1,
    stageName: 'Tahap 1: Orientasi Masalah Budaya Pasuruan (Dilema Perajin Kebonagung)',
    crtDimension: 'Cultural Awareness & Identity: Mengakui dan menghargai peran sentra Jamu Kebonagung sebagai identitas sejarah dan ekonomi Kota Pasuruan.',
    objective: 'Siswa mengidentifikasi akar permasalahan perajin jamu lokal: keterbatasan masa simpan (shelf life) dan packaging konvensional yang kurang diminati Gen Z.',
    studentActivities: [
      'Menonton Trigger Video dan menganalisis konflik ketahanan pangan lokal.',
      'Melakukan wawancara/studi kasus perajin jamu di Kelurahan Kebonagung, Pasuruan.',
      'Merumuskan pertanyaan pemantik proyek dalam lembar kerja kelompok.'
    ],
    scienceConcept: 'Faktor-faktor penyebab kerusakan pangan (mikroorganisme patogen/pembusuk, reaksi oksidasi, dan aktivitas enzimatis).',
    aiIntegration: 'Menggunakan AI untuk menyusun panduan wawancara berbasis empati kepada perajin lokal.',
    expectedArtifact: 'Peta Masalah Etnosains (Fishbone Diagram) & Rumusan Masalah Kelompok.',
    teacherTips: 'Fasilitasi siswa agar tidak merendahkan metode tradisional, melainkan menumbuhkan rasa bangga dan empati sosial.'
  },
  {
    id: 2,
    stageName: 'Tahap 2: Eksplorasi Etnosains (Rekonstruksi Sains Resep Kebonagung)',
    crtDimension: 'Culturally Mediated Instruction: Mengonversi pengetahuan asli masyarakat (indigenous knowledge) menjadi konsep ilmiah ilmiah akademis.',
    objective: 'Siswa membedah bahan baku Jamu Kebonagung (kapulaga, cabe jamu, kayu manis, cengkeh, sereh, gula aren) ke dalam parameter sains: pH, Brix, dan senyawa metabolit sekunder.',
    studentActivities: [
      'Mengukur derajat keasaman (pH) dan konsentrasi larutan gula (Derajat Brix) dari sampel jamu segar.',
      'Mengidentifikasi perlakuan panas tradisional (perebusan lama vs pasteurisasi suhu terukur LTLT 65°C).',
      'Membandingkan teknik maserasi etnomedisin dengan ekstraksi zat aktif biopreservatif.'
    ],
    scienceConcept: 'Bio-preservasi pangan alami, pengaruh pH asam terhadap integritas membran sel bakteri, tekanan osmotik kadar gula tinggi (Brix), dan termolabilitas vitamin/antioksidan.',
    aiIntegration: 'Meminta AI membandingkan data empiris sesepuh Pasuruan dengan literatur jurnal ilmiah bioteknologi pangan.',
    expectedArtifact: 'Tabel Rekonstruksi Etnosains (Pengetahuan Asli vs Pengetahuan Ilmiah Modern).',
    teacherTips: 'Bimbing siswa menggunakan alat laboratorium seperti pH meter digital dan hand-refractometer secara teliti.'
  },
  {
    id: 3,
    stageName: 'Tahap 3: Investigasi Berbantuan AI (Simulasi Bioaktif & Preservasi)',
    crtDimension: 'High Expectations & Critical Thinking: Siswa menggunakan teknologi mutakhir (Gen-AI) sebagai instrumen penyelidikan sains tingkat tinggi.',
    objective: 'Siswa merancang formula optimasi masa simpan dengan memanfaatkan sifat antimikroba alami rempah melalui simulasi AI.',
    studentActivities: [
      'Menjalankan Prompt AI khusus untuk menganalisis spektrum penghambatan senyawa Eugenol, Piperin, dan Sinamaldehid terhadap Bacillus sp. dan kapang.',
      'Melakukan simulasi kombinasi konsentrasi gula aren (Brix 18-24°), pH asam sitrat alami, dan suhu pasteurisasi.',
      'Menentukan formulasi prototipe yang paling seimbang antara rasa enak dan daya simpan panjang.'
    ],
    scienceConcept: 'Sinergisme antimikroba alami, efek osmotik gula dalam menurunkan aktivitas air (aw), dan kurva kematian mikroba (Thermal Death Time / D-value).',
    aiIntegration: 'Eksperimen prompt di PASURA-BIO AI Sandbox untuk memprediksi umur simpan dan efek sinergis senyawa bioaktif.',
    expectedArtifact: 'Laporan Desain Eksperimen Bioteknologi Berbantuan AI.',
    teacherTips: 'Ajarkan etika penggunaan AI: verifikasi output AI dengan literatur ilmiah yang valid.'
  },
  {
    id: 4,
    stageName: 'Tahap 4: Pembuatan Artefak (Prototipe Inovatif + Label Smart QR)',
    crtDimension: 'Authentic Student Production: Menghasilkan karya nyata yang berakar pada budaya lokal namun berselera global.',
    objective: 'Siswa memproduksi produk olahan Jamu Kebonagung higienis (sirup konsentrat / serbuk instan) lengkap dengan kemasan ber-QR Code edukatif.',
    studentActivities: [
      'Mengeksekusi proses pengolahan higienis dengan pasteurisasi terukur dan pengemasan steril.',
      'Memanfaatkan Generative AI untuk menyusun narasi etnosains (storytelling) dan copy edukasi gizi.',
      'Mendesain label kemasan modern yang memuat Smart QR Code menuju dashboard edukasi khasiat rempah.'
    ],
    scienceConcept: 'Teknologi formulasi pangan higienis, pengeringan kristalisasi gula aren, pengemasan kedap udara (aseptic packaging), dan digital barcode integration.',
    aiIntegration: 'Membuat narasi promosi produk yang menyentuh hati serta generate kode QR interaktif.',
    expectedArtifact: 'Produk Jamu Kebonagung Inovatif (Botol Kaca Terpasteurisasi / Serbuk) + Mockup Kemasan Smart QR.',
    teacherTips: 'Pastikan protokol kebersihan dan higienitas pangan (sanitasi alat dan tangan) diterapkan secara ketat.'
  },
  {
    id: 5,
    stageName: 'Tahap 5: Pameran Dampak Komunitas (Aksi Nyata untuk UMKM Pasuruan)',
    crtDimension: 'Social Justice & Community Action: Menghubungkan pembelajaran kelas secara langsung dengan peningkatan martabat dan ekonomi masyarakat lokal.',
    objective: 'Siswa memamerkan artefak karya mereka kepada perajin Jamu Kebonagung, warga sekolah, dan masyarakat luas melalui Gelar Karya Etnosains.',
    studentActivities: [
      'Membuka stan uji organoleptik (uji hedonik rasa, aroma, warna, daya terima) bersama teman sebaya.',
      'Menyerahkan prototipe kemasan dan formula biopreservasi sebagai masukan inovasi kepada asosiasi perajin Jamu Kebonagung.',
      'Melakukan refleksi diri tentang peran pemuda Pasuruan dalam melestarikan warisan biokultural.'
    ],
    scienceConcept: 'Uji organoleptik sensori pangan kuantitatif (skala Likert 1-5) dan evaluasi masa simpan empiris.',
    aiIntegration: 'Mengolah data respons kuesioner uji organoleptik secara otomatis dengan bantuan AI.',
    expectedArtifact: 'Pameran Karya Etnosains, Laporan Uji Organoleptik, dan Penyerahan Donasi Ide Desain untuk UMKM.',
    teacherTips: 'Undang perwakilan perajin Kebonagung atau dinas koperasi/pendidikan untuk memberikan apresiasi otentik.'
  }
];

export const STUDENT_PROMPTS: PromptTemplate[] = [
  {
    id: 'prompt-1',
    title: 'Prompt 1: Analisis Mekanisme Bioaktif Antimikroba Rempah Kebonagung',
    category: 'bioaktif',
    targetModel: 'gemini-3.8-flash',
    promptText: `Bertindaklah sebagai Pakar Bioteknologi Pangan Etnosains. Saya adalah siswa kelas 9 SMP di Kota Pasuruan yang sedang meneliti resep Jamu Kebonagung (terdiri atas kapulaga, cengkeh, kayu manis, cabe jamu, sereh, dan gula aren). 

Tolong jelaskan secara ilmiah namun mudah dipahami anak SMP:
1. Senyawa bioaktif utama apa yang terkandung dalam cengkeh (Eugenol), kayu manis (Cinnamaldehyde), dan cabe jamu (Piperine)?
2. Bagaimana mekanisme senyawa-senyawa tersebut membunuh atau menghambat bakteri pembusuk minuman (bio-preservasi alami)?
3. Pada suhu perebusan berapa derajat Celcius senyawa-senyawa ini tetap stabil tanpa rusak terdenaturasi?
4. Berikan analogi sederhana untuk menjelaskan konsep ini kepada teman sekelas!`,
    explanation: 'Prompt ini melatih siswa mengaitkan pengetahuan rempah lokal warisan leluhur dengan mekanisme biokimia molekuler modern dan stabilitas termal saat perebusan.',
    suggestedInputVariables: [
      { key: 'rempahUtama', label: 'Rempah Fokus', placeholder: 'Cengkeh & Kayu Manis' },
      { key: 'targetBakteri', label: 'Target Mikroba', placeholder: 'Bakteri pembusuk dan kapang' }
    ]
  },
  {
    id: 'prompt-2',
    title: 'Prompt 2: Copywriting Cerdas & Edukasi Sains untuk Label Kemasan Smart QR',
    category: 'copywriting',
    targetModel: 'gemini-3.8-flash',
    promptText: `Bertindaklah sebagai Creative Copywriter & Edukator Sains Etnosains. Kelompok kami membuat produk inovasi "Jamu Kebonagung Sparkling/Sirup Higienis Pasuruan" untuk menyelamatkan warisan perajin lokal agar digemari anak muda Gen-Z.

Buatkan teks konten kreatif untuk label kemasan kami yang terhubung dengan Smart QR Code:
1. Tagline yang keren, puitis, bernuansa budaya Pasuruan tetapi modern (maksimal 8 kata).
2. "Cerita Singkat di Balik Rasa": Narasi 3 kalimat mengapa Jamu Kebonagung adalah pusaka kesehatan Pasuruan sejak era kolonial.
3. Fakta Sains Cepat (Quick Bio-Fact): 3 butir penjelasan ilmiah khasiat eugenol & piperin dalam bahasa anak muda (fun fact).
4. Ajakan Bertindak (Call to Action) untuk mendukung UMKM Kebonagung Pasuruan!`,
    explanation: 'Prompt ini membimbing siswa menghasilkan konten komunikasi sains (science communication) dan branding bernilai budaya untuk UMKM lokal.',
    suggestedInputVariables: [
      { key: 'namaProduk', label: 'Nama Inovasi Jamu', placeholder: 'Pasura-Glow Jamu Kebonagung' },
      { key: 'segmen', label: 'Target Konsumen', placeholder: 'Remaja SMP/SMA & Pecinta Kuliner Pasuruan' }
    ]
  },
  {
    id: 'prompt-3',
    title: 'Prompt 3: Rekayasa Masa Simpan (Brix, pH, dan Pasteurisasi LTLT)',
    category: 'biopreservasi',
    targetModel: 'gemini-3.8-flash',
    promptText: `Sebagai Ahli Pengawetan Pangan Alami (Bio-preservasi), bantu kelompok kami merumuskan metode agar Jamu Kebonagung cair bisa bertahan 21-30 hari tanpa natrium benzoat:
1. Berapa kisaran derajat Brix (konsentrasi sukrosa gula aren) yang optimal untuk menurunkan aktivitas air (aw) tanpa membuat rasa terlalu manis menyengat?
2. Berapa target pH aman alami (misal dengan sentuhan jeruk nipis atau asam jawa) untuk menghambat spora bakteri?
3. Rekomendasikan parameter pasteurisasi suhu rendah (LTLT) yang tepat menggunakan peralatan dapur sederhana sekolah.
4. Apa tanda-tanda organoleptik bila jamu telah mengalami kerusakan mikroba?`,
    explanation: 'Prompt penyelidikan teknis laboratorium untuk membantu siswa menentukan variabel bebas dan terikat dalam praktikum pengawetan ramah lingkungan.',
    suggestedInputVariables: [
      { key: 'targetHari', label: 'Target Daya Simpan', placeholder: '30 Hari di suhu kulkas' }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Bioteknologi Pangan & Bio-preservasi',
    difficulty: 'Sedang',
    question: 'Jamu Kebonagung tradisional umumnya hanya bertahan 1-2 hari pada suhu kamar sebelum berlendir dan berbau asam. Prinsip bioteknologi biopreservasi yang paling tepat untuk memperpanjang masa simpan jamu tersebut tanpa bahan pengawet kimia sintetis adalah...',
    options: [
      { label: 'A', text: 'Menambahkan boraks dan formalin agar bakteri mati secara instan.' },
      { label: 'B', text: 'Mengombinasikan pasteurisasi suhu terukur (LTLT 65°C), optimalisasi kadar gula terlarut (efek osmotik Brix), dan aktivitas antimikroba senyawa bioaktif rempah.' },
      { label: 'C', text: 'Mendidihkan jamu terus-menerus selama 24 jam dengan api besar hingga airnya habis menguap.' },
      { label: 'D', text: 'Menyimpan jamu di wadah terbuka di bawah sinar matahari langsung agar terkena radiasi UV.' }
    ],
    correctAnswer: 'B',
    scientificExplanation: 'Metode B mengaplikasikan konsep "Hurdle Technology" (Teknologi Rintangan) dalam bioteknologi pangan: kombinasi perlakuan panas ringan (pasteurisasi LTLT) untuk membunuh sel vegetatif mikroba, tekanan osmotik tinggi dari gula aren terlarut (Brix 18-22°) yang menurunkan nilai aktivitas air (aw), serta metabolit sekunder rempah (eugenol, sinamaldehid) yang melisis membran sel mikroba.',
    culturalReflection: 'Kearifan nenek moyang Pasuruan sebenarnya telah menggunakan gula aren pekat dan aneka rempah pedas hangat. Dengan menyempurnakan aspek higienitas dan kontrol suhu pasteurisasi modern, kita memuliakan resep leluhur tanpa mencemarinya dengan pengawet sintetik berbahaya.'
  },
  {
    id: 2,
    category: 'Bioteknologi Pangan & Bio-preservasi',
    difficulty: 'Dasar',
    question: 'Pada pengolahan Jamu Kebonagung, perajin biasanya menambahkan gula aren murni khas Pasuruan dalam jumlah cukup banyak. Secara sains bioteknologi, peran konsentrasi gula tinggi (derajat Brix) dalam memperpanjang keawetan larutan jamu didasari oleh fenomena...',
    options: [
      { label: 'A', text: 'Osmosis, di mana air di dalam sel mikroba tersedot keluar menuju larutan gula pekat sehingga sel mikroba mengalami plasmolisis dan mati.' },
      { label: 'B', text: 'Fotosintesis, di mana gula memproduksi oksigen berlebih yang meracuni bakteri anaerob.' },
      { label: 'C', text: 'Fermentasi alkohol spontan yang seketika mengubah seluruh cairan jamu menjadi cuka pekat.' },
      { label: 'D', text: 'Netralisasi asam, di mana gula menaikkan pH menjadi sangat basa di atas angka 12.' }
    ],
    correctAnswer: 'A',
    scientificExplanation: 'Larutan gula pekat bersifat hipertonik terhadap sitoplasma mikroorganisme. Melalui osmosis, molekul air bebas keluar dari sel bakteri/jamur (plasmolisis), dan nilai aw (water activity) menurun drastis sehingga mikroorganisme tidak memiliki air bebas untuk melangsungkan metabolisme seluler.',
    culturalReflection: 'Masyarakat Pasuruan sejak dulu memilih gula aren Grati/lokal bukan sekadar pemanis, melainkan sebagai "pengawet alami" berbasis kearifan lokal. Ini bukti nyata sains empiris masyarakat Nusantara sebelum konsep osmosis ditulis dalam buku teks sains modern.'
  },
  {
    id: 3,
    category: 'Analisis Etnosains & Senyawa Alami Rempah',
    difficulty: 'Sedang',
    question: 'Cengkeh dan kayu manis merupakan dua rempah wajib beraroma kuat dalam racikan Jamu Kebonagung. Senyawa bioaktif fitokimia utama yang bertanggung jawab atas aktivitas antibakteri pada kedua rempah tersebut secara berurutan adalah...',
    options: [
      { label: 'A', text: 'Kafein dan Teobromin' },
      { label: 'B', text: 'Eugenol dan Sinamaldehid (Cinnamaldehyde)' },
      { label: 'C', text: 'Kapsaisin dan Kurkumin murni' },
      { label: 'D', text: 'Asam Sitrat dan Asam Asetat glasial' }
    ],
    correctAnswer: 'B',
    scientificExplanation: 'Cengkeh (Syzygium aromaticum) kaya akan senyawa fenolik Eugenol (C10H12O2, PubChem CID 3314) yang mampu merusak permeabilitas membran sitoplasma bakteri. Sementara kayu manis (Cinnamomum burmannii) mengandung senyawa aldehid Sinamaldehid (C9H8O, PubChem CID 637511) yang menghambat sintesis dinding sel dan pembelahan sel bakteri patogen.',
    culturalReflection: 'Di Pasuruan, Jamu Kebonagung diminum saat cuaca dingin angin gending melanda pesisir untuk menghangatkan badan dan mencegah batuk-pilek. Khasiat empiris kehangatan ini ternyata bersumber dari vasodilatasi dan efek antibakteri nyata dari eugenol dan sinamaldehid.'
  },
  {
    id: 4,
    category: 'Analisis Etnosains & Senyawa Alami Rempah',
    difficulty: 'Penalaran Tingkat Tinggi (HOTS)',
    question: 'Cabe jamu (Piper retrofractum Vahl) memberikan sensasi pedas getir yang khas pada Jamu Kebonagung. Ditinjau dari sifat biokimiawi senyawa Piperin di dalamnya, alasan mengapa perebusan rempah Jamu Kebonagung TIDAK boleh dilakukan pada suhu di atas 100°C dengan wadah terbuka dalam waktu terlalu lama adalah...',
    options: [
      { label: 'A', text: 'Minyak atsiri dan senyawa aromatik yang volatil akan menguap habis serta ikatan molekul bioaktif rentan mengalami degradasi termal.' },
      { label: 'B', text: 'Suhu di atas 100°C akan memicu pembentukan zat radioaktif yang mematikan.' },
      { label: 'C', text: 'Gula aren akan berubah secara instan menjadi logam berat beracun.' },
      { label: 'D', text: 'Cabe jamu akan menyerap semua air hingga wajan meledak karena tekanan gas.' }
    ],
    correctAnswer: 'A',
    scientificExplanation: 'Piperin bersama minyak atsiri volatil lainnya (seperti 1,8-cineole pada kapulaga dan citronellal pada sereh) bersifat termolabil dan mudah menguap. Perebusan terbuka yang berlebihan mendidih (>100°C) menyebabkan hilangnya senyawa bioaktif volatil pembawa aroma dan pemusnah mikroba, menyisakan larutan yang kehilangan khasiat fungsionalnya.',
    culturalReflection: 'Nasihat sesepuh perajin Kebonagung yang berbunyi "Geni kudu ajeg, ojo sampek umob mangap-mangap" (Api harus tenang sedang, jangan sampai mendidih bergejolak hebat) adalah etnosains murni yang menjaga agar minyak atsiri berharga tidak hilang menguap sia-sia ke udara.'
  },
  {
    id: 5,
    category: 'Penalaran Kritis CRT (AI & Budaya Pasuruan)',
    difficulty: 'Penalaran Tingkat Tinggi (HOTS)',
    question: 'Di era digital, generasi muda Pasuruan berinisiatif mengembangkan "Smart Packaging" dengan QR Code AI untuk Jamu Kebonagung UMKM lokal. Ditinjau dari pendekatan Culturally Responsive Teaching (CRT), tindakan yang PALING tepat mencerminkan pelestarian budaya yang adil dan bermakna adalah...',
    options: [
      { label: 'A', text: 'Mengganti resep asli Jamu Kebonagung dengan sirup perisa buatan impor asal Korea agar lebih viral di media sosial.' },
      { label: 'B', text: 'Menghubungkan kode QR pada botol jamu ke laman interaktif yang menampilkan transparansi uji lab sains (kandungan antioksidan) sekaligus menarasikan sejarah dedikasi perajin sepuh Kebonagung.' },
      { label: 'C', text: 'Mematenkan resep Jamu Kebonagung atas nama pribadi siswa dan melarang perajin lokal memproduksinya kembali.' },
      { label: 'D', text: 'Membuat kemasan tanpa mencantumkan nama daerah Pasuruan karena dianggap kurang bergengsi dibandingkan produk luar negeri.' }
    ],
    correctAnswer: 'B',
    scientificExplanation: 'Pilihan B mengintegrasikan kemajuan teknologi informasi dan validasi bioteknologi sains secara etis tanpa mencabut akar budaya aslinya. Kode QR menjadi jembatan transparansi nutrisi (literasi sains) sekaligus media pengakuan martabat perajin lokal (social justice & cultural preservation), ciri utama pembelajaran CRT.',
    culturalReflection: 'Melestarikan warisan leluhur bukan berarti menjadikannya barang museum yang membosankan, melainkan menghidupkannya dengan teknologi masa kini agar perajin UMKM Kebonagung naik kelas dan generasi penerus bangga dengan identitas kedaerahannya.'
  }
];

export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'meaningful',
    name: '1. Meaningful (Bermakna & Berakar Budaya)',
    description: 'Menilai kedalaman integrasi nilai kearifan lokal etnosains Jamu Kebonagung Pasuruan dan pemahaman sains bioteknologi.',
    descriptors: [
      {
        score: 4,
        title: 'Sangat Bermakna (Mendalam)',
        description: 'Menunjukkan pemahaman utuh tentang sejarah perajin Kebonagung, mampu merekonstruksi pengetahuan asli menjadi konsep sains modern (pH, Brix, bio-preservasi) dengan argumen ilmiah yang solid dan empati budaya yang tinggi.'
      },
      {
        score: 3,
        title: 'Bermakna (Baik)',
        description: 'Mampu menghubungkan resep Jamu Kebonagung dengan konsep bioteknologi pangan dengan baik, menghargai budaya lokal meski analisis ilmiahnya masih bersifat umum.'
      },
      {
        score: 2,
        title: 'Cukup Bermakna',
        description: 'Hanya menyebutkan resep jamu tanpa mampu mengaitkan dengan prinsip biokimia pengawetan alami atau kearifan lokal secara spesifik.'
      },
      {
        score: 1,
        title: 'Kurang Bermakna',
        description: 'Mengabaikan konteks budaya lokal Pasuruan dan memandang jamu hanya sebagai minuman biasa tanpa nilai etnosains.'
      }
    ]
  },
  {
    id: 'creative',
    name: '2. Creative (Inovatif Berbantuan AI)',
    description: 'Menilai kebaruan ide formulasi produk (sirup/serbuk higienis), kecakapan prompt engineering, dan desain label kemasan Smart QR.',
    descriptors: [
      {
        score: 4,
        title: 'Sangat Kreatif (Unggul)',
        description: 'Memformulasikan ide produk jamu yang segar bagi Gen Z (misal: jamu konsentrat pasteurisasi / sachet higienis), menggunakan prompt AI terstruktur dan iteratif, serta mendesain label Smart QR yang futuristik dan artistik.'
      },
      {
        score: 3,
        title: 'Kreatif (Baik)',
        description: 'Menghasilkan prototipe kemasan baru dan memanfaatkan prompt AI dasar untuk menghasilkan teks label informasi sains yang menarik.'
      },
      {
        score: 2,
        title: 'Cukup Kreatif',
        description: 'Kemasan dan rekayasa produk cenderung meniru produk yang sudah ada, eksplorasi prompt AI masih sangat minim (hanya sekali tanya).'
      },
      {
        score: 1,
        title: 'Kurang Kreatif',
        description: 'Tidak ada unsur inovasi pada produk maupun kemasan, tidak menggunakan AI untuk eksplorasi ide baru.'
      }
    ]
  },
  {
    id: 'impactful',
    name: '3. Impactful (Berdampak bagi UMKM Pasuruan)',
    description: 'Menilai seberapa aplikatif solusi yang dihasilkan bagi perajin Jamu Kebonagung dan kontribusi nyata siswa bagi komunitas lokal.',
    descriptors: [
      {
        score: 4,
        title: 'Sangat Berdampak (Aplikatif Nyata)',
        description: 'Solusi masa simpan terbukti dapat diterapkan oleh perajin UMKM Kebonagung dengan biaya terjangkau, artefak kemasan siap pakai diserahkan kepada perajin, dan menginspirasi teman sebaya untuk mengonsumsi jamu.'
      },
      {
        score: 3,
        title: 'Berdampak (Aplikatif)',
        description: 'Solusi berpotensi diterapkan perajin lokal dan memberikan alternatif kemasan yang meningkatkan daya tarik penjualan jamu di lingkungan sekolah.'
      },
      {
        score: 2,
        title: 'Cukup Berdampak',
        description: 'Solusi terlalu rumit atau terlalu mahal untuk diterapkan oleh perajin tradisional, dampak terbatas pada pemenuhan tugas kelas semata.'
      },
      {
        score: 1,
        title: 'Kurang Berdampak',
        description: 'Tidak memberikan manfaat apa pun bagi UMKM perajin lokal maupun kesadaran pangan sehat di lingkungan sekitar.'
      }
    ]
  }
];

export const SPICE_COMPOUNDS: SpiceCompound[] = [
  {
    id: 'cengkeh',
    indonesianName: 'Cengkeh',
    pasuruanLocalName: 'Cengkeh Kebonagung',
    latinName: 'Syzygium aromaticum',
    pubChemCid: 3314,
    mainCompound: 'Eugenol (4-Allyl-2-methoxyphenol)',
    chemicalFormula: 'C10H12O2',
    molecularWeight: '164.20 g/mol',
    canonicalSmiles: 'COC1=C(C=CC(=C1)CC=C)O',
    bioactivityRole: 'Antimikroba spektrum luas, antioksidan penangkap radikal bebas kuat, dan agen perusak membran lipid mikroba.',
    antimicrobialMechanism: 'Gugus hidroksil fenolik pada eugenol berikatan dengan protein membran sel bakteri, menyebabkan kebocoran ion intraseluler dan lisis seluler bakteri pembusuk.',
    traditionalPreparationInKebonagung: 'Ditumbuk kasar setengah hancur bersama kayu manis, direbus perlahan agar minyak atsiri menyatu sempurna dengan larutan gula.',
    modernScienceEquivalence: 'Ekstraksi maserasi hidrotermal senyawa volatil fenolat pada suhu stabil 70-80°C.',
    optimalExtractionTemp: '75°C - 85°C'
  },
  {
    id: 'kayu-manis',
    indonesianName: 'Kayu Manis',
    pasuruanLocalName: 'Kayu Manis Jangan',
    latinName: 'Cinnamomum burmannii',
    pubChemCid: 637511,
    mainCompound: 'Sinamaldehid (trans-Cinnamaldehyde)',
    chemicalFormula: 'C9H8O',
    molecularWeight: '132.16 g/mol',
    canonicalSmiles: 'C1=CC=C(C=C1)C=CC=O',
    bioactivityRole: 'Antibakteri alami, anti-inflamasi, pereduksi gula darah, dan pemberi aroma manis pedas aromatik.',
    antimicrobialMechanism: 'Menghambat pembelahan sel bakteri melalui interaksi dengan protein sitoskeleton FtsZ bakteri, menghambat sintesis ATP sel.',
    traditionalPreparationInKebonagung: 'Kulit batang kering diikat rapi dan direbus berulang dalam kuali gerabah sebagai penyeimbang rasa pedas cabe jamu.',
    modernScienceEquivalence: 'Inkorporasi zat pengawet alami lipofilik yang menembus lapisan peptidoglikan dinding sel bakteri Gram-positif.',
    optimalExtractionTemp: '80°C'
  },
  {
    id: 'cabe-jamu',
    indonesianName: 'Cabe Jamu / Cabe Jawa',
    pasuruanLocalName: 'Cabe Puyang / Cabe Alas Pasuruan',
    latinName: 'Piper retrofractum Vahl',
    pubChemCid: 638024,
    mainCompound: 'Piperin (Piperine)',
    chemicalFormula: 'C17H19NO3',
    molecularWeight: '285.34 g/mol',
    canonicalSmiles: 'C1CCN(CC1)C(=O)/C=C/C=C/C2=CC3=C(C=C2)OCO3',
    bioactivityRole: 'Bioenhancer (meningkatkan penyerapan nutrisi), termogenik pemacu sirkulasi darah, dan fungistatik alami.',
    antimicrobialMechanism: 'Mengganggu permeabilitas membran mitokondria kapang dan menginhibisi efflux pump bakteri patogen.',
    traditionalPreparationInKebonagung: 'Buah cabe jamu kering dipanggang sangrai sejenak di atas wajan tanah sebelum digiling halus untuk mengeluarkan minyak pedasnya.',
    modernScienceEquivalence: 'Perlakuan pra-pemanasan (mild roasting) untuk memecah dinding sel selulosa tanaman sehingga piperin terekstraksi lebih efisien.',
    optimalExtractionTemp: '70°C - 80°C'
  },
  {
    id: 'kapulaga',
    indonesianName: 'Kapulaga Jawa',
    pasuruanLocalName: 'Kapulogo Pasuruan',
    latinName: 'Amomum compactum',
    pubChemCid: 2758,
    mainCompound: '1,8-Sineol (Eucalyptol) & Terpinil Asetat',
    chemicalFormula: 'C10H18O',
    molecularWeight: '154.25 g/mol',
    canonicalSmiles: 'CC1(C2CCC(O1)(CC2)C)C',
    bioactivityRole: 'Ekspektoran saluran pernapasan, karminatif (peluruh masuk angin), dan antimikroba udara pernapasan.',
    antimicrobialMechanism: 'Senyawa terpenoid mengacaukan struktur lipid bilayer membran sitoplasma bakteri Gram-negatif.',
    traditionalPreparationInKebonagung: 'Polong kapulaga digeprek hingga biji hitam di dalamnya merekah sebelum dicelupkan ke air panas.',
    modernScienceEquivalence: 'Mekanikal crushing untuk membebaskan kelenjar minyak esensial esensial di endosperma biji.',
    optimalExtractionTemp: '65°C - 75°C'
  },
  {
    id: 'sereh',
    indonesianName: 'Serai Wangi',
    pasuruanLocalName: 'Sereh Dapur',
    latinName: 'Cymbopogon citratus',
    pubChemCid: 8842,
    mainCompound: 'Sitronelal (Citronellal) & Geraniol',
    chemicalFormula: 'C10H18O',
    molecularWeight: '154.25 g/mol',
    canonicalSmiles: 'CC(CCC=C(C)C)CC=O',
    bioactivityRole: 'Antioksidan alami, relaksasi saraf pencernaan, penolak serangga, dan deodorizer alami aroma amis.',
    antimicrobialMechanism: 'Merusak integritas selubung sel bakteri pembusuk dan mengikat ion logam kofaktor enzim bakteri.',
    traditionalPreparationInKebonagung: 'Batang sereh bagian putih dimemarkan ujungnya dan disimpul, dimasukkan di menit-menit akhir perebusan.',
    modernScienceEquivalence: 'Infus fraksinasi termal terkontrol untuk mencegah volatilisasi monoterpen yang sensitif terhadap panas tinggi.',
    optimalExtractionTemp: '65°C - 70°C'
  },
  {
    id: 'gula-aren',
    indonesianName: 'Gula Aren Pasuruan',
    pasuruanLocalName: 'Gula Merah Grati',
    latinName: 'Arenga pinnata saccharum',
    pubChemCid: 5988,
    mainCompound: 'Sukrosa alami & Senyawa Polifenol Karamelisasi',
    chemicalFormula: 'C12H22O11',
    molecularWeight: '342.30 g/mol',
    canonicalSmiles: 'C(C1C(C(C(C(O1)OC2(C(C(C(O2)CO)O)O)CO)O)O)O)O',
    bioactivityRole: 'Sumber energi, penstabil rasa pahit pedas rempah, dan agen biopreservasi osmotik (penurun water activity / aw).',
    antimicrobialMechanism: 'Menciptakan lingkungan hipertonik ekstrim yang menarik air dari dalam mikroba, memicu plasmolisis dan penghentian replikasi bakteri.',
    traditionalPreparationInKebonagung: 'Gula aren balok diiris tipis-tipis, dilarutkan hingga mendidih dan disaring melalui kain mori putih untuk membuang kotoran nira.',
    modernScienceEquivalence: 'Filtrasi fisik dan pembentukan larutan jenuh berderajat Brix 20-25° sebagai pengawet alami ramah tubuh.',
    optimalExtractionTemp: '85°C'
  }
];

export const PASURUAN_SPICE_LOCATIONS: SpiceLocationNode[] = [
  {
    id: 'kebonagung',
    name: 'Sentra Jamu Kebonagung (Episentrum Etnosains)',
    district: 'Kel. Kebonagung, Kec. Purworejo, Kota Pasuruan',
    altitudeMdpl: '10 mdpl (Dataran Rendah Pesisir)',
    zoneType: 'Sentra Jamu',
    primaryCrop: 'Pusat Formulasi & Ekstraksi Jamu Kebonagung',
    latinName: 'Sentra Komposit Etnomedisin Pasuruan',
    plantFamily: 'Integrasi Multi-Familia (Zingiberaceae, Myrtaceae, Piperaceae, Lauraceae, Arecaceae)',
    plantPartUsed: 'Peracikan Terpadu: Biji, Kulit Batang, Kuncup Bunga, Bulir Buah, Rimpang, & Nira Gula Aren',
    botanicalFeatures: {
      stemLeaf: 'Sentra pengolahan dan integrasi organ tumbuhan aromatik dari dataran tinggi Bromo dan pesisir Selat Madura.',
      flowerFruit: 'Tempat bertemunya simplisia kering bermutu tinggi: kuncup bunga cengkeh (*flos*), buah cabe jamu (*fructus*), dan polong kapulaga (*semen*).',
      activeGland: 'Laboratorium tradisional ekstraksi maserasi zat metabolit sekunder minyak atsiri dan polifenol.'
    },
    soilAndClimate: 'Klimatologi pesisir tropis hangat (27°C - 33°C), kelembaban 70-80%, rentan memicu spora jamur bila higienitas pengemasan tidak terkontrol.',
    roleInKebonagung: 'Pusat peradaban jamu pusaka Pasuruan tempat bertemunya resep rahasia leluhur para abdi dalem dan perajin rakyat sejak era kolonial Belanda.',
    ethnoscienceWisdom: 'Tradisi "Ngulek & Nggodhog Suwuk": penumbukan rempah dengan cobek batu andesit lokal untuk memecah kelenjar minyak tanpa gesekan panas berlebih.',
    mapCoords: { x: 50, y: 36 },
    badgeColor: 'amber',
    geoCoordinates: {
      lat: -7.6482,
      lng: 112.9068,
      mapQuery: 'Kebonagung, Purworejo, Pasuruan City, East Java',
      placeLabel: 'Sentra Jamu Kebonagung, Kec. Purworejo, Kota Pasuruan'
    }
  },
  {
    id: 'tosari-puspo',
    name: 'Lereng Gunung Bromo (Tosari & Puspo)',
    district: 'Kecamatan Tosari & Puspo, Kabupaten Pasuruan',
    altitudeMdpl: '1.200 - 1.850 mdpl (Pegunungan Tinggi)',
    zoneType: 'Dataran Tinggi',
    primaryCrop: 'Kapulaga Jawa & Kayu Manis Pegunungan',
    latinName: 'Amomum compactum & Cinnamomum burmannii',
    plantFamily: 'Zingiberaceae (Temu-temuan) & Lauraceae (Medang-medangan)',
    plantPartUsed: 'Biji Arilus Beraroma (*Semen*) & Kulit Batang Dalam (*Cortex*)',
    botanicalFeatures: {
      stemLeaf: 'Kapulaga berbatang semu lunak basah setinggi 1,5 - 2,5 m dengan helaian daun lanset berseling. Kayu manis berupa pohon berkambium dengan daun muda berwarna merah pucuk.',
      flowerFruit: 'Bunga kapulaga muncul dari rimpang dekat permukaan tanah, menghasilkan buah kotak beruang tiga berisi 14-18 biji hitam beraroma sineol semerbak.',
      activeGland: 'Sel-sel minyak eteris di parenkim kulit kayu dan kantung kelenjar perisperm biji yang kaya 1,8-sineol dan sinamaldehid.'
    },
    soilAndClimate: 'Tanah Andosol vulkanik hitam kaya abu erupsi Gunung Bromo, suhu sejuk 12°C - 20°C, curah hujan tinggi yang memicu akumulasi monoterpenoid bernilai tinggi.',
    roleInKebonagung: 'Penyuplai aroma wangi segar "mentholated" pembebas pernapasan dan rasa manis aromatik yang meredam getir cabe jamu.',
    ethnoscienceWisdom: 'Petani Tengger dan Puspo memanen kapulaga saat fajar sebelum embun menguap, agar kantung minyak di dalam biji tetap padat dan tidak teroksidasi matahari.',
    mapCoords: { x: 44, y: 82 },
    badgeColor: 'emerald',
    geoCoordinates: {
      lat: -7.8824,
      lng: 112.9157,
      mapQuery: 'Tosari, Pasuruan Regency, East Java',
      placeLabel: 'Kawasan Perkebunan Kapulaga & Kayu Manis Lereng Bromo, Tosari'
    }
  },
  {
    id: 'tutur-prigen',
    name: 'Lereng Arjuno-Welirang (Tutur & Prigen)',
    district: 'Kecamatan Tutur & Prigen, Kabupaten Pasuruan',
    altitudeMdpl: '700 - 1.150 mdpl (Lereng Vulkanik Barat)',
    zoneType: 'Dataran Tinggi',
    primaryCrop: 'Cengkeh Aromatik & Serai Wangi',
    latinName: 'Syzygium aromaticum & Cymbopogon citratus',
    plantFamily: 'Myrtaceae (Jambu-jambuan) & Poaceae (Rumput-rumputan)',
    plantPartUsed: 'Kuncup Bunga Majemuk Kering (*Flos*) & Pangkal Pelepah Batang (*Caulis*)',
    botanicalFeatures: {
      stemLeaf: 'Cengkeh berupa pohon berkayu keras selalu hijau piramidal. Serai berupa rumput rumpun lebat menahun dengan pelepah daun melengkung berlilin tebal.',
      flowerFruit: 'Kuncup bunga cengkeh dipetik sebelum mekar saat warna hijau kekuningan beralih ke semburat merah muda; kaya kelenjar skizogen.',
      activeGland: 'Kelenjar minyak berbentuk kantung bundar di dasar bunga cengkeh menyimpan Eugenol hingga 80-90% bobot minyak atsiri.'
    },
    soilAndClimate: 'Tanah Latosol cokelat kemerahan berpori remah dengan drainase air gravitasi prima di lereng gunung api aktif Welirang.',
    roleInKebonagung: 'Benteng pertahanan utama bio-preservasi: eugenol cengkeh bertindak sebagai antimikroba alami nomor satu yang merusak sel bakteri pembusuk.',
    ethnoscienceWisdom: 'Pengeringan kuncup cengkeh di atas anyaman bambu di bawah sinar matahari pagi Pasuruan menghasilkan kadar air stabil <12% tanpa menghilangkan minyak terbangnya.',
    mapCoords: { x: 22, y: 64 },
    badgeColor: 'purple',
    geoCoordinates: {
      lat: -7.7011,
      lng: 112.6358,
      mapQuery: 'Prigen, Pasuruan Regency, East Java',
      placeLabel: 'Sentra Cengkeh & Serai Wangi Lereng Welirang-Arjuno, Prigen & Tutur'
    }
  },
  {
    id: 'kraton-pohjentrek',
    name: 'Dataran Rendah Pantai (Kraton & Pohjentrek)',
    district: 'Kecamatan Kraton & Pohjentrek, Pasuruan Pesisir Barat',
    altitudeMdpl: '8 - 25 mdpl (Dataran Rendah Tropis)',
    zoneType: 'Dataran Rendah',
    primaryCrop: 'Cabe Jamu / Cabe Jawa Pasuruan',
    latinName: 'Piper retrofractum Vahl',
    plantFamily: 'Piperaceae (Sirih-sirihan)',
    plantPartUsed: 'Bulir Buah Majemuk Kering (*Fructus*)',
    botanicalFeatures: {
      stemLeaf: 'Tumbuhan liana merambat dengan sulur dan akar pelekat (*radix adligans*) pada pohon pelindung seperti kelor atau dadap; daun lonjong tebal mengkilap.',
      flowerFruit: 'Perbungaan berupa bulir silindris tegak; buah buni majemuk rapat berwarna merah terang saat matang dan menghitam keriput saat kering.',
      activeGland: 'Sel parenkim perisperm biji sarat kristal alkaloid piperin dan resin pedas piperidin.'
    },
    soilAndClimate: 'Tanah Aluvial pasir liat pesisir pantai dengan intensitas radiasi matahari terik 30°C - 34°C, sangat ideal untuk pematangan rasa pedas piperin.',
    roleInKebonagung: 'Pemberi sensasi panas-getir yang merangsang kelenjar keringat (termogenesis) dan melancarkan sirkulasi pembuluh darah saat angin dingin berhembus.',
    ethnoscienceWisdom: 'Tradisi menyangrai cabe jamu di atas kuali gerabah abu panas sebelum digiling: mematangkan piperin dan membasmi spora kapang bawaan panen.',
    mapCoords: { x: 32, y: 34 },
    badgeColor: 'rose',
    geoCoordinates: {
      lat: -7.6495,
      lng: 112.8712,
      mapQuery: 'Kraton, Pasuruan Regency, East Java',
      placeLabel: 'Sentra Budidaya Cabe Jamu / Cabe Jawa Pasuruan, Kraton'
    }
  },
  {
    id: 'grati-winongan',
    name: 'Cekungan Danau Ranu Grati & Winongan',
    district: 'Kecamatan Grati & Winongan, Pasuruan Timur',
    altitudeMdpl: '40 - 110 mdpl (Cekungan Mata Air & Danau)',
    zoneType: 'Perkebunan Aren',
    primaryCrop: 'Pohon Enau / Gula Aren Grati Murni',
    latinName: 'Arenga pinnata (Wurmb) Merr.',
    plantFamily: 'Arecaceae (Palem-paleman)',
    plantPartUsed: 'Nira Mayang Bunga Jantan (*Inflorescentia Masculina*)',
    botanicalFeatures: {
      stemLeaf: 'Pohon palma monopodial kokoh setinggi 12 - 20 m berbalut ijuk hitam pekat berduri; daun menyirip raksasa mencapai panjang 6 meter.',
      flowerFruit: 'Mayang bunga menggantung besar; tongkol bunga jantan yang belum mekar disadap dengan sayatan miring presisi untuk mengalirkan getah nira manis.',
      activeGland: 'Jaringan floem vaskular nira mengalirkan sukrosa murni 14-16% brix, polifenol pelindung, kalium, dan asam amino alami.'
    },
    soilAndClimate: 'Tanah vulkanik lembab dengan ketersediaan air tanah melimpah dari resapan mata air Umbulan dan cekungan kaldera Danau Ranu Grati.',
    roleInKebonagung: 'Pilar osmotik bio-preservasi: pemasakan nira menjadi gula aren Grati kental berderajat Brix 20°-24° menarik air bebas ($a_w$) sehingga bakteri pembusuk lumpuh.',
    ethnoscienceWisdom: 'Pemasakan nira dengan kayu bakar pohon asam dan pengadukan searah jarum jam menghasilkan karamelisasi wangi tanpa rasa gosong pahit.',
    mapCoords: { x: 74, y: 46 },
    badgeColor: 'amber',
    geoCoordinates: {
      lat: -7.7128,
      lng: 113.0114,
      mapQuery: 'Danau Ranu Grati, Pasuruan, East Java',
      placeLabel: 'Perkebunan Pohon Aren & Danau Ranu Grati, Kec. Grati & Winongan'
    }
  },
  {
    id: 'pelabuhan-pasuruan',
    name: 'Pelabuhan Bersejarah Tanjung Tembikar Pasuruan',
    district: 'Kecamatan Panggungrejo, Muara Sungai Gembong, Selat Madura',
    altitudeMdpl: '1 - 4 mdpl (Garis Pantai Pasang Surut)',
    zoneType: 'Pesisir / Sejarah',
    primaryCrop: 'Gerbang Jalur Rempah Maritim & Akulturasi Budaya Jamu',
    latinName: 'Situs Akulturasi Maritim Jawa-Tionghoa-Arab Pasuruan',
    plantFamily: 'Pusat Perdagangan Simplisia Lintas Samudra',
    plantPartUsed: 'Distribusi Logistik Kapulaga, Cengkeh Maluku, & Kayu Manis Jawa',
    botanicalFeatures: {
      stemLeaf: 'Dermaga muara sungai tempat kapal-kapal pinisi bersandar membawa rempah dari kepulauan timur Nusantara.',
      flowerFruit: 'Gudang-gudang rempah kuno di tepi Sungai Gembong tempat aklimatisasi dan sortasi rempah kering sebelum masuk ke pasar Kebonagung.',
      activeGland: 'Titik perpaduan ramuan: rempah eksotis pulau seberang menyatu dengan tanaman obat pekarangan Jawa (lempuyang, cabe jamu).'
    },
    soilAndClimate: 'Pesisir pantai berlumpur dengan hembusan angin laut kaya partikel garam alami dan angin darat lembah (Angin Gending khas Pasuruan).',
    roleInKebonagung: 'Akar sejarah mengapa Jamu Kebonagung lahir di Pasuruan: pelabuhan ini adalah salah satu pelabuhan rempah dan gula terbesar di Hindia Timur abad ke-18 dan 19.',
    ethnoscienceWisdom: 'Minuman para kuli pelabuhan dan nahkoda kapal pinisi untuk memulihkan stamina setelah berlayar menembus badai laut Jawa.',
    mapCoords: { x: 54, y: 16 },
    badgeColor: 'cyan',
    geoCoordinates: {
      lat: -7.6275,
      lng: 112.9122,
      mapQuery: 'Pelabuhan Pasuruan, Panggungrejo, Pasuruan City, East Java',
      placeLabel: 'Pelabuhan Kuno Tanjung Tembikar & Muara S. Gembong, Panggungrejo'
    }
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'badge-modul-1',
    moduleId: 'modul-1',
    title: 'Saksi Dilema Kebonagung',
    crtHonoraryTitle: 'Pengamat Kritis Budaya Pasuruan',
    category: 'CRT Budaya',
    iconName: 'Video',
    description: 'Menyelesaikan telaah Video Pemantik dan memahami kontras antara cita rasa Jamu Kebonagung serta batas masa simpan 1-2 hari.',
    culturalSignificance: 'Membuka kesadaran bahwa kearifan lokal jamu terancam punah jika generasi muda tidak turun tangan memberikan solusi ilmiah.',
    points: 100,
    isUnlocked: false
  },
  {
    id: 'badge-modul-2',
    moduleId: 'modul-2',
    title: 'Arsitek Proyek POPBL-CRT',
    crtHonoraryTitle: 'Peneliti Muda Etnomedisin',
    category: 'Bioteknologi',
    iconName: 'Layers',
    description: 'Menuntaskan seluruh 5 tahapan investigasi masalah jamu (Orientasi, Etnosains, AI, Artefak, hingga Dampak Komunitas).',
    culturalSignificance: 'Membuktikan bahwa metode ilmiah modern berpijak kokoh pada tradisi para empu peracik jamu di Kebonagung.',
    points: 150,
    isUnlocked: false
  },
  {
    id: 'badge-modul-3',
    moduleId: 'modul-3',
    title: 'Master Prompter AI Biotek',
    crtHonoraryTitle: 'Inovator AI Berbudaya',
    category: 'Inovasi AI',
    iconName: 'Terminal',
    description: 'Berhasil mengoperasikan prompt Generative AI untuk menyimulasikan masa simpan jamu dan copywriting kemasan lokal.',
    culturalSignificance: 'Menjadikan AI sebagai jembatan masa depan bagi UMKM lokal, bukan sekadar alat otomatisasi tanpa ruh budaya.',
    points: 100,
    isUnlocked: false
  },
  {
    id: 'badge-modul-4',
    moduleId: 'modul-4',
    title: 'Cendekia Etnosains Pasuruan',
    crtHonoraryTitle: 'Pakar Sains Jamu Tradisional',
    category: 'Bioteknologi',
    iconName: 'CheckCircle2',
    description: 'Menuntaskan 5 soal kuis interaktif dengan penalaran bio-preservasi dan refleksi budaya akurat.',
    culturalSignificance: 'Membuktikan pemahaman konsep fenolik, eugenol, dan osmosis gula aren tanpa melupakan akar tradisi.',
    points: 150,
    isUnlocked: false
  },
  {
    id: 'badge-modul-5',
    moduleId: 'modul-5',
    title: 'Evaluator Berdampak UMKM',
    crtHonoraryTitle: 'Mitra Solutif Perajin Jamu',
    category: 'Dampak UMKM',
    iconName: 'Award',
    description: 'Melakukan penilaian karya proyek secara komprehensif berlandaskan pilar Meaningful, Creative, dan Impactful.',
    culturalSignificance: 'Menumbuhkan empati nyata pada nasib perajin jamu Kebonagung melalui karya yang aplikatif bagi masyarakat.',
    points: 100,
    isUnlocked: false
  },
  {
    id: 'badge-tur-3d',
    moduleId: 'tur-warung-3d',
    title: 'Penjelajah Warung 3D',
    crtHonoraryTitle: 'Arkeolog Virtual Kebonagung',
    category: 'Eksplorasi 3D',
    iconName: 'Store',
    description: 'Mengeksplorasi warisan kendi berpori evaporatif, lumpang kuningan, dan tungku tembaga perajin secara 3D.',
    culturalSignificance: 'Menghidupkan kembali suasana fisik warung jamu tempo dulu melalui teknologi interaktif mutakhir.',
    points: 120,
    isUnlocked: false
  },
  {
    id: 'badge-lab-ph',
    moduleId: 'lab-ph',
    title: 'Alkemis pH & Bio-Preservasi',
    crtHonoraryTitle: 'Ahli Biokimia Pangan Lokal',
    category: 'Bioteknologi',
    iconName: 'Droplet',
    description: 'Menemukan titik keseimbangan asam sitrat dan basa alami untuk memperpanjang kesegaran jamu tanpa merusak rasa.',
    culturalSignificance: 'Memadukan nalar biokimia modern dengan resep lempuyangan tradisional Pasuruan.',
    points: 120,
    isUnlocked: false
  },
  {
    id: 'badge-peta-rempah',
    moduleId: 'peta-rempah',
    title: 'Kartografer Rempah Bromo',
    crtHonoraryTitle: 'Duta Geospasial Rempah',
    category: 'CRT Budaya',
    iconName: 'MapPin',
    description: 'Menelusuri sebaran botani 6 rempah dari pesisir pelabuhan Tanjung Tembikar hingga lereng pegunungan Bromo.',
    culturalSignificance: 'Menyadarkan kekayaan megabiodiversitas tanah Pasuruan sebagai lumbung rempah bersejarah.',
    points: 100,
    isUnlocked: false
  },
  {
    id: 'badge-smart-qr',
    moduleId: 'smart-qr',
    title: 'Desainer Smart QR Packaging',
    crtHonoraryTitle: 'Pionir Hilirisasi Produk Budaya',
    category: 'Dampak UMKM',
    iconName: 'QrCode',
    description: 'Merancang label kemasan higienis ber-QR Code untuk memodernisasi pemasaran Jamu Kebonagung.',
    culturalSignificance: 'Memberikan nilai tambah nyata bagi UMKM jamu agar mampu bersaing dengan industri minuman global.',
    points: 150,
    isUnlocked: false
  }
];

