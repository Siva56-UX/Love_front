'use client';
import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

export default function InteractiveRoom() {
  const socket = useSocket();
  const [pollData, setPollData] = useState({
    'น่าน': 0,
    'เชียงใหม่': 0,
    'เกาะช้าง': 0,
    'เกาะล้าน': 0,
    'ชุมพร (ขับรถลงใต้ไปเยี่ยมพ่อแม่กัน! 🚗)': 0,
    'สิงห์บุรี (ขับรถไปเยี่ยมพ่อแม่กัน! 🚗)': 0,
  });
  const [customOption, setCustomOption] = useState('');
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('poll-update', (data) => {
      setPollData(data);
    });

    socket.on('receive-hearts', () => {
      // Create a burst of 5-10 hearts
      const newHearts = Array.from({ length: Math.floor(Math.random() * 5) + 5 }).map(() => ({
        id: Date.now() + Math.random(),
        left: Math.random() * 100, // random start X position
      }));
      setFloatingHearts((prev) => [...prev, ...newHearts]);

      // Remove them after animation
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter(h => !newHearts.map(nh => nh.id).includes(h.id)));
      }, 3000);
    });

    return () => {
      socket.off('poll-update');
      socket.off('receive-hearts');
    };
  }, [socket]);

  const sendHearts = () => {
    if (socket) {
      socket.emit('send-hearts');
    }
  };

  const votePoll = (option) => {
    if (socket) {
      socket.emit('vote-poll', option);
    }
  };

  const handleCustomVote = (e) => {
    e.preventDefault();
    if (customOption.trim() && socket) {
      votePoll(customOption.trim());
      setCustomOption('');
    }
  };

  const totalVotes = Object.values(pollData).reduce((a, b) => a + b, 0);

  return (
    <section className="relative py-24 px-4 text-slate-800 min-h-[600px] overflow-hidden">
      {/* Floating Hearts Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <AnimatePresence>
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: '100vh', x: `${heart.left}vw`, opacity: 1, scale: 0.5 }}
              animate={{ 
                y: '-20vh', 
                x: `${heart.left + (Math.random() * 10 - 5)}vw`, 
                opacity: 0, 
                scale: 1.5 
              }}
              transition={{ duration: 2.5 + Math.random(), ease: 'easeOut' }}
              className="absolute bottom-0 text-pink-500"
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Our Interactive Room</h2>
          <p className="text-slate-600">Whatever you do here happens on both our screens.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Heart Button */}
          <div className="flex flex-col items-center justify-center p-8 bg-white/60 rounded-3xl border border-white/80 backdrop-blur-md shadow-xl shadow-pink-100/50">
            <h3 className="text-xl mb-6 font-light">Send some love</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendHearts}
              className="w-32 h-32 rounded-full bg-gradient-to-tr from-sky-400 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(219,39,119,0.3)] transition-shadow hover:shadow-[0_0_60px_rgba(56,189,248,0.35)] group"
            >
              <Heart className="w-12 h-12 text-white fill-white group-active:scale-90 transition-transform" />
            </motion.button>
            <p className="mt-6 text-sm text-slate-500">Tap to shower screens with hearts</p>
          </div>

          {/* Live Poll */}
          <div className="flex flex-col justify-center p-8 bg-white/60 rounded-3xl border border-white/80 backdrop-blur-md shadow-xl shadow-pink-100/50">
            <h3 className="text-xl mb-6 font-light text-center">Where should we go for our anniversary trip?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(pollData).map(([option, votes]) => {
                const percentage = totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);
                return (
                  <button
                    key={option}
                    onClick={() => votePoll(option)}
                    className="w-full relative overflow-hidden bg-slate-50 hover:bg-pink-50 transition-colors border border-slate-200 rounded-xl p-4 text-left group"
                  >
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-pink-500/20 transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="font-medium group-hover:text-pink-600 transition-colors">{option}</span>
                      <span className="text-sm text-slate-500">{votes} vote{votes !== 1 ? 's' : ''} ({percentage}%)</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleCustomVote} className="relative">
              <input
                type="text"
                placeholder="Suggest another place..."
                value={customOption}
                onChange={(e) => setCustomOption(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all text-slate-800 placeholder-slate-400"
              />
              <button 
                type="submit"
                disabled={!customOption.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-pink-500 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
