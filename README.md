# CamVision AI - Object Detection App

A modern, full-stack object detection application built with Next.js, TensorFlow.js, and MobileNet-v2. This application allows users to upload images and detect objects in real-time using advanced computer vision technology.

![CamVision AI Demo](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🚀 Features

- **Real-time Object Detection**: Utilizes MobileNet-v2 model for accurate object detection
- **Modern UI/UX**: Built with Next.js 14, Tailwind CSS, and Framer Motion
- **Privacy-First**: All processing happens in the browser - your images never leave your device
- **80+ Object Classes**: Trained on the comprehensive COCO dataset
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Export Results**: Download detection results with bounding boxes and labels
- **Drag & Drop**: Intuitive file upload with drag and drop support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom glass morphism design
- **AI/ML**: TensorFlow.js, COCO-SSD model
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shubham5027/CamvisionAI-computer-vision-based-object-Detection.git
cd CamvisionAI-computer-vision-based-object-Detection
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 🎯 How It Works

1. **Model Loading**: The app automatically loads the pre-trained COCO-SSD model when you first visit
2. **Image Upload**: Users can drag & drop or click to upload images (supports JPG, PNG, GIF up to 10MB)
3. **Object Detection**: TensorFlow.js processes the image and identifies objects with confidence scores
4. **Visualization**: Detected objects are highlighted with bounding boxes and labels
5. **Export**: Users can download the annotated results

## 🎨 Design Features

- **Glass Morphism**: Modern frosted glass effect with backdrop blur
- **Gradient Animations**: Smooth color transitions and hover effects
- **Responsive Layout**: Optimized for all screen sizes
- **Dark Mode Support**: Automatic theme detection
- **Loading States**: Elegant loading animations and progress indicators

## 📊 Supported Objects

The model can detect 80+ object classes including:
- People, animals, vehicles
- Household items, furniture
- Food items, kitchen utensils
- Sports equipment, electronics
- And many more from the COCO dataset

## 🚀 Deployment

### Deploy on Vercel

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project and deploy
4. Your app will be live at `https://your-app-name.vercel.app`

### Deploy on Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `out` folder to Netlify

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TensorFlow.js](https://www.tensorflow.org/js) for the machine learning framework
- [COCO Dataset](https://cocodataset.org/) for the training data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Contact

- GitHub: [@shubham5027](https://github.com/shubham5027)
- Live Demo: [CamVision AI](https://camvision-ai-computer-vision-based-object-detection.vercel.app/)

---

Made with ❤️ by [Shubham](https://github.com/shubham5027)