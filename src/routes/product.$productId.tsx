import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Star, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { getProduct, getStableReviewStats, promoByProductId } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/product/$productId")({
  component: ProductDetail,
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title ?? "Produit"} - !7etk` },
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
        Retour au catalogue
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
  const reviewStats = getStableReviewStats(product.id);
  const promo = promoByProductId[product.id];
  const oldPrice = product.originalPrice ?? promo?.oldPrice;

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

            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {product.title}
              </h1>

              <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
                <Star className="h-4 w-4 fill-[#FFC107] text-[#FFC107]" />
                <span className="font-semibold text-foreground">{reviewStats.rating}</span>
                <span>({reviewStats.count} avis)</span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-5xl font-bold text-white">
                  {product.price}€
                </span>
                {oldPrice ? (
                  <span className="text-sm text-muted-foreground line-through">
                    {oldPrice}€
                  </span>
                ) : null}
              </div>

              <div className="mt-8 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                  Description complete
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-10">
                <button
                  onClick={handleBuyNow}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] sm:w-auto"
                >
                  <Zap className="h-5 w-5" />
                  Acheter maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
