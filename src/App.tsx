import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Cpu, Activity, Zap } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-void-black flex flex-col items-center justify-center p-4 relative overflow-hidden select-none screen-flicker">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--color-neon-cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Header / OS Interface */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center border-b border-neon-cyan/20 bg-void-black/50 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <Cpu className="text-neon-magenta animate-pulse" size={20} />
          <h1 className="font-pixel text-2xl text-neon-cyan tracking-tighter glitch-text chromatic-text" data-text="NEON_SERPENT_OS_v0.8.2">
            NEON_SERPENT_OS_v0.8.2
          </h1>
        </div>
        <div className="flex items-center gap-6 font-mono text-[10px] text-neon-cyan/60 uppercase tracking-widest">
          <div className="flex items-center gap-1">
            <Activity size={12} className="text-neon-yellow" />
            <span>THERMAL_LOAD: 42%</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-neon-cyan" />
            <span>FLUX_STABILITY: 99.9%</span>
          </div>
          <div className="hidden md:block">
            {new Date().toISOString().split('T')[1].split('.')[0]} UTC
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-7xl mt-16">
        
        {/* Left Sidebar - Stats & Terminal */}
        <aside className="hidden xl:flex flex-col gap-6 w-64 screen-tear">
          <div className="neon-border p-4 bg-void-black/40">
            <h4 className="text-neon-magenta font-pixel text-lg mb-2 border-b border-neon-magenta/30 pb-1">KERNEL_LOG</h4>
            <div className="font-mono text-[10px] space-y-1 text-neon-cyan/70">
              <p>{'>'} MOUNTING_FILESYSTEM...</p>
              <p>{'>'} SYNCING_NEURAL_NODES...</p>
              <p>{'>'} SERPENT_DAEMON_ACTIVE</p>
              <p className="text-neon-yellow">{'>'} ERROR: PARITY_CHECK_FAILED</p>
              <p>{'>'} RHYTHM_SYNC_COMPLETE</p>
            </div>
          </div>
          
          <div className="neon-border p-4 bg-void-black/40">
            <h4 className="text-neon-cyan font-pixel text-lg mb-2 border-b border-neon-cyan/30 pb-1">DATA_HARVEST</h4>
            <div className="flex justify-between items-end">
              <span className="text-xs text-neon-magenta uppercase tracking-tighter">QUANTUM_SCORE</span>
              <span className="text-3xl font-pixel text-neon-cyan glitch-text" data-text={score.toString().padStart(6, '0')}>
                {score.toString().padStart(6, '0')}
              </span>
            </div>
          </div>
        </aside>

        {/* Center - Game Window */}
        <section className="relative group">
          <div className="absolute -inset-4 bg-neon-cyan/5 blur-2xl group-hover:bg-neon-cyan/10 transition-all duration-1000" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2 px-2">
              <div className="flex items-center gap-2 text-neon-cyan">
                <Terminal size={14} />
                <span className="text-[10px] font-mono tracking-tighter uppercase">VIDEO_FEED_01</span>
              </div>
              <div className="text-neon-magenta font-pixel text-4xl glitch-text chromatic-text" data-text={`SCORE: ${score}`}>
                SCORE: {score}
              </div>
            </div>
            <SnakeGame onScoreChange={setScore} />
          </div>
        </section>

        {/* Right Sidebar - Music & Controls */}
        <aside className="flex flex-col gap-6 w-full max-w-md">
          <MusicPlayer />
          
          <div className="neon-border p-4 bg-void-black/40 font-mono text-[10px] text-neon-cyan/50 leading-relaxed">
            <p className="mb-2 text-neon-magenta uppercase font-bold">OS_INSTRUCTION:</p>
            <p>THE SERPENT CONSUMES DATA_FRAGMENTS TO INCREASE PROCESSING_VELOCITY. AVOID COLLISION WITH SYSTEM_BOUNDARIES OR SELF_INTERSECTION. RHYTHMIC_FREQUENCIES ARE PROVIDED FOR OPTIMAL COGNITIVE_SYNC.</p>
          </div>
        </aside>
      </main>

      {/* Footer / Status Bar */}
      <footer className="absolute bottom-0 left-0 w-full p-2 flex justify-center items-center border-t border-neon-cyan/10 bg-void-black/80 z-50">
        <div className="flex gap-8 text-[9px] font-mono text-neon-cyan/40 uppercase tracking-[0.3em]">
          <span>ENCRYPTION: AES-256</span>
          <span>LATENCY: 14MS</span>
          <span>USER_AGENT: {navigator.userAgent.split(' ')[0]}</span>
          <span className="animate-pulse text-neon-magenta">● DATA_STREAM_ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
