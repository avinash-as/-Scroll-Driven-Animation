"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { id: "box1", value: "58%", label: "Increase in pick up point use", bg: "#def54f", color: "#111", style: { top: "10%", right: "20%" } },
  { id: "box2", value: "23%", label: "Decreased in customer phone calls", bg: "#6ac9ff", color: "#111", style: { bottom: "10%", right: "25%" } },
  { id: "box3", value: "27%", label: "Increase in pick up point use", bg: "#333", color: "#fff", style: { top: "10%", right: "2%" } },
  { id: "box4", value: "40%", label: "Decreased in customer phone calls", bg: "#fa7328", color: "#111", style: { bottom: "10%", right: "5%" } },
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
      const carWidth = 200;
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
          const letterOffsets = letters.map((letter) => letter.offsetLeft);

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
    <div ref={sectionRef} style={{ height: "200vh", position: "relative", background: "#121212" }}>
      <div
        ref={trackRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d1d1d1",
          overflow: "hidden",
        }}
      >
        {/* Road */}
        <div
          style={{
            width: "100vw",
            height: "200px",
            backgroundColor: "#1e1e1e",
            position: "absolute",
            bottom: 0,
            left: 0,
            overflow: "hidden",
          }}
        >
          {/* Trail */}
          <div
            ref={trailRef}
            style={{
              height: "200px",
              background: "#45db7d",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              width: 0,
            }}
          />

          {/* Car */}
          <div
            ref={carRef}
            style={{
              height: "200px",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
            }}
          >
            <Image
              src="/McLaren_720S_2022_top_view.png"
              alt="McLaren 720S"
              width={400}
              height={200}
              style={{ height: "200px", width: "auto", objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* Value Text - WELCOME ITZFIZZ on the trail */}
        <div
          ref={valueTextRef}
          style={{
            position: "absolute",
            bottom: "100px",
            left: 0,
            zIndex: 5,
            display: "flex",
            gap: "0.3rem",
            fontSize: "clamp(2rem, 6vw, 6rem)",
            fontWeight: "bold",
            whiteSpace: "nowrap",
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
        {stats.map((stat) => (
          <div
            key={stat.id}
            id={stat.id}
            style={{
              position: "absolute",
              ...stat.style,
              zIndex: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexDirection: "column",
              gap: "5px",
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: stat.bg,
              color: stat.color,
              fontSize: "18px",
              opacity: 0,
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
