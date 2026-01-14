import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        // Colored shadows for Cyber aesthetic
        "primary": "0 4px 14px 0 rgba(18, 194, 233, 0.39)", // Neon Blue
        "secondary": "0 4px 14px 0 rgba(146, 60, 181, 0.39)", // Electric Purple
        "accent": "0 4px 14px 0 rgba(99, 212, 113, 0.39)", // Cyber Green
        "neon": "0 0 10px rgba(18, 194, 233, 0.7), 0 0 20px rgba(18, 194, 233, 0.5)", // Stronger glow
        "neon-purple": "0 0 10px rgba(146, 60, 181, 0.7), 0 0 20px rgba(146, 60, 181, 0.5)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backgroundImage: {
        // Dark Mode Gradients
        "gradient-cosmic-blue": "linear-gradient(to right, #0D324D, #7F5A83)",
        "gradient-twilight-forest": "linear-gradient(to right, #233329, #63D471)",
        "gradient-black-violet": "linear-gradient(to right, #000000, #923CB5)",
        "gradient-midnight-ocean": "linear-gradient(to right, #1E3B70, #29539B)",
        // Light Mode Gradients
        "gradient-sunrise-glow": "linear-gradient(to right, #FFD3A5, #FD6585)",
        "gradient-cool-sky": "linear-gradient(to right, #7F7FD5, #91EAE4)",
        "gradient-energetic-blend": "linear-gradient(to right, #12C2E9, #F64F59)",
        "gradient-ocean-fade": "linear-gradient(to right, #31B7C2, #7BC393)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
