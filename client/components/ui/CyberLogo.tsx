import { motion } from "framer-motion";

export function CyberLogo() {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded bg-primary/10 border border-primary/20 p-1">
      {/* Glitch Overlay 1 */}
      <motion.div
        animate={{
          x: [0, -2, 2, -1, 0],
          opacity: [0, 0.3, 0.1, 0.4, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 2,
        }}
        className="absolute inset-0 bg-accent-blue/30 z-0"
      />
      
      {/* Glitch Overlay 2 */}
      <motion.div
        animate={{
          x: [0, 2, -2, 1, 0],
          opacity: [0, 0.2, 0.4, 0.1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: Math.random() * 5 + 3,
        }}
        className="absolute inset-0 bg-accent-purple/30 z-0"
      />

      {/* Main Logo Box */}
      <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground text-xs font-black tracking-tighter shadow-primary/20">
        DK
        
        {/* Scanning Line */}
        <motion.div
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-[1px] bg-white/50 shadow-[0_0_8px_white] z-20"
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary z-20" />
      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-primary z-20" />
      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-primary z-20" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-primary z-20" />
    </div>
  );
}
