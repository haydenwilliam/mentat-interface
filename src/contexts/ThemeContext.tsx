import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define theme types
export type ThemeMode = 'light' | 'dark';
export type ThemeKey = 'spiceBlue' | 'harkonnenMonotone' | 'imperialGold' | 'deepDesert' | 'beneGesserit';

type ThemeConfig = {
  name: string;
  description: string;
  class: string;
  gradient: string;
}

type ThemeContextType = {
  mode: ThemeMode;
  theme: ThemeKey;
  reducedMotion: boolean;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: ThemeKey) => void;
  toggleMode: () => void;
  setReducedMotion: (value: boolean) => void;
  availableThemes: Record<ThemeKey, ThemeConfig>;
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define available themes
const availableThemes: Record<ThemeKey, ThemeConfig> = {
  spiceBlue: {
    name: "Spice Blue",
    description: "Default Mentat theme, the digital Eyes of Ibad",
    class: "spice-blue-theme",
    gradient: "linear-gradient(135deg, #001018 0%, #00BBFF 100%)"
  },
  harkonnenMonotone: {
    name: "Harkonnen Monochrome", 
    description: "A greyscale theme, inspired by the black sun of Geidi Prime",
    class: "harkonnen-monotone-theme",
    gradient: "linear-gradient(135deg, #000000 0%, #FFFFFF 100%)"
  },
  imperialGold: {
    name: "Imperial Gold",
    description: "Classic amber gold theme, fit for a Padishah Emperor",
    class: "imperial-gold-theme",
    gradient: "linear-gradient(135deg, #100D00 0%, #FFB800 100%)"
  },
  deepDesert: {
    name: "Deep Desert",
    description: "\"My planet Arrakis is so beautiful when the sun is low\" - Chani Kynes",
    class: "deep-desert-theme",
    gradient: "linear-gradient(135deg, #120800 0%, #FF7700 100%)"
  },
  beneGesserit: {
    name: "Bene Gesserit Whisper",
    description: "I must not fear. Fear is the mind-killer.",
    class: "bene-gesserit-theme",
    gradient: "linear-gradient(135deg, #0E0018 0%, #AA00FF 100%)"
  }
};

const STORAGE_KEY = 'mentat-theme-preferences';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [theme, setTheme] = useState<ThemeKey>('spiceBlue');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem(STORAGE_KEY);
      if (savedPreferences) {
        const { mode: savedMode, theme: savedTheme, reducedMotion: savedReducedMotion } = JSON.parse(savedPreferences);
        
        if (savedMode) setMode(savedMode);
        if (savedTheme) setTheme(savedTheme);
        if (savedReducedMotion !== undefined) setReducedMotion(savedReducedMotion);
      }
    } catch (error) {
      console.error('Error loading theme preferences:', error);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Apply mode
    if (mode === 'dark') {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      html.classList.add('light-mode');
      html.classList.remove('dark-mode');
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    }
    
    // Apply theme - first remove all theme classes
    Object.values(availableThemes).forEach(themeConfig => {
      html.classList.remove(themeConfig.class);
      body.classList.remove(themeConfig.class);
    });
    
    // Add current theme class
    html.classList.add(availableThemes[theme].class);
    body.classList.add(availableThemes[theme].class);
    
    // Apply reduced motion setting
    if (reducedMotion) {
      html.classList.add('reduce-motion');
      body.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
      body.classList.remove('reduce-motion');
    }
    
    // Save preferences
    localStorage.setItem(
      STORAGE_KEY, 
      JSON.stringify({ mode, theme, reducedMotion })
    );

    // Debug to console
    console.log(`Theme updated - Mode: ${mode}, Theme: ${theme}, Classes: ${html.className}`);
  }, [mode, theme, reducedMotion]);

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const value = {
    mode,
    theme,
    reducedMotion,
    setMode,
    setTheme,
    toggleMode,
    setReducedMotion,
    availableThemes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 