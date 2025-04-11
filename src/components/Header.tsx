'use client';

import { isAuthenticated } from '@/services/auth';
import UserProfile from './UserProfile';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900">Your App</h1>
          </div>
          <div className="flex items-center">
            {isAuthenticated() && <UserProfile />}
          </div>
        </div>
      </div>
    </header>
  );
} 