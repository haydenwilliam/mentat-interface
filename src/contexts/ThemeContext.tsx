
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "dark" | "light";
type ThemeName = "spice-blue" | "arrakis" | "atreides" | "harkonnen";

interface ThemeContextType {
  theme: ThemeName;
  mode: ThemeMode;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "spice-blue",
  mode: "dark",
  setTheme: () => {},
  setMode: () => {},
  toggleMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>("spice-blue");
  const [mode, setMode] = useState<ThemeMode>("dark");

  // Apply theme and mode classes to the document
  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      "theme-spice-blue", 
      "theme-arrakis", 
      "theme-atreides", 
      "theme-harkonnen"
    );
    
    // Remove mode classes
    document.documentElement.classList.remove("light-mode", "dark-mode");
    
    // Add current theme and mode
    document.documentElement.classList.add(`theme-${theme}`);
    document.documentElement.classList.add(`${mode}-mode`);
  }, [theme, mode]);

  // Load theme preference from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeName;
    const savedMode = localStorage.getItem("mode") as ThemeMode;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedMode) setMode(savedMode);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("mode", mode);
  }, [theme, mode]);

  const toggleMode = () => {
    setMode(prevMode => prevMode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
