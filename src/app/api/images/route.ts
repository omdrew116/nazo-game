import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  try {
    const files = fs.readdirSync(imagesDir)
      .filter(file => 
        file.toLowerCase().endsWith('.jpg') || 
        file.toLowerCase().endsWith('.jpeg') || 
        file.toLowerCase().endsWith('.png')
      );

    // Randomly select an image
    const randomImage = files[Math.floor(Math.random() * files.length)];

    return NextResponse.json({
      filename: randomImage,
      solution: randomImage.split('.')[0]
    });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ error: 'Unable to read images' }, { status: 500 });
  }
}
