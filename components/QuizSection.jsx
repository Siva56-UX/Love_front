'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle } from 'lucide-react';

const QUIZ_OPTIONS = ['กาญจนบุรี', 'ชลบุรี', 'เกาะช้าง', 'เชียงใหม่'];
const CORRECT_ANSWER = 'เกาะช้าง'; // Change this to the actual correct answer!

export default function QuizSection({ onSuccess }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);

  const handleSelect = (option) => {
    setSelectedAnswer(option);
    
    if (option === CORRECT_ANSWER) {
      setIsCorrect(true);
    } else {
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden flex justify-center items-center">
      {/* Floating Confetti (Emojis) when correct */}
      <AnimatePresence>
        {isCorrect && (
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 1, scale: 0.5 }}
                animate={{ 
                  y: '-20vh', 
                  x: `${(Math.random() * 100)}vw`, 
                  opacity: 0, 
                  scale: 1.5,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 2 + Math.random() * 2, ease: 'easeOut' }}
                className="absolute bottom-0 text-3xl"
              >
                {['💖', '🎉', '🥰', '✨'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(244,63,94,0.1)] border-2 border-pink-100 text-center min-h-[450px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isCorrect ? (
            <motion.div
              key="question-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤔</span>
              </div>
              
              <h2 className="text-2xl font-medium text-slate-800 mb-2">ก่อนจะไปต่อ...</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                จำได้ไหมว่าเราไปเที่ยวต่างจังหวัดด้วยกันครั้งแรกที่ไหน?
              </p>

              <div className="space-y-4 mb-8">
                {QUIZ_OPTIONS.map((option) => {
                  const isSelected = selectedAnswer === option;
                  
                  let buttonClass = "w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-300 flex justify-between items-center group ";
                  
                  if (isSelected && wrongShake) {
                    buttonClass += "bg-red-50 border-red-500 text-red-700";
                  } else {
                    buttonClass += "bg-white border-slate-200 text-slate-700 hover:border-pink-300 hover:bg-pink-50";
                  }

                  return (
                    <motion.button
                      key={option}
                      animate={isSelected && wrongShake ? { x: [-10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleSelect(option)}
                      className={buttonClass}
                    >
                      <span>{option}</span>
                      {isSelected && wrongShake && <XCircle className="w-5 h-5 text-red-500" />}
                    </motion.button>
                  );
                })}
              </div>
              
              {selectedAnswer && wrongShake && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-pink-500 font-medium"
                >
                  ผิดจ้าาา! โดนงอนแน่ 😤 ลองใหม่ซิ
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <span className="text-4xl">🥺</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">เก่งมากก! ตอบถูกด้วย</h3>
              <p className="text-slate-600 leading-relaxed mb-10 text-lg px-2">
                ขอบคุณนะสร้อยที่อยู่เป็นความน่ารักให้กันมาตลอด อาจจะมีงอแงบ้าง ดื้อบ้าง แต่ก็รักสร้อยที่สุดเลยนะ! 💕 <br/><br/>
                <span className="font-medium text-pink-500">เตรียมตัวไปสร้างความทรงจำใหม่ๆ ด้วยกันได้เลย!</span>
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                onClick={onSuccess}
                className="w-full py-4 rounded-full bg-gradient-to-r from-sky-400 to-pink-500 text-white font-medium text-lg shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:shadow-[0_0_50px_rgba(236,72,153,0.35)] transition-all"
              >
                ไปโหวตทริปของเรากัน! 🚗💨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
