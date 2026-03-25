import { Track } from './types';

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'SYNTH_VOID_01',
    artist: 'NEURAL_GHOST',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 372
  },
  {
    id: '2',
    title: 'CYBER_PULSE_X',
    artist: 'VOID_RUNNER',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 425
  },
  {
    id: '3',
    title: 'GLITCH_DREAM_BETA',
    artist: 'DATA_MINER',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 312
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 2;
export const MIN_SPEED = 50;
