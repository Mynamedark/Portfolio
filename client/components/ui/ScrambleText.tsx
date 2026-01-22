import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  maxIterations?: number;
  triggerOn?: "hover" | "load";
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function ScrambleText({
  text,
  className,
  scrambleSpeed = 30,
  maxIterations = 10,
  triggerOn = "hover",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration += 1 / maxIterations;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, isAnimating, maxIterations, scrambleSpeed]);

  useEffect(() => {
    if (triggerOn === "load") {
      scramble();
    }
  }, [triggerOn, scramble]);

  return (
    <motion.span
      onMouseEnter={() => triggerOn === "hover" && scramble()}
      className={className}
    >
      {displayText}
    </motion.span>
  );
}
