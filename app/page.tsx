import Header from '@/components/Header';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import ObjectDetection from '@/components/ObjectDetection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="glass-card dark:glass-card-dark p-12 mb-8">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 leading-tight">
              AI-Powered Vision Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of computer vision with our advanced TensorFlow.js implementation. 
              Upload images, videos, or use your webcam for real-time object detection with incredible precision.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>TensorFlow.js</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>MobileNet-v2</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>COCO Dataset</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>Real-time Processing</span>
              </span>
              <span className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                <span>Video & Webcam Support</span>
              </span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <Features />

        {/* Stats Section */}
        <Stats />

        {/* Main Detection Component */}
        <ObjectDetection />

        {/* Footer */}
        <footer className="glass-card dark:glass-card-dark p-8 mt-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Ready to Explore AI Vision?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upload images or videos, or use your webcam to experience the power of modern computer vision technology. 
              Our AI can detect and classify 80+ different object types in real-time with remarkable accuracy.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span>✨ No registration required</span>
              <span>🔒 Privacy-first processing</span>
              <span>⚡ Lightning-fast results</span>
              <span>📱 Works on all devices</span>
              <span>🎥 Video & webcam support</span>
              <span>📊 Real-time analytics</span>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                Built with ❤️ using Next.js, TensorFlow.js, and modern web technologies
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}