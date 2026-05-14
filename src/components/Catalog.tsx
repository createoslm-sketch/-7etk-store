import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Cpu, GraduationCap, ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

type CategoryFilter = "formations" | "ebooks" | "techs";

const categoryCards: {
  id: CategoryFilter;
  label: string;
  icon: typeof GraduationCap;
  matcher: (category: string, title: string) => boolean;
}[] = [
  {
    id: "formations",
    label: "FORMATIONS",
    icon: GraduationCap,
    matcher: (category) => category.toLowerCase() === "formation",
  },
  {
    id: "ebooks",
    label: "EBOOKS",
    icon: BookOpen,
    matcher: (category, title) =>
      ["ebook", "ebooks"].includes(category.toLowerCase()) || title.toLowerCase().includes("ebook"),
  },
  {
    id: "techs",
    label: "TECHS",
    icon: Cpu,
    matcher: (category) =>
      ["tech", "sourcing", "outil", "osint", "finance", "cyber"].includes(category.toLowerCase()),
  },
];

export function Catalog() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter | null>(null);

  const selectedCategory = categoryCards.find((card) => card.id === activeCategory);

  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return [];

    return products.filter((product) => selectedCategory.matcher(product.category, product.title));
  }, [selectedCategory]);

  return (
    <section id="categories-section" className="relative px-6 py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-violet-400">
            Choisis ton univers
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {selectedCategory ? selectedCategory.label : "Categories"}
          </h2>
        </div>

        {!selectedCategory ? (
          <div
            key="categories"
            className="grid animate-[catalog-fade_320ms_ease-out] grid-cols-1 gap-6 md:grid-cols-3"
          >
            {categoryCards.map((card) => {
              const Icon = card.icon;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveCategory(card.id)}
                  className="group flex aspect-square flex-col items-center justify-center gap-6 rounded-xl border-2 border-violet-500 bg-transparent p-8 text-center transition-all duration-300 hover:scale-105 hover:bg-violet-500/10"
                >
                  <Icon className="h-16 w-16 text-violet-500 transition-transform duration-300 group-hover:scale-110 group-hover:text-violet-400" />
                  <span className="text-xl font-bold uppercase tracking-[0.18em] text-violet-500 transition-colors duration-300 group-hover:text-violet-400 md:text-2xl">
                    {card.label}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div key={selectedCategory.id} className="animate-[catalog-fade_320ms_ease-out]">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-violet-500 px-4 py-2 text-sm font-semibold text-violet-400 transition-all duration-300 hover:bg-violet-500/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux categories
            </button>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <article
                  key={product.id}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#080808] transition-all duration-300 hover:scale-105 hover:border-violet-500/60 ${
                    product.id === "1"
                      ? "shadow-[0_0_45px_rgba(139,92,246,0.45)] hover:shadow-[0_0_65px_rgba(168,85,247,0.55)]"
                      : ""
                  }`}
                >
                  <Link
                    to="/product/$productId"
                    params={{ productId: product.id }}
                    className="relative block aspect-[4/3] overflow-hidden bg-zinc-950"
                  >
                    <div className="absolute inset-4 rounded-full bg-violet-600/30 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="relative h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-violet-900/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-violet-950/55 to-black/10" />
                    {product.badge ? (
                      <span className="absolute left-4 top-4 rounded-md bg-violet-600 px-3 py-1 text-xs font-black uppercase text-white">
                        {product.badge}
                      </span>
                    ) : null}
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <Link
                      to="/product/$productId"
                      params={{ productId: product.id }}
                      className="line-clamp-2 min-h-[3.5rem] text-lg font-bold text-white transition-colors duration-300 hover:text-violet-200"
                    >
                      {product.title}
                    </Link>

                    <div className="mt-auto pt-5">
                      <p className="mb-4 text-2xl font-black text-white">{product.price}€</p>
                      <div className="flex w-full flex-row gap-2">
                        <button
                          onClick={() => {
                            addItem(product);
                            toast.success("Ajoute au panier", {
                              description: product.title,
                            });
                            navigate({ to: "/checkout" });
                          }}
                          className="inline-flex basis-[60%] items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-black text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500"
                        >
                          <Zap className="h-4 w-4" />
                          Acheter
                        </button>
                        <button
                          onClick={() => {
                            addItem(product);
                            toast.success("Ajoute au panier", {
                              description: product.title,
                            });
                          }}
                          aria-label={`Ajouter ${product.title} au panier`}
                          className="inline-flex basis-[40%] items-center justify-center gap-2 rounded-lg border-2 border-violet-500 bg-transparent px-3 py-3 text-sm font-bold text-violet-400 transition-all duration-300 hover:scale-105 hover:bg-violet-500/10 hover:text-violet-300"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span className="hidden xl:inline">Ajouter</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
