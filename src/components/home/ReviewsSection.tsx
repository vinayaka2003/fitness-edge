import React, { useState, useRef, useEffect, useCallback } from 'react';
import { reviewsData } from '../../data/reviews';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const getScrollStep = useCallback(() => {
    if (!scrollContainerRef.current) return 380;
    const firstCard = scrollContainerRef.current.firstElementChild as HTMLElement;
    return firstCard ? firstCard.offsetWidth + 24 : 380; // card width + 24px gap
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollContainerRef.current) return;
      const step = getScrollStep();
      scrollContainerRef.current.scrollTo({
        left: index * step,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    },
    [getScrollStep]
  );

  const handlePrev = () => {
    setIsPaused(true);
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const step = getScrollStep();

    if (container.scrollLeft <= 10) {
      // Loop to end
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    setIsPaused(true);
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const step = getScrollStep();

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      // Loop back to start
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  // Sync index on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const step = getScrollStep();
    const index = Math.round(scrollContainerRef.current.scrollLeft / step);
    if (index >= 0 && index < reviewsData.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  // Gentle auto-advance when not interacting
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const step = getScrollStep();

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, getScrollStep]);

  return (
    <section className="bg-[#09090c] py-20 sm:py-24 border-t border-white/[0.06] select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Section Header with Nav Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white uppercase tracking-tight">
              Member Experiences
            </h2>
            <p className="text-sm text-neutral-400 font-sans">
              Real feedback from athletes and lifters who train with us.
            </p>
          </div>

          {/* Minimalist Slide Navigation */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="text-xs font-mono text-neutral-400">
              {activeIndex + 1} / {reviewsData.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-[#121217] hover:bg-[#1a1a22] border border-white/[0.08] hover:border-white/20 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-[#121217] hover:bg-[#1a1a22] border border-white/[0.08] hover:border-white/20 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Card Visible Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="w-[85vw] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] shrink-0 snap-start bg-gradient-to-b from-[#13131a] to-[#0a0a0f] border border-white/[0.05] hover:border-[#C50212]/30 hover:shadow-[0_0_30px_rgba(197, 2, 18,0.08)] transition-all duration-500 rounded-xl p-6 sm:p-8 flex flex-col justify-between min-h-[300px] relative group"
            >
              <div>
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 transition-colors duration-300 ${i < rev.rating ? 'text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]' : 'text-white/5 fill-white/5'}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Body Content */}
                <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans font-light mb-8 group-hover:text-white transition-colors duration-300">
                  "{rev.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-5 border-t border-white/[0.04]">
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#121217] border border-white/10 group-hover:border-[#C50212]/50 transition-all duration-500 shrink-0">
                  <span className="text-white font-bold text-sm tracking-widest">
                    {rev.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white tracking-wide truncate">
                    {rev.author}
                  </span>
                  <span className="text-xs text-[#C50212] font-sans font-medium uppercase tracking-wider truncate mt-1">
                    {rev.membershipType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviewsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPaused(true);
                scrollToIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
