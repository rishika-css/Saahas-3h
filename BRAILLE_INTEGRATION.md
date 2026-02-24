# Braille Logic Integration Guide

## Overview

This document explains how to integrate your existing Braille SQL logic with the frontend Braille learning module.

## Current Frontend Implementation

The braille engine is currently located in:
- **File**: `src/lib/braille/engine.ts`
- **Exports**: Text-to-Braille conversion, haptic patterns, validation

### Current Features

```typescript
// Text to braille conversion
textToBraille("hello") // Returns BrailleWord array

// Haptic feedback patterns
getHapticPattern([1, 2, 3]) // Returns vibration pattern

// Input validation
validateBrailleInput([1, 2], [1, 2]) // Returns boolean

// Cell visualization
visualizeBrailleCell([1, 2, 3, 4, 5, 6]) // Returns boolean[]
```

## Integration Points with Your SQL

Your SQL database likely contains:
- Braille character mappings
- UEB Grade 2 rules
- Word patterns & contractions
- Student progress data

### Mapping to Frontend

| SQL Table | Frontend Component | Usage |
|-----------|------------------|-------|
| `braille_characters` | `BrailleCharacter[]` in types | Character lookups |
| `user_progress` | `LearningPattern[]` | Track progress |
| `lessons` | `Course.lessons[]` | Course structure |
| `contractions` | Engine expansion | Advanced braille |

## Step-by-Step Integration

### Step 1: Create API Routes

Create backend endpoints in `app/api/braille/`:

```typescript
// app/api/braille/convert/route.ts
export async function POST(req: Request) {
  const { text } = await req.json();
  // Query your SQL database
  // Return braille conversion
}

// app/api/braille/validate/route.ts
export async function POST(req: Request) {
  const { userInput, correct } = await req.json();
  // Validate against database
  // Return feedback
}

// app/api/braille/progress/route.ts
export async function POST(req: Request) {
  const { userId, courseId, score } = await req.json();
  // Save progress to database
}
```

### Step 2: Update BrailleLesson Component

Replace mock data with API calls:

```typescript
// src/components/learning/BrailleLesson.tsx

async function checkAnswerWithDatabase(dots: number[]) {
  const response = await fetch('/api/braille/validate', {
    method: 'POST',
    body: JSON.stringify({
      userInput: dots,
      courseId: 'braille-1',
      characterId: currentChar.id
    })
  });
  
  const result = await response.json();
  if (result.isCorrect) {
    // Save progress
    await fetch('/api/braille/progress', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.id,
        courseId: 'braille-1',
        score: score + 1
      })
    });
  }
  return result;
}
```

### Step 3: Extend Engine with Database Functions

```typescript
// src/lib/braille/engine.ts (additions)

// Fetch character mapping from database
export async function getCharacterFromDB(char: string): Promise<BrailleCharacter> {
  const response = await fetch(`/api/braille/char/${encodeURIComponent(char)}`);
  return response.json();
}

// Get advanced contractions from database
export async function getContractionsFromDB(word: string): Promise<BrailleCharacter[]> {
  const response = await fetch('/api/braille/contractions', {
    method: 'POST',
    body: JSON.stringify({ word })
  });
  return response.json();
}

// Validate input against database rules
export async function validateWithDatabaseRules(dots: number[], characterId: string) {
  const response = await fetch('/api/braille/validate-rules', {
    method: 'POST',
    body: JSON.stringify({ dots, characterId })
  });
  return response.json();
}
```

### Step 4: Update Types to Match Your Database

```typescript
// src/types/index.ts (additions)

export interface BrailleCharacter {
  id: string; // From your database
  character: string;
  dots: number[];
  uebGrade: number;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  exampleWords: string[]; // From database
  frequency: number; // How common
}

export interface BrailleLesson {
  id: string;
  title: string;
  characters: BrailleCharacter[];
  targetWords: string[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

### Step 5: Create Backend Schema

Example database structure for your backend:

```sql
-- Braille Characters Table
CREATE TABLE braille_characters (
  id UUID PRIMARY KEY,
  character CHAR(1),
  dots INT[] NOT NULL, -- [1,2,3,4,5,6]
  ueb_grade INT,
  difficulty VARCHAR(50),
  description TEXT,
  example_words TEXT[]
);

-- Braille Lessons Table
CREATE TABLE braille_lessons (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  character_ids UUID[],
  difficulty VARCHAR(50),
  estimated_minutes INT,
  created_at TIMESTAMP
);

-- User Braille Progress
CREATE TABLE user_braille_progress (
  id UUID PRIMARY KEY,
  user_id UUID,
  lesson_id UUID,
  completed_characters INT,
  score FLOAT,
  attempts INT,
  completed_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lesson_id) REFERENCES braille_lessons(id)
);

