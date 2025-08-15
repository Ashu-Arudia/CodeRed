// app/components/Parallax.tsx
"use client";
import { useEffect, useRef } from "react";

type Props = {
  image: string;
  height?: string; // e.g., "70vh"
  speed?: number; // 0.1 (subtle) to 0.6 (strong)
  children?: React.ReactNode;
  className?: string;
};

export default function Parallax({
  image,
  height = "70vh",
  speed = 0.3,
  children,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const inner = innerRef.current!;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // progress: 0 at bottom entering, 1 at top leaving
      const visible = Math.max(0, Math.min(1, 1 - rect.top / viewportH));
      const translate = (visible - 0.5) * 2 * speed * 100; // -speed..+speed in %
      inner.style.transform = `translate3d(0, ${translate}%, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf.current = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [speed]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "translate3d(0,0,0)",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        {children}
      </div>
    </section>
  );
}
