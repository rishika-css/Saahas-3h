import { useEffect, useRef, useCallback } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

export function useVoiceNavigation(commands: VoiceCommand[] = []) {
  const { preferences, speak } = useAccessibility();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition API not supported');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      isListeningRef.current = true;
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      if (event.isFinal) {
        processVoiceCommand(transcript.toLowerCase());
      }
    };

    recognitionRef.current.onend = () => {
      isListeningRef.current = false;
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      speak(`Error: ${event.error}`);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [speak]);

  const processVoiceCommand = useCallback(
    (transcript: string) => {
      for (const cmd of commands) {
        if (transcript.includes(cmd.command.toLowerCase())) {
          cmd.action();
          speak(`Executing ${cmd.description}`);
          return;
        }
      }
      speak('Command not recognized');
    },
    [commands, speak]
  );

  const startListening = useCallback(() => {
    if (!preferences.voiceNavigationEnabled) {
      speak('Voice navigation is disabled');
      return;
    }

    if (recognitionRef.current && !isListeningRef.current) {
      recognitionRef.current.start();
      speak('Listening...');
    }
  }, [preferences.voiceNavigationEnabled, speak]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListeningRef.current) {
      stopListening();
    } else {
      startListening();
    }
  }, [startListening, stopListening]);

  return {
    startListening,
    stopListening,
    toggleListening,
    isListening: isListeningRef.current,
  };
}
