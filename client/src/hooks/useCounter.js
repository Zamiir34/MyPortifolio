import { useEffect, useState } from 'react';

export const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [started, setStarted] = useState(false);

  const startCounter = () => {
    if (started) return;
    setStarted(true);
  };

  useEffect(() => {
    if (!started) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [started, end, duration, start]);

  return [count, startCounter];
};
