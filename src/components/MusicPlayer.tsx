import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { Track } from '../types';
import { DUMMY_TRACKS } from '../constants';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="neon-border-magenta bg-void-black/80 p-6 w-full max-w-md backdrop-blur-md relative overflow-hidden">
      {/* Glitch Overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-magenta/30 animate-pulse" />
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-neon-magenta font-mono tracking-widest uppercase opacity-70">NOW_STREAMING</span>
            <h3 className="text-xl font-pixel text-neon-cyan glitch-text" data-text={currentTrack.title}>
              {currentTrack.title}
            </h3>
            <p className="text-xs text-neon-magenta font-mono opacity-80">{currentTrack.artist}</p>
          </div>
          <div className="w-12 h-12 neon-border flex items-center justify-center animate-spin-slow">
             <Volume2 size={20} className="text-neon-cyan" />
          </div>
        </div>

        <div className="relative h-1 bg-void-black border border-neon-magenta/30 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-neon-magenta shadow-[0_0_10px_var(--color-neon-magenta)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-8">
          <button onClick={handlePrev} className="text-neon-cyan hover:text-neon-magenta transition-colors">
            <SkipBack size={24} />
          </button>
          <button 
            onClick={togglePlay} 
            className="w-12 h-12 rounded-full border-2 border-neon-cyan flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-void-black transition-all shadow-[0_0_10px_var(--color-neon-cyan)]"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          <button onClick={handleNext} className="text-neon-cyan hover:text-neon-magenta transition-colors">
            <SkipForward size={24} />
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
