"use client";

import { useState, useEffect } from 'react';
import ImageDisplay from '@/components/ImageDisplay';
import GuessInput from '@/components/GuessInput';

interface GameImage {
  filename: string;
  solution: string;
}

export default function Home() {
  const [currentImage, setCurrentImage] = useState<GameImage | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch('/api/images');
      const imageData = await response.json();
      setCurrentImage(imageData);
    } catch (error) {
      console.error('Failed to fetch image:', error);
      setFeedback('Error loading image');
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const handleGuess = (guess: string) => {
    if (!currentImage) return;

    const imageName = currentImage.solution;
    if (guess.toLowerCase() === imageName.toLowerCase()) {
      setScore(score + 1);
      setFeedback('Correct!');
      fetchRandomImage();
    } else {
      setFeedback('Incorrect, try again!');
    }
  };

  const resetGame = () => {
    setScore(0);
    setFeedback('');
    setGameOver(false);
    fetchRandomImage();
  };

  if (!currentImage) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Nazo</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <ImageDisplay image={currentImage.filename} />
        <GuessInput onGuess={handleGuess} />
        <p className={`mt-2 ${feedback === 'Correct!' ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
        <div className="mt-4 flex justify-between text-gray-700">
          <p>Score: {score}</p>
        </div>
      </div>
    </div>
  );
}
