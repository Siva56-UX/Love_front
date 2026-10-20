'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Deterministic flower positions keep server and client rendering identical.
const blooms = [
  { x: 164, y: 185, color: '#9bcff1' },
  { x: 298, y: 178, color: '#f4fbff' },
  { x: 232, y: 126, color: '#6eb6e5' },
  { x: 218, y: 218, color: '#c4e6fb' },
];
const florets = Array.from({ length: 44 }, (_, i) => {
  const angle = i * 2.39996;
  const radius = Math.sqrt(i / 44) * 64;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, angle: i * 31 };
});

export default function BouquetIntro() {
  const reducedMotion = useReducedMotion();
  const id = useId().replaceAll(':', '');

  return (
    <motion.section
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -16 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      className="flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-8 text-center"
      aria-labelledby="bouquet-title"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-sky-700">A little something for you</p>
      <motion.div
        initial={reducedMotion ? false : { y: 30, scale: 0.92 }} animate={{ y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }} className="w-full max-w-[400px]"
      >
        <svg viewBox="0 0 460 490" className="h-auto w-full" role="img" aria-label="ช่อดอกไฮเดรนเยียสีฟ้าและสีขาว ห่อกระดาษผูกโบสีฟ้า">
          <defs>
            <radialGradient id={`${id}-glow`}><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
            <linearGradient id={`${id}-paper`} x2="1" y2="1"><stop stopColor="#fffdfb" /><stop offset="1" stopColor="#e2edf5" /></linearGradient>
          </defs>
          <circle cx="230" cy="215" r="205" fill={`url(#${id}-glow)`} />
          <ellipse cx="232" cy="457" rx="80" ry="9" fill="#94bdd5" opacity="0.13" />
          <path d="M144 214 Q182 310 231 420 M300 206 Q267 309 232 420 M229 140 L232 420" fill="none" stroke="#709f87" strokeWidth="7" />
          <path d="M180 260 Q95 256 114 200 Q164 208 180 260 M281 265 Q360 240 346 197 Q293 208 281 265" fill="#83ad94" />
          <path d="M231 400 L106 236 L145 214 L237 326 L326 211 L355 242 Z" fill="#e7f3fa" stroke="#d3e5f1" />
          {blooms.map((b, bi) => (
            <g key={bi} transform={`translate(${b.x} ${b.y})`}>
              <circle r="70" fill={b.color} />
              {florets.map((f, i) => (
                <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.angle})`} fill={i % 4 === 0 ? '#fff' : b.color} stroke={bi === 1 ? '#c8dfed' : '#6daed4'} strokeWidth="0.6">
                  <ellipse cx="-5" cy="-5" rx="7" ry="5" transform="rotate(35 -5 -5)" />
                  <ellipse cx="5" cy="-5" rx="7" ry="5" transform="rotate(-35 5 -5)" />
                  <ellipse cx="-5" cy="5" rx="7" ry="5" transform="rotate(-35 -5 5)" />
                  <ellipse cx="5" cy="5" rx="7" ry="5" transform="rotate(35 5 5)" />
                  <circle r="1.7" fill="#e9f5d7" stroke="none" />
                </g>
              ))}
            </g>
          ))}
          <path d="M113 258 L232 430 L278 379 L164 281 Z" fill={`url(#${id}-paper)`} stroke="#d3e5ef" />
          <path d="M347 259 L232 430 L202 371 L300 280 Z" fill="#f8fcff" stroke="#d3e5ef" />
          <path d="M207 380 Q144 337 161 378 Q174 399 225 389 M240 381 Q301 335 295 376 Q286 401 231 389" fill="#a3d6ef" stroke="#6eb6d9" strokeWidth="2" />
          <path d="M223 389 L191 442 L214 434 L227 445 L236 391 L269 439 L270 419 L287 425 L242 385" fill="#88c6e8" />
          <ellipse cx="232" cy="385" rx="13" ry="10" fill="#b9e3f6" />
        </svg>
      </motion.div>
      <h1 id="bouquet-title" className="text-2xl font-light text-sky-800 md:text-3xl">ไฮเดรนเยียช่อนี้ ให้สร้อยนะ ♡</h1>
      <p className="mt-3 text-sm text-slate-500">ก่อนจะเปิดความทรงจำของเรา</p>
      <a href="#our-story" className="mt-7 rounded-full border border-sky-200 bg-white/80 px-7 py-3 text-sm text-sky-700 transition-colors hover:bg-sky-50">เลื่อนลงเพื่อดูความทรงจำของเรา ↓</a>
    </motion.section>
  );
}
