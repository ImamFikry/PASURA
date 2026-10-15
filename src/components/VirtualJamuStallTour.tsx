import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { 
  Sparkles, 
  RotateCcw, 
  Eye, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Layers, 
  Info, 
  X, 
  ChevronUp, 
  ChevronDown, 
  HelpCircle, 
  Compass, 
  BookOpen, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  Award
} from 'lucide-react';

interface HotspotDetail {
  id: string;
  title: string;
  localName: string;
  category: 'Ekstraksi' | 'Preservasi' | 'Senyawa Rempah' | 'Fisika Etnosains' | 'Budaya';
  position: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPos: [number, number, number];
  description: string;
  bioScienceInsight: string;
  culturalWisdom: string;
  studentInquiryQuestion: string;
  relevantCompounds: string[];
}

const HOTSPOTS: HotspotDetail[] = [
  {
    id: 'botol-jamu',
    title: 'Botol Kaca Jamu Kebonagung & Formulasi Preservasi',
    localName: 'Botolan Jamu Kebonagung Khas Pasuruan',
    category: 'Preservasi',
    position: [0.65, 1.45, 0.2],
    cameraTarget: [0.65, 1.35, 0.2],
    cameraPos: [0.9, 1.6, 1.1],
    description: 'Botol kaca bening tebal bersegel gabus alami, wadah utama penyajian jamu segar kebonagung. Memperlihatkan warna cokelat keemasan khas perpaduan karamel gula aren dan rebusan rempah aromatik.',
    bioScienceInsight: 'Kaca bersifat inert (tidak reaktif terhadap asam lemah jamu pH 4.5–5.5). Tantangan bioteknologi: jamu tanpa pengawet sintesis hanya bertahan 24-48 jam pada suhu ruang karena kontaminasi khamir dan bakteri asam laktat liar.',
    culturalWisdom: 'Perajin Kebonagung secara turun-temurun merebus botol dalam air mendidih (teknik sanitasi termal tradisional) sebelum dituangi jamu hangat.',
    studentInquiryQuestion: 'Bagaimana kombinasi teknik pasteurisasi termal kilat (HTST) dan penurunan aktivitas air (Aw) dapat memperpanjang masa simpan jamu ini tanpa merusak warna dan rasa aslinya?',
    relevantCompounds: ['Eugenol', 'Sinamaldehid', 'Flavonoid']
  },
  {
    id: 'tampah-rempah',
    title: 'Tampah 6 Rempah Bioaktif Kebonagung',
    localName: 'Tampah Anyaman Bambu Racikan Lempuyangan',
    category: 'Senyawa Rempah',
    position: [-0.65, 1.38, 0.25],
    cameraTarget: [-0.65, 1.35, 0.25],
    cameraPos: [-0.65, 1.85, 0.95],
    description: 'Anyaman bambu bundar berisi kluster 6 bahan baku utama Jamu Kebonagung: Kapulaga, Cabe Jamu, Kayu Manis, Cengkeh, Sereh Wangi, dan Gula Aren Pasuruan.',
    bioScienceInsight: 'Setiap rempah menyumbangkan senyawa fenolik dan minyak atsiri dengan aktivitas sinergis antibakteri spektrum luas yang merusak membran sel mikroba pembusuk.',
    culturalWisdom: 'Proporsi rempah disesuaikan dengan filosofi "Laras Rasa & Anget Tubuh" yang dirumuskan sejak era kolonial di pesisir pelabuhan Tanjung Tembikar Pasuruan.',
    studentInquiryQuestion: 'Mengapa perajin lebih memilih kombinasi cengkeh dan kayu manis daripada cengkeh saja jika ditinjau dari spektrum penghambatan gram-positif dan gram-negatif?',
    relevantCompounds: ['Eugenol', 'Piperin', 'Sinamaldehid', 'Sitronelal', '1,8-Sineol']
  },
  {
    id: 'cobek-lumpang',
    title: 'Cobek Batu & Lumpang Kuningan Penghalus',
    localName: 'Lumpang & Alu Kuningan Pemecah Biji',
    category: 'Ekstraksi',
    position: [-0.05, 1.38, 0.35],
    cameraTarget: [-0.05, 1.35, 0.35],
    cameraPos: [-0.05, 1.7, 1.15],
    description: 'Alat penumbuk tradisional dari kuningan dan batu andesit pegunungan Pasuruan. Digunakan untuk memecah kapsul biji kapulaga dan menggeprek sereh serta cabe jamu sebelum diseduh.',
    bioScienceInsight: 'Maserasi dan pengecilan ukuran partikel mekanis meningkatkan luas permukaan kontak (surface area to volume ratio), mempercepat laju difusi senyawa bioaktif larut-air ke dalam pelarut.',
    culturalWisdom: 'Biji kapulaga hanya dipecahkan kulit luarnya (geprek retak) bukan digiling halus menjadi bubuk agar filtrat jamu tetap jernih dan minyak atsiri tidak menguap berlebihan.',
    studentInquiryQuestion: 'Bagaimana laju ekstraksi senyawa terpenoid dipengaruhi oleh derajat kehalusan rempah pada suhu perebusan 80°C?',
    relevantCompounds: ['1,8-Sineol', 'Alfa-Terpinil Asetat']
  },
  {
    id: 'kendi-tanah',
    title: 'Kendi Tanah Liat Pendingin Porous',
    localName: 'Kendi Grabah Dingin Alami',
    category: 'Fisika Etnosains',
    position: [0.95, 1.25, -0.15],
    cameraTarget: [0.95, 1.25, -0.15],
    cameraPos: [1.3, 1.5, 0.6],
    description: 'Wadah tembikar terakota berpori mikro yang dimanfaatkan perajin kuno untuk menyimpan sari jamu setelah disaring tanpa bantuan lemari pendingin listrik.',
    bioScienceInsight: 'Prinsip pendinginan evaporatif (evaporative cooling): penguapan molekul air melalui pori-pori tanah liat menyerap kalor laten dari dalam kendi, menurunkan suhu jamu 3–5°C di bawah suhu kamar.',
    culturalWisdom: 'Kendi dianggap memberikan energi "adem" yang menyeimbangkan sifat rempah yang pedas-hangat, sekaligus menjaga kestabilan antioksidan jamu.',
    studentInquiryQuestion: 'Ditinjau dari termodinamika dan laju pertumbuhan bakteri Mesofil, mengapa penurunan suhu beberapa derajat dalam kendi dapat memperlambat fase log mikroba?',
    relevantCompounds: ['Senyawa Fenolik Termolabil']
  },
  {
    id: 'tungku-tembaga',
    title: 'Panci Tembaga & Tungku Pengaturan Suhu',
    localName: 'Kenceng / Dandang Tembaga Simmering',
    category: 'Ekstraksi',
    position: [-1.05, 1.35, -0.1],
    cameraTarget: [-1.05, 1.35, -0.1],
    cameraPos: [-1.2, 1.65, 0.75],
    description: 'Panci tembaga khas dengan api stabil. Perajin Kebonagung menerapkan aturan api kecil (simmering perlahan) dan pantang mendidih golak hebat.',
    bioScienceInsight: 'Tembaga memiliki konduktivitas termal tinggi (385 W/m·K) sehingga panas merata tanpa titik hangus lokal. Suhu 75–85°C optimal mengekstraksi polifenol tanpa merusak senyawa bioaktif yang termolabil.',
    culturalWisdom: 'Pepatah perajin: "Ojo digolakno banter, eman ambune mumbul nang awang-awang" (Jangan dididihkan terlalu keras, sayang aromanya terbang ke angkasa).',
    studentInquiryQuestion: 'Mengapa perebusan di atas 100°C menyebabkan denaturasi senyawa aroma dan menurunkan kapasitas antioksidan jamu hingga 40%?',
    relevantCompounds: ['Monoterpen', 'Sinamaldehid']
  },
  {
    id: 'atap-limasan',
    title: 'Arsitektur Kios Kayu Jati Tradisional Kebonagung',
    localName: 'Warung Kayu Jati Bernaung Limasan',
    category: 'Budaya',
    position: [0, 2.2, 0],
    cameraTarget: [0, 1.8, 0],
    cameraPos: [0, 2.4, 3.2],
    description: 'Bangunan kedai jamu khas Pasuruan yang dibangun dari balok kayu jati solid dengan atap sirap tradisional, anyaman gedek bambu, dan dekorasi sulur rempah pesisir.',
    bioScienceInsight: 'Sirkulasi udara alami atap panggung tinggi mempertahankan kelembaban ruangan rendah, memperpanjang masa simpan rempah kering yang digantung di langit-langit kios.',
    culturalWisdom: 'Warung jamu di Kebonagung bukan sekadar tempat jual beli, melainkan ruang temu dialog sosial warga dari berbagai generasi untuk menjaga kesehatan holistik.',
    studentInquiryQuestion: 'Bagaimana peran warung jamu fisik dan digital (AI QR Code) dapat bersinergi dalam melestarikan budaya etnosains di era industri modern?',
    relevantCompounds: ['Warisan Budaya Etnomedisin']
  }
];

