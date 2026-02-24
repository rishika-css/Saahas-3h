import React from 'react';
import { AnimatedBackground } from '@/src/components/three-scene/AnimatedBackground';
import { MentalHealthPortal } from '@/src/components/mental-health/MentalHealthPortal';
import { Navigation } from '@/src/components/layout/Navigation';
import { AccessibilityPanel } from '@/src/components/accessibility/AccessibilityPanel';
import { VoiceController } from '@/src/components/voice/VoiceController';

export const metadata = {
  title: 'Mental Health & Wellness | Inclusive Learning Platform',
  description: 'Track your mental health and access wellness resources',
};

export default function MentalHealthPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 pt-20">
        <Navigation />
        <MentalHealthPortal />
        <AccessibilityPanel />
        <VoiceController />
      </div>
    </main>
  );
}
