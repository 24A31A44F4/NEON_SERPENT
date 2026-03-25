import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Point, Direction } from '../types';
import { GRID_SIZE, INITIAL_SPEED, SPEED_INCREMENT, MIN_SPEED } from '../constants';

interface SnakeGameProps {
  onScoreChange: (score: number) => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(true);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    onScoreChange(0);
  };

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        onScoreChange(newScore);
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPaused, isGameOver, score, onScoreChange, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': setIsPaused(prev => !prev); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, speed, isPaused, isGameOver]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative neon-border bg-void-black overflow-hidden"
        style={{ width: GRID_SIZE * 20, height: GRID_SIZE * 20 }}
      >
        {snake.map((segment, i) => (
          <div
            key={i}
            className="absolute bg-neon-cyan shadow-[0_0_5px_var(--color-neon-cyan)]"
            style={{
              width: 18,
              height: 18,
              left: segment.x * 20 + 1,
              top: segment.y * 20 + 1,
              opacity: 1 - i * 0.02
            }}
          />
        ))}
        <div
          className="absolute bg-neon-magenta shadow-[0_0_10px_var(--color-neon-magenta)] animate-pulse"
          style={{
            width: 18,
            height: 18,
            left: food.x * 20 + 1,
            top: food.y * 20 + 1,
            borderRadius: '50%'
          }}
        />
        
        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
            {isGameOver ? (
              <>
                <h2 className="text-neon-magenta font-pixel text-4xl mb-4 glitch-text" data-text="GAME_OVER">GAME_OVER</h2>
                <p className="text-neon-cyan font-pixel text-2xl mb-6 glitch-text" data-text={`FINAL_SCORE: ${score}`}>FINAL_SCORE: {score}</p>
                <button onClick={resetGame} className="pixel-button magenta">REBOOT_SYSTEM</button>
              </>
            ) : (
              <>
                <h2 className="text-neon-cyan font-pixel text-4xl mb-4">SYSTEM_PAUSED</h2>
                <button onClick={() => setIsPaused(false)} className="pixel-button">RESUME_PROCESS</button>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="flex gap-4">
        {!isGameOver && (
          <button 
            onClick={() => setIsPaused(prev => !prev)} 
            className={`pixel-button ${isPaused ? '' : 'magenta'}`}
          >
            {isPaused ? 'INIT_GAME' : 'HALT_PROCESS'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
