import React from 'react';
import { BookOpen, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gt-navy text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-gt-gold" />
            <div>
              <h1 className="text-xl font-bold">GT Academic Planner</h1>
              <p className="text-sm text-gray-300">Georgia Institute of Technology</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-gray-300">Computer Science • Spring 2026</p>
            </div>
            <div className="w-10 h-10 bg-gt-gold rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gt-navy" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}