'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const START_DATE = new Date('2024-10-20T00:00:00');

export default function LoveCounter() {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [text, setText] = useState('');
  const fullText = "Every second since we started this journey has been magical. I love you, Sroy.";

  useEffect(() => {
    // Typewriter effect
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    // Counter logic
    const updateCounter = () => {
      const now = new Date();
      const diff = now - START_DATE;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimePassed({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 text-center flex flex-col items-center relative z-10">
      <div className="h-20 mb-8 max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl font-light text-pink-500 italic min-h-[4rem]">
          "{text}"
          <span className="animate-pulse">|</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl mx-auto">
        {[
          { label: 'Days', value: timePassed.days },
          { label: 'Hours', value: timePassed.hours },
          { label: 'Minutes', value: timePassed.minutes },
          { label: 'Seconds', value: timePassed.seconds }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 1, duration: 0.5 }}
            className="flex flex-col items-center justify-center p-6 bg-white/60 rounded-2xl border border-white/80 backdrop-blur-md shadow-xl shadow-pink-100/50"
          >
            <span className="text-5xl md:text-6xl font-light text-pink-500 mb-2 font-mono">
              {item.value}
            </span>
            <span className="text-sm tracking-widest uppercase text-slate-500">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
