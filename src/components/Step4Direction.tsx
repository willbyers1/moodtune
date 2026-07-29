import React from 'react';
import FlowStep from './FlowStep';

interface Props {
  key?: React.Key;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const DIRECTIONS = [
  {
    id: 'boost',
    label: 'Boost my energy',
    description: 'Lift me up and shift my mood to something lighter or more active.'
  },
  {
    id: 'lean',
    label: 'Lean into the feeling',
    description: 'Let me sit with it. Give me music that matches exactly where I am.'
  }
];

export default function Step4Direction({ value, onChange, onSubmit, onBack }: Props) {
  return (
    <FlowStep canProceed={value.trim().length > 0} onNext={onSubmit} nextLabel="Generate Playlist" onBack={onBack}>
      <div className="mb-12">
        <h1 className="text-[40px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] font-serif text-ink mb-6">Where do we go <br className="hidden sm:block"/>from here?</h1>
        <p className="font-sans text-[11px] opacity-40 uppercase tracking-widest text-ink">This determines the emotional arc.</p>
      </div>

      <div className="flex flex-col gap-4">
        {DIRECTIONS.map(dir => (
          <button
            key={dir.id}
            onClick={() => onChange(dir.id)}
            className={`p-6 sm:p-8 rounded-[2rem] border text-left transition-all relative overflow-hidden group cursor-pointer ${
              value === dir.id
                ? 'border-olive bg-olive text-white'
                : 'border-soft-border bg-white hover:border-olive'
            }`}
          >
            <div className="relative z-10">
              <h3 className={`text-xl font-serif mb-2 ${value === dir.id ? 'text-white' : 'text-ink'}`}>
                {dir.label}
              </h3>
              <p className={`font-sans text-sm leading-relaxed ${value === dir.id ? 'text-white/80' : 'text-ink/60'}`}>
                {dir.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </FlowStep>
  );
}
