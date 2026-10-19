export default function manifest() {
  return {
    name: 'Our Memories',
    short_name: 'Our Memories',
    description: 'เรื่องราวและภาพความทรงจำของเรา',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f9ff',
    theme_color: '#fdf2f8',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
