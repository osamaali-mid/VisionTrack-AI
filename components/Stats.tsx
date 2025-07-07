'use client';

import { useEffect, useState } from 'react';
import { Target, Users, Zap, Award } from 'lucide-react';

const stats = [
  {
    icon: Target,
    label: 'Object Classes',
    value: 80,
    suffix: '+',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Zap,
    label: 'Detection Speed',
    value: 95,
    suffix: '%',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Award,
    label: 'Accuracy Rate',
    value: 92,
    suffix: '%',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Users,
    label: 'Happy Users',
    value: 1000,
    suffix: '+',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function Stats() {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, index) => {
      const increment = stat.value / 50; // 50 steps for smooth animation
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(intervals[index]);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  return (
    <div id="stats-section" className="glass-card dark:glass-card-dark p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Impressive Performance
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Numbers that speak for our AI capabilities
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}