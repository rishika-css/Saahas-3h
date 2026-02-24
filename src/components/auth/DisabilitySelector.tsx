'use client';

import React, { useState } from 'react';
import { DisabilityType, DisabilityProfile } from '@/types';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Eye, Ear, Hand, Brain, Mic } from 'lucide-react';

interface DisabilitySelectorProps {
  onSelect: (profile: DisabilityProfile) => void;
  isLoading?: boolean;
}

const DISABILITY_OPTIONS: Array<{
  type: DisabilityType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = [
  {
    type: 'visual',
    label: 'Visual Impairment',
    description: 'Blind or low vision',
    icon: <Eye className="w-8 h-8" />,
    color: 'from-blue-400 to-blue-600',
  },
  {
    type: 'hearing',
    label: 'Hearing Impairment',
    description: 'Deaf or hard of hearing',
    icon: <Ear className="w-8 h-8" />,
    color: 'from-purple-400 to-purple-600',
  },
  {
    type: 'motor',
    label: 'Motor Disability',
    description: 'Limited mobility or control',
    icon: <Hand className="w-8 h-8" />,
    color: 'from-green-400 to-green-600',
  },
  {
    type: 'cognitive',
    label: 'Cognitive Disability',
    description: 'ADHD, dyslexia, autism',
    icon: <Brain className="w-8 h-8" />,
    color: 'from-orange-400 to-orange-600',
  },
  {
    type: 'speech',
    label: 'Speech Impairment',
    description: 'Speech or language difficulty',
    icon: <Mic className="w-8 h-8" />,
    color: 'from-red-400 to-red-600',
  },
];

const SEVERITY_LEVELS: Array<'mild' | 'moderate' | 'severe'> = ['mild', 'moderate', 'severe'];

export function DisabilitySelector({ onSelect, isLoading = false }: DisabilitySelectorProps) {
  const [selectedDisability, setSelectedDisability] = useState<DisabilityType | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<'mild' | 'moderate' | 'severe'>('moderate');
  const [showSeverity, setShowSeverity] = useState(false);
  const { speak, vibrate } = useAccessibility();

  const handleDisabilitySelect = (type: DisabilityType) => {
    setSelectedDisability(type);
    setShowSeverity(true);
    vibrate([30, 20, 30]);
    const label = DISABILITY_OPTIONS.find((d) => d.type === type)?.label;
    speak(`Selected: ${label}`);
  };

  const handleConfirm = () => {
    if (!selectedDisability) return;

    const profile: DisabilityProfile = {
      type: selectedDisability,
      severity: selectedSeverity,
      assistiveTech: [],
      preferredInputMethods: [],
    };

    vibrate([50, 30, 50]);
    speak('Disability profile confirmed');
    onSelect(profile);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 text-balance">
          Welcome to Inclusive Learning
        </h1>
        <p className="text-xl text-gray-300">
          Select your profile to personalize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {DISABILITY_OPTIONS.map((option) => (
          <button
            key={option.type}
            onClick={() => handleDisabilitySelect(option.type)}
            disabled={isLoading}
            className={`relative p-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              selectedDisability === option.type
                ? 'ring-4 ring-yellow-300 bg-opacity-100'
                : 'hover:ring-2 hover:ring-yellow-300'
            } bg-gradient-to-br ${option.color} bg-opacity-20 backdrop-blur-sm`}
            aria-label={`${option.label}: ${option.description}`}
            aria-pressed={selectedDisability === option.type}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-white">{option.icon}</div>
              <h2 className="text-lg font-semibold text-white">{option.label}</h2>
              <p className="text-sm text-gray-200">{option.description}</p>
            </div>
          </button>
        ))}
      </div>

      {showSeverity && selectedDisability && (
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-yellow-300 mb-6">Severity Level</h3>
          <div className="grid grid-cols-3 gap-4">
            {SEVERITY_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedSeverity(level);
                  vibrate([20, 15, 20]);
                  speak(`Severity: ${level}`);
                }}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  selectedSeverity === level
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                aria-pressed={selectedSeverity === level}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDisability && (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setSelectedDisability(null);
              setShowSeverity(false);
              vibrate([20]);
              speak('Selection cleared');
            }}
            disabled={isLoading}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Confirming...' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}
