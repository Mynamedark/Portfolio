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
            border: "var(--border)",
            input: "var(--input)",
            ring: "var(--ring)",
            background: "var(--background)",
            foreground: "var(--foreground)",
            primary: {
              DEFAULT: "var(--primary)",
              foreground: "var(--primary-foreground)",
            },
            secondary: {
              DEFAULT: "var(--secondary)",
              foreground: "var(--secondary-foreground)",
            },
            destructive: {
              DEFAULT: "var(--destructive)",
              foreground: "var(--destructive-foreground)",
            },
            muted: {
              DEFAULT: "var(--muted)",
              foreground: "var(--muted-foreground)",
            },
            accent: {
              DEFAULT: "var(--accent)",
              foreground: "var(--accent-foreground)",
            },
            popover: {
              DEFAULT: "var(--popover)",
              foreground: "var(--popover-foreground)",
            },
            card: {
              DEFAULT: "var(--card)",
              foreground: "var(--card-foreground)",
            },
          sidebar: {
            DEFAULT: "var(--sidebar-background)",
            foreground: "var(--sidebar-foreground)",
            primary: "var(--sidebar-primary)",
            "primary-foreground": "var(--sidebar-primary-foreground)",
            accent: "var(--sidebar-accent)",
            "accent-foreground": "var(--sidebar-accent-foreground)",
            border: "var(--sidebar-border)",
            ring: "var(--sidebar-ring)",
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
            "primary": "0 0 15px rgba(0, 200, 255, 0.3)",
            "secondary": "0 0 15px rgba(124, 251, 255, 0.3)",
            "accent": "0 0 15px rgba(0, 200, 255, 0.3)",
            "neon": "0 0 20px rgba(0, 200, 255, 0.5)",
            "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
          },
        backgroundImage: {
          "none": "none",
        },
      },
    },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
