'use client';

import { motion } from 'framer-motion';

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

export default function MemoryTimeline() {
  return (
    <section className="relative py-16 md:py-24" aria-labelledby="memories-title">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <header className="mb-14 text-center md:mb-20">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-pink-500">A little time together</p>
          <h2 id="memories-title" className="text-3xl font-light text-slate-800 md:text-4xl">Our Memories</h2>
          <div className="mx-auto mt-5 h-px w-16 bg-pink-400" />
          <p className="mt-4 text-sm text-slate-500">{photos.length} ภาพ · เลื่อนลงเพื่อดูตามลำดับ</p>
        </header>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-sky-200 via-pink-200 to-sky-200 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <div className="space-y-12 md:space-y-16">
            {photos.map((photo, index) => {
              const memory = memories.find((item) => item.image === photo.src);
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={photo.src}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="relative grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 md:grid-cols-[1fr_64px_1fr] md:gap-8"
                >
                  <div className={`col-start-2 py-3 md:row-start-1 ${isEven ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left'}`}>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-pink-500 md:text-sm">
                      {memory?.date || `ภาพที่ ${String(index + 1).padStart(2, '0')}`}
                    </p>
                    <h3 className="mb-2 text-xl font-light leading-snug text-slate-800 md:text-2xl">
                      {memory?.title || 'ภาพระหว่างทาง'}
                    </h3>
                    {memory && <p className="max-w-md text-sm leading-7 text-slate-600 md:text-base">{memory.description}</p>}
                  </div>
                  <span className="z-10 col-start-1 row-start-1 mx-auto grid h-11 w-11 place-items-center rounded-full border border-sky-200 bg-white md:col-start-2 md:row-start-1" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                  </span>
                  <div className={`col-start-2 w-full max-w-sm md:row-start-1 md:justify-self-center ${isEven ? 'md:col-start-3' : 'md:col-start-1'}`}>
                    <figure className={`block w-full bg-white p-2 shadow-md shadow-pink-100/70 md:p-3 ${isEven ? '-rotate-1' : 'rotate-1'}`}>
                      <img src={photo.src} alt={memory?.title || photo.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      <figcaption className="px-2 pb-1 pt-3 text-sm text-slate-600">{memory?.title || photo.alt}</figcaption>
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
