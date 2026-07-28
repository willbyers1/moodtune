import React from 'react';
import { motion } from 'motion/react';
import { Track } from '../types';
import { ExternalLink, RefreshCw, RotateCcw } from 'lucide-react';

interface Props {
  key?: React.Key;
  playlist: Track[];
  onReset: () => void;
  onRegenerate: () => void;
}

export default function ResultsScreen({ playlist, onReset, onRegenerate }: Props) {
  const handleSearch = (track: Track) => {
    const query = encodeURIComponent(`${track.title} ${track.artist}`);
    window.open(`https://open.spotify.com/search/${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="mb-12 text-center">
        <h2 className="text-[40px] sm:text-[48px] leading-[1.1] tracking-[-0.02em] font-serif text-ink mb-4">Your Playlist</h2>
        <p className="font-sans text-[11px] opacity-40 uppercase tracking-widest text-ink">Curated for your current mood.</p>
      </div>

      <div className="flex flex-col gap-4 mb-16">
        {playlist.map((track, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 sm:p-6 rounded-[2rem] border border-soft-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:border-olive transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-serif text-ink mb-1 truncate">{track.title}</h3>
              <p className="text-sm font-sans opacity-60 text-ink truncate mb-3">{track.artist}</p>
              <p className="text-[13px] font-sans italic opacity-80 text-ink border-l-2 border-terracotta pl-3">"{track.reason}"</p>
            </div>
            
            <button
              onClick={() => handleSearch(track)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-warm-bg text-ink rounded-full border border-soft-border hover:border-olive hover:text-olive transition-colors whitespace-nowrap text-[11px] uppercase tracking-[0.2em] font-sans self-start sm:self-center shrink-0 cursor-pointer"
            >
              Search
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center font-sans text-[11px] uppercase tracking-[0.2em]">
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 text-ink opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try a different playlist
        </button>
        <span className="hidden sm:inline opacity-30 text-ink">|</span>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-ink opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Start over
        </button>
      </div>
    </motion.div>
  );
}
