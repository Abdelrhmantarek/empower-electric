
import { BatteryCharging, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LoaderScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="relative"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 rounded-full border-4 border-ev-blue/20 animate-spin"></div>
          <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-4 border-r-4 border-ev-accent animate-spin"></div>
          
          {/* Enhanced Electric charges with more visibility */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
          >
            <Zap className="h-8 w-8 text-ev-accent" />
          </motion.div>
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
          >
            <Zap className="h-8 w-8 text-ev-blue" />
          </motion.div>
          <motion.div
            className="absolute -left-8 top-1/2 transform -translate-y-1/2"
            animate={{ x: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          >
            <Zap className="h-8 w-8 text-ev-accent" />
          </motion.div>
          <motion.div
            className="absolute -right-8 top-1/2 transform -translate-y-1/2"
            animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          >
            <Zap className="h-8 w-8 text-ev-blue" />
          </motion.div>
          
          {/* Additional electric bolts for more electricity */}
          <motion.div
            className="absolute -top-4 -left-4"
            animate={{ 
              rotate: [0, 45, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.1 }}
          >
            <Zap className="h-7 w-7 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{ 
              rotate: [0, -45, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
          >
            <Zap className="h-7 w-7 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4"
            animate={{ 
              rotate: [0, -45, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          >
            <Zap className="h-7 w-7 text-yellow-400" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -right-4"
            animate={{ 
              rotate: [0, 45, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
          >
            <Zap className="h-7 w-7 text-yellow-400" />
          </motion.div>
          
          {/* Central battery with zap */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className="relative"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {/* Enhanced glowing background effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-ev-blue opacity-30 blur-lg"
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              <BatteryCharging className="h-12 w-12 text-ev-blue animate-pulse" />
              
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.8, 1],
                  rotateZ: [0, 20, -20, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Zap className="h-7 w-7 text-ev-accent" />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Enhanced Electric pulse rings */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-ev-accent/30"
            animate={{ scale: [1, 2.5], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-ev-blue/30"
            animate={{ scale: [1, 2.5], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
            animate={{ scale: [1, 2.5], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 1 }}
          />
        </motion.div>

        <motion.div 
          className="mt-8 text-xl font-medium bg-gradient-to-r from-ev-blue via-ev-accent to-ev-blue bg-clip-text text-transparent relative"
        >
          <motion.div 
            className="overflow-hidden relative"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          >
            <span className="opacity-0 animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>E</span>
            <span className="opacity-0 animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>M</span>
            <span className="opacity-0 animate-slide-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>P</span>
            <span className="opacity-0 animate-slide-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>O</span>
            <span className="opacity-0 animate-slide-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>W</span>
            <span className="opacity-0 animate-slide-up" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>E</span>
            <span className="opacity-0 animate-slide-up" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>R</span>
          </motion.div>
          
          {/* Electricity spark line below text with better animation */}
          <motion.div
            className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-ev-blue via-yellow-400 to-ev-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
          />

          {/* Additional electricity sparks */}
          <motion.div 
            className="absolute -bottom-3 left-1/4 h-3 w-0.5 bg-ev-accent"
            animate={{ height: [3, 10, 3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="absolute -bottom-3 left-1/2 h-3 w-0.5 bg-yellow-400"
            animate={{ height: [3, 15, 3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div 
            className="absolute -bottom-3 left-3/4 h-3 w-0.5 bg-ev-blue"
            animate={{ height: [3, 10, 3], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: 0.8 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
