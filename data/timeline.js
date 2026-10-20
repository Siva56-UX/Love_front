// แก้ Timeline ได้จากไฟล์นี้ไฟล์เดียว ไม่ต้องแก้ component
// ลำดับรายการใน array = ลำดับบนเว็บ (ย้ายทั้งก้อน { ... } เพื่อสลับลำดับ)
// รูป: วางไฟล์ใน public/images/ แล้วใส่ image: '/images/ชื่อไฟล์.jpg'
// date, title และ description เว้นเป็น '' ได้ แต่ id ต้องไม่ซ้ำกัน

export const timelineHeading = {
  title: 'Our Memories',
  subtitle: 'A little time together',
};

export const timeline = [
  {
    id: 'first-dinner',
    date: 'October 17, 2024',
    title: 'นัดเจอ นัดกินข้าวกันครั้งแรก',
    description: 'ตอนนั้นแต่งตัวไม่เป็น ไปพร้อมเสื้อลายหมี กับกางเกงขาเดฟ จนตอนนี้ยังโดนล้ออยู่',
    image: '/images/74251.jpg',
  },
  {
    id: 'condo-viewing',
    date: 'October 22, 2024',
    title: 'ชวนไปดูคอนโดด้วยกัน',
    description: 'ดูจากหน้าก็ไม่ค่อยพอใจเท่าไหร่',
    image: '/images/74252_0.jpg',
  },
  {
    id: 'memory-03',
    date: 'October 22, 2024',
    title: 'หลังจากชวนไปดูคอนโดก็ มาหาอะไรกิน',
    description: '',
    image: '/images/74253_0.jpg',
  },
  {
    id: 'bangkok-trip',
    date: 'November 3, 2024',
    title: 'ชวนกันไปเที่ยวในกรุงเทพ',
    description: 'จำได้ว่าโดนบ่นเพราะออกไปก็บ่ายกว่าแล้ว ไปถึงก็เย็น',
    image: '/images/74256_0.jpg',
  },
  {
    id: 'memory-11',
    date: 'November 3, 2024',
    title: 'และก็มาแวะกินหมูกระทะ',
    description: 'ชีวืตเรามีแต่กิน แล้วก็กิน',
    image: '/images/74261_0.jpg',
  },
  {
    id: 'memory-12',
    date: 'November 3, 2024',
    title: 'รูปคู่แรกๆเลยได้มั้งเนี่ย',
    description: '',
    image: '/images/74262_0.jpg',
  },
  {
    id: 'memory-13',
    date: 'March 14, 2025',
    title: 'ไปเที่ยวต่างจังหวัดด้วยกันครั้งแรก',
    description: 'ได้ไข้กลับมาด้วย',
    image: '/images/74263_0.jpg',
  },
  {
    id: 'memory-14',
    date: '',
    title: '',
    description: '',
    image: '/images/74264_0.jpg',
  },
  {
    id: 'memory-15',
    date: '',
    title: '',
    description: '',
    image: '/images/74265_0.jpg',
  },
  {
    id: 'anniversary',
    date: 'Today',
    title: 'จะครบ 2 ปี แล้วนะ',
    description: 'ขอบคุณที่เข้ามาเติมสีสันให้ชีวิตนะ',
    image: '/images/74266_0.jpg',
  },
];

