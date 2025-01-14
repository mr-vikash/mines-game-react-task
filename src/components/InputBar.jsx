import React from 'react'

export const InputBar = ({bombCount, setBombCount}) => {
  return (
    <div>
      <input
        id="bomb-range"
        type="range"
        min="1"
        max={5 * 5 - 1}
        value={bombCount}
        onChange={(e) => setBombCount(Number(e.target.value))}
      />
    </div>
  );
}
