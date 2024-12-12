import React, { useState } from 'react';


const FontSizeAdjuster = () => {
    
    const [fontSize, setFontSize] = useState(16); // Initial font size

    // Decrease font size
    const decreaseFontSize = () => {
      if (fontSize > 10) { // Set a minimum font size
        setFontSize(fontSize - 2);
      }
    };
  
    // Increase font size
    const increaseFontSize = () => {
      if (fontSize < 36) { // Set a maximum font size
        setFontSize(fontSize + 2);
      }
    };
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Buttons for font size adjustment */}
      <div className='flex gap-x-2'>
        <button
          onClick={decreaseFontSize}
          style={{
            background: "white",
            padding: "0.5rem",
            borderRadius: "10px",
            color: "#333",
            border: "1px solid #333"
        }}
        >
          A--
        </button>
        <button
          onClick={increaseFontSize}
          style={{
            background: "white",
            padding: "0.5rem",
            borderRadius: "10px",
            color: "#333",
            border: "1px solid #333"
        }}
        >
          A++
        </button>
      </div>
    </div>
  );
};

export default FontSizeAdjuster;