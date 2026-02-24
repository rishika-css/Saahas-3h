'use client';

import React, { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Settings, X, Zap, Type, Eye, Brain, Volume2 } from 'lucide-react';

export function AccessibilityPanel() {
  const { preferences, updatePreferences, speak, vibrate } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (key: keyof typeof preferences, value: boolean | string | number) => {
    updatePreferences({ [key]: value });
    vibrate([20, 10, 20]);
    speak(`${key} ${value}`);
  };

  return (
    <>
      {/* Floating Settings Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          vibrate([30]);
          speak(isOpen ? 'Closing settings' : 'Opening accessibility settings');
        }}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Toggle accessibility settings"
        title="Accessibility Settings"
      >
        <Settings className="w-6 h-6 text-black" aria-hidden="true" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-lg border border-yellow-400 border-opacity-30 shadow-2xl p-6 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-yellow-300">Accessibility</h2>
            <button
              onClick={() => {
                setIsOpen(false);
                vibrate([20]);
              }}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Close settings"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Brightness Control */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                <label htmlFor="brightness" className="text-sm font-medium text-white">
                  Brightness
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="brightness"
                  type="range"
                  min="50"
                  max="200"
                  step="10"
                  value={preferences.brightnessLevel}
                  onChange={(e) => handleToggle('brightnessLevel', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  aria-label="Brightness level"
                />
                <span className="text-sm text-gray-300 min-w-10">{preferences.brightnessLevel}%</span>
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                <label className="text-sm font-medium text-white">Font Size</label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['default', 'large', 'xlarge'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleToggle('fontSize', size)}
                    className={`p-2 rounded text-sm transition-colors ${
                      preferences.fontSize === size
                        ? 'bg-yellow-400 text-black font-semibold'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                    aria-pressed={preferences.fontSize === size}
                  >
                    {size === 'default' ? 'Normal' : size === 'large' ? 'Large' : 'XL'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dyslexic Font Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                  <label className="text-sm font-medium text-white">Dyslexic Font</label>
                </div>
                <button
                  onClick={() => handleToggle('dyslexicFont', !preferences.dyslexicFont)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    preferences.dyslexicFont
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-700 text-white'
                  }`}
                  aria-pressed={preferences.dyslexicFont}
                >
                  {preferences.dyslexicFont ? 'On' : 'Off'}
                </button>
              </div>
              <p className="text-xs text-gray-400">OpenDyslexic font for easier reading</p>
            </div>

            {/* ADHD Focus Mode */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                  <label className="text-sm font-medium text-white">ADHD Focus Mode</label>
                </div>
                <button
                  onClick={() => handleToggle('adhd_focusMode', !preferences.adhd_focusMode)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    preferences.adhd_focusMode
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-700 text-white'
                  }`}
                  aria-pressed={preferences.adhd_focusMode}
                >
                  {preferences.adhd_focusMode ? 'On' : 'Off'}
                </button>
              </div>
              <p className="text-xs text-gray-400">Reduced animations and distractions</p>
            </div>

            {/* Voice Navigation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                  <label className="text-sm font-medium text-white">Voice Navigation</label>
                </div>
                <button
                  onClick={() => handleToggle('voiceNavigationEnabled', !preferences.voiceNavigationEnabled)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    preferences.voiceNavigationEnabled
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-700 text-white'
                  }`}
                  aria-pressed={preferences.voiceNavigationEnabled}
                >
                  {preferences.voiceNavigationEnabled ? 'On' : 'Off'}
                </button>
              </div>
              <p className="text-xs text-gray-400">Audio feedback and voice commands</p>
            </div>

            {/* Haptics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                  <label className="text-sm font-medium text-white">Haptic Feedback</label>
                </div>
                <button
                  onClick={() => handleToggle('hapticsEnabled', !preferences.hapticsEnabled)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    preferences.hapticsEnabled
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-700 text-white'
                  }`}
                  aria-pressed={preferences.hapticsEnabled}
                >
                  {preferences.hapticsEnabled ? 'On' : 'Off'}
                </button>
              </div>
              <p className="text-xs text-gray-400">Vibration feedback for interactions</p>
            </div>

            {/* Reduce Animations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white">Reduce Animations</label>
                <button
                  onClick={() => handleToggle('reduceAnimations', !preferences.reduceAnimations)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    preferences.reduceAnimations
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-700 text-white'
                  }`}
                  aria-pressed={preferences.reduceAnimations}
                >
                  {preferences.reduceAnimations ? 'On' : 'Off'}
                </button>
              </div>
              <p className="text-xs text-gray-400">Minimize motion-based animations</p>
            </div>

            {/* High Contrast */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white">High Contrast</label>
                <button
                  onClick={() => handleToggle('highContrast', !preferences.highContrast)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    preferences.highContrast
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-700 text-white'
                  }`}
                  aria-pressed={preferences.highContrast}
                >
                  {preferences.highContrast ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            {/* Screen Reader Mode */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white">Screen Reader Mode</label>
                <button
                  onClick={() => handleToggle('screenReaderMode', !preferences.screenReaderMode)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    preferences.screenReaderMode
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'bg-gray-700 text-white'
                  }`}
                  aria-pressed={preferences.screenReaderMode}
                >
                  {preferences.screenReaderMode ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
