'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { DisabilityProfile } from '@/types';
import { DisabilitySelector } from './DisabilitySelector';
import { LogIn, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [step, setStep] = useState<'disability' | 'credentials'>('disability');
  const [selectedProfile, setSelectedProfile] = useState<DisabilityProfile | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { speak, vibrate } = useAccessibility();

  const handleDisabilitySelect = (profile: DisabilityProfile) => {
    setSelectedProfile(profile);
    setStep('credentials');
    vibrate([50, 30, 50]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    vibrate([30]);

    try {
      if (!selectedProfile) {
        throw new Error('Please select your disability profile');
      }

      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      await login(email, password, selectedProfile);
      vibrate([50, 30, 50]);
      speak('Login successful');
      onSuccess?.();
    } catch (err: any) {
      const errorMsg = err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      speak(errorMsg);
      vibrate([100, 50, 100]);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'disability' && !selectedProfile) {
    return <DisabilitySelector onSelect={handleDisabilitySelect} isLoading={isLoading} />;
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-8 border border-yellow-400 border-opacity-30">
        <h1 className="text-3xl font-bold text-yellow-300 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-300 text-center mb-8">
          {selectedProfile?.type === 'visual' && 'Visual Learning Platform'}
          {selectedProfile?.type === 'hearing' && 'Sign Language & Written Learning'}
          {selectedProfile?.type === 'motor' && 'Accessible Input Methods'}
          {selectedProfile?.type === 'cognitive' && 'ADHD & Dyslexia Support'}
          {selectedProfile?.type === 'speech' && 'Alternative Communication'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-yellow-400" aria-hidden="true" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => speak('Email address field')}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="your@email.com"
                aria-label="Email address"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-yellow-400" aria-hidden="true" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => speak('Password field')}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                placeholder="••••••••"
                aria-label="Password"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            aria-label={isLoading ? 'Signing in' : 'Sign in'}
          >
            <LogIn className="w-5 h-5" aria-hidden="true" />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Additional Options */}
          <div className="text-center text-sm text-gray-400">
            <button
              type="button"
              onClick={() => {
                setStep('disability');
                setSelectedProfile(null);
                speak('Changed disability profile');
              }}
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Change disability profile
            </button>
          </div>
        </form>
      </div>

      {/* Sign Up Link */}
      <div className="text-center mt-8 text-gray-400">
        <span>Don't have an account? </span>
        <button className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold">
          Sign Up
        </button>
      </div>
    </div>
  );
}
