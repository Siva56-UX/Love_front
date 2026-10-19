'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const memories = [
  {
    id: 1,
    date: 'October 17, 2024',
    title: 'นัดเจอ นัดกินข้าวกันครั้งแรก',
    description: 'ตอนนั้นแต่งตัวไม่เป็น ไปพร้อมเสื้อลายหมี กับกางเกงขาเดฟ จนตอนนี้ยังโดนล้ออยู่',
    image: '/images/74251.jpg',
  },
  {
    id: 2,
    date: 'October 22, 2024',
    title: 'ชวนไปดูคอนโดด้วยกัน',
    description: 'ดูจากหน้าก็ไม่ค่อยพอใจเท่าไหร่',
    image: '/images/74252_0.jpg',
  },
  {
    id: 3,
    date: 'November 3, 2024',
    title: 'ชวนกันไปเที่ยวในกรุงเทพ',
    description: 'จำได้ว่าโดนบ่นเพราะออกไปก็บ่ายกว่าแล้ว ไปถึงก็เย็น',
    image: '/images/74256_0.jpg',
  },
  {
    id: 4,
    date: 'Today',
    title: 'จะครบ 2 ปี แล้วนะ',
    description: 'ขอบคุณที่เข้ามาเติมสีสันให้ชีวิตนะ',
    image: '/images/74266_0.jpg',
  },
];

// Photos are numbered consecutively in /public/images; increase this count when more files are added.
const photos = Array.from({ length: 16 }, (_, index) => {
  const number = 74251 + index;
  const filename = index === 0 ? '74251.jpg' : `${number}_0.jpg`;
  return { src: `/images/${filename}`, alt: `ภาพความทรงจำ ${index + 1}` };
});

function PhotoViewer({ photo, onClose, onPrevious, onNext }) {
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  const shareMemory = async () => {
    const url = new URL(photo.src, window.location.href).href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'ความทรงจำของเรา', text: photo.alt, url });
      } catch (error) {
        if (error.name !== 'AbortError') console.error('Unable to share this memory.', error);
      }
      return;
    }
    await navigator.clipboard?.writeText(url);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 text-white md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="ดูภาพความทรงจำ"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 48) (distance > 0 ? onPrevious : onNext)();
        setTouchStart(null);
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="ปิดภาพ"
        className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-3xl transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        ×
      </button>
      <button
        type="button"
        onClick={(event) => { event.stopPropagation(); onPrevious(); }}
        aria-label="ภาพก่อนหน้า"
        className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-3xl transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:left-8"
      >
        ‹
      </button>
      <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} className="max-h-[78vh] max-w-full rounded-sm object-contain" />
        <figcaption className="mt-4 flex w-full items-center justify-between gap-4 text-sm text-white/75">
          <span>{photo.alt}</span>
          <button type="button" onClick={shareMemory} className="min-h-11 rounded-full border border-white/30 px-5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
            แชร์ความทรงจำ
          </button>
        </figcaption>
      </figure>
      <button
        type="button"
        onClick={(event) => { event.stopPropagation(); onNext(); }}
        aria-label="ภาพถัดไป"
        className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-3xl transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:right-8"
      >
        ›
      </button>
    </motion.div>
  );
}

export default function MemoryTimeline() {
  const [activePhoto, setActivePhoto] = useState(null);
  const showPhoto = useCallback((index) => setActivePhoto(index), []);
  const closePhoto = useCallback(() => setActivePhoto(null), []);
  const previousPhoto = useCallback(() => setActivePhoto((index) => (index - 1 + photos.length) % photos.length), []);
  const nextPhoto = useCallback(() => setActivePhoto((index) => (index + 1) % photos.length), []);

  return (
    <section className="relative py-16 md:py-24" aria-labelledby="memories-title">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <header className="mb-14 text-center md:mb-20">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-pink-500">A little time together</p>
          <h2 id="memories-title" className="text-3xl font-light text-slate-800 md:text-4xl">Our Memories</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-pink-400" />
        </header>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-sky-200 via-pink-200 to-sky-200 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <div className="space-y-12 md:space-y-16">
            {memories.map((memory, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={memory.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="relative grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 md:grid-cols-[1fr_64px_1fr] md:gap-8"
                >
                  <div className={`col-start-2 py-3 md:row-start-1 ${isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left'}`}>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-pink-500 md:text-sm">{memory.date}</p>
                    <h3 className="mb-2 text-xl font-light leading-snug text-slate-800 md:text-2xl">{memory.title}</h3>
                    <p className="max-w-md text-sm leading-7 text-slate-600 md:text-base">{memory.description}</p>
                  </div>
                  <span className="z-10 col-start-1 row-start-1 mx-auto grid h-11 w-11 place-items-center rounded-full border border-sky-200 bg-white md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                  </span>
                  <div className={`col-start-2 w-full max-w-sm md:row-start-1 md:justify-self-center ${isEven ? 'md:col-start-3' : 'md:col-start-1'}`}>
                    <button type="button" onClick={() => showPhoto(photos.findIndex((photo) => photo.src === memory.image))} className="group block w-full -rotate-1 bg-white p-2 text-left shadow-md shadow-pink-100/70 transition duration-300 hover:-translate-y-1 hover:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 md:p-3">
                      <img src={memory.image} alt={memory.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      <span className="block px-2 pb-1 pt-3 text-sm text-slate-600">แตะเพื่อดูภาพเต็มจอ</span>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-5xl md:mt-32">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-pink-500">Collected moments</p>
              <h3 className="text-2xl font-light text-slate-800 md:text-3xl">ภาพระหว่างทาง</h3>
            </div>
            <span className="pb-1 text-sm text-slate-500">{photos.length} ภาพ</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
            {photos.map((photo, index) => (
              <motion.button
                key={photo.src}
                type="button"
                onClick={() => showPhoto(index)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '40px' }}
                transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
                aria-label={`เปิด${photo.alt}`}
                className="group relative aspect-[4/5] overflow-hidden bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
              </motion.button>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">แตะรูปเพื่อดูเต็มจอ แล้วปัดซ้ายหรือขวาเพื่อดูรูปถัดไป</p>
        </div>
      </div>

      <AnimatePresence>
        {activePhoto !== null && (
          <PhotoViewer
            photo={photos[activePhoto]}
            onClose={closePhoto}
            onPrevious={previousPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
