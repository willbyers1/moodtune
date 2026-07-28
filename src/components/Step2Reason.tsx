import React from 'react';
import FlowStep from './FlowStep';

interface Props {
  key?: React.Key;
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRESET_REASONS = [
  'Work', 'A relationship', 'The weather', 'Loneliness', 'Missing someone', 'Good news', 'Just woke up', 'No specific reason'
];

export default function Step2Reason({ value, onChange, onNext, onBack }: Props) {
  return (
    <FlowStep canProceed={value.trim().length > 0} onNext={onNext} onBack={onBack}>
      <div className="mb-12">
        <h1 className="text-[40px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] font-serif text-ink mb-6">Why do you feel <br className="hidden sm:block"/>this way?</h1>
        <p className="font-sans text-[11px] opacity-40 uppercase tracking-widest text-ink">This helps tune the recommendation.</p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <label className="font-sans text-[11px] uppercase tracking-widest opacity-40 text-ink">Describe briefly</label>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="What's on your mind..."
            rows={2}
            className="w-full bg-transparent border-b border-soft-border font-serif italic py-2 text-xl text-ink outline-none focus:border-terracotta transition-colors placeholder:opacity-40 resize-none"
          />
        </div>

        <div>
          <span className="font-sans text-[11px] uppercase tracking-widest opacity-40 text-ink block mb-4">Or choose a common reason</span>
          <div className="flex flex-wrap gap-3">
            {PRESET_REASONS.map(reason => (
              <button
                key={reason}
                onClick={() => onChange(reason)}
                className={`px-5 py-3 rounded-full border transition-all text-sm font-sans cursor-pointer ${
                  value === reason 
                    ? 'border-olive bg-olive text-white' 
                    : 'border-soft-border bg-white text-ink hover:border-olive hover:text-olive'
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FlowStep>
  );
}
