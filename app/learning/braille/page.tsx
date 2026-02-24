import React from 'react';
import { AnimatedBackground } from '@/src/components/three-scene/AnimatedBackground';
import { BrailleLesson } from '@/src/components/learning/BrailleLesson';
import { Navigation } from '@/src/components/layout/Navigation';
import { AccessibilityPanel } from '@/src/components/accessibility/AccessibilityPanel';
import { VoiceController } from '@/src/components/voice/VoiceController';

export const metadata = {
  title: 'Braille Learning | Inclusive Learning Platform',
  description: 'Interactive braille learning with haptic feedback and voice guidance',
};

export default function BrailleLearnPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 pt-20">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <BrailleLesson word="learn" />
        </div>
        <AccessibilityPanel />
        <VoiceController />
      </div>
    </main>
  );
}
