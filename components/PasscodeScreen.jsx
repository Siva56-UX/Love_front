'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const CORRECT_PIN = '201024'; // October 20, 2024

export default function PasscodeScreen({ onUnlock, onCorrectPin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleInput = (num) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);
      
      if (newPin.length === 6) {
        if (newPin === CORRECT_PIN) {
          onCorrectPin?.();
          setTimeout(onUnlock, 500); // Small delay for smooth UX
        } else {
          setError(true);
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 text-slate-800"
    >
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-sky-500/20 p-4 rounded-full mb-4">
          <Lock className="w-8 h-8 text-sky-700" />
        </div>
        <h1 className="text-2xl font-light mb-2">Enter Passcode</h1>
        <p className="text-slate-500 text-sm">Enter the date it all started (DDMMYY)</p>
      </div>

      <div className="flex gap-4 mb-12 h-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`w-4 h-4 rounded-full border-2 ${
              pin.length > i 
                ? (error ? 'bg-red-500 border-red-500' : 'bg-sky-500 border-sky-500')
                : (error ? 'border-red-500' : 'border-sky-200')
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-[280px] w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleInput(num.toString())}
            className="w-16 h-16 rounded-full border border-sky-200 flex items-center justify-center text-2xl font-light hover:bg-sky-50 transition-colors active:scale-95 mx-auto"
          >
            {num}
          </button>
        ))}
        <div /> {/* Empty space for alignment */}
        <button
          onClick={() => handleInput('0')}
          className="w-16 h-16 rounded-full border border-sky-200 flex items-center justify-center text-2xl font-light hover:bg-sky-50 transition-colors active:scale-95 mx-auto"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-medium text-slate-500 hover:text-sky-700 transition-colors active:scale-95 mx-auto"
        >
          DEL
        </button>
      </div>
    </motion.div>
  );
}
