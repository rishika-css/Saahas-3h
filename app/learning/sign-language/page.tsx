import React from 'react';
import { AnimatedBackground } from '@/src/components/three-scene/AnimatedBackground';
import { SignLanguageStudio } from '@/src/components/learning/SignLanguageStudio';
import { Navigation } from '@/src/components/layout/Navigation';
import { AccessibilityPanel } from '@/src/components/accessibility/AccessibilityPanel';
import { VoiceController } from '@/src/components/voice/VoiceController';

export const metadata = {
  title: 'Sign Language Learning | Inclusive Learning Platform',
  description: 'Interactive sign language video tutorials with practice mode',
};

export default function SignLanguagePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 pt-20">
        <Navigation />
        <SignLanguageStudio />
        <AccessibilityPanel />
        <VoiceController />
      </div>
    </main>
  );
}
