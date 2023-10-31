import React, { useState } from 'react';
import './Scroller.css'; // Same CSS styling as wetsuit

function SurfBoardScroller() {
  const SurfBoard = [
    'SurfBoard 1',
    'SurfBoard 2',
    'SurfBoard 3',
    'SurfBoard 4',
    'SurfBoard 5',
    'SurfBoard 6',
    'SurfBoard 7',
    // Add more SurfBoard as needed
  ];

  const [selectedSurfBoard, setSelectedSurfBoard] = useState(null);

  const handleSurfBoardClick = (SurfBoard) => {
    setSelectedSurfBoard(SurfBoard);
  };

  return (
    <div align="center" className="wetsuit-scroller-container">
      <div className="wetsuit-list">
        {SurfBoard.map((SurfBoard, index) => (
          <div
            key={index}
            className={`wetsuit-item ${selectedSurfBoard === SurfBoard ? 'selected' : ''}`}
            onClick={() => handleSurfBoardClick(SurfBoard)}
          >
            {SurfBoard}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SurfBoardScroller;
