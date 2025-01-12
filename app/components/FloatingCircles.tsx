'use client'

import { useEffect, useState } from 'react'

export default function FloatingCircles() {
  const [circles, setCircles] = useState<Array<{ size: number; left: number; top: number; color: string; duration: number }>>([]);

  useEffect(() => {
    const colors = ['#0d4e96', '#2ba7de', '#f15c22', '#a9cf38'];
    const newCircles = Array(30).fill(null).map(() => ({
      size: Math.random() * 150 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 15
    }));
    setCircles(newCircles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {circles.map((circle, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-screen filter blur-sm opacity-50 animate-float-${i % 4 + 1}`}
          style={{
            backgroundColor: circle.color,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.left}%`,
            top: `${circle.top}%`,
            animationDuration: `${circle.duration}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

