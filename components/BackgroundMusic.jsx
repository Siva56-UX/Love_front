'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { music } from '../data/music';

const BackgroundMusic = forwardRef(function BackgroundMusic({ unlocked, reachedTimeline }, ref) {
  const audioRef = useRef(null);
  const startTime = Math.max(0, music.startTime ?? 0);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => ({
    prime() {
      // Called synchronously from the last correct PIN keypress. Keep silent
      // until the first timeline entry is visible, retaining user activation.
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = true;
      audio.volume = 0;
      audio.play().catch(() => {});
    },
  }), []);

  useEffect(() => {
    if (!unlocked || !reachedTimeline) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = startTime;
    audio.muted = false;
    audio.volume = music.volume;
    audio.play().catch(() => setMessage('แตะเพื่อเริ่มเพลง'));
  }, [unlocked, reachedTimeline, startTime]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio.paused) { audio.pause(); return; }
    if (audio.currentTime < startTime) audio.currentTime = startTime;
    audio.muted = false;
    audio.volume = music.volume;
    try { await audio.play(); setMessage(''); }
    catch { setMessage('ยังเล่นเพลงไม่ได้ ลองอีกครั้งนะ'); }
  }

  return (
    <>
      <audio ref={audioRef} src={music.src} preload="none"
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (audio.currentTime < startTime) audio.currentTime = startTime;
        }}
        onEnded={() => {
          if (!unlocked || !reachedTimeline) return;
          const audio = audioRef.current;
          audio.currentTime = startTime;
          audio.play().catch(() => setMessage('แตะเพื่อเริ่มเพลง'));
        }}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setMessage('ยังเล่นเพลงไม่ได้ ลองอีกครั้งนะ'); }} />
      {unlocked && reachedTimeline && (
        <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] rounded-2xl border border-sky-200 bg-white/95 p-3 text-sky-800 shadow-lg backdrop-blur">
          <button type="button" onClick={toggle} aria-label={playing ? 'พักเพลง' : 'เล่นเพลง'} aria-pressed={playing}
            className="flex items-center gap-3 rounded-xl px-2 py-1 text-sm">
            <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
            <span>{music.title}</span>
          </button>
          {message && <p role="status" className="mt-1 text-xs text-slate-500">{message}</p>}
        </div>
      )}
    </>
  );
});

export default BackgroundMusic;
