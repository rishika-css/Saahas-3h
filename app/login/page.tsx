import React from 'react';
import { AnimatedBackground } from '@/src/components/three-scene/AnimatedBackground';
import { LoginForm } from '@/src/components/auth/LoginForm';

export const metadata = {
  title: 'Login | Inclusive Learning Platform',
  description: 'Sign in to your personalized accessible learning experience',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </main>
  );
}
