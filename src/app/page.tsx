import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      {/* Content sections for scroll context */}
      <section className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide">
            About Itzfizz Digital
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            We are a digital agency focused on building exceptional web
            experiences. Our team works on cutting-edge projects using modern
            technologies like React, Next.js, and GSAP.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide">
            Our Mission
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            To deliver premium web solutions that drive results. We combine
            creativity with technical excellence to build websites and
            applications that stand out.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide">
            Get In Touch
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Interested in joining our team? We are always looking for talented
            individuals who are passionate about web development.
          </p>
          <a
            href="mailto:careers@itzfizz.com"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
