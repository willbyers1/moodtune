import React from 'react';
import FlowStep from './FlowStep';

interface Props {
  key?: React.Key;
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const GENRES = [
  'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Indie', 'Folk', 'Electronic', 'Classical', 'Jazz', 'Ambient', 'Acoustic', 'Anything'
];

export default function Step3Music({ value, onChange, onNext, onBack }: Props) {
  const toggleGenre = (genre: string) => {
    if (genre === 'Anything') {
      onChange('Anything');
      return;
    }

    const currentGenres = value === 'Anything' || value === '' ? [] : value.split(', ');
    
    if (currentGenres.includes(genre)) {
      const newGenres = currentGenres.filter(g => g !== genre);
      onChange(newGenres.join(', '));
    } else {
      onChange([...currentGenres, genre].join(', '));
    }
  };

  const selectedGenres = value.split(', ');

  return (
    <FlowStep canProceed={value.trim().length > 0} onNext={onNext} onBack={onBack}>
      <div className="mb-12">
        <h1 className="text-[40px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] font-serif text-ink mb-6">What kind of music <br className="hidden sm:block"/>do you want to hear?</h1>
        <p className="font-sans text-[11px] opacity-40 uppercase tracking-widest text-ink">Select one or more genres.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {GENRES.map(genre => {
          const isSelected = genre === 'Anything' ? value === 'Anything' : selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`py-4 px-4 text-sm font-sans border rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'border-olive bg-olive text-white'
                  : 'border-soft-border bg-white text-ink hover:border-olive hover:text-olive'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </FlowStep>
  );
}
