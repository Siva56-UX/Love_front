'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PasscodeScreen from '@/components/PasscodeScreen';
import LoveCounter from '@/components/LoveCounter';
import MemoryTimeline from '@/components/MemoryTimeline';
import InteractiveRoom from '@/components/InteractiveRoom';
import QuizSection from '@/components/QuizSection';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isQuizPassed, setIsQuizPassed] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50 text-slate-800">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <PasscodeScreen key="passcode" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <LoveCounter />
            <MemoryTimeline />
            
            {!isQuizPassed ? (
              <QuizSection onSuccess={() => setIsQuizPassed(true)} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <InteractiveRoom />
              </motion.div>
            )}
            
            {/* Footer */}
            <footer className="py-8 text-center text-slate-500 border-t border-sky-200">
              <p>Made with ❤️ for Sroy</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
