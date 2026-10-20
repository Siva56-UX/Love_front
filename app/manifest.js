export default function manifest() {
  return {
    name: 'Our Memories',
    short_name: 'Our Memories',
    description: 'เรื่องราวและภาพความทรงจำของเรา',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdf2f8',
    theme_color: '#fce7f3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
