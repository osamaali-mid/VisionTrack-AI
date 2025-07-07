'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Camera, Zap, Eye, Download, RotateCcw, AlertCircle, Video } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

interface Detection {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

interface DetectionResult {
  detections: Detection[];
  imageUrl?: string;
  fileName?: string;
  timestamp?: number;
}

type DetectionMode = 'image' | 'video' | 'webcam';

export default function ObjectDetection() {
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectionMode, setDetectionMode] = useState<DetectionMode>('image');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load the model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        await tf.ready();
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setError(null);
      } catch (err) {
        setError('Failed to load the AI model. Please refresh the page and try again.');
        console.error('Error loading model:', err);
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    
    if (!isImage) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.');
      return;
    }

    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
        detectObjects(e.target.result as string, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const detectObjects = async (imageUrl: string, fileName: string) => {
    if (!model) {
      setError('AI model is not loaded yet. Please wait and try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      const predictions = await model.detect(img);
      
      const detections: Detection[] = predictions.map(prediction => ({
        bbox: prediction.bbox as [number, number, number, number],
        class: prediction.class,
        score: prediction.score
      }));

      const result: DetectionResult = {
        detections,
        imageUrl,
        fileName,
        timestamp: Date.now()
      };

      setDetectionResults(prev => [result, ...prev.slice(0, 4)]);
      drawDetections(img, detections);
      
    } catch (err) {
      setError('Failed to detect objects. Please try with a different image.');
      console.error('Detection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const drawDetections = (source: HTMLImageElement, detections: Detection[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match source
    canvas.width = source.width;
    canvas.height = source.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the source
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

    // Draw detections
    detections.forEach((detection, index) => {
      const [x, y, width, height] = detection.bbox;
      const confidence = Math.round(detection.score * 100);
      
      // Generate a color based on the class
      const hue = (index * 137.508) % 360;
      const color = `hsl(${hue}, 70%, 50%)`;
      
      // Draw bounding box
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
      
      // Draw label background
      const label = `${detection.class} (${confidence}%)`;
      ctx.font = '16px Inter, sans-serif';
      const textWidth = ctx.measureText(label).width;
      const textHeight = 20;
      
      ctx.fillStyle = color;
      ctx.fillRect(x, y - textHeight - 4, textWidth + 8, textHeight + 4);
      
      // Draw label text
      ctx.fillStyle = 'white';
      ctx.fillText(label, x + 4, y - 8);
    });
  };

  const downloadResult = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `detection-result-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const clearResults = () => {
    setDetectionResults([]);
    setSelectedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isModelLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-emerald-600 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Loading AI Model...
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Initializing TensorFlow.js and MobileNet model
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Mode Selection */}
      <div className="glass-card dark:glass-card-dark p-6">
        <h2 className="text-xl font-bold gradient-text mb-4 text-center">Choose Detection Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setDetectionMode('image')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              detectionMode === 'image'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Image Upload</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upload and analyze images</p>
          </button>
          
          <div className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed">
            <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <h3 className="font-semibold text-gray-500 dark:text-gray-400">Video Upload</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Coming Soon</p>
          </div>
          
          <div className="p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed">
            <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <h3 className="font-semibold text-gray-500 dark:text-gray-400">Live Webcam</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Upload Section - Only show for image mode */}
      {detectionMode === 'image' && (
        <div className="glass-card dark:glass-card-dark p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mb-4 float-animation">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-2">
              Upload Image for Detection
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Drag and drop an image or click to browse
            </p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose an image to analyze
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Detection Results Canvas */}
      {selectedImage && (
        <div className="glass-card dark:glass-card-dark p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Detection Results
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isLoading ? 'Analyzing...' : 'Objects detected and highlighted'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={downloadResult}
                disabled={isLoading}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={clearResults}
                className="btn-primary flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <Zap className="absolute inset-0 w-6 h-6 text-blue-600 m-auto" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    AI is analyzing...
                  </p>
                </div>
              </div>
            )}
            
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded-lg shadow-lg pulse-glow"
              style={{ maxHeight: '600px' }}
            />
          </div>

          {detectionResults.length > 0 && !isLoading && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Detected Objects ({detectionResults[0].detections.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detectionResults[0].detections.map((detection, index) => (
                  <div
                    key={index}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                        {detection.class}
                      </span>
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {Math.round(detection.score * 100)}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${detection.score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Results */}
      {detectionResults.length > 1 && (
        <div className="glass-card dark:glass-card-dark p-8">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Recent Detections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectionResults.slice(1).map((result, index) => (
              <div
                key={index}
                className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-white/20 dark:border-gray-700/50 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  if (result.imageUrl) {
                    setSelectedImage(result.imageUrl);
                    const img = new Image();
                    img.onload = () => drawDetections(img, result.detections);
                    img.src = result.imageUrl;
                  }
                }}
              >
                {result.imageUrl && (
                  <img
                    src={result.imageUrl}
                    alt={result.fileName}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {result.fileName || 'Detection Result'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {result.detections.length} objects detected
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}