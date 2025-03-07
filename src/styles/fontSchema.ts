// Font Schema for Mentat Interface
// This schema provides consistent typography guidelines for the entire application

// Font Families
export const fontFamilies = {
  display: 'font-display', // For headings and important text
  mono: 'font-mono',       // For code, technical details, and secondary text
};

// Font Sizes
export const fontSizes = {
  // Headings
  h1: 'text-3xl',          // Page titles
  h2: 'text-2xl',          // Section headers
  h3: 'text-xl',           // Sub-section headers
  h4: 'text-lg',           // Minor headers
  
  // Body text
  bodyLarge: 'text-lg',    // Large body text
  bodyNormal: 'text-base', // Regular body text
  bodySmall: 'text-sm',    // Smaller information
  bodyTiny: 'text-xs',     // Smallest details, footnotes
};

// Font Weights
export const fontWeights = {
  bold: 'font-bold',
  semibold: 'font-semibold',
  medium: 'font-medium',
  normal: 'font-normal',
};

// Text Color Opacities
export const textOpacity = {
  primary: 'text-mentat-highlight',        // Main text - full opacity
  secondary: 'text-mentat-highlight',      // Secondary text - now full opacity for better dark mode visibility
  tertiary: 'text-mentat-highlight/90',    // Tertiary text - 90% opacity for slight visual hierarchy
  subtle: 'text-mentat-highlight/80',      // Subtle text - 80% opacity, significantly increased
  
  accent: 'text-mentat-primary',           // For accent text - full opacity
  accentMuted: 'text-mentat-primary/90',   // Muted accent - 90% opacity
};

// Common Typography Combinations
export const typography = {
  // Headings
  pageTitle: `${fontFamilies.display} ${fontSizes.h1} ${fontWeights.bold} ${textOpacity.primary} tracking-tight`,
  sectionTitle: `${fontFamilies.display} ${fontSizes.h2} ${fontWeights.semibold} ${textOpacity.primary}`,
  subsectionTitle: `${fontFamilies.display} ${fontSizes.h3} ${fontWeights.semibold} ${textOpacity.primary}`,
  
  // Body text
  bodyText: `${fontFamilies.mono} ${fontSizes.bodyNormal} ${textOpacity.secondary} leading-relaxed`,
  description: `${fontFamilies.mono} ${fontSizes.bodySmall} ${textOpacity.secondary} leading-relaxed`,
  
  // UI Elements
  buttonText: `${fontFamilies.mono} ${textOpacity.primary}`,
  labelText: `${fontFamilies.display} ${fontSizes.bodyNormal} ${fontWeights.medium} ${textOpacity.primary}`,
  
  // Meta info
  metaInfo: `${fontFamilies.mono} ${fontSizes.bodyTiny} ${textOpacity.subtle}`,
};

export default {
  fontFamilies,
  fontSizes,
  fontWeights,
  textOpacity,
  typography,
}; 