import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, Brain, Heart, Zap, Droplets, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const letters = [
    { 
      char: 'M', 
      icon: Brain, 
      color: '#d67f2e', // cambridge-500
      tooltip: 'Machine Learning',
      description: 'Neural networks firing in digital synapses'
    },
    { 
      char: 'A', 
      icon: Sparkles, 
      color: '#a0855f', // velvet-500
      tooltip: 'Art + Growth',
      description: 'Creativity blooming in infinite dimensions'
    },
    { 
      char: 'H', 
      icon: Heart, 
      color: '#d65a5a', // mahogany-500
      tooltip: 'Heart',
      description: 'Passion pulsing through every line of code'
    },
    { 
      char: 'L', 
      icon: Zap, 
      color: '#edb12e', // parchment-500
      tooltip: 'Late-night Coder',
      description: 'Lightning strikes at 3 AM breakthroughs'
    },
    { 
      char: 'E', 
      icon: Droplets, 
      color: '#8f6f4d', // velvet-600
      tooltip: 'Emotions',
      description: 'Empathy flowing through technology'
    },
    { 
      char: 'T', 
      icon: TrendingUp, 
      color: '#c76524', // cambridge-600
      tooltip: 'Tenacity',
      description: 'Climbing mountains of impossible problems'
    },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center bg-cream-50 px-4 sm:px-6 lg:px-8"
    >
      <div className={`relative z-10 text-center transition-all duration-1000 w-full max-w-6xl ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="name-container mb-6 sm:mb-8 perspective-1000">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
            {letters.map((letter, index) => {
              const Icon = letter.icon;
              return (
                <div
                  key={index}
                  className="relative group cursor-pointer transform-gpu touch-button"
                  onMouseEnter={() => !isMobile && setHoveredLetter(letter.char)}
                  onMouseLeave={() => !isMobile && setHoveredLetter(null)}
                  onTouchStart={() => isMobile && setHoveredLetter(letter.char)}
                  onTouchEnd={() => isMobile && setTimeout(() => setHoveredLetter(null), 2000)}
                  style={{
                    transform: hoveredLetter === letter.char ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                >
                  <div className={`
                    letter text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-serif
                    transition-all duration-400 ease-out relative
                    ${hoveredLetter === letter.char ? 'text-oxford-700' : 'text-ink-900'}
                  `}
                  style={{
                    opacity: hoveredLetter === letter.char ? 0 : 1,
                    textShadow: 'none',
                    animationDelay: `${index * 0.1}s`
                  }}>
                    {letter.char}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center"
                       style={{
                         opacity: hoveredLetter === letter.char ? 1 : 0,
                         transition: 'opacity 0.4s ease-out'
                       }}>
                    <Icon 
                      size={isMobile ? 32 : 48} 
                      className="text-oxford-700"
                    />
                  </div>
                  {hoveredLetter === letter.char && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 oxford-card px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-sm font-medium z-20 border-parchment-400 border ${isMobile ? 'w-[250px] -top-16' : 'w-[280px] -top-20'}`}
                    >
                      <div className="text-center">
                        <div className="font-bold text-oxford-700 text-xs sm:text-sm font-serif">
                          {letter.tooltip}
                        </div>
                        <div className="text-ink-700 text-xs mt-1 font-sans">
                          {letter.description}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-8 sm:mb-12">
          <h2 className="font-serif text-oxford-700 text-2xl sm:text-3xl mb-4">
            Computational Artist & AI Researcher
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-ink-900">
            Bridging the gap between artificial intelligence and human creativity, 
            crafting digital experiences that resonate with both mind and soul.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link to="/projects" className="px-6 py-3 rounded-lg bg-oxford-700 text-cream-50 font-semibold font-serif border border-parchment-400 hover:bg-oxford-800 transition">
            Explore My Work
          </Link>
          <Link to="/about" className="px-6 py-3 rounded-lg border border-oxford-700 text-oxford-700 font-semibold font-serif hover:bg-cream-200 transition">
            Learn More About Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;