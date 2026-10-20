'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { timeline } from '../data/timeline';

// Rows form a heart. Cycle through the timeline so every photo is included.
const rows = [[1, 2, 5, 6], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6], [2, 3, 4, 5], [3, 4]];

export default function MemoryHeart() {
  const reducedMotion = useReducedMotion();
  if (!timeline.length) return null;
  const repeats = Math.max(1, Math.ceil(timeline.length / 32));
  const slots = rows.flatMap((columns, row) => columns.map(column => ({ row, column })));
  return (
    <section className="overflow-hidden px-5 py-20 text-center md:py-28" aria-labelledby="heart-title">
      <p className="mb-3 text-xs uppercase tracking-[0.24em] text-sky-700">Every piece of us</p>
      <h2 id="heart-title" className="text-3xl font-light text-slate-800 md:text-4xl">ทุกภาพ ต่อกันเป็นหัวใจของเรา</h2>
      <p className="mx-auto mb-12 mt-4 max-w-md text-sm leading-7 text-slate-600">ความทรงจำเล็ก ๆ ที่รวมกันเป็นเรื่องราวของเรา 💗</p>
      <motion.div
        initial="scattered" whileInView="together" viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid w-full max-w-xl gap-1 p-2 md:gap-1.5"
        style={{ gridTemplateColumns: `repeat(${8 * repeats}, minmax(0, 1fr))` }}
        role="img" aria-label={`ภาพความทรงจำทั้ง ${timeline.length} ภาพ ประกอบกันเป็นรูปหัวใจ`}
      >
        {slots.flatMap((slot, slotIndex) => Array.from({ length: repeats * repeats }, (_, subIndex) => {
          const index = slotIndex * repeats * repeats + subIndex;
          const memory = timeline[index % timeline.length];
          return (
            <motion.div key={index}
              variants={{ scattered: { opacity: 0, x: reducedMotion ? 0 : (index % 2 ? 80 : -80), y: reducedMotion ? 0 : 50, rotate: reducedMotion ? 0 : (index % 3 - 1) * 18, scale: 0.8 }, together: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } }}
              transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : index * 0.025, type: 'tween' }}
              className="aspect-square overflow-hidden rounded-md border-2 border-white bg-sky-100 shadow-sm md:rounded-lg"
              style={{ gridColumn: slot.column * repeats + subIndex % repeats + 1, gridRow: slot.row * repeats + Math.floor(subIndex / repeats) + 1 }}
            >
              <img src={memory.image} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            </motion.div>
          );
        }))}
      </motion.div>
      <p className="mt-8 text-sm tracking-wide text-sky-700">You are my favorite memory ♡</p>
    </section>
  );
}
