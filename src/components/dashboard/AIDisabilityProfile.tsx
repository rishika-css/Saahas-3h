'use client';

import React, { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { AIDisabilityProfile as AIProfile } from '@/types';
import { Brain, TrendingUp, Target, Lightbulb, User } from 'lucide-react';

interface AIDisabilityProfileProps {
  profile?: Partial<AIProfile>;
}

// Mock AI Profile for demonstration
const MOCK_AI_PROFILE: AIProfile = {
  userId: 'user1',
  learningPatterns: [
    {
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      courseId: 'braille-1',
      completionRate: 85,
      timeSpent: 120,
      errorRate: 15,
      engagementScore: 8.5,
    },
    {
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      courseId: 'sign-language-1',
      completionRate: 72,
      timeSpent: 150,
      errorRate: 28,
      engagementScore: 7.8,
    },
    {
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      courseId: 'cognitive-1',
      completionRate: 90,
      timeSpent: 90,
      errorRate: 10,
      engagementScore: 9.2,
    },
  ],
  strengths: [
    'Quick visual pattern recognition',
    'Strong persistence and motivation',
    'Excellent audio comprehension',
    'Great tactile learning ability',
  ],
  challenges: [
    'Fine motor control tasks',
    'Extended reading sessions',
    'Processing complex instructions',
    'Multi-step problem solving under pressure',
  ],
  recommendedCourses: [
    'Advanced Braille: Contractions',
    'Speech Development with AI',
    'Motor Skills & Adaptive Tech',
  ],
  predictedDevelopmentAreas: [
    'Mathematical concepts with haptic tools',
    'Creative writing with dictation',
    'Visual descriptions through texture',
  ],
  supportLevel: 'moderate',
};

export function AIDisabilityProfile({ profile = MOCK_AI_PROFILE }: AIDisabilityProfileProps) {
  const { speak, vibrate } = useAccessibility();
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    vibrate([20]);
    speak(`${section} section`);
  };

  const calculateOverallEngagement = () => {
    const avg =
      profile.learningPatterns?.reduce((sum, p) => sum + p.engagementScore, 0) /
        (profile.learningPatterns?.length || 1) || 0;
    return Math.round(avg * 10) / 10;
  };

  const calculateAvgCompletion = () => {
    const avg =
      profile.learningPatterns?.reduce((sum, p) => sum + p.completionRate, 0) /
        (profile.learningPatterns?.length || 1) || 0;
    return Math.round(avg);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-400" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 text-balance">
            Your Learning Profile
          </h1>
        </div>
        <p className="text-xl text-gray-300">
          AI-powered insights tailored to your learning style
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 bg-opacity-30 backdrop-blur-md rounded-lg p-4 border border-blue-400 border-opacity-20">
          <p className="text-sm text-gray-300 mb-2">Overall Engagement</p>
          <p className="text-3xl font-bold text-blue-300">{calculateOverallEngagement()}/10</p>
          <p className="text-xs text-gray-400 mt-2">Excellent progress!</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 bg-opacity-30 backdrop-blur-md rounded-lg p-4 border border-green-400 border-opacity-20">
          <p className="text-sm text-gray-300 mb-2">Avg Completion Rate</p>
          <p className="text-3xl font-bold text-green-300">{calculateAvgCompletion()}%</p>
          <p className="text-xs text-gray-400 mt-2">Above average</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 bg-opacity-30 backdrop-blur-md rounded-lg p-4 border border-orange-400 border-opacity-20">
          <p className="text-sm text-gray-300 mb-2">Courses Completed</p>
          <p className="text-3xl font-bold text-orange-300">{profile.learningPatterns?.length || 0}</p>
          <p className="text-xs text-gray-400 mt-2">Recent activity</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 bg-opacity-30 backdrop-blur-md rounded-lg p-4 border border-red-400 border-opacity-20">
          <p className="text-sm text-gray-300 mb-2">Support Level</p>
          <p className="text-3xl font-bold text-red-300">
            {profile.supportLevel?.charAt(0).toUpperCase() + profile.supportLevel?.slice(1)}
          </p>
          <p className="text-xs text-gray-400 mt-2">Personalized</p>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Strengths */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg border border-yellow-400 border-opacity-20 overflow-hidden">
          <button
            onClick={() => toggleSection('strengths')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-800 hover:bg-opacity-60 transition-colors"
            aria-expanded={expandedSection === 'strengths'}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-yellow-300">Your Strengths</h2>
            </div>
            <span className="text-gray-400">{expandedSection === 'strengths' ? '−' : '+'}</span>
          </button>

          {expandedSection === 'strengths' && (
            <div className="px-6 pb-6 border-t border-gray-700 space-y-3">
              {profile.strengths?.map((strength, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-green-500 bg-opacity-10 rounded-lg border border-green-500 border-opacity-20"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-green-300">{strength}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Challenges */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg border border-yellow-400 border-opacity-20 overflow-hidden">
          <button
            onClick={() => toggleSection('challenges')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-800 hover:bg-opacity-60 transition-colors"
            aria-expanded={expandedSection === 'challenges'}
          >
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-orange-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-yellow-300">Areas to Improve</h2>
            </div>
            <span className="text-gray-400">{expandedSection === 'challenges' ? '−' : '+'}</span>
          </button>

          {expandedSection === 'challenges' && (
            <div className="px-6 pb-6 border-t border-gray-700 space-y-3">
              {profile.challenges?.map((challenge, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-orange-500 bg-opacity-10 rounded-lg border border-orange-500 border-opacity-20"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-orange-300">{challenge}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Courses */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg border border-yellow-400 border-opacity-20 overflow-hidden">
          <button
            onClick={() => toggleSection('recommended')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-800 hover:bg-opacity-60 transition-colors"
            aria-expanded={expandedSection === 'recommended'}
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-yellow-300">Recommended Courses</h2>
            </div>
            <span className="text-gray-400">{expandedSection === 'recommended' ? '−' : '+'}</span>
          </button>

          {expandedSection === 'recommended' && (
            <div className="px-6 pb-6 border-t border-gray-700 space-y-3">
              {profile.recommendedCourses?.map((course, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    vibrate([30]);
                    speak(`Opening ${course}`);
                  }}
                  className="w-full text-left p-3 bg-yellow-500 bg-opacity-10 hover:bg-opacity-20 rounded-lg border border-yellow-500 border-opacity-30 hover:border-opacity-50 transition-all text-yellow-300 font-semibold"
                >
                  {course}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Development Areas */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg border border-yellow-400 border-opacity-20 overflow-hidden">
          <button
            onClick={() => toggleSection('development')}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-800 hover:bg-opacity-60 transition-colors"
            aria-expanded={expandedSection === 'development'}
          >
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-yellow-300">Predicted Development Areas</h2>
            </div>
            <span className="text-gray-400">{expandedSection === 'development' ? '−' : '+'}</span>
          </button>

          {expandedSection === 'development' && (
            <div className="px-6 pb-6 border-t border-gray-700 space-y-3">
              {profile.predictedDevelopmentAreas?.map((area, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-blue-500 bg-opacity-10 rounded-lg border border-blue-500 border-opacity-20"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  <p className="text-blue-300">{area}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
