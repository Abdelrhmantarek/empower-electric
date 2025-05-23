
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface CarSpinViewProps {
  carId: string;
  isActive: boolean;
}

// This component simulates a 360° spin with multiple images
export default function CarSpinView({ carId, isActive }: CarSpinViewProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // For a real implementation, you would have 24-36 images for a smooth 360° rotation
  // Here we simulate with 8 frames using placeholder images
  const totalFrames = 8;
  
  // Generate frame URLs (in a real implementation, these would be actual car spin images)
  const generateFrameUrl = (frame: number) => {
    // This is a placeholder. In a real implementation, you'd have actual frame images
    const models = ["stellar-ex-2025", "aurora-gt-2025", "quantum-city-2025"];
    const model = models.find(m => m === carId) || models[0];
    
    // Using the car main image with a simulated rotation effect
    const angle = (frame / totalFrames) * 360;
    return `https://images.unsplash.com/photo-${
      carId.includes("stellar") ? "1541899481282-d53bffe3c35d" :
      carId.includes("aurora") ? "1553440569-bcc63803a83d" :
      "1593055357429-33f4e469504d"
    }?q=80&w=1000&auto=format&fit=crop&frame=${frame}&rotation=${angle}`;
  };
  
  // Auto-rotate effect
  useEffect(() => {
    if (!isActive || !autoRotate) return;
    
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev % totalFrames) + 1);
    }, 150);
    
    return () => clearInterval(interval);
  }, [isActive, autoRotate]);
  
  // Mouse/touch handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    
    // Get the starting position
    if ("clientX" in e) {
      setStartX(e.clientX);
    } else {
      setStartX(e.touches[0].clientX);
    }
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    let currentX = 0;
    if ("clientX" in e) {
      currentX = e.clientX;
    } else {
      currentX = e.touches[0].clientX;
    }
    
    const diff = currentX - startX;
    if (Math.abs(diff) > 20) { // Threshold to change frame
      const framesToMove = Math.floor(Math.abs(diff) / 20);
      if (framesToMove > 0) {
        setStartX(currentX);
        
        setCurrentFrame((prev) => {
          let newFrame;
          if (diff > 0) {
            newFrame = prev + framesToMove;
            if (newFrame > totalFrames) newFrame = newFrame - totalFrames;
          } else {
            newFrame = prev - framesToMove;
            if (newFrame < 1) newFrame = totalFrames + newFrame;
          }
          return newFrame;
        });
      }
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  // Reset auto-rotate when component becomes active
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setAutoRotate(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  
  return (
    <div className={`relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden transition-opacity duration-500 ${
      !isActive && "opacity-0 absolute top-0 left-0 pointer-events-none"
    }`}>
      {/* 360 indicator */}
      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full flex items-center gap-2 z-10">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span className="text-sm font-medium">360° View</span>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-center z-10">
        <p className="text-sm">Click and drag to rotate</p>
      </div>
      
      {/* Auto-rotate toggle */}
      <button
        className={`absolute bottom-4 right-4 rounded-full p-2 z-10 transition-colors ${
          autoRotate ? "bg-ev-blue text-white" : "bg-black/50 text-white/70"
        }`}
        onClick={() => setAutoRotate(!autoRotate)}
      >
        <RefreshCw className="h-5 w-5" />
      </button>
      
      {/* Car image (current frame) */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <img
          src={generateFrameUrl(currentFrame)}
          alt={`Car 360° view - frame ${currentFrame}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Frame indicators */}
      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-1">
        {Array.from({ length: totalFrames }).map((_, index) => (
          <div 
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              currentFrame === index + 1 ? "bg-ev-blue" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
