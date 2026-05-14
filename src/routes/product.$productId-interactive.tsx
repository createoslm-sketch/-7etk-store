import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, Star, StarHalf, Zap, Send } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { getProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  text: string;
  rating: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  timestamp: number;
};

const getLocalStorageKey = (productId: string) => `reviews_${productId}`;

const StarRating = ({ rating, onRatingChange, interactive = false }: { rating: number; onRatingChange?: (r: number) => void; interactive?: boolean }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const displayRating = interactive ? (hoverRating || rating) : rating;
          const isFullStar = star <= Math.floor(displayRating);
          const isHalfStar = star === Math.ceil(displayRating) && displayRating % 1 !== 0;
          
          return (
            <button
              key={star}
              onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
              onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
              onClick={interactive ? () => onRatingChange?.(star) : undefined}
              className={`transition-all ${interactive ? 'cursor-pointer' : ''}`}
            >
              {isFullStar ? (
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              ) : isHalfStar ? (
                <StarHalf className="h-5 w-5 fill-amber-400 text-amber-400" />
              ) : (
                <Star className="h-5 w-5 text-amber-400/30" />
              )}
            </button>
          );
        })}
      </div>
      {interactive && <span className="text-xs text-muted-foreground">{rating}/5</span>}
    </div>
  );
};

export const Route = createFileRoute("/product/$productId-interactive")({
  component: ProductDetail,
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title ?? "Produit"} — !7etk` },
      {
        name: "description",
        content: loaderData?.product.description.slice(0, 155) ?? "",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Produit introuvable</h1>
      <Link to="/" className="text-primary hover:underline">
        Retour à l'accueil
      </Link>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <p className="text-destructive">{error.message}</p>
    </main>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  // Charger les avis depuis localStorage
  useEffect(() => {
    const storageKey = getLocalStorageKey(product.id);
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        console.error("Erreur de chargement des avis", e);
      }
    }
  }, [product.id]);

  // Sauvegarder les avis dans localStorage
  const saveReview = (newReviews: Review[]) => {
    const storageKey = getLocalStorageKey(product.id);
    localStorage.setItem(storageKey, JSON.stringify(newReviews));
    setReviews(newReviews);
  };

  const handlePublishReview = () => {
    if (!name.trim() || !text.trim()) {
      toast.error("Remplis tous les champs");
      return;
    }

    const newReview: Review = {
      id: `review_${Date.now()}`,
      name: name.trim(),
      text: text.trim(),
      rating: rating as any,
      timestamp: Date.now(),
    };

    const updated = [newReview, ...reviews];
    saveReview(updated);
    
    setName("");
    setText("");
    setRating(5);
    toast.success("Avis publié ! ✅");
  };

  const handleAddToCart = () => {
    addItem(product);
    toast.success("Ajouté au panier", { description: product.title });
  };

  const handleBuyNow = () => {
    addItem(product);
    navigate({ to: "/checkout" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-28 pb-20 px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: image */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full bg-background/80 backdrop-blur border border-border text-foreground">
                {product.category}
              </span>
            </div>

            {/* Right: details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-foreground font-medium">{product.rating}</span>
                <span>· {reviews.length} avis</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {product.title}
              </h1>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-5xl font-bold text-primary drop-shadow-[0_0_20px_oklch(0.62_0.22_295/0.5)]">
                  {product.price}€
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {Math.round(product.price * 1.4)}€
                </span>
              </div>

              <div className="mt-8 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Accès à vie
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Mises à jour gratuites
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Support communauté
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Téléchargement instantané
                </li>
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Ajouter au panier
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform"
                >
                  <Zap className="h-5 w-5" />
                  Acheter maintenant
                </button>
              </div>

              {/* REVIEWS SECTION */}
              <section className="mt-16 rounded-[2rem] border border-border bg-card p-6">
                <div className="mb-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                    Avis des clients
                  </p>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Partage ton avis
                  </h2>

                  {/* FORM */}
                  <div className="space-y-4 mb-8 p-5 rounded-2xl border border-border bg-background/50">
                    <input
                      type="text"
                      placeholder="Pseudo (ex: User_75, Vortex_92)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">
                        Note
                      </label>
                      <StarRating rating={rating} onRatingChange={setRating} interactive={true} />
                    </div>

                    <textarea
                      placeholder="Ton commentaire..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                    />

                    <button
                      onClick={handlePublishReview}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                    >
                      <Send className="h-4 w-4" />
                      Publier l'avis
                    </button>
                  </div>
                </div>

                {/* REVIEWS LIST */}
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Pas encore d'avis. Sois le premier à en laisser un ! 🚀
                    </p>
                  ) : (
                    reviews.map((review, idx) => (
                      <article
                        key={review.id}
                        className="rounded-2xl border border-border bg-background/50 p-5 animate-in fade-in slide-in-from-top-4 duration-300"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <p className="font-semibold text-foreground text-sm">{review.name}</p>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {review.text}
                        </p>
                      </article>
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
