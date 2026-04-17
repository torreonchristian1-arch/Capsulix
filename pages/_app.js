import { createContext, useContext, useState, useEffect } from "react";
import Head from "next/head";

export const ThemeContext = createContext();
export function useTheme() { return useContext(ThemeContext); }

export const THEMES = {
  light: {
    bgBase: "#F4F8FB",
    bgCard: "#FFFFFF",
    bgElevated: "#EBF3F8",
    bgSurface: "#E2EDF5",
    borderSubtle: "#D0E4EF",
    borderDefault: "#B8D4E8",
    textPrimary: "#0D2137",
    textSecondary: "#3A5A72",
    textTertiary: "#7A9AB0",
    gold: "#E07B39",
    goldHover: "#C96A28",
    goldSubtle: "rgba(224,123,57,0.08)",
    goldBorder: "rgba(224,123,57,0.22)",
    goldText: "#C96A28",
    olive: "#1B5E8A",
    oliveSubtle: "rgba(27,94,138,0.08)",
    oliveBorder: "rgba(27,94,138,0.22)",
    green: "#1B5E8A",
    greenSubtle: "rgba(27,94,138,0.08)",
    greenBorder: "rgba(27,94,138,0.22)",
    orange: "#C0392B",
    orangeSubtle: "rgba(192,57,43,0.08)",
    orangeBorder: "rgba(192,57,43,0.2)",
    shadow: "0 1px 4px rgba(13,33,55,0.07)",
    shadowMd: "0 4px 20px rgba(13,33,55,0.1)",
  },
  dark: {
    bgBase: "#0A1628",
    bgCard: "#111F35",
    bgElevated: "#182840",
    bgSurface: "#1F324D",
    borderSubtle: "#263D5A",
    borderDefault: "#2E4A6B",
    textPrimary: "#E8F4FC",
    textSecondary: "#8BB8D4",
    textTertiary: "#5A8AAA",
    gold: "#F4A261",
    goldHover: "#E8914A",
    goldSubtle: "rgba(244,162,97,0.12)",
    goldBorder: "rgba(244,162,97,0.28)",
    goldText: "#F4A261",
    olive: "#4AA8D8",
    oliveSubtle: "rgba(74,168,216,0.12)",
    oliveBorder: "rgba(74,168,216,0.28)",
    green: "#4AA8D8",
    greenSubtle: "rgba(74,168,216,0.12)",
    greenBorder: "rgba(74,168,216,0.28)",
    orange: "#E07070",
    orangeSubtle: "rgba(224,112,112,0.12)",
    orangeBorder: "rgba(224,112,112,0.28)",
    shadow: "0 1px 4px rgba(0,0,0,0.3)",
    shadowMd: "0 4px 20px rgba(0,0,0,0.4)",
  }
};

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("capsulix-theme");
      if (saved === "dark" || saved === "light") setMode(saved);
    } catch {}
  }, []);

  function toggleTheme() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    try { localStorage.setItem("capsulix-theme", next); } catch {}
  }

  const theme = THEMES[mode];

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="application-name" content="Capsulix" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
          body { font-family: 'DM Sans', sans-serif; background: ${theme.bgBase}; color: ${theme.textPrimary}; font-size: 14px; line-height: 1.6; overflow-x: hidden; }
          ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${theme.borderDefault}; border-radius: 10px; }
          input, button, textarea, select { font-family: 'DM Sans', sans-serif; }
          input:focus, textarea:focus, select:focus, button:focus { outline: none; }
          a { text-decoration: none; color: inherit; } img { display: block; max-width: 100%; } button { cursor: pointer; }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          @keyframes toastIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pageIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }
          .page-enter { animation: pageIn 0.2s ease; }
          @media (max-width: 768px) { .hide-mobile { display: none !important; } }
        `}</style>
      </Head>
      <div className="page-enter"><Component {...pageProps} /></div>
    </ThemeContext.Provider>
  );
}