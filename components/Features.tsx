'use client';

import { Zap, Eye, Upload, Download, Shield, Cpu, Video, Camera } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Real-time Detection',
    description: 'Instantly detect and identify objects in images, videos, and live webcam feeds.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Powered by optimized TensorFlow.js models for quick processing.',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Upload,
    title: 'Easy Upload',
    description: 'Drag and drop or click to upload images and videos. Supports multiple formats.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Video,
    title: 'Video Analysis',
    description: 'Upload and analyze video files with frame-by-frame object detection.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Camera,
    title: 'Live Webcam',
    description: 'Real-time object detection using your device camera with live FPS monitoring.',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: Download,
    title: 'Export Results',
    description: 'Download your detection results with bounding boxes and labels.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All processing happens in your browser. Your images never leave your device.',
    color: 'from-red-500 to-red-600'
  },
];

export default function Features() {
  return (
    <div className="glass-card dark:glass-card-dark p-8 mb-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Powerful AI Features
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Experience cutting-edge computer vision technology with our advanced object detection system
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}