import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  try {
    const files = fs.readdirSync(imagesDir)
      .filter(file => 
        file.toLowerCase().endsWith('.jpg') || 
        file.toLowerCase().endsWith('.jpeg') || 
        file.toLowerCase().endsWith('.png')
      );

    // Get the guessed images from the query parameters
    const url = new URL(request.url);
    const guessedImages = url.searchParams.get('guessed')?.split(',') || [];

    // Filter out already guessed images
    const availableImages = files.filter(file => !guessedImages.includes(file));

    if (availableImages.length === 0) {
      return NextResponse.json({ gameOver: true });
    }

    // Randomly select an image from available images
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];

    return NextResponse.json({
      filename: randomImage,
      solution: randomImage.split('.')[0]
    });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ error: 'Unable to read images' }, { status: 500 });
  }
}
