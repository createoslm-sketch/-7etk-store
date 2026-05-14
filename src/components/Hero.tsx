import { ArrowRight } from "lucide-react";

function DiscordIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M19.54 5.23a16.9 16.9 0 0 0-4.2-1.3.12.12 0 0 0-.13.06 11.7 11.7 0 0 0-.52 1.07 15.7 15.7 0 0 0-4.74 0 10.7 10.7 0 0 0-.53-1.07.13.13 0 0 0-.13-.06 16.8 16.8 0 0 0-4.2 1.3.12.12 0 0 0-.05.05C2.26 9.36 1.4 13.34 1.78 17.27a.14.14 0 0 0 .05.09 16.9 16.9 0 0 0 5.16 2.6.13.13 0 0 0 .14-.05 12 12 0 0 0 1.05-1.7.13.13 0 0 0-.07-.18 11.3 11.3 0 0 1-1.62-.77.13.13 0 0 1-.01-.22l.32-.25a.13.13 0 0 1 .13-.02 12.1 12.1 0 0 0 10.72 0 .13.13 0 0 1 .14.02l.32.25a.13.13 0 0 1-.02.22 10.6 10.6 0 0 1-1.61.77.13.13 0 0 0-.07.17 13.5 13.5 0 0 0 1.04 1.71.13.13 0 0 0 .14.05 16.8 16.8 0 0 0 5.17-2.6.13.13 0 0 0 .05-.09c.46-4.54-.77-8.49-3.21-11.99a.1.1 0 0 0-.06-.05ZM8.52 14.88c-1 0-1.82-.92-1.82-2.05s.8-2.06 1.82-2.06c1.03 0 1.84.93 1.82 2.06 0 1.13-.8 2.05-1.82 2.05Zm6.97 0c-1 0-1.82-.92-1.82-2.05s.8-2.06 1.82-2.06c1.03 0 1.84.93 1.82 2.06 0 1.13-.8 2.05-1.82 2.05Z" />
    </svg>
  );
}

export function Hero() {
  const scrollToCategories = () => {
    const el = document.getElementById("categories-section");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black px-6 pt-28">
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-5xl items-center justify-center">
        <div className="text-center">
          <div className="mb-7 inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-violet-200">
            ⚡ Formations premium
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-black uppercase leading-[0.92] tracking-tight text-white md:text-7xl lg:text-8xl">
            Domine le{" "}
            <span className="bg-gradient-to-r from-violet-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              business
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-base leading-7 text-zinc-300 md:text-lg">
            Accede a des formations premium, des ebooks et des techniques concretes pour lancer,
            structurer et scaler tes revenus avec une methode claire.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={scrollToCategories}
              className="group inline-flex min-w-44 items-center justify-center gap-2 rounded-lg bg-violet-600 px-6 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500"
            >
              Acheter
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="https://discord.gg/G8MYvZfKnf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-44 items-center justify-center gap-2 rounded-lg border-[1.5px] border-violet-500 bg-[#121212] px-6 py-3.5 text-sm font-black uppercase tracking-[0.08em] text-white transition-all duration-300 hover:scale-105 hover:border-violet-300"
            >
              <DiscordIcon />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
