'use client';

import React from 'react';
import { Course } from '@/types';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Clock, BarChart3, Badge } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const { speak, vibrate } = useAccessibility();

  const handleClick = () => {
    vibrate([30, 15, 30]);
    speak(`Opening ${course.title}`);
    onClick?.();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      braille: 'from-blue-400 to-blue-600',
      'sign-language': 'from-purple-400 to-purple-600',
      speech: 'from-red-400 to-red-600',
      cognitive: 'from-orange-400 to-orange-600',
      motor: 'from-green-400 to-green-600',
    };
    return colors[category] || 'from-yellow-400 to-yellow-600';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      braille: 'Braille',
      'sign-language': 'Sign Language',
      speech: 'Speech',
      cognitive: 'Cognitive',
      motor: 'Motor Skills',
    };
    return labels[category] || category;
  };

  return (
    <button
      onClick={handleClick}
      className="group h-full rounded-lg overflow-hidden bg-gray-800 bg-opacity-40 backdrop-blur-md border border-yellow-400 border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/20 hover:scale-105 transform text-left"
      aria-label={`${course.title}, ${getCategoryLabel(course.category)}, ${course.level} level`}
    >
      {/* Thumbnail */}
      <div
        className={`w-full h-40 bg-gradient-to-br ${getCategoryColor(
          course.category
        )} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-4xl opacity-20 group-hover:opacity-30 transition-opacity">
            {course.category === 'braille' && '⠿'}
            {course.category === 'sign-language' && '🤟'}
            {course.category === 'speech' && '🎙️'}
            {course.category === 'cognitive' && '🧠'}
            {course.category === 'motor' && '🖐️'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-yellow-300 line-clamp-2">{course.title}</h3>
          <Badge
            className={`ml-2 px-2 py-1 rounded text-xs font-semibold bg-gradient-to-r ${getCategoryColor(
              course.category
            )} text-white whitespace-nowrap`}
          >
            {getCategoryLabel(course.category)}
          </Badge>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2 mb-4">{course.description}</p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{course.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" aria-hidden="true" />
            <span className="capitalize">{course.level}</span>
          </div>
        </div>

        {/* Lessons Count */}
        <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
          {course.lessons.length} lessons available
        </div>
      </div>
    </button>
  );
}
