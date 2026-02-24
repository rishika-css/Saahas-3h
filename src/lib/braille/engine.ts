import { BrailleCharacter, BrailleWord } from '@/types';

// UEB Grade 2 Braille mapping
const BRAILLE_CHARACTERS: Record<string, BrailleCharacter> = {
  a: { character: 'a', dots: [1], uebGrade: 1 },
  b: { character: 'b', dots: [1, 2], uebGrade: 1 },
  c: { character: 'c', dots: [1, 4], uebGrade: 1 },
  d: { character: 'd', dots: [1, 4, 5], uebGrade: 1 },
  e: { character: 'e', dots: [1, 5], uebGrade: 1 },
  f: { character: 'f', dots: [1, 2, 4], uebGrade: 1 },
  g: { character: 'g', dots: [1, 2, 4, 5], uebGrade: 1 },
  h: { character: 'h', dots: [1, 2, 5], uebGrade: 1 },
  i: { character: 'i', dots: [2, 4], uebGrade: 1 },
  j: { character: 'j', dots: [2, 4, 5], uebGrade: 1 },
  k: { character: 'k', dots: [1, 3], uebGrade: 1 },
  l: { character: 'l', dots: [1, 2, 3], uebGrade: 1 },
  m: { character: 'm', dots: [1, 3, 4], uebGrade: 1 },
  n: { character: 'n', dots: [1, 3, 4, 5], uebGrade: 1 },
  o: { character: 'o', dots: [1, 3, 5], uebGrade: 1 },
  p: { character: 'p', dots: [1, 2, 3, 4], uebGrade: 1 },
  q: { character: 'q', dots: [1, 2, 3, 4, 5], uebGrade: 1 },
  r: { character: 'r', dots: [1, 2, 3, 5], uebGrade: 1 },
  s: { character: 's', dots: [2, 3, 4], uebGrade: 1 },
  t: { character: 't', dots: [2, 3, 4, 5], uebGrade: 1 },
  u: { character: 'u', dots: [1, 3, 6], uebGrade: 1 },
  v: { character: 'v', dots: [1, 2, 3, 6], uebGrade: 1 },
  w: { character: 'w', dots: [2, 4, 5, 6], uebGrade: 1 },
  x: { character: 'x', dots: [1, 3, 4, 6], uebGrade: 1 },
  y: { character: 'y', dots: [1, 3, 4, 5, 6], uebGrade: 1 },
  z: { character: 'z', dots: [1, 3, 5, 6], uebGrade: 1 },
  ' ': { character: ' ', dots: [], uebGrade: 1 },
  '.': { character: '.', dots: [2, 5, 6], uebGrade: 1 },
  ',': { character: ',', dots: [2], uebGrade: 1 },
  '?': { character: '?', dots: [2, 3, 6], uebGrade: 1 },
  '!': { character: '!', dots: [2, 3, 5], uebGrade: 1 },
};

/**
 * Convert text to braille
 */
export function textToBraille(text: string): BrailleWord[] {
  const words = text.toLowerCase().split(' ');
  return words.map((word) => {
    const characters = word
      .split('')
      .map((char) => BRAILLE_CHARACTERS[char] || { character: char, dots: [], uebGrade: 1 });

    return {
      word,
      characters,
    };
  });
}

/**
 * Get haptic feedback pattern for a specific braille character
 */
export function getHapticPattern(dots: number[]): number[] {
  if (dots.length === 0) return [100]; // Space character
  const pattern: number[] = [];
  dots.forEach((dot, idx) => {
    pattern.push(50); // Vibration duration
    if (idx < dots.length - 1) pattern.push(30); // Gap between dots
  });
  return pattern;
}

/**
 * Visual representation of braille cell
 */
export function visualizeBrailleCell(dots: number[]): boolean[] {
  const cell = new Array(8).fill(false);
  dots.forEach((dot) => {
    if (dot >= 1 && dot <= 8) {
      cell[dot - 1] = true;
    }
  });
  return cell;
}

/**
 * Generate keyboard hint for braille input
 * Maps F/D/S/J/K/L keys to dots 1-6
 */
export function getKeyboardMapping(): Record<string, number> {
  return {
    f: 1,
    d: 2,
    s: 3,
    j: 4,
    k: 5,
    l: 6,
  };
}

/**
 * Check if braille input is correct
 */
export function validateBrailleInput(inputDots: number[], targetDots: number[]): boolean {
  const inputSorted = [...inputDots].sort();
  const targetSorted = [...targetDots].sort();
  return JSON.stringify(inputSorted) === JSON.stringify(targetSorted);
}

/**
 * Get description of braille character for screen readers
 */
export function describeBrailleCharacter(dots: number[]): string {
  if (dots.length === 0) return 'space';
  return `dots ${dots.join(', ')}`;
}
