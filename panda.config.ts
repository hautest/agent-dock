import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Generate JSX utilities for React.
  jsxFramework: "react",

  theme: {
    extend: {
      tokens: {
        colors: {
          core: {
            canvas: { value: "#06070a" },
            canvasRaised: { value: "#0b0d12" },
            panel: { value: "#10141d" },
            panelGlass: { value: "rgba(13, 16, 23, 0.86)" },
            codeCanvas: { value: "#080b10" },
            terminalCanvas: { value: "rgba(2, 4, 4, 0.36)" },
            black: { value: "#000000" },
            white: { value: "#ffffff" },
          },
          text: {
            primary: { value: "#f4f7fb" },
            strong: { value: "#f8fbff" },
            code: { value: "#d9e2f2" },
            muted: { value: "#99a3b5" },
            subtle: { value: "#7f8798" },
            dim: { value: "#506072" },
            tab: { value: "#8f99aa" },
          },
          brand: {
            indigo: { value: "#7c7cff" },
            violet: { value: "#9b5cff" },
          },
          signal: {
            green: { value: "#5cff82" },
            lime: { value: "#d7ff72" },
            text: { value: "#9cffaa" },
            dim: { value: "#4f8f5a" },
          },
          danger: {
            default: { value: "#ff5f7a" },
          },
          line: {
            indigo: { value: "rgba(125, 139, 255, 0.22)" },
            indigoSubtle: { value: "rgba(125, 139, 255, 0.18)" },
            indigoStrong: { value: "rgba(124, 124, 255, 0.35)" },
            violetSubtle: { value: "rgba(124, 124, 255, 0.2)" },
            green: { value: "rgba(92, 255, 130, 0.24)" },
            greenSubtle: { value: "rgba(92, 255, 130, 0.16)" },
            greenStrong: { value: "rgba(92, 255, 130, 0.4)" },
            white: { value: "rgba(255, 255, 255, 0.08)" },
            whiteSubtle: { value: "rgba(255, 255, 255, 0.06)" },
          },
          fill: {
            panelTop: { value: "rgba(18, 22, 32, 0.94)" },
            panelBottom: { value: "rgba(8, 10, 15, 0.92)" },
            shell: { value: "rgba(7, 10, 13, 0.7)" },
            subtle: { value: "rgba(255, 255, 255, 0.03)" },
            selected: { value: "rgba(124, 124, 255, 0.15)" },
            successWash: { value: "rgba(92, 255, 130, 0.1)" },
            indigoWash: { value: "rgba(124, 124, 255, 0.12)" },
          },
          fx: {
            glowPrimary: { value: "rgba(124, 124, 255, 0.15)" },
            glowPrimaryStrong: { value: "rgba(124, 124, 255, 0.22)" },
            glowSuccess: { value: "rgba(92, 255, 130, 0.08)" },
            glowSuccessSoft: { value: "rgba(92, 255, 130, 0.12)" },
            glowCursor: { value: "rgba(92, 255, 130, 0.65)" },
            panelShadow: { value: "rgba(0, 0, 0, 0.38)" },
            scanline: { value: "rgba(255, 255, 255, 0.025)" },
            highlight: { value: "rgba(255, 255, 255, 0.06)" },
          },
        },
      },
      semanticTokens: {
        colors: {
          bg: {
            canvas: { value: "{colors.core.canvas}" },
            canvasRaised: { value: "{colors.core.canvasRaised}" },
            code: { value: "{colors.core.codeCanvas}" },
            terminal: { value: "{colors.core.terminalCanvas}" },
          },
          surface: {
            default: { value: "{colors.core.panelGlass}" },
            elevated: { value: "{colors.core.panel}" },
            shell: { value: "{colors.fill.shell}" },
            subtle: { value: "{colors.fill.subtle}" },
            selected: { value: "{colors.fill.selected}" },
            selectedSuccess: { value: "{colors.fill.successWash}" },
            selectedAccent: { value: "{colors.fill.indigoWash}" },
          },
          fg: {
            default: { value: "{colors.text.primary}" },
            strong: { value: "{colors.text.strong}" },
            inverse: { value: "{colors.core.white}" },
            code: { value: "{colors.text.code}" },
            muted: { value: "{colors.text.muted}" },
            subtle: { value: "{colors.text.subtle}" },
            dim: { value: "{colors.text.dim}" },
            tab: { value: "{colors.text.tab}" },
          },
          border: {
            default: { value: "{colors.line.indigo}" },
            subtle: { value: "{colors.line.indigoSubtle}" },
            selected: { value: "{colors.line.indigoStrong}" },
            code: { value: "{colors.line.violetSubtle}" },
            success: { value: "{colors.line.green}" },
            successSubtle: { value: "{colors.line.greenSubtle}" },
            successStrong: { value: "{colors.line.greenStrong}" },
            neutral: { value: "{colors.line.white}" },
            neutralSubtle: { value: "{colors.line.whiteSubtle}" },
          },
          accent: {
            primary: { value: "{colors.brand.indigo}" },
            secondary: { value: "{colors.brand.violet}" },
          },
          status: {
            success: { value: "{colors.signal.green}" },
            warning: { value: "{colors.signal.lime}" },
            danger: { value: "{colors.danger.default}" },
          },
          terminal: {
            text: { value: "{colors.signal.text}" },
            dim: { value: "{colors.signal.dim}" },
          },
          code: {
            keyword: { value: "{colors.brand.violet}" },
            string: { value: "{colors.signal.green}" },
            lineNumber: { value: "{colors.text.dim}" },
          },
          effect: {
            glowPrimary: { value: "{colors.fx.glowPrimary}" },
            glowPrimaryStrong: { value: "{colors.fx.glowPrimaryStrong}" },
            glowSuccess: { value: "{colors.fx.glowSuccess}" },
            glowSuccessSoft: { value: "{colors.fx.glowSuccessSoft}" },
            glowCursor: { value: "{colors.fx.glowCursor}" },
            panelShadow: { value: "{colors.fx.panelShadow}" },
            scanline: { value: "{colors.fx.scanline}" },
            highlight: { value: "{colors.fx.highlight}" },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
