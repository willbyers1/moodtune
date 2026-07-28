export interface Track {
  title: string;
  artist: string;
  reason: string;
}

export interface Answers {
  mood: string;
  reason: string;
  musicPreference: string;
  direction: string;
}

export type Step = 'setup' | 1 | 2 | 3 | 4 | 'loading' | 'results';
