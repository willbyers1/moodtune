import React from 'react';
import FlowStep from './FlowStep';

interface Props {
  key?: React.Key;
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

const PRESET_MOODS = [
  'Happy', 'Tired', 'Restless', 'Nostalgic', 'Hopeless', 'Energetic', 'Low', 'Anxious', 'Calm'
];

export default function Step1Mood({ value, onChange, onNext }: Props) {
  const isCustom = value.length > 0 && !PRESET_MOODS.includes(value);

  return (
    <FlowStep canProceed={value.trim().length > 0} onNext={onNext}>
      <div className="mb-12">
        <h1 className="text-[40px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] font-serif text-ink mb-6">How are you feeling <br className="hidden sm:block"/>right now?</h1>
        <p className="font-sans text-[11px] opacity-40 uppercase tracking-widest">Select the word that resonates most, or write your own.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {PRESET_MOODS.map(mood => (
          <button
            key={mood}
            onClick={() => onChange(mood)}
            className={`py-4 px-4 text-sm font-sans border rounded-full transition-all cursor-pointer ${
              value === mood 
                ? 'border-olive bg-olive text-white' 
                : 'border-soft-border bg-white text-ink hover:border-olive hover:text-olive'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-sans text-[11px] uppercase tracking-widest opacity-40 text-ink">Or describe in your own words</label>
        <input
          type="text"
          value={isCustom ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="I feel a bit like a Sunday evening..."
          className="w-full bg-transparent border-b border-soft-border font-serif italic py-2 text-xl text-ink outline-none focus:border-terracotta transition-colors placeholder:opacity-40"
        />
      </div>
    </FlowStep>
  );
}
