"use client";

import React from 'react';

function ImageDisplay({ image }: { image: string }) {
  return (
    <div className="border-2 border-black p-4 mb-4 rounded-lg">
      <img 
        src={`/images/${image}`} 
        alt="Mystery" 
        className="w-full h-auto object-cover rounded-md" 
      />
    </div>
  );
}

export default ImageDisplay;
