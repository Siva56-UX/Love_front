'use client';

import { motion } from 'framer-motion';
import { timeline, timelineHeading } from '../data/timeline';

export default function MemoryTimeline({ onFirstMemoryVisible }) {
  return (
    <section className="relative py-16 md:py-24" aria-labelledby="memories-title">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <header className="mb-14 text-center md:mb-20">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-sky-700">{timelineHeading.subtitle}</p>
          <h2 id="memories-title" className="text-3xl font-light text-slate-800 md:text-4xl">{timelineHeading.title}</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-pink-300" />
          <p className="mt-4 text-sm text-slate-500">{timeline.length} ภาพ · เลื่อนลงเพื่อดูตามลำดับ</p>
        </header>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-sky-200 via-pink-200 to-sky-200 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <div className="space-y-12 md:space-y-16">
            {timeline.map((memory, index) => {
              const isEven = index % 2 === 0;
              const fallbackTitle = `ภาพความทรงจำ ${String(index + 1).padStart(2, '0')}`;
              return (
                <motion.article
                  key={memory.id}
                  onViewportEnter={index === 0 ? onFirstMemoryVisible : undefined}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="relative grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 md:grid-cols-[1fr_64px_1fr] md:gap-8"
                >
                  <div className={`col-start-2 py-3 md:row-start-1 ${isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left'}`}>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-sky-700 md:text-sm">
                      {memory.date || `ภาพที่ ${String(index + 1).padStart(2, '0')}`}
                    </p>
                    <h3 className="mb-2 text-xl font-light leading-snug text-slate-800 md:text-2xl">
                      {memory.title || 'ภาพระหว่างทาง'}
                    </h3>
                    {memory.description && <p className="max-w-md text-sm leading-7 text-slate-600 md:text-base">{memory.description}</p>}
                  </div>
                  <span className="z-10 col-start-1 row-start-1 mx-auto grid h-11 w-11 place-items-center rounded-full border border-sky-200 bg-white md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  </span>
                  <div className={`col-start-2 w-full max-w-xs md:row-start-1 md:justify-self-center ${isEven ? 'md:col-start-3' : 'md:col-start-1'}`}>
                    <figure className={`mx-auto block w-fit max-w-full rounded-2xl border border-sky-100 bg-white p-2 shadow-md shadow-sky-100/70 md:p-3 ${isEven ? '-rotate-1' : 'rotate-1'}`}>
                      <img src={memory.image} alt={memory.title || fallbackTitle} loading="lazy" className="mx-auto block h-auto max-h-[360px] w-auto max-w-full rounded-xl object-contain md:max-h-[400px]" />
                    </figure>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
