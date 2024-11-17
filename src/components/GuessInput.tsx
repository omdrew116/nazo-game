"use client";

import React, { useState } from 'react';

interface GuessInputProps {
  onGuess: (guess: string) => void;
}

function GuessInput({ onGuess }: GuessInputProps) {
  const [guess, setGuess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess);
      setGuess(''); // Clear input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input 
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="w-full p-3 border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Submit Guess
      </button>
    </form>
  );
}

export default GuessInput;
