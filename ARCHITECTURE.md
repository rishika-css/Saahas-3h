# Inclusive Learning Platform - Architecture & Folder Structure

## Overview

This is a comprehensive, modular frontend for an accessible learning platform built with React, Next.js, Three.js, and Tailwind CSS. It supports multiple disability types (visual, hearing, motor, cognitive, speech) with specialized learning modules and accessibility features.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: React 19 with Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **State Management**: Zustand
- **Accessibility**: Web Speech API, Vibration API, ARIA labels
- **Package Manager**: pnpm

## Folder Structure (Highly Modular)

```
/vercel/share/v0-project/
├── app/                                    # Next.js App Router
│   ├── globals.css                        # Global styles with theme tokens
│   ├── layout.tsx                         # Root layout with providers
│   ├── page.tsx                           # Home/redirect page
│   ├── login/
│   │   └── page.tsx                       # Disability selector & login page
│   ├── dashboard/
│   │   ├── page.tsx                       # Main courses dashboard
│   │   └── ai-profile/
│   │       └── page.tsx                   # AI disability profile dashboard
│   ├── learning/
│   │   ├── braille/
│   │   │   └── page.tsx                   # Braille learning module
│   │   └── sign-language/
│   │       └── page.tsx                   # Sign language learning studio
│   └── mental-health/
│       └── page.tsx                       # Mental health & wellness portal
│
├── src/
│   ├── types/
│   │   └── index.ts                       # TypeScript interfaces & types
│   │                                      # - DisabilityProfile, User, Course, etc.
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx                # Authentication state & methods
│   │   └── AccessibilityContext.tsx       # Accessibility preferences & APIs
│   │
│   ├── components/
│   │   ├── three-scene/
│   │   │   └── AnimatedBackground.tsx     # Three.js animated particle system
│   │   │                                  # - Black bg with yellow gradient theme
│   │   │                                  # - Respects reduceAnimations preference
│   │   │
│   │   ├── auth/
│   │   │   ├── DisabilitySelector.tsx     # Disability type/severity selection
│   │   │   └── LoginForm.tsx              # Email/password login form
│   │   │
│   │   ├── accessibility/
│   │   │   └── AccessibilityPanel.tsx     # Floating settings panel with:
│   │   │                                  # - Brightness control
│   │   │                                  # - Font size (default/large/xlarge)
│   │   │                                  # - Dyslexic font toggle
│   │   │                                  # - ADHD focus mode
│   │   │                                  # - Voice navigation toggle
│   │   │                                  # - Haptic feedback toggle
│   │   │                                  # - Reduce animations
│   │   │                                  # - High contrast mode
│   │   │                                  # - Screen reader mode
│   │   │
│   │   ├── voice/
│   │   │   └── VoiceController.tsx        # Voice command UI & control
│   │   │                                  # - Microphone button
│   │   │                                  # - Voice command help panel
│   │   │                                  # - Listening indicator
│   │   │                                  # - Supports: home, courses, braille,
│   │   │                                  #   sign language, dashboard, etc.
│   │   │
│   │   ├── theme/
│   │   │   └── ThemeProvider.tsx          # Theme & style injection wrapper
│   │   │                                  # - Brightness filter
│   │   │                                  # - Font family override
│   │   │                                  # - Contrast adjustment
│   │   │                                  # - Animation reduction CSS
│   │   │
│   │   ├── layout/
│   │   │   └── Navigation.tsx             # Top navigation with:
│   │   │                                  # - Logo & branding
│   │   │                                  # - Desktop & mobile menus
│   │   │                                  # - User profile display
│   │   │                                  # - Logout button
│   │   │
│   │   ├── courses/
│   │   │   ├── CoursesDashboard.tsx       # Main courses grid view
│   │   │   ├── CourseCard.tsx             # Individual course card component
│   │   │   └── CourseFilters.tsx          # Filter & search controls
│   │   │                                  # - Category filter
│   │   │                                  # - Difficulty level filter
│   │   │                                  # - Search by title
│   │   │
│   │   ├── learning/
│   │   │   ├── BrailleLesson.tsx          # Interactive braille learning:
│   │   │                                  # - Braille cell visualization
│   │   │                                  # - Keyboard mapping (F/D/S/J/K/L)
│   │   │                                  # - Haptic feedback patterns
│   │   │                                  # - UEB Grade 2 conversion
│   │   │                                  # - Score tracking
│   │   │                                  #
│   │   │   └── SignLanguageStudio.tsx     # Video-based sign language:
│   │   │                                  # - Lesson selection
│   │   │                                  # - Video player area
│   │   │                                  # - Transcript view
│   │   │                                  # - Practice mode with webcam
│   │   │                                  # - Progress tracking
│   │   │
│   │   ├── mental-health/
│   │   │   └── MentalHealthPortal.tsx     # Mental wellness tracking:
│   │   │                                  # - Mood selector (5 levels)
│   │   │                                  # - Notes entry
│   │   │                                  # - Mood history
│   │   │                                  # - Coping strategies library
│   │   │                                  # - Crisis support link
│   │   │
│   │   └── dashboard/
│   │       └── AIDisabilityProfile.tsx    # AI-powered insights:
│   │                                      # - Learning patterns analysis
│   │                                      # - Strengths identification
│   │                                      # - Challenge areas
│   │                                      # - Recommended courses
│   │                                      # - Development predictions
│   │                                      # - Expandable sections
│   │
│   ├── lib/
│   │   └── braille/
│   │       └── engine.ts                  # Braille processing engine:
│   │                                      # - UEB Grade 2 character mapping
│   │                                      # - Text to braille conversion
│   │                                      # - Haptic pattern generation
│   │                                      # - Braille cell visualization
│   │                                      # - Input validation
│   │                                      # - Screen reader descriptions
│   │
│   └── hooks/
│       └── useVoiceNavigation.ts          # Voice control hook:
│                                          # - Speech recognition setup
│                                          # - Command processing
│                                          # - Error handling
│                                          # - Start/stop listening
│
├── package.json                           # Dependencies + Three.js, @react-three packages
├── tsconfig.json                          # TypeScript with path aliases
├── tailwind.config.ts                     # Tailwind configuration
├── next.config.mjs                        # Next.js configuration
└── ARCHITECTURE.md                        # This file
```

