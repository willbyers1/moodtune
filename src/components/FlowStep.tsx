import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface FlowStepProps {
  children: React.ReactNode;
  onBack?: () => void;
  canProceed?: boolean;
  onNext?: () => void;
  nextLabel?: string;
}

export default function FlowStep({ children, onBack, canProceed, onNext, nextLabel = "Continue" }: FlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="absolute -top-12 left-0 text-[11px] font-sans uppercase tracking-[0.2em] opacity-40 hover:opacity-100 text-ink transition-opacity flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
      )}
      
      <div className="flex flex-col gap-8">
        {children}
        
        {onNext && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={onNext}
              disabled={!canProceed}
              className="bg-olive text-white font-sans text-xs uppercase tracking-[0.2em] px-12 py-5 rounded-full hover:bg-olive-dark disabled:opacity-40 disabled:hover:bg-olive transition-colors cursor-pointer"
            >
              {nextLabel}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
