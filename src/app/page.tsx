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
  const [guessedImages, setGuessedImages] = useState<string[]>([]);

  const fetchRandomImage = async (guessedImagesParam?: string[]) => {
    try {
      const guessedImagesQuery = guessedImagesParam?.join(',') || guessedImages.join(',');
      const response = await fetch(`/api/images?guessed=${guessedImagesQuery}`);
      const imageData = await response.json();

      if (imageData.gameOver) {
        setGameOver(true);
        return;
      }

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
      const newGuessedImages = [...guessedImages, currentImage.filename];
      setGuessedImages(newGuessedImages);
      setScore(score + 1);
      setFeedback('Correct!');
      fetchRandomImage(newGuessedImages);
    } else {
      setFeedback('Incorrect, try again!');
    }
  };

  const resetGame = () => {
    setScore(0);
    setFeedback('');
    setGameOver(false);
    setGuessedImages([]);
    fetchRandomImage([]);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Game Over!</h1>
          <p className="text-xl mb-4 text-gray-800">Your final score: {score}</p>
          <button 
            onClick={resetGame} 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

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