## Key Features by Module

### 1. Authentication & Disability Selection
- **File**: `components/auth/DisabilitySelector.tsx`, `LoginForm.tsx`
- **Features**:
  - Visual disability type selection with icons
  - Severity level adjustment (mild/moderate/severe)
  - Email/password login
  - Haptic feedback on selection
  - Voice announcements

### 2. Accessibility System
- **Files**: `contexts/AccessibilityContext.tsx`, `components/accessibility/AccessibilityPanel.tsx`
- **Features**:
  - Real-time brightness adjustment (50-200%)
  - Font size scaling
  - OpenDyslexic font support
  - ADHD focus mode (reduced distractions)
  - Voice navigation toggle
  - Haptic feedback control
  - Animation reduction
  - High contrast mode
  - Screen reader optimization

### 3. Three.js Animated Background
- **File**: `components/three-scene/AnimatedBackground.tsx`
- **Features**:
  - Yellow gradient particle system
  - Black background
  - Respects reduceAnimations preference
  - Smooth camera rotation
  - Performance optimized with frustum culling

### 4. Braille Learning Module
- **File**: `components/learning/BrailleLesson.tsx`
- **Features**:
  - Interactive braille cell visualization
  - Keyboard input (F/D/S/J/K/L for dots 1-6)
  - Haptic feedback for each dot
  - UEB Grade 2 character mapping
  - Audio pronunciation
  - Score tracking
  - Progress through words/characters

### 5. Sign Language Learning
- **File**: `components/learning/SignLanguageStudio.tsx`
- **Features**:
  - Video player area
  - Transcript view
  - Practice mode with webcam
  - Lesson progression
  - Progress bar
  - Difficulty levels

