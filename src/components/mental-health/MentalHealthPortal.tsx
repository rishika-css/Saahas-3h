'use client';

import React, { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Heart, TrendingUp, MessageCircle, Zap } from 'lucide-react';

interface MentalHealthPortalProps {
  userId?: string;
}

export function MentalHealthPortal({ userId = 'default' }: MentalHealthPortalProps) {
  const { speak, vibrate } = useAccessibility();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

  const moods = [
    { id: 'excellent', label: 'Excellent', emoji: '😄', color: 'from-green-400 to-green-600' },
    { id: 'good', label: 'Good', emoji: '😊', color: 'from-blue-400 to-blue-600' },
    { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'from-yellow-400 to-yellow-600' },
    { id: 'bad', label: 'Bad', emoji: '😟', color: 'from-orange-400 to-orange-600' },
    { id: 'terrible', label: 'Terrible', emoji: '😢', color: 'from-red-400 to-red-600' },
  ];

  const copingStrategies = [
    { id: 1, title: 'Deep Breathing', description: 'Practice 4-7-8 breathing technique' },
    { id: 2, title: 'Progressive Relaxation', description: 'Relax muscle groups sequentially' },
    { id: 3, title: 'Mindfulness Meditation', description: '5-10 minute guided meditation' },
    { id: 4, title: 'Physical Exercise', description: 'Light stretching or walking' },
    { id: 5, title: 'Creative Expression', description: 'Drawing, writing, or music' },
    { id: 6, title: 'Social Connection', description: 'Call a friend or loved one' },
  ];

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    vibrate([30, 15, 30]);
    const mood = moods.find((m) => m.id === moodId);
    speak(`Selected mood: ${mood?.label}`);
    setShowSubmit(true);
  };

  const handleSubmitMood = () => {
    if (!selectedMood) return;

    vibrate([50, 30, 50]);
    speak('Mood entry recorded successfully');
    setSelectedMood(null);
    setNotes('');
    setShowSubmit(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-red-400" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 text-balance">
            Mental Health & Wellness Portal
          </h1>
        </div>
        <p className="text-xl text-gray-300">
          Track your mental health and access coping strategies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mood Tracker */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-8 border border-yellow-400 border-opacity-20">
            <h2 className="text-2xl font-bold text-yellow-300 mb-6">How are you feeling today?</h2>

            {/* Mood Selection */}
            <div className="grid grid-cols-5 gap-3 mb-8">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`p-4 rounded-lg transition-all transform hover:scale-110 ${
                    selectedMood === mood.id
                      ? `bg-gradient-to-br ${mood.color} ring-4 ring-white`
                      : `bg-gray-700 hover:bg-gray-600`
                  }`}
                  aria-label={mood.label}
                  aria-pressed={selectedMood === mood.id}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <p className="text-xs font-semibold text-white">{mood.label}</p>
                </button>
              ))}
            </div>

            {/* Notes Section */}
            {selectedMood && (
              <div className="space-y-4 mb-8 animate-fade-in">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-200">
                  Add optional notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling? What happened today?"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  rows={4}
                  aria-label="Mood notes"
                />

                {/* Submit Button */}
                {showSubmit && (
                  <button
                    onClick={handleSubmitMood}
                    className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300"
                  >
                    Save Mood Entry
                  </button>
                )}
              </div>
            )}

            {/* Recent Mood History */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-yellow-300 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" aria-hidden="true" />
                Recent History
              </h3>
              <div className="space-y-3">
                {[
                  { date: 'Today', mood: 'Excellent', time: '10:30 AM' },
                  { date: 'Yesterday', mood: 'Good', time: '2:15 PM' },
                  { date: '2 days ago', mood: 'Neutral', time: '9:00 AM' },
                ].map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-700 bg-opacity-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-white">{entry.date}</p>
                      <p className="text-sm text-gray-400">{entry.time}</p>
                    </div>
                    <span className="text-yellow-400 font-semibold">{entry.mood}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coping Strategies Sidebar */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-6 border border-yellow-400 border-opacity-20 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-yellow-400" aria-hidden="true" />
            <h3 className="text-lg font-bold text-yellow-300">Coping Strategies</h3>
          </div>

          <div className="space-y-3">
            {copingStrategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => {
                  vibrate([20, 10, 20]);
                  speak(`Opening ${strategy.title}`);
                }}
                className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all text-left group"
                aria-label={strategy.title}
              >
                <p className="font-semibold text-white group-hover:text-yellow-300 transition-colors">
                  {strategy.title}
                </p>
                <p className="text-xs text-gray-400 line-clamp-2">{strategy.description}</p>
              </button>
            ))}
          </div>

          {/* Quick Help */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold">
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Crisis Support
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">
              If you're in crisis, please reach out to a mental health professional
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
