/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Answers, Step, Track } from './types';
import Step1Mood from './components/Step1Mood';
import Step2Reason from './components/Step2Reason';
import Step3Music from './components/Step3Music';
import Step4Direction from './components/Step4Direction';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import StepSetup from './components/StepSetup';

export default function App() {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('gemini_api_key') || '');
  const [step, setStep] = useState<Step>(() => {
    return localStorage.getItem('gemini_api_key') ? 1 : 'setup';
  });
  const [answers, setAnswers] = useState<Answers>({
    mood: '',
    reason: '',
    musicPreference: '',
    direction: '',
  });
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  const updateAnswer = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetup = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setStep(1);
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setAnswers({ mood: '', reason: '', musicPreference: '', direction: '' });
    setPlaylist([]);
    setError(null);
    setStep('setup');
  };

  const nextStep = () => {
    if (typeof step === 'number' && step < 4) {
      setStep((step + 1) as Step);
    }
  };

  const prevStep = () => {
    if (typeof step === 'number' && step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setStep('loading');
    setError(null);
    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, apiKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch playlist');
      }

      const data = await response.json();
      setPlaylist(data.playlist);
      setStep('results');
    } catch (err) {
      setError('Something went wrong generating your playlist. Please try again.');
      setStep(4); // Go back to the last step so they can retry
    }
  };

  const resetFlow = () => {
    setAnswers({ mood: '', reason: '', musicPreference: '', direction: '' });
    setPlaylist([]);
    setError(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-warm-bg text-ink font-sans flex flex-col selection:bg-soft-border relative overflow-hidden">
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-soft-border opacity-20 pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border border-terracotta opacity-10 pointer-events-none" />

      <main className="flex-grow flex flex-col items-center p-6 sm:p-12 max-w-4xl mx-auto w-full relative z-10">
        <header className="flex justify-between items-center mb-12 sm:mb-20 w-full max-w-2xl">
          <div className="text-xl font-bold tracking-tight font-serif text-olive">MoodTune</div>
          {typeof step === 'number' && (
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest opacity-60 font-sans">Step 0{step} / 04</span>
              <div className="w-20 sm:w-32 h-px bg-soft-border relative">
                <div 
                  className="absolute left-0 top-0 h-px bg-olive transition-all duration-500" 
                  style={{ width: `${(Number(step) / 4) * 100}%` }}
                />
              </div>
            </div>
          )}
          {step !== 'setup' && (
            <button 
              onClick={handleClearKey}
              className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 font-sans text-ink transition-opacity ml-4 cursor-pointer"
            >
              Clear API Key
            </button>
          )}
        </header>

        {error && (
          <div className="absolute top-4 left-4 right-4 bg-red-50 text-red-700 px-4 py-3 rounded border border-red-100 text-sm flex items-center shadow-sm max-w-md mx-auto z-50">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto opacity-70 hover:opacity-100 cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        <div className="w-full max-w-2xl relative flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            {step === 'setup' && (
              <StepSetup key="setup" onNext={handleSetup} />
            )}
            {step === 1 && (
              <Step1Mood
                key="step1"
                value={answers.mood}
                onChange={(val) => updateAnswer('mood', val)}
                onNext={nextStep}
              />
            )}
            {step === 2 && (
              <Step2Reason
                key="step2"
                value={answers.reason}
                onChange={(val) => updateAnswer('reason', val)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <Step3Music
                key="step3"
                value={answers.musicPreference}
                onChange={(val) => updateAnswer('musicPreference', val)}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 4 && (
              <Step4Direction
                key="step4"
                value={answers.direction}
                onChange={(val) => updateAnswer('direction', val)}
                onSubmit={handleSubmit}
                onBack={prevStep}
              />
            )}
            {step === 'loading' && <LoadingScreen key="loading" />}
            {step === 'results' && (
              <ResultsScreen
                key="results"
                playlist={playlist}
                onReset={resetFlow}
                onRegenerate={handleSubmit}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
