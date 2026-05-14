import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, Star, StarHalf, Zap } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { getProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";

type Review = {
  id: number;
  name: string;
  text: string;
  rating: 3.5 | 4 | 4.5 | 5;
};

const reviewsByCategory: Record<string, Review[]> = {
  "Tech Zalando": [
    { id: 1, name: "Vortex_92", text: "reçu en 2h, franchement c'est du lourd 🚀 ca marche direct", rating: 4.5 },
    { id: 2, name: "DripSett", text: "bof, trop cher pour ce qu'on reçoit honnêtement", rating: 3.5 },
    { id: 3, name: "Koba_Tech", text: "excellent outil, rien à redire. Vraiment satisfait.", rating: 5 },
    { id: 4, name: "User8372", text: "pas mal mais la doc manque de contenu", rating: 4 },
  ],
  "Tech Nike": [
    { id: 5, name: "Lezard_Vip", text: "trop top, tu dois l'essayer franchement ✅", rating: 5 },
    { id: 6, name: "Apex_X", text: "c'est ok mais j'ai eu du mal avec l'install", rating: 4 },
    { id: 7, name: "Neon_Blaze", text: "franchement nul pour moi, pas compris comment l'utiliser", rating: 3.5 },
  ],
  Sourcing: [
    { id: 10, name: "Pixel_Kit", text: "c'est du feux, les fournisseurs sont sérieux 🔥", rating: 5 },
    { id: 11, name: "Echo_Pro", text: "rapide, bon service vraiment", rating: 4.5 },
    { id: 12, name: "Flux_88", text: "pas convaincu, tarifs trop élevés pour la qualité", rating: 3.5 },
    { id: 13, name: "Spark_Nova", text: "clairement efficace 💯", rating: 5 },
    { id: 14, name: "Void_Master", text: "j'aurais aimé plus de choix honnêtement", rating: 4 },
  ],
  Finance: [
    { id: 15, name: "Titan_X", text: "contenu top, ROI clair ✅ je recommande", rating: 5 },
    { id: 16, name: "Luna_Byte", text: "bon mais manque de profondeur sur certains chapitres", rating: 4 },
    { id: 17, name: "Rogue_9", text: "déçu par le pricing franchement", rating: 3.5 },
  ],
  Cyber: [
    { id: 18, name: "Nexus_Zero", text: "formation de ouf 🚀 franchement bluffé", rating: 4.5 },
    { id: 19, name: "Storm_77", text: "trop technique au début mais j'ai compris petit à petit", rating: 4 },
    { id: 20, name: "Abyss_Core", text: "excellent pour progresser vite. Top.", rating: 5 },
    { id: 21, name: "Volt_Strike", text: "meh", rating: 3.5 },
  ],
  OnlyFans: [
    { id: 22, name: "Myth_Elite", text: "a changé mon game fr fr 💯", rating: 5 },
    { id: 23, name: "Frost_X", text: "utile mais faut de la motivation et de l'énergie", rating: 4 },
    { id: 24, name: "Nexo_77", text: "pas ton truc si tu galère avec l'anglais c'est un soucis", rating: 4.5 },
  ],
  Tech: [
    { id: 25, name: "Sigma_Code", text: "optimisations solides, ca marche comme prévu", rating: 5 },
    { id: 26, name: "Prism_88", text: "bon produit, un peu cher pour ce qu'on reçoit", rating: 4 },
  ],
  Formation: [
    { id: 27, name: "Zephyr_K", text: "excellente formation 10/10 franchement", rating: 5 },
    { id: 28, name: "Apex_23", text: "claire et bien structurée 👍", rating: 4.5 },
    { id: 29, name: "Crown_X", text: "j'aime le style pédagogique c'est cool", rating: 5 },
    { id: 30, name: "Quantum_22", text: "un peu de lenteurs vidéo mais sinon top contenu", rating: 4 },
    { id: 31, name: "Swift_89", text: "bof ca m'a pas aidé personnellement", rating: 3.5 },
  ],
  OSINT: [
    { id: 36, name: "Orion_7", text: "techniques de fou 🔥 j'avais pas vu ca avant", rating: 5 },
    { id: 37, name: "Phoenix_Sky", text: "solide et efficace pour la plupart des cas", rating: 4.5 },
    { id: 38, name: "Sonic_77", text: "manque de cas réels à mon avis", rating: 4 },
  ],
  Outil: [
    { id: 39, name: "Storm_Echo", text: "rapid et efficace, 10/10 pas déçu", rating: 5 },
    { id: 40, name: "Vibe_99", text: "bon pour les débutants surtout", rating: 4 },
    { id: 41, name: "Eclipse_X", text: "buggé un peu au départ mais ca s'est arrangé", rating: 3.5 },
    { id: 42, name: "Pulse_88", text: "ça marche nickel pour mes besoins 👍", rating: 4.5 },
  ],
  Default: [
    { id: 43, name: "Volt_99", text: "solide 👍", rating: 5 },
    { id: 44, name: "Nebula_K", text: "pas mal franchement", rating: 4 },
  ],
};

export const Route = createFileRoute("/product/$productId-new")({
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
  const reviews =
    reviewsByCategory[product.title] ??
    reviewsByCategory[product.category] ??
    reviewsByCategory.Default;
  const { addItem } = useCart();
  const navigate = useNavigate();

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
                <span>· 1.2k avis</span>
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

              <section className="mt-16 rounded-[2rem] border border-border bg-card p-6">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                      Avis des clients
                    </p>
                    <h2 className="text-2xl font-bold text-foreground">
                      Ce que disent les utilisateurs
                    </h2>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {reviews.length} avis vérifiés
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-3xl border border-border bg-background/80 p-5"
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-amber-400">
                            {Array.from({ length: Math.floor(review.rating) }).map((_, starIndex) => (
                              <Star
                                key={`full-${starIndex}`}
                                className="h-4 w-4 fill-current"
                              />
                            ))}
                            {review.rating % 1 === 0.5 ? (
                              <StarHalf className="h-4 w-4 fill-current" />
                            ) : null}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {review.text}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