// Helper to create procedural wood canvas texture
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base warm teak color
  ctx.fillStyle = '#6e3c1b';
  ctx.fillRect(0, 0, 512, 512);

  // Wood grain streaks
  for (let i = 0; i < 600; i++) {
    const y = Math.random() * 512;
    const h = 1 + Math.random() * 3;
    const alpha = 0.05 + Math.random() * 0.15;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(60, 28, 10, ${alpha})` : `rgba(145, 85, 40, ${alpha})`;
    ctx.fillRect(0, y, 512, h);
  }

  // Soft knots
  for (let k = 0; k < 4; k++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 512;
    const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 35);
    grad.addColorStop(0, 'rgba(40, 18, 6, 0.4)');
    grad.addColorStop(0.7, 'rgba(75, 38, 16, 0.15)');
    grad.addColorStop(1, 'rgba(110, 60, 27, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 25, 45, Math.PI / 12, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper to create woven bamboo texture
function createBambooTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#c89d58';
  ctx.fillRect(0, 0, 256, 256);

  const step = 16;
  for (let x = 0; x < 256; x += step) {
    for (let y = 0; y < 256; y += step) {
      const isAlt = ((x / step) + (y / step)) % 2 === 0;
      ctx.fillStyle = isAlt ? '#ba8c46' : '#dcb46e';
      ctx.fillRect(x, y, step, step);

      // Fine bamboo fiber line
      ctx.strokeStyle = isAlt ? 'rgba(80, 50, 18, 0.25)' : 'rgba(255, 235, 180, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (isAlt) {
        ctx.moveTo(x, y + step / 2);
        ctx.lineTo(x + step, y + step / 2);
      } else {
        ctx.moveTo(x + step / 2, y);
        ctx.lineTo(x + step / 2, y + step);
      }
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper to create decorative signboard texture
function createSignboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Dark wood plank base
  ctx.fillStyle = '#3a1f0d';
  ctx.fillRect(0, 0, 1024, 256);

  // Border gold
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, 1000, 232);
  ctx.strokeStyle = '#f3e5ab';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 984, 216);

  // Text
  ctx.fillStyle = '#fdf8e1';
  ctx.font = 'bold 54px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('WARUNG JAMU KEBONAGUNG', 512, 105);

  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('• SENTRA ETNOSAINS & BIO-PRESERVASI PASURUAN • SEJAK 1952 •', 512, 155);

  ctx.fillStyle = '#a8c599';
  ctx.font = 'italic 20px sans-serif';
  ctx.fillText('Kapulaga • Cabe Jamu • Kayu Manis • Cengkeh • Sereh • Gula Aren', 512, 200);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper to create bottle label texture
function createBottleLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Parchment base
  ctx.fillStyle = '#f5eedb';
  ctx.fillRect(0, 0, 512, 256);

  // Frame
  ctx.strokeStyle = '#8c531b';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 240);

  // Text
  ctx.fillStyle = '#3d2005';
  ctx.font = 'bold 36px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('KEBONAGUNG', 256, 65);

  ctx.fillStyle = '#7a4210';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('JAMU TRADISIONAL PASURUAN', 256, 100);

  ctx.fillStyle = '#22543d';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('• 100% Bioaktif Rempah Alami •', 256, 140);

  ctx.fillStyle = '#555';
  ctx.font = '14px monospace';
  ctx.fillText('Eugenol | Sinamaldehid | Piperin', 256, 175);
  ctx.fillText('Brix: 18° • pH: 4.8 • Netto: 250ml', 256, 210);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface VirtualJamuStallTourProps {
  onComplete?: () => void;
}

export const VirtualJamuStallTour: React.FC<VirtualJamuStallTourProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotDetail | null>(null);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<'siang' | 'senja'>('senja');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [hoveredHotspotId, setHoveredHotspotId] = useState<string | null>(null);
  const [cameraView, setCameraView] = useState<string>('panorama');

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 3.2));
  const targetCamLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.4, 0));
  const currentCamLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.4, 0));
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const lanternLightRef = useRef<THREE.PointLight | null>(null);
  const interactiveMeshesRef = useRef<THREE.Object3D[]>([]);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const audioOscNodesRef = useRef<OscillatorNode[]>([]);

  // Web Audio Procedural Gamelan/Acoustic Synthesizer (Zero External Audio Files)
  const toggleAudio = useCallback(() => {
    if (isAudioPlaying) {
      if (audioGainRef.current && audioCtxRef.current) {
        audioGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
        setTimeout(() => {
          audioOscNodesRef.current.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          audioOscNodesRef.current = [];
          if (audioCtxRef.current) {
            audioCtxRef.current.close();
            audioCtxRef.current = null;
          }
          setIsAudioPlaying(false);
        }, 300);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);
        audioGainRef.current = masterGain;

        // Pentatonic Slendro notes (Pasuruan / East Javanese tradition: Nem, Pin, Lu, Ro, Ji)
        const freqs = [220, 250, 280, 330, 375, 440];
        const oscs: OscillatorNode[] = [];

        // Gentle ambient hum
        const baseOsc = ctx.createOscillator();
        baseOsc.type = 'sine';
        baseOsc.frequency.setValueAtTime(110, ctx.currentTime);
        const baseGain = ctx.createGain();
        baseGain.gain.setValueAtTime(0.02, ctx.currentTime);
        baseOsc.connect(baseGain);
        baseGain.connect(masterGain);
        baseOsc.start();
        oscs.push(baseOsc);

        // Wind / air filter noise
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.015, ctx.currentTime);
        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(masterGain);
        whiteNoise.start();

        // Recurring tranquil bell interval
        let noteIndex = 0;
        const intervalId = window.setInterval(() => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
            clearInterval(intervalId);
            return;
          }
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'sine';
          const f = freqs[noteIndex % freqs.length];
          noteIndex++;
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          noteGain.gain.setValueAtTime(0.035, ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

          osc.connect(noteGain);
          noteGain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 3.0);
        }, 2200);

        audioOscNodesRef.current = oscs;
        setIsAudioPlaying(true);
      } catch (err) {
        console.error('Audio initialization error:', err);
      }
    }
  }, [isAudioPlaying]);

  // Handle switching camera view
  const switchCameraView = (viewKey: string) => {
    setCameraView(viewKey);
    if (viewKey === 'panorama') {
      targetCamPos.current.set(0, 1.8, 3.2);
      targetCamLookAt.current.set(0, 1.35, 0);
      setSelectedHotspot(null);
    } else {
      const found = HOTSPOTS.find(h => h.id === viewKey);
      if (found) {
        targetCamPos.current.set(...found.cameraPos);
        targetCamLookAt.current.set(...found.cameraTarget);
        setSelectedHotspot(found);
        if (onComplete) {
          onComplete();
        }
      }
    }
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 900;
    const height = mountRef.current.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x130e0a);
    scene.fog = new THREE.FogExp2(0x130e0a, 0.08);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 3.2);
    cameraRef.current = camera;

    // 3. Renderer with high PBR standards
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // 4. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Setup
    // Key Light (Warm Sunlight / Hearth glow)
    const dirLight = new THREE.DirectionalLight(0xffedd5, 2.2);
    dirLight.position.set(3, 4.5, 2.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 15;
    dirLight.shadow.camera.left = -3;
    dirLight.shadow.camera.right = 3;
    dirLight.shadow.camera.top = 3;
    dirLight.shadow.camera.bottom = -1;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Hemisphere Light (Warm Sky vs Cool Deep Ground)
    const hemiLight = new THREE.HemisphereLight(0xffd8a8, 0x1c140d, 1.1);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    // Interior Stall Lantern Light (Warm Amber)
    const lanternLight = new THREE.PointLight(0xff9422, 2.8, 4.5, 1.2);
    lanternLight.position.set(0, 2.1, 0.4);
    lanternLight.castShadow = true;
    lanternLight.shadow.bias = -0.002;
    scene.add(lanternLight);
    lanternLightRef.current = lanternLight;

    // Subtle blue rim light from behind for silhouette separation
    const rimLight = new THREE.DirectionalLight(0x7ea0c4, 0.6);
    rimLight.position.set(-2, 3, -3);
    scene.add(rimLight);

    // 6. Procedural Textures
    const woodTexture = createWoodTexture();
    const bambooTexture = createBambooTexture();
    const signboardTexture = createSignboardTexture();
    const bottleLabelTexture = createBottleLabelTexture();

    // Reusable Materials
    const teakWoodMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.65,
      metalness: 0.05,
    });

    const polishedWoodMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.35,
      metalness: 0.1,
    });

    const wovenBambooMaterial = new THREE.MeshStandardMaterial({
      map: bambooTexture,
      roughness: 0.85,
      metalness: 0.02,
    });

    const terracottaMaterial = new THREE.MeshStandardMaterial({
      color: 0x9c4826,
      roughness: 0.9,
      metalness: 0.02,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.28,
      metalness: 0.88,
    });

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: 0xb85d38,
      roughness: 0.35,
      metalness: 0.82,
    });

    // Glass Material with Physical Transmission
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.12,
      ior: 1.52,
      thickness: 0.4,
      depthWrite: false,
    });

    const jamuLiquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9e5210, // Rich amber herbal extract
      transmission: 0.6,
      roughness: 0.18,
      ior: 1.34,
      transparent: true,
      opacity: 0.92,
    });

    // Array to hold raycast targets
    const interactiveObjects: THREE.Object3D[] = [];

    // ==========================================
    // 7. BUILD PROCEDURAL WARUNG JAMU KEBONAGUNG
    // ==========================================

    // A. Cobblestone Floor Ground
    const groundGeo = new THREE.CylinderGeometry(4.5, 4.5, 0.2, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x241d18,
      roughness: 0.9,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050403,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.005;
    scene.add(contactShadow);

    // B. Stall Architecture (Teak Wood Posts & Joglo/Limasan Eaves)
    const stallGroup = new THREE.Group();
    scene.add(stallGroup);

    // 4 Main Pillars (Saka Guru)
    const pillarPositions: [number, number, number][] = [
      [-1.5, 1.25, -0.7],
      [1.5, 1.25, -0.7],
      [-1.5, 1.25, 0.7],
      [1.5, 1.25, 0.7],
    ];

    pillarPositions.forEach(pos => {
      // Stone Plinth (Umpak)
      const umpak = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.15, 0.24),
        new THREE.MeshStandardMaterial({ color: 0x47423d, roughness: 0.95 })
      );
      umpak.position.set(pos[0], 0.075, pos[2]);
      umpak.castShadow = true;
      umpak.receiveShadow = true;
      stallGroup.add(umpak);

      // Teak Pillar
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.085, 2.3, 12),
        teakWoodMaterial
      );
      pillar.position.set(pos[0], 1.25, pos[2]);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      stallGroup.add(pillar);
    });

    // Horizontal Beams (Balok Blandar)
    const beamFront = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 0.12), teakWoodMaterial);
    beamFront.position.set(0, 2.4, 0.7);
    beamFront.castShadow = true;
    stallGroup.add(beamFront);

    const beamBack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 0.12), teakWoodMaterial);
    beamBack.position.set(0, 2.4, -0.7);
    beamBack.castShadow = true;
    stallGroup.add(beamBack);

    const beamLeft = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 1.5), teakWoodMaterial);
    beamLeft.position.set(-1.5, 2.4, 0);
    stallGroup.add(beamLeft);

    const beamRight = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 1.5), teakWoodMaterial);
    beamRight.position.set(1.5, 2.4, 0);
    stallGroup.add(beamRight);

    // Traditional Sloped Limasan Roof
    const roofEaves = new THREE.Mesh(
      new THREE.ConeGeometry(2.35, 0.85, 4, 1, false, Math.PI / 4),
      new THREE.MeshStandardMaterial({ color: 0x5a2d18, roughness: 0.85 })
    );
    roofEaves.position.set(0, 2.85, 0);
    roofEaves.rotation.y = Math.PI / 4;
    roofEaves.castShadow = true;
    stallGroup.add(roofEaves);

    // Decorative Signboard (Plang Nama Warung)
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.45, 0.04),
      new THREE.MeshStandardMaterial({ map: signboardTexture, roughness: 0.4, metalness: 0.1 })
    );
    signBoard.position.set(0, 2.15, 0.73);
    signBoard.castShadow = true;
    signBoard.userData = { hotspotId: 'atap-limasan' };
    stallGroup.add(signBoard);
    interactiveObjects.push(signBoard);

    // Back Bamboo Wall (Gedek Anyaman)
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 2.2, 0.05),
      wovenBambooMaterial
    );
    backWall.position.set(0, 1.2, -0.68);
    backWall.receiveShadow = true;
    stallGroup.add(backWall);

    // Traditional Hanging Lantern (Lentera Minyak)
    const lanternGroup = new THREE.Group();
    lanternGroup.position.set(0, 2.15, 0.4);

    const lanternChain = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.3, 6), brassMaterial);
    lanternChain.position.y = 0.15;
    lanternGroup.add(lanternChain);

    const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.08, 8), copperMaterial);
    lanternCap.position.y = 0.04;
    lanternGroup.add(lanternCap);

    const lanternGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.09, 0.16, 12),
      new THREE.MeshStandardMaterial({
        color: 0xffaa33,
        emissive: 0xff7700,
        emissiveIntensity: 1.8,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
      })
    );
    lanternGlass.position.y = -0.06;
    lanternGroup.add(lanternGlass);
    stallGroup.add(lanternGroup);

    // C. The Main Artisan Counter Table (Meja Warung Jati)
    const counterGroup = new THREE.Group();
    counterGroup.position.set(0, 0, 0.1);
    scene.add(counterGroup);

    // Table Top Planks
    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(2.7, 0.09, 0.95),
      polishedWoodMaterial
    );
    tableTop.position.set(0, 1.25, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    counterGroup.add(tableTop);

    // Front Fascia Panels
    const tableFront = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 1.15, 0.04),
      teakWoodMaterial
    );
    tableFront.position.set(0, 0.62, 0.44);
    tableFront.castShadow = true;
    tableFront.receiveShadow = true;
    counterGroup.add(tableFront);

    // Table Legs & Bracing
    const legLeft = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.2, 0.85), teakWoodMaterial);
    legLeft.position.set(-1.25, 0.6, 0);
    counterGroup.add(legLeft);

    const legRight = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.2, 0.85), teakWoodMaterial);
    legRight.position.set(1.25, 0.6, 0);
    counterGroup.add(legRight);

    // Lower Shelf
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.05, 0.75), teakWoodMaterial);
    shelf.position.set(0, 0.4, 0);
    counterGroup.add(shelf);

    // ==========================================
    // 8. INTERACTIVE 3D PROPS & REMPAH
    // ==========================================

    // --- ITEM 1: Botol Jamu Tradisional & Bio-Preservasi ---
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(0.65, 1.3, 0.2);

    const bottleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.28, 16);
    const bottleOuter = new THREE.Mesh(bottleGeo, glassMaterial);
    bottleOuter.castShadow = true;
    bottleGroup.add(bottleOuter);

    // Bottle Neck & Rim
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.09, 16), glassMaterial);
    neck.position.y = 0.17;
    bottleGroup.add(neck);

    const cork = new THREE.Mesh(
      new THREE.CylinderGeometry(0.033, 0.03, 0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0x966838, roughness: 0.9 })
    );
    cork.position.y = 0.22;
    bottleGroup.add(cork);

    // Liquid column inside
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.074, 0.074, 0.22, 16), jamuLiquidMaterial);
    liquid.position.y = -0.02;
    bottleGroup.add(liquid);

    // Bottle Label Decal
    const label = new THREE.Mesh(
      new THREE.CylinderGeometry(0.082, 0.082, 0.14, 16, 1, true, -Math.PI / 2.5, Math.PI / 1.25),
      new THREE.MeshStandardMaterial({ map: bottleLabelTexture, roughness: 0.6, side: THREE.DoubleSide })
    );
    label.position.y = 0;
    bottleGroup.add(label);

    // Second smaller companion bottle
    const smallBottle = bottleGroup.clone();
    smallBottle.scale.set(0.85, 0.85, 0.85);
    smallBottle.position.set(0.86, 1.3, 0.12);
    scene.add(smallBottle);

    // Invisible hit proxy for raycasting
    const bottleProxy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.45, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    bottleProxy.position.copy(bottleGroup.position);
    bottleProxy.userData = { hotspotId: 'botol-jamu' };
    scene.add(bottleProxy);
    interactiveObjects.push(bottleProxy);
    scene.add(bottleGroup);

    // --- ITEM 2: Cobek & Lumpang Penghalus Rempah ---
    const mortarGroup = new THREE.Group();
    mortarGroup.position.set(-0.05, 1.3, 0.35);

    // Mortar bowl
    const mortarBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.11, 0.14, 20), brassMaterial);
    mortarBase.position.y = 0.07;
    mortarBase.castShadow = true;
    mortarGroup.add(mortarBase);

    // Inner rim
    const innerBowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.06, 0.1, 16),
      new THREE.MeshStandardMaterial({ color: 0x5a481c, roughness: 0.6 })
    );
    innerBowl.position.y = 0.09;
    mortarGroup.add(innerBowl);

    // Crushed spice residue
    const spicePowder = new THREE.Mesh(
      new THREE.CircleGeometry(0.09, 12),
      new THREE.MeshStandardMaterial({ color: 0x8a4515, roughness: 0.95 })
    );
    spicePowder.rotation.x = -Math.PI / 2;
    spicePowder.position.y = 0.12;
    mortarGroup.add(spicePowder);

    // Pestle leaning diagonally
    const pestle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.28, 12), brassMaterial);
    pestle.position.set(0.03, 0.18, -0.02);
    pestle.rotation.z = 0.45;
    pestle.rotation.x = -0.25;
    pestle.castShadow = true;
    mortarGroup.add(pestle);

    const mortarProxy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.35, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    mortarProxy.position.copy(mortarGroup.position);
    mortarProxy.userData = { hotspotId: 'cobek-lumpang' };
    scene.add(mortarProxy);
    interactiveObjects.push(mortarProxy);
    scene.add(mortarGroup);

    // --- ITEM 3: Tampah 6 Rempah Bioaktif ---
    const spicePlatterGroup = new THREE.Group();
    spicePlatterGroup.position.set(-0.65, 1.3, 0.25);

    // Woven bamboo platter disc
    const tampahRim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 8, 24), wovenBambooMaterial);
    tampahRim.rotation.x = Math.PI / 2;
    tampahRim.position.y = 0.025;
    tampahRim.castShadow = true;
    spicePlatterGroup.add(tampahRim);

    const tampahFloor = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.015, 24), wovenBambooMaterial);
    tampahFloor.position.y = 0.01;
    tampahFloor.receiveShadow = true;
    spicePlatterGroup.add(tampahFloor);

    // Cluster 1: Kapulaga (Pale Green/Tan Ovals)
    const cardGroup = new THREE.Group();
    cardGroup.position.set(-0.12, 0.03, -0.08);
    for (let c = 0; c < 8; c++) {
      const pod = new THREE.Mesh(
        new THREE.SphereGeometry(0.024, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xd4cbb1, roughness: 0.8 })
      );
      pod.scale.set(1, 1.5, 0.9);
      pod.position.set((Math.random() - 0.5) * 0.08, 0.015 * c * 0.3, (Math.random() - 0.5) * 0.08);
      pod.rotation.set(Math.random(), Math.random(), Math.random());
      cardGroup.add(pod);
    }
    spicePlatterGroup.add(cardGroup);

    // Cluster 2: Cabe Jamu (Elongated Brown Spikes)
    const pepperGroup = new THREE.Group();
    pepperGroup.position.set(0.12, 0.03, -0.08);
    for (let p = 0; p < 7; p++) {
      const spike = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.016, 0.07, 7),
        new THREE.MeshStandardMaterial({ color: 0x4a2c14, roughness: 0.9 })
      );
      spike.rotation.set(Math.PI / 2 + (Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.8);
      spike.position.set((Math.random() - 0.5) * 0.08, 0.015 * p * 0.2, (Math.random() - 0.5) * 0.08);
      pepperGroup.add(spike);
    }
    spicePlatterGroup.add(pepperGroup);

    // Cluster 3: Kayu Manis (Cinnamon Bark Quills)
    const cinnGroup = new THREE.Group();
    cinnGroup.position.set(-0.12, 0.03, 0.1);
    for (let cn = 0; cn < 5; cn++) {
      const quill = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, 0.16, 8, 1, true),
        new THREE.MeshStandardMaterial({ color: 0x7c381c, roughness: 0.85, side: THREE.DoubleSide })
      );
      quill.rotation.z = Math.PI / 2;
      quill.rotation.y = (cn * 0.25) - 0.3;
      quill.position.set(0, cn * 0.015, (cn - 2) * 0.025);
      cinnGroup.add(quill);
    }
    spicePlatterGroup.add(cinnGroup);

    // Cluster 4: Cengkeh (Dark Cloves with round head)
    const cloveGroup = new THREE.Group();
    cloveGroup.position.set(0.1, 0.03, 0.1);
    for (let cl = 0; cl < 12; cl++) {
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.005, 0.007, 0.035, 6),
        new THREE.MeshStandardMaterial({ color: 0x2e180d, roughness: 0.9 })
      );
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.009, 6, 6),
        new THREE.MeshStandardMaterial({ color: 0x3d2012, roughness: 0.85 })
      );
      head.position.y = 0.02;
      stem.add(head);
      stem.position.set((Math.random() - 0.5) * 0.09, 0.01 + Math.random() * 0.01, (Math.random() - 0.5) * 0.09);
      stem.rotation.set(Math.random(), Math.random(), Math.random());
      cloveGroup.add(stem);
    }
    spicePlatterGroup.add(cloveGroup);

    // Cluster 5: Gula Aren Blocks (Silinder Gula Merah)
    const sugarBlock = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.05, 0.065, 14),
      new THREE.MeshStandardMaterial({ color: 0x4f1f06, roughness: 0.75 })
    );
    sugarBlock.position.set(0, 0.04, -0.02);
    sugarBlock.castShadow = true;
    spicePlatterGroup.add(sugarBlock);

    const tampahProxy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.25, 12),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    tampahProxy.position.copy(spicePlatterGroup.position);
    tampahProxy.userData = { hotspotId: 'tampah-rempah' };
    scene.add(tampahProxy);
    interactiveObjects.push(tampahProxy);
    scene.add(spicePlatterGroup);

    // --- ITEM 4: Kendi Tanah Liat (Porous Terracotta Jug) ---
    const kendiGroup = new THREE.Group();
    kendiGroup.position.set(0.95, 1.3, -0.15);

    // Bulbous belly
    const kendiBelly = new THREE.Mesh(new THREE.SphereGeometry(0.14, 18, 18), terracottaMaterial);
    kendiBelly.position.y = 0.12;
    kendiBelly.scale.set(1.1, 0.95, 1.1);
    kendiBelly.castShadow = true;
    kendiGroup.add(kendiBelly);

    // Neck and Spout
    const kendiNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.14, 16), terracottaMaterial);
    kendiNeck.position.y = 0.24;
    kendiGroup.add(kendiNeck);

    const kendiRim = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 16), terracottaMaterial);
    kendiRim.rotation.x = Math.PI / 2;
    kendiRim.position.y = 0.31;
    kendiGroup.add(kendiRim);

    const spout = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.08, 8), terracottaMaterial);
    spout.position.set(0.12, 0.18, 0);
    spout.rotation.z = -Math.PI / 3;
    kendiGroup.add(spout);

    const kendiProxy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.42, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    kendiProxy.position.copy(kendiGroup.position);
    kendiProxy.userData = { hotspotId: 'kendi-tanah' };
    scene.add(kendiProxy);
    interactiveObjects.push(kendiProxy);
    scene.add(kendiGroup);

    // --- ITEM 5: Panci Tembaga & Tungku Pengaturan Suhu ---
    const potGroup = new THREE.Group();
    potGroup.position.set(-1.05, 1.3, -0.1);

    const potBody = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.24, 20), copperMaterial);
    potBody.position.y = 0.12;
    potBody.castShadow = true;
    potGroup.add(potBody);

    const potLid = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.05, 20), copperMaterial);
    potLid.position.y = 0.26;
    potGroup.add(potLid);

    const potHandle1 = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.008, 6, 12), brassMaterial);
    potHandle1.position.set(0.19, 0.18, 0);
    potHandle1.rotation.y = Math.PI / 2;
    potGroup.add(potHandle1);

    const potHandle2 = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.008, 6, 12), brassMaterial);
    potHandle2.position.set(-0.19, 0.18, 0);
    potHandle2.rotation.y = Math.PI / 2;
    potGroup.add(potHandle2);

    // Steam particle effect rising from pot
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 0.12;
      particlePositions[i + 1] = 0.26 + Math.random() * 0.35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 0.12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const steam = new THREE.Points(particleGeo, particleMat);
    potGroup.add(steam);
    steamParticlesRef.current = steam;

    const potProxy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.45, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    potProxy.position.copy(potGroup.position);
    potProxy.userData = { hotspotId: 'tungku-tembaga' };
    scene.add(potProxy);
    interactiveObjects.push(potProxy);
    scene.add(potGroup);

    // Hanging Lemongrass and Cinnamon Bundles on the back rafters
    const hangingRafter = new THREE.Group();
    hangingRafter.position.set(0, 2.3, -0.6);
    for (let b = -3; b <= 3; b++) {
      const bundle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.035, 0.45, 6),
        new THREE.MeshStandardMaterial({
          color: b % 2 === 0 ? 0x6e7845 : 0x7a3e1d,
          roughness: 0.9,
        })
      );
      bundle.position.set(b * 0.35, -0.22, 0);
      bundle.rotation.z = (Math.random() - 0.5) * 0.15;
      hangingRafter.add(bundle);
    }
    stallGroup.add(hangingRafter);

    interactiveMeshesRef.current = interactiveObjects;

    // Pre-warm shaders
    renderer.compile(scene, camera);

    // 9. Interaction Setup: Mouse / Touch Orbit Controls & Raycasting
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let spherical = { radius: 3.2, theta: 0, phi: Math.PI / 2.7 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;
        prevMousePos = { x: clientX, y: clientY };

        spherical.theta -= deltaX * 0.005;
        spherical.phi = Math.max(0.2, Math.min(Math.PI / 2.1, spherical.phi - deltaY * 0.005));

        // Update target camera position relative to targetCamLookAt
        targetCamPos.current.x = targetCamLookAt.current.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
        targetCamPos.current.y = targetCamLookAt.current.y + spherical.radius * Math.cos(spherical.phi);
        targetCamPos.current.z = targetCamLookAt.current.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      } else if (!('touches' in e) && mountRef.current) {
        // Raycast for hover detection
        const rect = mountRef.current.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const hits = raycaster.intersectObjects(interactiveMeshesRef.current);
        if (hits.length > 0) {
          const id = hits[0].object.userData.hotspotId;
          setHoveredHotspotId(id);
          mountRef.current.style.cursor = 'pointer';
        } else {
          setHoveredHotspotId(null);
          mountRef.current.style.cursor = 'grab';
        }
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      if (mountRef.current) mountRef.current.style.cursor = 'grab';
    };

    const handleClick = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const hits = raycaster.intersectObjects(interactiveMeshesRef.current);
      if (hits.length > 0) {
        const id = hits[0].object.userData.hotspotId;
        const found = HOTSPOTS.find(h => h.id === id);
        if (found) {
          setSelectedHotspot(found);
          setCameraView(found.id);
          targetCamPos.current.set(...found.cameraPos);
          targetCamLookAt.current.set(...found.cameraTarget);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.radius = Math.max(1.1, Math.min(5.5, spherical.radius + e.deltaY * 0.003));
      targetCamPos.current.x = targetCamLookAt.current.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      targetCamPos.current.y = targetCamLookAt.current.y + spherical.radius * Math.cos(spherical.phi);
      targetCamPos.current.z = targetCamLookAt.current.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('click', handleClick);
    dom.addEventListener('wheel', handleWheel, { passive: false });
    dom.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    // 10. Smooth Render Loop with Clock Damping
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Silky Smooth Exponential Damping for Camera Transitions
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.current.x, 4.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.current.y, 4.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.current.z, 4.5, delta);

      currentCamLookAt.current.x = THREE.MathUtils.damp(currentCamLookAt.current.x, targetCamLookAt.current.x, 5.0, delta);
      currentCamLookAt.current.y = THREE.MathUtils.damp(currentCamLookAt.current.y, targetCamLookAt.current.y, 5.0, delta);
      currentCamLookAt.current.z = THREE.MathUtils.damp(currentCamLookAt.current.z, targetCamLookAt.current.z, 5.0, delta);
      camera.lookAt(currentCamLookAt.current);

      // Gentle lantern flicker
      if (lanternLightRef.current) {
        lanternLightRef.current.intensity = 2.6 + Math.sin(elapsedTime * 6) * 0.25 + Math.cos(elapsedTime * 14) * 0.15;
      }

      // Steam Particle loop
      if (steamParticlesRef.current) {
        const positions = steamParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += delta * 0.12;
          if (positions[i] > 0.65) {
            positions[i] = 0.26;
            positions[i - 1] = (Math.random() - 0.5) * 0.1;
            positions[i + 1] = (Math.random() - 0.5) * 0.1;
          }
        }
        steamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('click', handleClick);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      groundGeo.dispose();
      woodTexture.dispose();
      bambooTexture.dispose();
      signboardTexture.dispose();
      bottleLabelTexture.dispose();
      if (mountRef.current && dom.parentNode === mountRef.current) {
        mountRef.current.removeChild(dom);
      }
    };
  }, []);

  // Update lighting mode (Siang vs Senja)
  useEffect(() => {
    if (!dirLightRef.current || !hemiLightRef.current || !sceneRef.current) return;
    if (lightingMode === 'siang') {
      dirLightRef.current.color.setHex(0xffffff);
      dirLightRef.current.intensity = 2.8;
      hemiLightRef.current.color.setHex(0xffffff);
      hemiLightRef.current.groundColor.setHex(0x3a3028);
      hemiLightRef.current.intensity = 1.4;
      sceneRef.current.background = new THREE.Color(0x28231e);
      if (sceneRef.current.fog) (sceneRef.current.fog as THREE.FogExp2).color.setHex(0x28231e);
    } else {
      dirLightRef.current.color.setHex(0xffedd5);
      dirLightRef.current.intensity = 2.0;
      hemiLightRef.current.color.setHex(0xffc58a);
      hemiLightRef.current.groundColor.setHex(0x18120d);
      hemiLightRef.current.intensity = 0.95;
      sceneRef.current.background = new THREE.Color(0x130e0a);
      if (sceneRef.current.fog) (sceneRef.current.fog as THREE.FogExp2).color.setHex(0x130e0a);
    }
  }, [lightingMode]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-amber-900/40 bg-stone-950 shadow-2xl">
      {/* Top Header HUD (Minimalist, zero occlusion) */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-stone-950/90 border border-amber-500/40 backdrop-blur-md shadow-lg pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <span className="text-xs font-serif font-bold text-white tracking-wide">
            Tur Warung Jamu Kebonagung 3D
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
            Three.js PBR
          </span>
        </div>

        {hoveredHotspotId && (
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/60 text-amber-200 text-xs shadow-lg animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Klik untuk telaah: {HOTSPOTS.find(h => h.id === hoveredHotspotId)?.title}</span>
          </div>
        )}
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
        <button
          onClick={toggleAudio}
          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer shadow-lg ${
            isAudioPlaying
              ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
              : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:border-amber-500/60'
          }`}
          title={isAudioPlaying ? 'Matikan Suasana Suara Warung' : 'Dengarkan Suasana Audio Sintesis Warung Jamu'}
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setLightingMode(lightingMode === 'senja' ? 'siang' : 'senja')}
          className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-850 text-amber-300 border border-stone-700 hover:border-amber-500/60 backdrop-blur-md transition-all cursor-pointer shadow-lg"
          title={`Beralih ke mode ${lightingMode === 'senja' ? 'Siang Hari' : 'Senja Syahdu Warung'}`}
        >
          {lightingMode === 'senja' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button
          onClick={() => switchCameraView('panorama')}
          className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-850 text-stone-200 border border-stone-700 hover:border-amber-500/60 backdrop-blur-md text-xs font-semibold cursor-pointer shadow-lg"
          title="Reset Sudut Pandang Panorama"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Reset Sudut</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Mount Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[580px] sm:h-[650px] relative cursor-grab active:cursor-grabbing outline-none select-none"
      />

      {/* Navigation Helper Pill (Bottom-left subtle) */}
      <div className="absolute top-16 left-4 z-10 pointer-events-none hidden md:block">
        <div className="px-3 py-1.5 rounded-xl bg-stone-950/70 border border-stone-800/80 text-[11px] text-stone-400 space-y-0.5 backdrop-blur-sm">
          <p>• <strong>Drag Mouse / Touch:</strong> Putar 360°</p>
          <p>• <strong>Scroll / Pinch:</strong> Perbesar / Perkecil</p>
          <p>• <strong>Klik Objek:</strong> Telaah Sains & Etnosains</p>
        </div>
      </div>

      {/* Interactive Detail Modal / Bottom Inspector Card if an item is selected */}
      {selectedHotspot && (
        <div className="absolute top-16 right-4 sm:right-6 z-30 max-w-sm sm:max-w-md w-full bg-stone-950/95 border border-amber-500/50 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-fadeIn text-stone-100">
          <div className="flex items-start justify-between pb-3 border-b border-stone-800">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
                {selectedHotspot.category}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-white font-serif mt-1">
                {selectedHotspot.title}
              </h3>
              <p className="text-xs text-amber-400/90 italic">"{selectedHotspot.localName}"</p>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3.5 space-y-3 text-xs leading-relaxed max-h-[340px] overflow-y-auto pr-1">
            <p className="text-stone-300">{selectedHotspot.description}</p>

            {/* BioScience Insight */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
              <div className="flex items-center space-x-1.5 text-emerald-300 font-bold mb-1">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Nalar Bioteknologi & Preservasi</span>
              </div>
              <p className="text-stone-300 text-[11px]">{selectedHotspot.bioScienceInsight}</p>
            </div>

            {/* Cultural Wisdom */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60">
              <div className="flex items-center space-x-1.5 text-amber-300 font-bold mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kearifan Tradisi Kebonagung</span>
              </div>
              <p className="text-stone-300 text-[11px]">{selectedHotspot.culturalWisdom}</p>
            </div>

            {/* Student POPBL Inquiry Question */}
            <div className="p-3 rounded-xl bg-stone-900 border border-amber-500/30">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Tantangan Proyek Siswa (POPBL):</span>
              </div>
              <p className="text-stone-200 text-[11px] font-medium">{selectedHotspot.studentInquiryQuestion}</p>
            </div>

            {/* Relevant Compounds */}
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                Senyawa Terkait:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedHotspot.relevantCompounds.map(comp => (
                  <span key={comp} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 border border-stone-700">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Collapsible Bottom Dock (Adhering to Three.js Directives: Zero occlusion) */}
      <div 
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl transition-all duration-300 ease-in-out ${
          isDockCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
        }`}
      >
        <div className="bg-stone-900/95 border border-stone-800 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Dock Top Handle bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800/80 bg-stone-950/60">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Jelajah Titik Etnosains Warung</span>
              <span className="text-[10px] text-stone-400 font-normal hidden sm:inline">
                (Pilih titik sudut pandang 3D)
              </span>
            </div>

            <button
              onClick={() => setIsDockCollapsed(!isDockCollapsed)}
              className="flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 cursor-pointer transition-colors"
            >
              {isDockCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Buka Menu Navigasi</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Sembunyikan Dock</span>
                </>
              )}
            </button>
          </div>

          {/* Viewpoints Horizontal Slider */}
          <div className="p-2.5 sm:p-3 overflow-x-auto no-scrollbar flex items-center space-x-2">
            <button
              onClick={() => switchCameraView('panorama')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                cameraView === 'panorama'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Panorama Warung</span>
            </button>

            {HOTSPOTS.map((hotspot) => {
              const isSelected = cameraView === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => switchCameraView(hotspot.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-stone-950' : 'bg-amber-400'}`}></span>
                  <span>{hotspot.title.split('&')[0]}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-amber-800 text-white' : 'bg-stone-800 text-stone-400'
                  }`}>
                    {hotspot.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
