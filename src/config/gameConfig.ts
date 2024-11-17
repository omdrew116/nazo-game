export interface GameImage {
  filename: string;
  hint?: string;
  solution: string;
}

export const GAME_IMAGES: GameImage[] = [
  {
    filename: 'A STITCH IN TIME.jpeg',
    solution: 'A Stitch in Time',
    hint: 'A proverbial saying about timing'
  },
  {
    filename: 'MOTHER KNOWS BEST.jpg',
    solution: 'Mother Knows Best',
    hint: 'A common phrase about maternal wisdom'
  },
  {
    filename: 'READY TO GO.jpg',
    solution: 'Ready to Go',
    hint: 'A phrase indicating preparedness'
  }
];
