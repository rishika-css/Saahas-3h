'use client';

import React, { useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Video, BookOpen, Hand } from 'lucide-react';

interface SignLanguageStudioProps {
  courseId?: string;
}

export function SignLanguageStudio({ courseId = 'default' }: SignLanguageStudioProps) {
  const { speak, vibrate } = useAccessibility();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [selectedView, setSelectedView] = useState<'video' | 'transcript' | 'practice'>('video');

  const lessons = [
    { id: 1, title: 'Hello & Greetings', duration: 8 },
    { id: 2, title: 'Basic Questions', duration: 12 },
    { id: 3, title: 'Numbers 1-10', duration: 10 },
    { id: 4, title: 'Emotions & Feelings', duration: 15 },
    { id: 5, title: 'Daily Activities', duration: 14 },
  ];

  const currentLessonData = lessons[currentLesson];

  const handleLessonSelect = (index: number) => {
    setCurrentLesson(index);
    vibrate([20, 10, 20]);
    speak(`Playing lesson ${index + 1}: ${lessons[index].title}`);
  };

  const handleViewChange = (view: 'video' | 'transcript' | 'practice') => {
    setSelectedView(view);
    vibrate([20]);
    speak(`Switched to ${view} view`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2 flex items-center gap-2">
          <Hand className="w-8 h-8" aria-hidden="true" />
          Sign Language Learning Studio
        </h1>
        <p className="text-gray-300">Interactive video lessons with transcript and practice</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Video Player Area */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-yellow-400 border-opacity-20">
            {/* Video Placeholder */}
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center relative overflow-hidden group">
              <Video className="w-16 h-16 text-yellow-400 opacity-30" aria-hidden="true" />

              {/* Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="w-full p-4">
                  <p className="text-white font-semibold">{currentLessonData.title}</p>
                  <p className="text-gray-300 text-sm">{currentLessonData.duration} minutes</p>
                </div>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex border-t border-gray-700">
              {(['video', 'transcript', 'practice'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => handleViewChange(view)}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                    selectedView === view
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  aria-pressed={selectedView === view}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 bg-gray-800 bg-opacity-50 min-h-64">
              {selectedView === 'video' && (
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Video player area: {currentLessonData.title}
                  </p>
                  <p className="text-sm text-gray-400">
                    Play button and video controls would be shown here
                  </p>
                </div>
              )}

              {selectedView === 'transcript' && (
                <div className="space-y-4">
                  <h3 className="text-yellow-300 font-semibold mb-4">Transcript</h3>
                  <p className="text-gray-300 leading-relaxed">
                    In this lesson, we'll learn the sign for "{currentLessonData.title}". 
                    Watch carefully as the instructor demonstrates each movement. 
                    Pay attention to hand shape, position, and movement direction.
                  </p>
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-yellow-300 font-semibold mb-2">Key Points:</p>
                    <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                      <li>Hand position starts at chest level</li>
                      <li>Movement is outward and downward</li>
                      <li>Facial expression should be natural</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedView === 'practice' && (
                <div className="space-y-4">
                  <h3 className="text-yellow-300 font-semibold mb-4">Practice Mode</h3>
                  <p className="text-gray-300 mb-4">
                    Use your webcam to record your sign language attempt and get feedback.
                  </p>
                  <div className="w-full aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">Webcam area (requires permission)</p>
                      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold">
                        Start Recording
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                if (currentLesson > 0) handleLessonSelect(currentLesson - 1);
                vibrate([20]);
                speak('Previous lesson');
              }}
              disabled={currentLesson === 0}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 transition-colors font-semibold"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentLesson < lessons.length - 1) handleLessonSelect(currentLesson + 1);
                vibrate([20]);
                speak('Next lesson');
              }}
              disabled={currentLesson === lessons.length - 1}
              className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-500 transition-colors font-semibold"
            >
              Next
            </button>
          </div>
        </div>

        {/* Lessons Sidebar */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-4 border border-yellow-400 border-opacity-20 h-fit max-h-96 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-yellow-400" aria-hidden="true" />
            <h3 className="text-lg font-bold text-yellow-300">Lessons</h3>
          </div>

          <div className="space-y-2">
            {lessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => handleLessonSelect(idx)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  currentLesson === idx
                    ? 'bg-yellow-400 text-black font-semibold'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
                aria-pressed={currentLesson === idx}
                aria-label={`Lesson ${idx + 1}: ${lesson.title}`}
              >
                <p className="font-semibold text-sm">{lesson.title}</p>
                <p className="text-xs opacity-75">{lesson.duration} min</p>
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-6 pt-4 border-t border-gray-600">
            <p className="text-sm text-gray-300 mb-2">Progress</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${((currentLesson + 1) / lessons.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {currentLesson + 1} of {lessons.length} lessons
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
