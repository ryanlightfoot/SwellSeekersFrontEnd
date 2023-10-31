import React, { useState } from 'react';
import './Scroller.css'; // Import your CSS file for styling

function WetsuitScroller() {
  const wetsuits = [
    'Wetsuit 1',
    'Wetsuit 2',
    'Wetsuit 3',
    'Wetsuit 4',
    'Wetsuit 5',
    'Wetsuit 6',
    'Wetsuit 7',
    // Add more wetsuits as needed
  ];

  const [selectedWetsuit, setSelectedWetsuit] = useState(null);

  const handleWetsuitClick = (wetsuit) => {
    setSelectedWetsuit(wetsuit);
  };

  return (
    <div align="center" className="wetsuit-scroller-container">
      <div className="wetsuit-list">
        {wetsuits.map((wetsuit, index) => (
          <div
            key={index}
            className={`wetsuit-item ${selectedWetsuit === wetsuit ? 'selected' : ''}`}
            onClick={() => handleWetsuitClick(wetsuit)}
          >
            {wetsuit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WetsuitScroller;
