import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarColor } from "@/data/cars";

interface ColorSelectorProps {
  colors: CarColor[];
  onChange: (color: CarColor) => void;
}

export default function ColorSelector({ colors, onChange }: ColorSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const selectedColor = useMemo(() => colors[selectedIndex] || colors[0], [colors, selectedIndex]);
  
  const handleColorChange = (index: number) => {
    if (index === selectedIndex || animating) return;
    
    setAnimating(true);
    setSelectedIndex(index);
    onChange(colors[index]);
    
    setTimeout(() => setAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      const element = document.getElementById('color-name-display');
      if (element) {
        element.classList.add('animate-pulse');
        setTimeout(() => element.classList.remove('animate-pulse'), 2000);
      }
    }, 3000);
    
    return () => clearTimeout(interval);
  }, [selectedColor]);
  
  return (
    <div className="space-y-3">
      <motion.h3 
        className="text-lg font-medium flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="h-1 w-6 bg-gradient-to-r from-ev-blue to-ev-accent rounded-full"></span>
        Choose a Color
      </motion.h3>
      
      <div className="relative">
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`color-preview-${selectedIndex}`} 
              className="w-16 h-16 rounded-full relative overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="absolute inset-0" 
                style={{ backgroundColor: selectedColor.value }}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
              ></motion.div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div 
              key={`color-name-${selectedIndex}`}
              initial={{ opacity: 0, x: -10, y: 5 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 10, y: -5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              id="color-name-display"
              className="flex flex-col relative"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Color</span>
              <span className="text-xl font-semibold relative">
                {selectedColor.name}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-ev-blue/30 to-ev-accent/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, staggerChildren: 0.1 }}
        >
          {colors.map((color, index) => (
            <motion.button
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center relative ${
                selectedIndex === index 
                  ? "ring-2 ring-offset-2 ring-ev-blue shadow-lg" 
                  : "hover:ring-1 hover:ring-ev-blue/50 hover:shadow-md"
              }`}
              style={{ 
                backgroundColor: color.value,
              }}
              onClick={() => handleColorChange(index)}
              title={color.name}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" 
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.3 + (index * 0.05),
                type: "spring",
                stiffness: 400,
                damping: 15
              }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />

              <AnimatePresence>
                {selectedIndex === index && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 45 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color.value === "#FFFFFF" || color.value === "#E8E9EB" ? "#000000" : "#FFFFFF"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-ev-blue/5 to-ev-blue/20 rounded-full mt-3"></div>
    </div>
  );
}