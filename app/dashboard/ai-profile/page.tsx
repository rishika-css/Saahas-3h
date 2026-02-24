import React from 'react';
import { AnimatedBackground } from '@/src/components/three-scene/AnimatedBackground';
import { AIDisabilityProfile } from '@/src/components/dashboard/AIDisabilityProfile';
import { Navigation } from '@/src/components/layout/Navigation';
import { AccessibilityPanel } from '@/src/components/accessibility/AccessibilityPanel';
import { VoiceController } from '@/src/components/voice/VoiceController';

export const metadata = {
  title: 'Your Learning Profile | Inclusive Learning Platform',
  description: 'AI-powered insights and personalized recommendations based on your learning patterns',
};

export default function AIProfilePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 pt-20">
        <Navigation />
        <AIDisabilityProfile />
        <AccessibilityPanel />
        <VoiceController />
      </div>
    </main>
  );
}
