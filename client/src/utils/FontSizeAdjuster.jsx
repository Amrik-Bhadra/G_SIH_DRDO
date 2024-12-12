import React, { createContext, useContext, useState } from "react";

// Create Context
const FontSizeContext = createContext();

// Provider Component
export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // Default font size

  const decreaseFontSize = () => {
    if (fontSize > 10) {
      setFontSize(fontSize - 2); // Min font size = 10
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 36) {
      setFontSize(fontSize + 2); // Max font size = 36
    }
  };

  return (
    <FontSizeContext.Provider
      value={{ fontSize, increaseFontSize, decreaseFontSize }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};

// Custom Hook to use Font Size Context
export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
};
