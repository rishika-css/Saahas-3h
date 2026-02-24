'use client';

import React, { useEffect, useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useVoiceNavigation } from '@/hooks/useVoiceNavigation';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceControllerProps {
  onNavigate?: (command: string) => void;
  onSearch?: (query: string) => void;
}

export function VoiceController({ onNavigate, onSearch }: VoiceControllerProps) {
  const { preferences, speak, vibrate } = useAccessibility();
  const [transcript, setTranscript] = useState('');
  const [isListeningUI, setIsListeningUI] = useState(false);

  const commands = [
    {
      command: 'home',
      action: () => {
        onNavigate?.('home');
        speak('Navigating to home');
      },
      description: 'Go to home',
    },
    {
      command: 'courses',
      action: () => {
        onNavigate?.('courses');
        speak('Navigating to courses');
      },
      description: 'Open courses',
    },
    {
      command: 'braille',
      action: () => {
        onNavigate?.('braille');
        speak('Opening braille learning');
      },
      description: 'Open braille course',
    },
    {
      command: 'sign language',
      action: () => {
        onNavigate?.('sign-language');
        speak('Opening sign language course');
      },
      description: 'Open sign language',
    },
    {
      command: 'dashboard',
      action: () => {
        onNavigate?.('dashboard');
        speak('Opening personal dashboard');
      },
      description: 'Open dashboard',
    },
    {
      command: 'mental health',
      action: () => {
        onNavigate?.('mental-health');
        speak('Opening mental health portal');
      },
      description: 'Open mental health',
    },
    {
      command: 'settings',
      action: () => {
        onNavigate?.('settings');
        speak('Opening settings');
      },
      description: 'Open settings',
    },
    {
      command: 'logout',
      action: () => {
        speak('Logging out');
        setTimeout(() => window.location.href = '/login', 1000);
      },
      description: 'Log out',
    },
  ];

  const { startListening, stopListening, toggleListening, isListening } = useVoiceNavigation(commands);

  useEffect(() => {
    if (!preferences.voiceNavigationEnabled) {
      stopListening();
      setIsListeningUI(false);
    }
  }, [preferences.voiceNavigationEnabled, stopListening]);

  const handleToggle = () => {
    if (!preferences.voiceNavigationEnabled) {
      speak('Voice navigation is disabled. Please enable it in settings');
      vibrate([100, 50, 100]);
      return;
    }

    toggleListening();
    setIsListeningUI(!isListeningUI);
    vibrate([30, 15, 30]);
  };

  if (!preferences.voiceNavigationEnabled) return null;

  return (
    <div className="fixed top-6 right-6 z-30 flex flex-col items-end gap-3">
      {/* Voice Commands Help */}
      {isListeningUI && (
        <div className="bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-lg p-4 border border-yellow-400 border-opacity-30 max-w-xs">
          <h3 className="text-sm font-semibold text-yellow-300 mb-2 flex items-center gap-2">
            <Volume2 className="w-4 h-4" aria-hidden="true" />
            Available Commands
          </h3>
          <ul className="text-xs text-gray-300 space-y-1">
            {commands.slice(0, 5).map((cmd) => (
              <li key={cmd.command}>
                <span className="text-yellow-400 font-mono">"{cmd.command}"</span> - {cmd.description}
              </li>
            ))}
            <li className="pt-2 border-t border-gray-700 text-gray-400">
              Say a command to navigate...
            </li>
          </ul>
        </div>
      )}

      {/* Voice Control Button */}
      <button
        onClick={handleToggle}
        className={`p-4 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
          isListeningUI
            ? 'bg-red-500 animate-pulse'
            : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
        }`}
        aria-label={isListeningUI ? 'Stop listening' : 'Start voice control'}
        aria-pressed={isListeningUI}
        title={isListeningUI ? 'Listening... (Click to stop)' : 'Click to use voice commands'}
      >
        {isListeningUI ? (
          <MicOff className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <Mic className="w-6 h-6 text-black" aria-hidden="true" />
        )}
      </button>

      {/* Listening Indicator */}
      {isListeningUI && (
        <div className="flex items-center gap-2 bg-gray-800 bg-opacity-80 px-3 py-2 rounded-lg">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-red-500 animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1 h-4 bg-red-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-1 h-4 bg-red-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <span className="text-xs text-red-400 font-semibold">Listening</span>
        </div>
      )}
    </div>
  );
}