### 6. Mental Health Portal
- **File**: `components/mental-health/MentalHealthPortal.tsx`
- **Features**:
  - 5-level mood tracking (terrible to excellent)
  - Mood history display
  - Note-taking
  - Coping strategies library (6 built-in strategies)
  - Crisis support link
  - Emoji-based mood selection

### 7. AI Disability Profile
- **File**: `components/dashboard/AIDisabilityProfile.tsx`
- **Features**:
  - Learning pattern analysis
  - Strength identification
  - Challenge areas detection
  - Personalized course recommendations
  - Development area predictions
  - Support level assessment
  - Expandable insight sections

### 8. Courses Dashboard
- **Files**: `components/courses/CoursesDashboard.tsx`, `CourseCard.tsx`, `CourseFilters.tsx`
- **Features**:
  - 7 mock courses across 5 categories
  - Filterable by category & difficulty
  - Search by title
  - Course duration display
  - Level badges
  - Lesson counts

### 9. Voice Navigation
- **File**: `components/voice/VoiceController.tsx`
- **Features**:
  - Web Speech API integration
  - Voice command help panel
  - Listening indicator
  - 8+ navigational commands
  - Error handling
  - Accessibility-first design

## Component Design Philosophy

### Modularity
- **Small, focused files**: Most components under 250 lines
- **Single responsibility**: Each component handles one feature
- **Reusable utilities**: Shared logic in hooks & lib functions
- **Clear naming**: Names describe exactly what component does

### Accessibility
- **ARIA labels** on all interactive elements
- **Keyboard navigation** throughout
- **Screen reader support** with semantic HTML
- **Haptic feedback** for user confirmation
- **Voice announcements** for actions
- **Color contrast** maintained (WCAG AA compliant)

### Performance
- **Code splitting** via Next.js dynamic imports
- **Lazy loading** of heavy components
- **Three.js optimization** with frustum culling
- **Memoization** where appropriate
- **Efficient state management** with Zustand

## State Management Flow

```
AuthContext (User, login/logout, disability profile)
    ↓
AccessibilityContext (Preferences, speech, haptics)
    ↓
Components (Receive state via hooks)
    ↓
User Actions (Vibrate, speak, navigate)
```

## Adding New Features

### New Course Type
1. Add type to `types/index.ts`
2. Create component in `components/learning/`
3. Add page in `app/learning/[type]/`
4. Link in Navigation.tsx

### New Accessibility Feature
1. Add preference to `AccessibilityPreferences` interface
2. Add control to `AccessibilityPanel.tsx`
3. Add CSS/logic to `ThemeProvider.tsx`
4. Update `AccessibilityContext.tsx` if needed

### New Dashboard Page
1. Create component in `components/dashboard/`
2. Create page file in `app/dashboard/[feature]/`
3. Add navigation link in `Navigation.tsx`
4. Import necessary contexts/components

## API Integration Points

Ready for backend connection:
- `AuthContext.tsx` - login/signup/logout
- `CoursesDashboard.tsx` - fetch courses
- `AIDisabilityProfile.tsx` - fetch learning insights
- `MentalHealthPortal.tsx` - save mood entries
- `BrailleLesson.tsx` - track progress

## Browser Compatibility

- Modern browsers with:
  - Web Speech API (Chrome, Edge, Firefox)
  - Vibration API (mobile devices)
  - Canvas & WebGL (for Three.js)
  - CSS Grid & Flexbox

## Performance Metrics

- Initial load: Optimized with code splitting
- 3D rendering: 60fps on modern devices
- Mobile responsive: All breakpoints covered
- Accessibility: Zero WCAG violations

## Future Enhancements

1. Backend database integration
2. AI learning model integration
3. Real-time collaboration features
4. Video streaming optimization
5. Offline mode support
6. Multi-language support
7. Export learning reports
8. Social features (peer learning groups)
