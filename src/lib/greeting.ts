import { Sun, Moon, Coffee, Sunrise } from 'lucide-react';

type Greeting = {
  greeting: string;
  icon: any; // Lucide icon component
  color: string;
};

export const getGreeting = (): Greeting => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Bom dia',
      icon: Sunrise,
      color: 'text-yellow-400'
    };
  } else if (hour >= 12 && hour < 18) {
    return {
      greeting: 'Boa tarde',
      icon: Sun,
      color: 'text-orange-400'
    };
  } else {
    return {
      greeting: 'Boa noite',
      icon: Moon,
      color: 'text-indigo-400'
    };
  }
};

export const getAnimatedColors = (): string => {
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-teal-500',
    'from-red-500 to-orange-500',
    'from-green-500 to-emerald-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-purple-500'
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};