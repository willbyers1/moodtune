import React from 'react';
import { motion } from 'motion/react';

interface Props {
  key?: React.Key;
}

export default function LoadingScreen({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="flex gap-3 mb-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-olive"
            animate={{
              y: ["0%", "-100%", "0%"],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      <h2 className="text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] font-serif text-ink mb-4">Curating your space...</h2>
      <p className="font-sans text-[11px] opacity-40 uppercase tracking-widest text-ink">Finding the right tracks.</p>
    </motion.div>
  );
}
