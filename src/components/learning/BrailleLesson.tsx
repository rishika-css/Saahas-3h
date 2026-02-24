'use client';

import React, { useState, useEffect } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import {
  textToBraille,
  getHapticPattern,
  visualizeBrailleCell,
  getKeyboardMapping,
  validateBrailleInput,
  describeBrailleCharacter,
} from '@/lib/braille/engine';
import { CheckCircle, XCircle, Volume2 } from 'lucide-react';

interface BrailleLessonProps {
  word?: string;
}

export function BrailleLesson({ word = 'hello' }: BrailleLessonProps) {
  const { speak, vibrate, preferences } = useAccessibility();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [userInputDots, setUserInputDots] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);

  const brailleWords = textToBraille(word);
  const currentWord = brailleWords[currentWordIndex];
  const currentChar = currentWord.characters[currentCharIndex];
  const keyboardMapping = getKeyboardMapping();

  useEffect(() => {
    if (currentChar && currentChar.dots.length > 0) {
      speak(`Character: ${currentChar.character}. Enter braille pattern.`);
    }
  }, [currentChar, speak]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (keyboardMapping[key as keyof typeof keyboardMapping]) {
      e.preventDefault();
      const dotNumber = keyboardMapping[key as keyof typeof keyboardMapping];
      const newDots = [...userInputDots, dotNumber].sort();
      setUserInputDots(newDots);

      // Haptic feedback for dot input
      vibrate([30]);
      speak(`Dot ${dotNumber} entered`);
    }

    if (key === 'enter') {
      e.preventDefault();
      checkAnswer();
    }

    if (key === 'backspace') {
      e.preventDefault();
      setUserInputDots(userInputDots.slice(0, -1));
      speak('Dot removed');
      vibrate([20]);
    }
  };

  const checkAnswer = () => {
    const isCorrect = validateBrailleInput(userInputDots, currentChar.dots);

    if (isCorrect) {
      setFeedback('correct');
      vibrate([50, 30, 50, 30, 50]);
      speak('Correct!');
      setScore(score + 1);

      // Move to next character
      setTimeout(() => {
        if (currentCharIndex < currentWord.characters.length - 1) {
          setCurrentCharIndex(currentCharIndex + 1);
        } else if (currentWordIndex < brailleWords.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setCurrentCharIndex(0);
        }
        setUserInputDots([]);
        setFeedback(null);
      }, 1500);
    } else {
      setFeedback('incorrect');
      vibrate([100, 50, 100]);
      speak('Incorrect, try again');
    }
  };

  const playCharacterAudio = () => {
    speak(`Character: ${currentChar.character}`);
    vibrate(getHapticPattern(currentChar.dots));
  };

  if (!currentChar) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Lesson Complete!</h2>
        <p className="text-xl text-gray-200">
          Your score: <span className="text-yellow-400 font-bold">{score}/{word.length}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg border border-yellow-400 border-opacity-30">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">Braille Learning</h2>
        <p className="text-gray-300">Word: {word}</p>
        <p className="text-gray-400 text-sm">
          Progress: {currentWordIndex + 1}/{brailleWords.length} words
        </p>
      </div>

      {/* Braille Cell Visualization */}
      <div className="bg-gray-700 rounded-lg p-8 mb-6">
        <div className="flex justify-center gap-4 mb-6">
          <BrailleCellVisualizer dots={currentChar.dots} />
          <div className="flex flex-col justify-center gap-2">
            <button
              onClick={playCharacterAudio}
              className="p-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-2"
              aria-label="Hear character"
            >
              <Volume2 className="w-5 h-5" aria-hidden="true" />
              Hear
            </button>
            <p className="text-sm text-gray-300 text-center">
              {describeBrailleCharacter(currentChar.dots)}
            </p>
          </div>
        </div>

        {/* Keyboard Mapping Help */}
        <div className="bg-gray-800 rounded p-4 mb-6">
          <p className="text-sm text-gray-300 mb-3">Use these keys to enter dots:</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(keyboardMapping).map(([key, dot]) => (
              <div
                key={key}
                className={`p-2 bg-gray-700 rounded text-center text-sm font-mono ${
                  userInputDots.includes(dot) ? 'bg-yellow-500 text-black font-bold' : 'text-gray-300'
                }`}
              >
                {key.toUpperCase()} = {dot}
              </div>
            ))}
          </div>
        </div>

        {/* User Input Display */}
        <div className="bg-gray-900 rounded p-4 mb-6">
          <p className="text-sm text-gray-400 mb-2">Your pattern:</p>
          <div className="flex items-center gap-3">
            {userInputDots.length > 0 ? (
              <>
                <div className="flex gap-1">
                  {userInputDots.map((dot) => (
                    <span
                      key={dot}
                      className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-sm"
                    >
                      {dot}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setUserInputDots([]);
                    speak('Pattern cleared');
                    vibrate([20]);
                  }}
                  className="ml-auto text-sm text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Clear
                </button>
              </>
            ) : (
              <p className="text-gray-500">Enter dots using F, D, S, J, K, L keys</p>
            )}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
              feedback === 'correct'
                ? 'bg-green-500 bg-opacity-20 border border-green-500 text-green-300'
                : 'bg-red-500 bg-opacity-20 border border-red-500 text-red-300'
            }`}
          >
            {feedback === 'correct' ? (
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
            ) : (
              <XCircle className="w-5 h-5" aria-hidden="true" />
            )}
            <span className="font-semibold">
              {feedback === 'correct' ? 'Correct! Moving to next character...' : 'Try again'}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={checkAnswer}
            disabled={userInputDots.length === 0}
            className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-600 transition-colors font-semibold"
          >
            Check
          </button>
          <button
            onClick={playCharacterAudio}
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Repeat
          </button>
        </div>
      </div>

      {/* Score */}
      <div className="text-right">
        <p className="text-gray-300">
          Score: <span className="text-yellow-400 font-bold">{score}</span>
        </p>
      </div>
    </div>
  );
}

function BrailleCellVisualizer({ dots }: { dots: number[] }) {
  const cell = visualizeBrailleCell(dots);

  return (
    <div className="bg-white rounded-lg p-4" style={{ width: '80px', aspectRatio: '2/3' }}>
      <div className="grid grid-cols-2 gap-1 h-full">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all ${
              cell[idx] ? 'bg-black scale-100' : 'bg-gray-300 scale-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
