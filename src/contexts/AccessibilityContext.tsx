'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AccessibilityPreferences } from '@/types';

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreferences: (prefs: Partial<AccessibilityPreferences>) => void;
  speak: (text: string, rate?: number) => void;
  stopSpeaking: () => void;
  vibrate: (pattern: number | number[]) => void;
  speakingActive: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    brightnessLevel: 100,
    fontSize: 'default',
    dyslexicFont: false,
    adhd_focusMode: false,
    voiceNavigationEnabled: false,
    hapticsEnabled: true,
    reduceAnimations: false,
    highContrast: false,
    screenReaderMode: false,
  });

  const [speakingActive, setSpeakingActive] = useState(false);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  useEffect(() => {
    // Check for system preferences
    if (window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setPreferences((prev) => ({ ...prev, reduceAnimations: true }));
      }
    }
  }, []);

  const updatePreferences = useCallback((prefs: Partial<AccessibilityPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }));
  }, []);

  const speak = useCallback(
    (text: string, rate = 1) => {
      if (!synth || !preferences.voiceNavigationEnabled) return;

      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.onstart = () => setSpeakingActive(true);
      utterance.onend = () => setSpeakingActive(false);
      synth.speak(utterance);
    },
    [synth, preferences.voiceNavigationEnabled]
  );

  const stopSpeaking = useCallback(() => {
    if (synth) {
      synth.cancel();
      setSpeakingActive(false);
    }
  }, [synth]);

  const vibrate = useCallback((pattern: number | number[]) => {
    if (preferences.hapticsEnabled && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, [preferences.hapticsEnabled]);

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        updatePreferences,
        speak,
        stopSpeaking,
        speakingActive,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
