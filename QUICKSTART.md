# Quick Start Guide

## Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Overview

This is a fully accessible learning platform with:

- **Disability-aware login** with 5 disability types
- **Accessible courses** across multiple learning modules
- **Voice navigation** for hands-free control
- **Braille learning** with haptic feedback
- **Sign language** video lessons
- **Mental health** tracking & support
- **AI-powered** student profiles
- **Black background with yellow gradient** Three.js animations

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Redirect to login or dashboard |
| `/login` | Disability selection + login |
| `/dashboard` | Courses grid with filters |
| `/learning/braille` | Interactive braille practice |
| `/learning/sign-language` | Sign language video lessons |
| `/mental-health` | Mood tracking & wellness |
| `/dashboard/ai-profile` | Learning insights dashboard |

## Testing the App

### 1. Login
- Select your disability type (visual/hearing/motor/cognitive/speech)
- Choose severity (mild/moderate/severe)
- Enter any email & password

### 2. Explore Features
- **Accessibility Panel** (bottom right) - Test settings
- **Voice Control** (top right) - Enable and speak commands
- **Courses** - Browse & filter courses
- **Braille** - Learn with keyboard input (F/D/S/J/K/L)
- **Sign Language** - Browse video lessons
- **Mental Health** - Track your mood
- **Dashboard** - View AI insights

### 3. Try Accessibility Features
- Enable ADHD Focus Mode
- Toggle Dyslexic Font
- Adjust Brightness (50-200%)
- Enable Voice Navigation
- Increase Font Size
- Try High Contrast

## Project Structure

```
src/
├── contexts/          # Auth & Accessibility state
├── components/        # All UI components
│   ├── auth/         # Login & disability selection
│   ├── learning/     # Braille, sign language
│   ├── courses/      # Course browsing
│   ├── accessibility/# Settings panel
│   ├── voice/        # Voice commands
│   ├── mental-health/# Wellness tracking
│   ├── dashboard/    # AI insights
│   └── three-scene/  # 3D background
├── lib/              # Utilities (braille engine)
├── hooks/            # Custom hooks (voice navigation)
└── types/            # TypeScript interfaces
```

## Available Commands (Voice)

When voice navigation is enabled, try saying:
- "home" - Go to dashboard
- "courses" - Open courses
- "braille" - Braille learning
- "sign language" - Sign language course
- "dashboard" - AI profile
- "mental health" - Wellness portal
- "settings" - Open settings
- "logout" - Log out

## Component Highlights

### BrailleLesson.tsx
- Interactive braille cell visualization
- Keyboard input mapping (F/D/S/J/K/L)
- Haptic feedback on correct answers
- Score tracking

### AccessibilityPanel.tsx
- Floating settings button
- 9 accessibility toggles
- Real-time preference updates
- Voice feedback on changes

### AnimatedBackground.tsx
- Three.js particle system
- Yellow gradient particles
- Black background
- Respects animation preferences

### CoursesDashboard.tsx
- 7 mock courses
- Category & difficulty filters
- Search functionality
- Course cards with details

## Accessibility Features

- ✅ Keyboard-only navigation
- ✅ Screen reader support with ARIA labels
- ✅ Voice navigation & commands
- ✅ Haptic feedback for actions
- ✅ ADHD focus mode
- ✅ Dyslexic-friendly fonts
- ✅ Brightness adjustment
- ✅ High contrast mode
- ✅ Reduced motion support
- ✅ Color-blind friendly palette

## Responsive Design

- Mobile-first approach
- Desktop optimizations
- Tablet-friendly layouts
- Landscape mode support

## Performance

- Code splitting with Next.js
- Lazy-loaded components
- Optimized Three.js rendering
- ~2-3s initial load time

## Customization

### Change Theme Colors
Edit the gradient colors in:
- `components/three-scene/AnimatedBackground.tsx`
- `app/globals.css`

### Add New Course
1. Add to `MOCK_COURSES` array in `CoursesDashboard.tsx`
2. Create new learning component if needed
3. Link in `Navigation.tsx`

### Add Accessibility Feature
1. Update `AccessibilityPreferences` in `types/index.ts`
2. Add toggle in `AccessibilityPanel.tsx`
3. Implement logic in `ThemeProvider.tsx`
4. Update `AccessibilityContext.tsx`

## Next Steps

1. **Connect Backend**: Replace mock data with API calls
2. **User Accounts**: Implement real authentication
3. **Database**: Store courses, progress, mental health data
4. **Video Hosting**: Setup video streaming for sign language
5. **AI Integration**: Connect ML model for disability profile

## Troubleshooting

### Voice Recognition Not Working
- Check browser support (Chrome/Edge recommended)
- Ensure microphone permissions granted
- Enable "Voice Navigation" in settings

### 3D Background Not Rendering
- Check GPU support
- Try disabling animations
- Use Chrome/Firefox/Edge

### Accessibility Features Not Applying
- Refresh page after changes
- Check localStorage permissions
- Try incognito mode

## Technologies Used

- **Next.js 16** - Framework
- **React 19** - UI library
- **Three.js** - 3D graphics
- **React Three Fiber** - React wrapper for Three.js
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Web Speech API** - Voice recognition
- **Vibration API** - Haptic feedback

## License

Part of the Inclusive Learning Platform project.

## Support

For issues or feature requests, please contact the development team.
