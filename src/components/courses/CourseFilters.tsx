'use client';

import React from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Filter, X } from 'lucide-react';

interface CourseFiltersProps {
  selectedCategory: string | null;
  selectedLevel: string | null;
  onCategoryChange: (category: string | null) => void;
  onLevelChange: (level: string | null) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const CATEGORIES = ['braille', 'sign-language', 'speech', 'cognitive', 'motor'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];

export function CourseFilters({
  selectedCategory,
  selectedLevel,
  onCategoryChange,
  onLevelChange,
  onSearch,
  searchQuery,
}: CourseFiltersProps) {
  const { speak, vibrate } = useAccessibility();

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    onCategoryChange(newCategory);
    vibrate([20]);
    speak(`Filter by ${newCategory || 'all'} ${newCategory ? 'courses' : ''}`);
  };

  const handleLevelClick = (level: string) => {
    const newLevel = selectedLevel === level ? null : level;
    onLevelChange(newLevel);
    vibrate([20]);
    speak(`Filter by ${newLevel || 'all'} ${newLevel ? 'difficulty' : ''}`);
  };

  const handleClearFilters = () => {
    onCategoryChange(null);
    onLevelChange(null);
    onSearch('');
    vibrate([30]);
    speak('Filters cleared');
  };

  const hasActiveFilters = selectedCategory || selectedLevel || searchQuery;

  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <div className="space-y-2">
        <label htmlFor="search" className="block text-sm font-medium text-gray-200">
          Search Courses
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearch(e.target.value);
              speak(`Search for ${e.target.value}`);
            }}
            placeholder="Search by title..."
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
            aria-label="Search courses"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-yellow-400" aria-hidden="true" />
          <label className="text-sm font-medium text-gray-200">Category</label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category === 'sign-language' ? 'Sign Language' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Difficulty Level</label>
        <div className="grid grid-cols-3 gap-2">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => handleLevelClick(level)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedLevel === level
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              aria-pressed={selectedLevel === level}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          aria-label="Clear all filters"
        >
          <X className="w-4 h-4" aria-hidden="true" />
          Clear Filters
        </button>
      )}
    </div>
  );
}