-- Braille Exercises
CREATE TABLE braille_exercises (
  id UUID PRIMARY KEY,
  lesson_id UUID,
  question TEXT,
  correct_dots INT[],
  explanation TEXT,
  difficulty_level INT,
  FOREIGN KEY (lesson_id) REFERENCES braille_lessons(id)
);
```

### Step 6: Connect Frontend to Backend

Update your environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
BRAILLE_API_ENDPOINT=/api/braille
```

## Mock to Real Data Migration

### Current (Mock)
```typescript
const BRAILLE_CHARACTERS = {
  a: { character: 'a', dots: [1], uebGrade: 1 },
  // ... more mocks
};
```

### After Integration
```typescript
async function loadBrailleCharacters() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/braille/characters`);
  return response.json(); // Real database data
}
```

## Your SQL Query Integration

Your provided SQL query should:

1. **Define character mappings**: Each character → dot patterns
2. **Include contractions**: Multi-character patterns
3. **Store progression**: Beginner → Advanced
4. **Track errors**: Common mistakes
5. **Enable analytics**: Learning patterns

### Example query to use:

```sql
-- Get all characters for a specific lesson
SELECT * FROM braille_characters 
WHERE id IN (SELECT UNNEST(character_ids) FROM braille_lessons WHERE id = $1)
ORDER BY difficulty_level ASC;

-- Get user's recent attempts
SELECT * FROM user_braille_progress 
WHERE user_id = $1 
ORDER BY completed_at DESC 
LIMIT 10;

-- Get character by its braille pattern
SELECT * FROM braille_characters 
WHERE dots = $1;
```

## Testing Integration

### Unit Tests (Frontend)
```typescript
// __tests__/braille/engine.test.ts
describe('Braille Engine with Database', () => {
  it('should convert text using database rules', async () => {
    const result = await textToBraille('hello');
    expect(result).toBeDefined();
  });
});
```

### Integration Tests
```typescript
// __tests__/integration/braille-lesson.test.ts
describe('Braille Lesson with Backend', () => {
  it('should validate against database', async () => {
    const response = await validateWithDatabaseRules([1, 2, 3], 'char-123');
    expect(response.isCorrect).toBe(true);
  });
});
```

## Performance Considerations

### Caching Strategy
```typescript
// Cache character mappings
const characterCache = new Map<string, BrailleCharacter>();

async function getCachedCharacter(char: string) {
  if (characterCache.has(char)) {
    return characterCache.get(char);
  }
  const charData = await getCharacterFromDB(char);
  characterCache.set(char, charData);
  return charData;
}
```

### Batch Queries
```typescript
// Load all lesson characters at once
async function loadLessonCharacters(lessonId: string) {
  const response = await fetch(
    `/api/braille/lesson/${lessonId}/characters`
  );
  return response.json();
}
```

## Advanced Features to Implement

### 1. Adaptive Difficulty
```typescript
// Adjust based on performance
if (score > 0.9) {
  // Unlock advanced characters
  currentDifficulty = 'intermediate';
}
```

### 2. Progress Tracking
```typescript
// Save detailed progress
await saveProgress({
  userId,
  characterId,
  completionTime,
  attempts,
  errors: [/* which dots were wrong */]
});
```

### 3. AI Recommendations
```typescript
// Get personalized recommendations
const recommendations = await fetch('/api/braille/recommendations', {
  method: 'POST',
  body: JSON.stringify({ userId, performanceData })
});
```

### 4. Spaced Repetition
```typescript
// Review characters at optimal intervals
const dueForReview = await fetch('/api/braille/review-schedule', {
  method: 'POST',
  body: JSON.stringify({ userId })
});
```

## Troubleshooting

### Issue: Database connection fails
- Check backend is running
- Verify API endpoint URL
- Check CORS headers
- Review database permissions

### Issue: Character data not loading
- Verify SQL query returns data
- Check database table structure
- Ensure character encoding (UTF-8)
- Add error handling in frontend

### Issue: Progress not saving
- Check user authentication
- Verify database write permissions
- Check for validation errors
- Review server logs

## File Locations for Integration

| File | Purpose | Update For DB |
|------|---------|---------------|
| `src/lib/braille/engine.ts` | Conversion logic | Add API calls |
| `src/components/learning/BrailleLesson.tsx` | UI component | Fetch real data |
| `src/contexts/AuthContext.tsx` | User state | Include user ID |
| `app/api/braille/*` | Backend routes | Create these |
| `src/types/index.ts` | Data shapes | Add DB fields |

## Summary

To fully integrate your Braille SQL logic:

1. ✅ Create backend API routes for braille operations
2. ✅ Update BrailleLesson component to use real data
3. ✅ Extend engine.ts with database functions
4. ✅ Update TypeScript types to match database schema
5. ✅ Implement progress tracking/saving
6. ✅ Add caching for performance
7. ✅ Handle errors gracefully
8. ✅ Test with real database data

The frontend is fully prepared to accept real braille data from your backend!
