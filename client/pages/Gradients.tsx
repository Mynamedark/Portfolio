import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const darkGradients = [
  {
    name: "Cosmic Deep Blue to Royal Purple",
    class: "bg-gradient-cosmic-blue",
    colors: ["#0D324D", "#7F5A83"],
    description: "Soft luminous effect, subtle glow, low saturation. Great for low-glare backgrounds behind 3D content.",
  },
  {
    name: "Twilight Forest Green & Cyan",
    class: "bg-gradient-twilight-forest",
    colors: ["#233329", "#63D471"],
    description: "Smooth transition, minimal glare. Suitable for dark UI with animated elements.",
  },
  {
    name: "Black to Radiant Violet Accent",
    class: "bg-gradient-black-violet",
    colors: ["#000000", "#923CB5"],
    description: "Gentle ambient light, elegant dark gradient that doesn't overwhelm animations.",
  },
  {
    name: "Midnight Ocean Drift",
    class: "bg-gradient-midnight-ocean",
    colors: ["#1E3B70", "#29539B"],
    description: "Low saturation, subtle gradient ideal for animated 3D site background.",
  },
];

const lightGradients = [
  {
    name: "Warm Sunrise Glow",
    class: "bg-gradient-sunrise-glow",
    colors: ["#FFD3A5", "#FD6585"],
    description: "Bright and inviting, perfect for hero sections.",
  },
  {
    name: "Cool Sky Catcher",
    class: "bg-gradient-cool-sky",
    colors: ["#7F7FD5", "#91EAE4"],
    description: "Light and refreshing, high contrast with dark text.",
  },
  {
    name: "Playful Energetic Blend",
    class: "bg-gradient-energetic-blend",
    colors: ["#12C2E9", "#F64F59"],
    description: "Smooth transition, vibrant but readable.",
  },
  {
    name: "Serene Ocean Fade",
    class: "bg-gradient-ocean-fade",
    colors: ["#31B7C2", "#7BC393"],
    description: "Soft and calming for background layers.",
  },
];

const dualGradients = [
  {
    name: "Adaptive Tech Gradient",
    class: "bg-gradient-sunrise-glow dark:bg-gradient-cosmic-blue",
    lightColors: ["#FFD3A5", "#FD6585"],
    darkColors: ["#0D324D", "#7F5A83"],
    description: "Unified modern UI feel. Auto-switches based on theme.",
  },
  {
    name: "Futuristic Dual Gradient",
    class: "bg-gradient-cool-sky dark:bg-gradient-midnight-ocean",
    lightColors: ["#7F7FD5", "#91EAE4"],
    darkColors: ["#1E3B70", "#29539B"],
    description: "Smooth transitions for accessibility. Cool sky in light, deep violet in dark.",
  },
];

export default function Gradients() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Design Gradients
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of carefully crafted gradients for dark and light modes, optimized for 3D content and animations.
          </p>
        </div>

        {/* Dark Mode Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
            <span className="text-xl">🌙</span> Dark Mode Gradients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {darkGradients.map((gradient) => (
              <motion.div
                key={gradient.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={cn("h-48 w-full", gradient.class)} />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{gradient.name}</h3>
                  <div className="flex gap-2 mb-4 text-xs font-mono text-muted-foreground">
                    {gradient.colors.map((color) => (
                      <span key={color} className="bg-muted px-2 py-1 rounded">
                        {color}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{gradient.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Light Mode Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
            <span className="text-xl">☀️</span> Light Mode Gradients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lightGradients.map((gradient) => (
              <motion.div
                key={gradient.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={cn("h-48 w-full", gradient.class)} />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{gradient.name}</h3>
                  <div className="flex gap-2 mb-4 text-xs font-mono text-muted-foreground">
                    {gradient.colors.map((color) => (
                      <span key={color} className="bg-muted px-2 py-1 rounded">
                        {color}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{gradient.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dual Mode Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
            <span className="text-xl">🔁</span> Dual-Mode (Auto-Switch)
          </h2>
          <p className="text-muted-foreground mb-6">
            These gradients automatically adapt based on the current theme. Try toggling the theme button in the header!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dualGradients.map((gradient) => (
              <motion.div
                key={gradient.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={cn("h-48 w-full transition-all duration-500", gradient.class)} />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{gradient.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span className="text-yellow-500">Light:</span>
                      {gradient.lightColors.map((color) => (
                        <span key={color} className="bg-muted px-2 py-1 rounded">
                          {color}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span className="text-blue-400">Dark:</span>
                      {gradient.darkColors.map((color) => (
                        <span key={color} className="bg-muted px-2 py-1 rounded">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{gradient.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="bg-muted/30 rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-4">🧠 Micro-Animation & Gradient Pairing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Subtle Ambient Light:</strong> Add a soft glow accent to 3D motion.</li>
              <li><strong>Animated Flow:</strong> Use slow aesthetic movement for backgrounds.</li>
            </ul>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Shimmering Iridescence:</strong> Soft, non-distracting transitions.</li>
              <li><strong>Accessibility:</strong> Ensure WCAG compliant contrast and low saturation for dark mode.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
