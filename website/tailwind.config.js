/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand – Deep Indigo
        brand: {
          50: "#f1f3f9",
          100: "#e0e5f2",
          200: "#c2cbe5",
          300: "#9aa8d1",
          400: "#6f7fb8",
          500: "#4f5f9e",
          600: "#3a4785",
          700: "#1E3A5F", // main deep indigo
          800: "#172e4c",
          900: "#12233b",
          950: "#0c1728",
        },

        // Accent – Coral / Vibrant Orange (CTAs, prices, badges)
        coral: {
          50: "#fff5f2",
          100: "#ffe8e1",
          200: "#ffd1c2",
          300: "#ffb39a",
          400: "#ff8a6b",
          500: "#FF6B4A", // main coral-orange
          600: "#f04e2e",
          700: "#d93b1f",
          800: "#b4321c",
          900: "#942d1c",
          950: "#51140b",
        },

        // Soft background & surfaces
        surface: {
          DEFAULT: "#F8F9FC",
          card: "#FFFFFF",
          muted: "#F1F3F8",
        },

        // Text
        ink: {
          DEFAULT: "#1a2332",
          muted: "#64748b",
          light: "#94a3b8",
        },

        // Status semantic colors
        status: {
          draft: { DEFAULT: "#f1f5f9", text: "#475569" },
          pending: { DEFAULT: "#fef3c7", text: "#92400e" },
          waiting: { DEFAULT: "#dbeafe", text: "#1e40af" },
          approved: { DEFAULT: "#d1fae5", text: "#065f46" },
          rejected: { DEFAULT: "#fee2e2", text: "#991b1b" },
          completed: { DEFAULT: "#dcfce7", text: "#166534" },
          archived: { DEFAULT: "#f1f5f9", text: "#64748b" },
          trash: { DEFAULT: "#f3f4f6", text: "#9ca3af" },
        },

        // Marketplace Categories (replaces departments)
        category: {
          fashion: "#ec4899", // pink
          electronics: "#3b82f6", // blue
          home: "#10b981", // emerald
          beauty: "#a855f7", // purple
          accessories: "#f59e0b", // amber
          sports: "#ef4444", // red
          books: "#6366f1", // indigo
          food: "#84cc16", // lime
          kids: "#06b6d4", // cyan
          other: "#64748b", // slate
        },

        // shadcn defaults
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
      },

      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        soft: "0 4px 20px -2px rgba(30, 58, 95, 0.06)",
        card: "0 2px 12px -2px rgba(30, 58, 95, 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
