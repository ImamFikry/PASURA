export interface VideoScene {
  sceneNumber: number;
  timeRange: string;
  title: string;
  visual: string;
  audioNarration: string;
  screenText: string;
  ethnoscienceFocus: string;
}

export interface POPBLStage {
  id: number;
  stageName: string;
  crtDimension: string;
  objective: string;
  studentActivities: string[];
  scienceConcept: string;
  aiIntegration: string;
  expectedArtifact: string;
  teacherTips: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'bioaktif' | 'copywriting' | 'biopreservasi' | 'etnosains';
  targetModel: string;
  promptText: string;
  explanation: string;
  suggestedInputVariables: { label: string; placeholder: string; key: string }[];
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  scientificExplanation: string;
  culturalReflection: string;
  difficulty: 'Dasar' | 'Sedang' | 'Penalaran Tingkat Tinggi (HOTS)';
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  descriptors: {
    score: number;
    title: string;
    description: string;
  }[];
}

export interface SpiceCompound {
  id: string;
  indonesianName: string;
  pasuruanLocalName: string;
  latinName: string;
  pubChemCid: number;
  mainCompound: string;
  chemicalFormula: string;
  molecularWeight: string;
  canonicalSmiles: string;
  bioactivityRole: string;
  antimicrobialMechanism: string;
  traditionalPreparationInKebonagung: string;
  modernScienceEquivalence: string;
  optimalExtractionTemp: string;
}

export interface SpiceLocationNode {
  id: string;
  name: string;
  district: string;
  altitudeMdpl: string;
  zoneType: 'Sentra Jamu' | 'Dataran Tinggi' | 'Dataran Rendah' | 'Pesisir / Sejarah' | 'Perkebunan Aren';
  primaryCrop: string;
  latinName: string;
  plantFamily: string;
  plantPartUsed: string;
  botanicalFeatures: {
    stemLeaf: string;
    flowerFruit: string;
    activeGland: string;
  };
  soilAndClimate: string;
  roleInKebonagung: string;
  ethnoscienceWisdom: string;
  mapCoords: { x: number; y: number };
  badgeColor: string;
  geoCoordinates?: {
    lat: number;
    lng: number;
    mapQuery: string;
    placeLabel: string;
  };
}

export interface UserSession {
  name: string;
  email: string;
  role: 'guru' | 'siswa' | 'umkm';
  schoolOrOrg: string;
  avatarSeed?: string;
  gradeLevel?: string;
  groupName?: string;
  loginAt?: string;
}

export interface AchievementBadge {
  id: string;
  moduleId: string;
  title: string;
  crtHonoraryTitle: string;
  category: 'CRT Budaya' | 'Bioteknologi' | 'Inovasi AI' | 'Dampak UMKM' | 'Eksplorasi 3D';
  iconName: string;
  description: string;
  culturalSignificance: string;
  points: number;
  unlockedAt?: string;
  isUnlocked: boolean;
}


