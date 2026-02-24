'use client';

import React, { useState, useMemo } from 'react';
import { Course } from '@/types';
import { CourseCard } from './CourseCard';
import { CourseFilters } from './CourseFilters';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { BookOpen } from 'lucide-react';

interface CoursesDashboardProps {
  courses?: Course[];
}

// Mock data for demonstration
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Braille Basics: Getting Started',
    description: 'Learn the fundamentals of UEB Grade 2 Braille with interactive haptic feedback',
    category: 'braille',
    level: 'beginner',
    duration: 45,
    lessons: Array(5).fill(null).map((_, i) => ({
      id: `lesson-${i}`,
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      interactiveElements: [],
      duration: 10,
    })),
    accessibilityFeatures: [
      { name: 'haptic-feedback', enabled: true, config: {} },
      { name: 'voice-guidance', enabled: true, config: {} },
    ],
    thumbnail: '/courses/braille.jpg',
    instructorId: 'instructor1',
  },
  {
    id: '2',
    title: 'Sign Language Fundamentals',
    description: 'Master basic sign language with video tutorials and practice modes',
    category: 'sign-language',
    level: 'beginner',
    duration: 60,
    lessons: Array(8).fill(null).map((_, i) => ({
      id: `lesson-${i}`,
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      videoUrl: `https://example.com/video-${i}`,
      interactiveElements: [],
      duration: 15,
    })),
    accessibilityFeatures: [
      { name: 'captions', enabled: true, config: {} },
      { name: 'visual-descriptions', enabled: true, config: {} },
    ],
    thumbnail: '/courses/sign-language.jpg',
    instructorId: 'instructor2',
  },
  {
    id: '3',
    title: 'Speech Development & Practice',
    description: 'Improve speech clarity with AI-powered voice analysis and exercises',
    category: 'speech',
    level: 'intermediate',
    duration: 50,
    lessons: Array(6).fill(null).map((_, i) => ({
      id: `lesson-${i}`,
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      interactiveElements: [],
      duration: 12,
    })),
    accessibilityFeatures: [
      { name: 'voice-feedback', enabled: true, config: {} },
      { name: 'text-alternative', enabled: true, config: {} },
    ],
    thumbnail: '/courses/speech.jpg',
    instructorId: 'instructor3',
  },
  {
    id: '4',
    title: 'ADHD Focus & Study Techniques',
    description: 'Personalized learning strategies for ADHD with time management tools',
    category: 'cognitive',
    level: 'beginner',
    duration: 40,
    lessons: Array(7).fill(null).map((_, i) => ({
      id: `lesson-${i}`,
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      interactiveElements: [],
      duration: 10,
    })),
    accessibilityFeatures: [
      { name: 'reduced-distractions', enabled: true, config: {} },
      { name: 'timer-breaks', enabled: true, config: {} },
    ],
    thumbnail: '/courses/cognitive.jpg',
    instructorId: 'instructor4',
  },
  {
    id: '5',
    title: 'Dyslexia-Friendly Reading',
    description: 'Reading and comprehension with dyslexic-friendly fonts and formatting',
    category: 'cognitive',
    level: 'beginner',
    duration: 35,
    lessons: Array(5).fill(null).map((_, i) => ({
      id: `lesson-${i}`,
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      interactiveElements: [],
      duration: 10,
    })),
    accessibilityFeatures: [
      { name: 'dyslexic-font', enabled: true, config: {} },
      { name: 'line-spacing', enabled: true, config: {} },
    ],
    thumbnail: '/courses/dyslexia.jpg',
    instructorId: 'instructor5',
  },
  {
    id: '6',
    title: 'Advanced Braille: Contractions',
    description: 'Master advanced braille contractions and literary techniques',
    category: 'braille',
    level: 'advanced',
    duration: 90,
    lessons: Array(10).fill(null).map((_, i) => ({
      id: `lesson-${i}`,
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      interactiveElements: [],
      duration: 15,
    })),
    accessibilityFeatures: [
      { name: 'haptic-feedback', enabled: true, config: {} },
      { name: 'advanced-exercises', enabled: true, config: {} },
    ],
    thumbnail: '/courses/advanced-braille.jpg',
    instructorId: 'instructor1',
  },
  {
    id: '7',
    title: 'Motor Skills & Adaptive Tech',
    description: 'Learn adaptive technologies and motor skill exercises',
    category: 'motor',
    level: 'intermediate',
    duration: 55,
    lessons: Array(7).fill(null).map((_, i) => ({
      id: `lesson-${i}`,
      title: `Lesson ${i + 1}`,
      content: `Content for lesson ${i + 1}`,
      interactiveElements: [],
      duration: 12,
    })),
    accessibilityFeatures: [
      { name: 'voice-control', enabled: true, config: {} },
      { name: 'adaptive-interface', enabled: true, config: {} },
    ],
    thumbnail: '/courses/motor.jpg',
    instructorId: 'instructor6',
  },
];

export function CoursesDashboard({ courses = MOCK_COURSES }: CoursesDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { speak } = useAccessibility();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [courses, selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-yellow-400" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 text-balance">
            Available Courses
          </h1>
        </div>
        <p className="text-xl text-gray-300">
          Choose a course tailored to your learning needs
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-6 mb-12 border border-yellow-400 border-opacity-20">
        <CourseFilters
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          onCategoryChange={setSelectedCategory}
          onLevelChange={setSelectedLevel}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-300">
        Showing <span className="text-yellow-400 font-bold">{filteredCourses.length}</span>{' '}
        {filteredCourses.length === 1 ? 'course' : 'courses'}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => {
                speak(`Opening course: ${course.title}`);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400 mb-4">No courses found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedLevel(null);
              setSearchQuery('');
              speak('Filters cleared');
            }}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
