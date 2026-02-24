'use client';

import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferences } = useAccessibility();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        preferences.adhd_focusMode ? 'bg-opacity-95' : ''
      }`}
      style={{
        filter: preferences.highContrast
          ? 'contrast(1.5)'
          : preferences.brightnessLevel !== 100
          ? `brightness(${preferences.brightnessLevel}%)`
          : 'none',
        fontFamily: preferences.dyslexicFont ? "'OpenDyslexic', sans-serif" : 'inherit',
        fontSize: preferences.fontSize === 'large' ? '1.125rem' : preferences.fontSize === 'xlarge' ? '1.25rem' : '1rem',
      }}
    >
      {/* Reduce motion CSS for animations */}
      {preferences.reduceAnimations && (
        <style>{`
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `}</style>
      )}

      {/* ADHD Focus Mode - Removes visual distractions */}
      {preferences.adhd_focusMode && (
        <style>{`
          body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%) !important;
          }
          .distraction-content {
            display: none !important;
          }
        `}</style>
      )}

      {/* Dyslexic Font Support */}
      {preferences.dyslexicFont && (
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Dyslexie&display=swap');
          body, button, input, textarea, select {
            font-family: 'OpenDyslexic', 'Dyslexie', sans-serif !important;
          }
        `}</style>
      )}

      {children}
    </div>
  );
}
