import { useEffect, useState } from "react";
import { Sparkles, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-foreground">!7etk</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <button onClick={() => scrollTo("hero")} className="hover:text-foreground transition">Accueil</button>
          <button onClick={() => scrollTo("shop-section")} className="hover:text-foreground transition">Catalogue</button>
          <button onClick={() => scrollTo("shop-section")} className="hover:text-foreground transition">Formations</button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("shop-section")}
            className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"
          >
            Explorer
          </button>
          <button
            onClick={openCart}
            aria-label="Ouvrir le panier"
            className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-primary text-primary-foreground shadow-glow hover:scale-105 transition"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 inline-flex items-center justify-center rounded-full bg-background text-primary text-xs font-bold border border-primary">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

