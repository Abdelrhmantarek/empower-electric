
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  isActive: boolean;
}

export default function ImageGallery({ images, alt, isActive }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [lightboxPosition, setLightboxPosition] = useState({ top: 0 });
  
  useEffect(() => {
    // Reset zoom when closing lightbox
    if (!lightboxOpen) {
      setZoomLevel(1);
      setDragPosition({ x: 0, y: 0 });
    }
  }, [lightboxOpen]);
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };
  
  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };
  
  const resetZoom = () => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  };
  
  const handleOpenLightbox = () => {
    // Set the lightbox position to the current scroll position
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    // Position the lightbox where the user is currently looking
    setLightboxPosition({ top: scrollY });
    setLightboxOpen(true);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
  };
  
  // Auto slideshow when component is active but not being interacted with
  useEffect(() => {
    if (isActive && !lightboxOpen) {
      const interval = setInterval(() => {
        nextImage();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isActive, lightboxOpen, images.length]);
  
  if (!isActive) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
        onClick={handleOpenLightbox}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            src={images[currentImageIndex]} 
            alt={`${alt} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
          <button 
            className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <div className="bg-white/80 dark:bg-black/80 text-black dark:text-white px-4 py-2 rounded-md backdrop-blur-sm">
            Click to enlarge
          </div>
        </div>
      </motion.div>
      
      {/* Thumbnails with reduced spacing */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden ${
              index === currentImageIndex
                ? "ring-2 ring-ev-blue"
                : "ring-1 ring-border hover:ring-ev-blue/50"
            }`}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image}
              alt={`${alt} - Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
            {index === currentImageIndex && (
              <motion.div 
                className="absolute inset-0 bg-ev-blue/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="activeThumb"
              />
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Image counter */}
      <div className="text-center text-sm text-muted-foreground">
        <span className="font-medium">{currentImageIndex + 1}</span>
        <span> / {images.length}</span>
      </div>
      
      {/* Fixed Lightbox positioned at user's scroll */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            style={{ top: lightboxPosition.top, height: '100vh' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseLightbox}
          >
            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                drag={zoomLevel > 1}
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  setDragPosition({
                    x: dragPosition.x + info.offset.x,
                    y: dragPosition.y + info.offset.y
                  });
                }}
                src={images[currentImageIndex]}
                alt={`${alt} - Lightbox Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
                style={{
                  scale: zoomLevel,
                  x: dragPosition.x,
                  y: dragPosition.y,
                  cursor: zoomLevel > 1 ? "grab" : "default"
                }}
                key={`lightbox-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: zoomLevel }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Enhanced Close Button - more visible */}
              <motion.button
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 z-50"
                onClick={handleCloseLightbox}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
              
              {/* Controls */}
              <div className="absolute top-4 left-4 flex gap-2">
                <motion.button
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                  onClick={handleZoomIn}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="h-5 w-5" />
                </motion.button>
                <motion.button
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                  onClick={handleZoomOut}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={zoomLevel <= 1}
                >
                  <ZoomOut className="h-5 w-5" />
                </motion.button>
                {zoomLevel > 1 && (
                  <motion.button
                    className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                    onClick={resetZoom}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="text-xs px-1">Reset</span>
                  </motion.button>
                )}
              </div>
              
              {/* Navigation controls */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-4">
                <motion.button
                  className="bg-white/10 hover:bg-white/20 rounded-full p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                    resetZoom();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="text-white h-6 w-6" />
                </motion.button>
              </div>
              
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4">
                <motion.button
                  className="bg-white/10 hover:bg-white/20 rounded-full p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                    resetZoom();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="text-white h-6 w-6" />
                </motion.button>
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white backdrop-blur-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
