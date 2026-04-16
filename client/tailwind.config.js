/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/ui/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      /* ── Amazon Color Palette ─────────────────────────── */
      colors: {
        // Amazon brand
        amazon: {
          orange: "#FF9900",
          "orange-hover": "#FA8900",
          "orange-pressed": "#E47911",
          yellow: "#FFD814",
          "yellow-hover": "#F7CA00",
          navy: "#131921",
          "navy-light": "#232F3E",
          "navy-mid": "#37475A",
          teal: "#007185",
          "teal-hover": "#C7F4DC",
          link: "#007185",
          "link-hover": "#C7511F",
          star: "#FFA41C",
          success: "#067D62",
          error: "#CC0C39",
          warning: "#F5A623",
        },
        // Semantic tokens via CSS vars (shadcn compat)
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
      },

      /* ── Amazon Typography ────────────────────────────── */
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Amazon Ember",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "var(--font-heading)",
          "Amazon Ember",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],     // 11px
        xs: ["0.75rem", { lineHeight: "1rem" }],           // 12px
        sm: ["0.8125rem", { lineHeight: "1.25rem" }],      // 13px
        base: ["0.875rem", { lineHeight: "1.375rem" }],    // 14px — Amazon default
        md: ["1rem", { lineHeight: "1.5rem" }],            // 16px
        lg: ["1.125rem", { lineHeight: "1.625rem" }],      // 18px
        xl: ["1.25rem", { lineHeight: "1.75rem" }],        // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }],         // 24px
        "3xl": ["1.75rem", { lineHeight: "2.25rem" }],     // 28px
      },

      /* ── Amazon Spacing Scale ─────────────────────────── */
      spacing: {
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "2.5": "10px",
        "3": "12px",
        "3.5": "14px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "18": "72px",
        "20": "80px",
      },

      /* ── Border radius (Amazon uses tight rounding) ─── */
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
        xs: "2px",
      },

      /* ── Shadows (Amazon card / dropdown style) ──────── */
      boxShadow: {
        "amz-card": "0 2px 5px 0 rgba(213,217,217,.5)",
        "amz-card-hover": "0 0 3px 2px rgba(228,121,17,.5), 0 1px 3px rgba(0,0,0,.15)",
        "amz-dropdown": "0 2px 4px rgba(0,0,0,.13)",
        "amz-btn": "0 2px 5px 0 rgba(213,217,217,.5)",
      },

      /* ── Animations ──────────────────────────────────── */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.15s ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
