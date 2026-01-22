import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isInteractive, setIsInteractive] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const sparkleIdRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 || window.matchMedia("(hover: none)").matches,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      sparkleIdRef.current += 1;
      const id = sparkleIdRef.current;
      const x = e.clientX;
      const y = e.clientY;
      setSparkles((prev) => {
        const next = [...prev, { id, x, y }];
        return next.length > 24 ? next.slice(next.length - 24) : next;
      });
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setSparkles((prev) => prev.filter((sparkle) => sparkle.id !== id));
      }, 350);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractiveElement =
        target.getAttribute("data-cursor") === "interactive" ||
        target.closest('[data-cursor="interactive"]') ||
        target.matches("button, a, input, textarea, [role='button']") ||
        target.closest("button, a, input, textarea, [role='button']");

      setIsInteractive(!!isInteractiveElement);
    };

    const handleMouseOut = () => {
      setIsInteractive(false);
    };

    const handleMouseDown = () => {
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
        }}
      >
        <div
          className={`w-6 h-6 rounded-full border-2 border-primary transition-transform duration-200 ${
            isInteractive ? "scale-150" : "scale-100"
          }`}
        />
      </div>

      {/* Inner dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-primary"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          transition: "transform 0.08s ease-out",
        }}
      />

      {/* Sparkle trail */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="pointer-events-none fixed top-0 left-0 z-[9998]"
          style={{ transform: `translate(${s.x}px, ${s.y}px)` }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)",
              boxShadow:
                "0 0 8px hsl(var(--primary) / 0.8), 0 0 16px hsl(var(--secondary) / 0.5)",
              animation: "spark-fade 350ms ease-out forwards",
            }}
          />
        </div>
      ))}

      {/* Ripple effect */}
      {showRipple && (
        <div
          className="pointer-events-none fixed top-0 left-0 z-[9998]"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <div className="w-0 h-0 rounded-full border-2 border-primary animate-ping" />
        </div>
      )}

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        body {
          cursor: none !important;
        }
        @keyframes spark-fade {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(0.4); opacity: 0; }
        }
      `}</style>
    </>
  );
}
