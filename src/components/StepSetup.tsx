import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Props {
  key?: React.Key;
  onNext: (key: string) => void;
}

export default function StepSetup({ onNext }: Props) {
  const [apiKey, setApiKey] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <div className="mb-12">
        <h1 className="text-[40px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] font-serif text-ink mb-6">Welcome to <br className="hidden sm:block"/>MoodTune</h1>
        <p className="font-sans text-[11px] opacity-40 uppercase tracking-widest text-ink">Please provide your Gemini API key to continue.</p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <label className="font-sans text-[11px] uppercase tracking-widest opacity-40 text-ink">API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-transparent border-b border-soft-border font-sans py-2 text-xl text-ink outline-none focus:border-terracotta transition-colors placeholder:opacity-40"
          />
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => onNext(apiKey)}
            disabled={!apiKey.trim()}
            className="bg-olive text-white font-sans text-xs uppercase tracking-[0.2em] px-12 py-5 rounded-full hover:bg-olive-dark disabled:opacity-40 disabled:hover:bg-olive transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
}
