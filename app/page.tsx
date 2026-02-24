'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';
import { AnimatedBackground } from '@/src/components/three-scene/AnimatedBackground';

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to appropriate page based on auth state
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-300 mb-4">Inclusive Learning Platform</h1>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    </main>
  );
}
