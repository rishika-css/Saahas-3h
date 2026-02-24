import React from 'react';
import { AnimatedBackground } from '@/src/components/three-scene/AnimatedBackground';
import { CoursesDashboard } from '@/src/components/courses/CoursesDashboard';
import { AccessibilityPanel } from '@/src/components/accessibility/AccessibilityPanel';
import { VoiceController } from '@/src/components/voice/VoiceController';
import { Navigation } from '@/src/components/layout/Navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Courses Dashboard | Inclusive Learning Platform',
  description: 'Browse and access learning courses tailored to your needs',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Navigation />
        <CoursesDashboard />
        <AccessibilityPanel />
        <VoiceController />
      </div>
    </main>
  );
}
