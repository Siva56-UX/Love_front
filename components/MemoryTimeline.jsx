'use client';
import { motion } from 'framer-motion';

const memories = [
  {
    id: 1,
    date: "October 17, 2024",
    title: "นัดเจอ นัดกินข้าวกันครั้งแรก",
    description: "ตอนนั้นแต่งตัวไม่เป็น ไปพร้อมเสื้อลายหมี กับ กางเกงขาเดฟ จนตอนนี้ยังโดนล้ออยู่.",
    image: "/images/74251.jpg"
  },
  {
    id: 2,
    date: "October 22, 2024",
    title: "ชวนไปดูคอนโดด้วยกัน",
    description: "ดูจากหน้าก็ไม่ค่อยพอใจเท่าไหร่",
    image: "/images/74252_0.jpg"
  },
  {
    id: 3,
    date: "November 3, 2024",
    title: "ชวนกันไปเที่ยวในกรุงเทพ",
    description: "จำได้ว่าโดนบ่นเพราะออกไปก็บ่ายกว่าแล้ว ไปถึงก็เย็น",
    image: "/images/74256_0.jpg"
  },
  {
    id: 4,
    date: "Today",
    title: "จะครบ 2 ปี แล้วนะ",
    description: "ขอบคุณที่เข้ามาเติมสีสันให้ชีวิตนะ",
    image: "/images/74266_0.jpg"

  }
];

export default function MemoryTimeline() {
  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">Our Memories</h2>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-rose-100 rounded-full hidden md:block"></div>

          <div className="space-y-24">
            {memories.map((memory, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 text-center ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-rose-500 font-medium tracking-wider text-sm uppercase mb-2 block">
                      {memory.date}
                    </span>
                    <h3 className="text-2xl font-light text-slate-800 mb-4">{memory.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {memory.description}
                    </p>
                  </div>

                  {/* Dot (Hidden on mobile) */}
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-white border-4 border-rose-200 items-center justify-center z-10 relative">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  </div>

                  {/* Polaroid Image */}
                  <div className="flex-1 w-full max-w-sm">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: isEven ? 2 : -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`bg-white p-4 pb-12 rounded-sm shadow-xl shadow-rose-100/50 border border-slate-100 ${
                        isEven ? "rotate-[-3deg]" : "rotate-[3deg]"
                      }`}
                    >
                      <div className="aspect-square bg-slate-200 overflow-hidden relative">
                        <img 
                          src={memory.image} 
                          alt={memory.title}
                          className="w-full h-full object-cover filter contrast-125 saturate-50"
                        />
                      </div>
                      {/* Optional polaroid caption could go here */}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
