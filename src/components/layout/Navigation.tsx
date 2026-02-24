'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Menu, X, LogOut, BookOpen, BarChart3, Heart, Brain } from 'lucide-react';

export function Navigation() {
  const { user, logout } = useAuth();
  const { speak, vibrate } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Courses', href: '/dashboard', icon: BookOpen },
    { label: 'Braille', href: '/learning/braille', icon: BookOpen },
    { label: 'Sign Language', href: '/learning/sign-language', icon: BookOpen },
    { label: 'Dashboard', href: '/dashboard/ai-profile', icon: Brain },
    { label: 'Mental Health', href: '/mental-health', icon: Heart },
  ];

  const handleLogout = () => {
    vibrate([50, 30, 50]);
    speak('Logging out');
    logout();
  };

  const handleNavClick = (label: string) => {
    vibrate([20]);
    speak(`Navigating to ${label}`);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 backdrop-blur-md border-b border-yellow-400 border-opacity-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold text-xl text-yellow-300 hover:text-yellow-200 transition-colors"
            onClick={() => {
              vibrate([20]);
              speak('Home');
            }}
          >
            <BookOpen className="w-6 h-6" aria-hidden="true" />
            <span className="hidden sm:inline">Inclusive Learning</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-yellow-300 transition-colors text-sm font-medium flex items-center gap-1"
                onClick={() => handleNavClick(item.label)}
                aria-label={item.label}
              >
                <item.icon className="w-4 h-4" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:block text-sm text-gray-300">
                <p className="font-semibold text-yellow-300">{user.name}</p>
                <p className="text-xs text-gray-400">{user.disabilityProfile.type}</p>
              </div>
            )}

            <button
              onClick={() => {
                handleLogout();
                window.location.href = '/login';
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                vibrate([20]);
                speak(isOpen ? 'Closing menu' : 'Opening menu');
              }}
              className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-yellow-400" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-yellow-400" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-300 hover:text-yellow-300 hover:bg-gray-800 rounded transition-colors"
                onClick={() => handleNavClick(item.label)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                window.location.href = '/login';
              }}
              className="w-full text-left px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-900 hover:bg-opacity-20 rounded transition-colors text-sm font-semibold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
