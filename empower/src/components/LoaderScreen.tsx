import { BatteryCharging, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logoWhite from "../../public/logo/logo.png";
import logoDark from "../../public/logo/logo-dark.png";

export default function LoaderScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track theme

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Initial check
    checkTheme();

    // Use MutationObserver to detect changes to the classList
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-background z-[1000]"
      style={{ margin: 0, padding: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center">
        {/* Premium Logo Animation */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo Container with Subtle Glow */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Subtle backdrop glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ev-blue/20 via-ev-accent/20 to-ev-blue/20 rounded-2xl blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo Image */}
            <motion.img
              src={isDarkMode ? logoDark : logoWhite} // Switch logo based on theme
              alt="EmPower Logo"
              className="relative z-10 h-40 w-auto object-contain filter brightness-110"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Elegant Progress Indicator */}
        <motion.div
          className="relative w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 256 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Animated progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-ev-blue via-ev-accent to-ev-blue rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              delay: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
            animate={{ x: [-80, 256] }}
            transition={{
              duration: 1.5,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Premium Loading Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.p
            className="text-lg font-medium text-foreground mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading your experience...
          </motion.p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-ev-blue rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Subtle floating particles for premium feel */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-ev-accent/30 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i * 5)}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}