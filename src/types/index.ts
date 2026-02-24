// Disability Types
export type DisabilityType = 'visual' | 'hearing' | 'motor' | 'cognitive' | 'speech' | 'multiple';

export interface DisabilityProfile {
  type: DisabilityType;
  severity: 'mild' | 'moderate' | 'severe';
  assistiveTech: string[];
  preferredInputMethods: string[];
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  disabilityProfile: DisabilityProfile;
  createdAt: Date;
  preferences: AccessibilityPreferences;
}

export interface AccessibilityPreferences {
  brightnessLevel: number; // 0-200
  fontSize: 'default' | 'large' | 'xlarge';
  dyslexicFont: boolean;
  adhd_focusMode: boolean;
  voiceNavigationEnabled: boolean;
  hapticsEnabled: boolean;
  reduceAnimations: boolean;
  highContrast: boolean;
  screenReaderMode: boolean;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'braille' | 'sign-language' | 'speech' | 'cognitive' | 'motor';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  lessons: Lesson[];
  accessibilityFeatures: AccessibilityFeature[];
  thumbnail: string;
  instructorId: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  interactiveElements: InteractiveElement[];
  duration: number;
}

export interface InteractiveElement {
  id: string;
  type: 'quiz' | 'braille-practice' | 'sign-language' | 'voice-exercise';
  content: any;
}

export interface AccessibilityFeature {
  name: string;
  enabled: boolean;
  config: Record<string, any>;
}

// Braille Types
export interface BrailleCharacter {
  character: string;
  dots: number[]; // 1-8 dot positions
  uebGrade: number;
}

export interface BrailleWord {
  word: string;
  characters: BrailleCharacter[];
}

// Mental Health Types
export interface MoodEntry {
  id: string;
  userId: string;
  mood: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';
  timestamp: Date;
  notes: string;
  copingStrategies: string[];
}

export interface MentalHealthProfile {
  userId: string;
  moodHistory: MoodEntry[];
  suggestedStrategies: string[];
  counselorNotes: string;
}

// AI Profile Types
export interface AIDisabilityProfile {
  userId: string;
  learningPatterns: LearningPattern[];
  strengths: string[];
  challenges: string[];
  recommendedCourses: string[];
  predictedDevelopmentAreas: string[];
  supportLevel: 'minimal' | 'moderate' | 'intensive';
}

export interface LearningPattern {
  timestamp: Date;
  courseId: string;
  completionRate: number;
  timeSpent: number;
  errorRate: number;
  engagementScore: number;
}
