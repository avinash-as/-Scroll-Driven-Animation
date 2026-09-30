"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "58%", label: "Increase in pick up point use", color: "#def54f", textColor: "#111", position: { top: "5%", right: "30%" } },
  { value: "23%", label: "Decreased in customer phone calls", color: "#6ac9ff", textColor: "#111", position: { bottom: "5%", right: "35%" } },
  { value: "27%", label: "Increase in pick up point use", color: "#333", textColor: "#fff", position: { top: "5%", right: "10%" } },
  { value: "40%", label: "Decreased in customer phone calls", color: "#fa7328", textColor: "#111", position: { bottom: "5%", right: "12.5%" } },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const valueTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current!;
      const trail = trailRef.current!;
      const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
      const valueText = valueTextRef.current!;

      const roadWidth = window.innerWidth;
      const carWidth = 150;
      const endX = roadWidth - carWidth;

      // Car scroll animation
      gsap.to(car, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: trackRef.current,
        },
        x: endX,
        ease: "none",
        onUpdate: function () {
          const carX = (gsap.getProperty(car, "x") as number) + carWidth / 2;
          const valueRect = valueText.getBoundingClientRect();
          const letterOffsets = letters.map(
            (letter) => letter.offsetLeft
          );

          letters.forEach((letter, i) => {
            const letterX = valueRect.left + letterOffsets[i];
            if (carX >= letterX) {
              letter.style.opacity = "1";
            } else {
              letter.style.opacity = "0";
            }
          });

          gsap.set(trail, { width: carX });
        },
      });

      // Stats boxes appear on scroll
      const boxIds = ["#box1", "#box2", "#box3", "#box4"];
      const startOffsets = [400, 600, 800, 1000];
      const endOffsets = [600, 800, 1000, 1200];

      boxIds.forEach((boxId, i) => {
        gsap.to(boxId, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${startOffsets[i]} top`,
            end: `top+=${endOffsets[i]} top`,
            scrub: true,
          },
          opacity: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div
        ref={trackRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#d1d1d1" }}
      >
        {/* Road */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ height: "200px", backgroundColor: "#1e1e1e" }}
        >
          {/* Trail */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0"
            style={{ height: "200px", background: "#45db7d", width: 0 }}
          />

          {/* Car */}
          <div
            ref={carRef}
            className="absolute top-0 left-0"
            style={{ height: "200px", zIndex: 10 }}
          >
            <Image
              src="/McLaren_720S_2022_top_view.png"
              alt="McLaren 720S"
              width={300}
              height={200}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Value Text - WELCOME ITZFIZZ */}
        <div
          ref={valueTextRef}
          className="absolute flex gap-[0.3rem]"
          style={{
            top: "30%",
            left: "5%",
            zIndex: 5,
            fontSize: "8rem",
            fontWeight: "bold",
          }}
        >
          {"WELCOME ITZFIZZ".split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el;
              }}
              style={{
                color: "#111",
                opacity: 0,
                display: "inline-block",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>

        {/* Stats Boxes */}
        {stats.map((stat, i) => (
          <div
            key={i}
            id={`box${i + 1}`}
            className="absolute flex flex-col justify-start items-center gap-1 rounded-[10px] p-[30px]"
            style={{
              ...stat.position,
              backgroundColor: stat.color,
              color: stat.textColor,
              fontSize: "18px",
              opacity: 0,
              zIndex: 5,
            }}
          >
            <span style={{ fontSize: "58px", fontWeight: 600 }}>
              {stat.value}
            </span>
            {stat.label}
          </div>
        ))}
      </div>
    </div>
  );
}
