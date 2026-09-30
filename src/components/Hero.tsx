"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 58, label: "Increase in pick up point use" },
  { value: 23, label: "Decreased in customer phone calls" },
  { value: 27, label: "Increase in pick up point use" },
  { value: 40, label: "Decreased in customer phone calls" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation timeline
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Headline staggered reveal
      introTl.fromTo(
        headlineRef.current!.querySelectorAll(".headline-letter"),
        { y: 80, opacity: 0, rotateX: -80 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.06,
          ease: "back.out(1.7)",
        }
      );

      // Stats animate in one by one
      introTl.fromTo(
        statsRef.current!.querySelectorAll(".stat-item"),
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(2)",
        },
        "-=0.6"
      );

      // Car initial animation
      introTl.fromTo(
        carRef.current,
        { y: 100, opacity: 0, scale: 0.8, rotation: -10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.6)",
        },
        "-=1.0"
      );

      // Scroll-based car animation
      gsap.to(carRef.current, {
        y: -150,
        x: 100,
        rotation: 15,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Headline parallax on scroll
      gsap.to(headlineRef.current, {
        y: -100,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Stats fade out on scroll
      gsap.to(statsRef.current, {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Progress bar animation
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-6xl mx-auto">
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.3em] mb-12 text-center perspective-1000"
        >
          {"WELCOME ITZFIZZ".split("").map((letter, i) => (
            <span
              key={i}
              className="headline-letter inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        {/* Car image container */}
        <div
          ref={carRef}
          className="relative w-full max-w-2xl h-64 sm:h-80 md:h-96 mb-12 flex items-center justify-center"
        >
          {/* Car SVG */}
          <svg
            viewBox="0 0 400 200"
            className="w-full h-full drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Car body */}
            <path
              d="M50 120 L80 80 L120 60 L280 60 L320 80 L350 120 L350 140 L50 140 Z"
              fill="url(#carGradient)"
              stroke="#333"
              strokeWidth="2"
            />
            {/* Car top */}
            <path
              d="M100 80 L130 50 L270 50 L300 80"
              fill="url(#carTopGradient)"
              stroke="#333"
              strokeWidth="2"
            />
            {/* Windows */}
            <path
              d="M140 75 L160 55 L240 55 L260 75 Z"
              fill="#1a1a2e"
              stroke="#444"
              strokeWidth="1"
            />
            {/* Wheels */}
            <circle cx="100" cy="140" r="25" fill="#111" stroke="#333" strokeWidth="3" />
            <circle cx="100" cy="140" r="12" fill="#222" stroke="#444" strokeWidth="2" />
            <circle cx="300" cy="140" r="25" fill="#111" stroke="#333" strokeWidth="3" />
            <circle cx="300" cy="140" r="12" fill="#222" stroke="#444" strokeWidth="2" />
            {/* Headlights */}
            <ellipse cx="340" cy="110" rx="8" ry="5" fill="#ffeb3b" opacity="0.8" />
            <ellipse cx="60" cy="110" rx="8" ry="5" fill="#ff5252" opacity="0.8" />
            {/* Gradients */}
            <defs>
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e53935" />
                <stop offset="50%" stopColor="#c62828" />
                <stop offset="100%" stopColor="#b71c1c" />
              </linearGradient>
              <linearGradient id="carTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef5350" />
                <stop offset="100%" stopColor="#c62828" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Statistics */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col items-center text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}%
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-zinc-500 uppercase tracking-widest">
          Scroll
        </span>
        <svg
          className="w-6 h-6 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
