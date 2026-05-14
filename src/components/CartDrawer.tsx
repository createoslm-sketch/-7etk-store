import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items, subtotal, discount, total, promoCode, applyPromoCode, clearPromoCode, isOpen, closeCart, removeItem, updateQuantity } = useCart();
  const [code, setCode] = useState("");


  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Mon panier</h2>
            <span className="text-sm text-muted-foreground">({items.length})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-muted/50 transition"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
              <div className="h-16 w-16 rounded-full bg-muted/40 flex items-center justify-center">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Votre panier est vide</p>
              <button
                onClick={closeCart}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl border border-border bg-card/40"
                >
                  <div className="h-20 w-20 rounded-lg overflow-hidden border border-border shrink-0">
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <h3 className="text-sm font-semibold leading-tight line-clamp-2">{product.title}</h3>
                    <p className="mt-1 text-sm font-bold text-primary">{product.price}€</p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 hover:bg-muted/50 transition"
                          aria-label="Diminuer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 hover:bg-muted/50 transition"
                          aria-label="Augmenter"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                        aria-label="Retirer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border p-6 space-y-4 bg-card/30">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" /> Code créateur
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-primary/10 px-3 py-2">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <Check className="h-4 w-4" /> {promoCode} (-10%)
                  </span>
                  <button
                    onClick={() => { clearPromoCode(); setCode(""); toast.info("Code retiré"); }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Entrez votre code"
                    className="flex-1 rounded-lg bg-background/60 border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => {
                      if (applyPromoCode(code)) toast.success("Code créateur appliqué !");
                      else toast.error("Code invalide");
                    }}
                    className="px-3 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary text-sm font-medium hover:bg-primary/30 transition"
                  >
                    Appliquer
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Sous-total</span>
                <span>{subtotal}€</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Réduction</span>
                  <span>-{discount}€</span>
                </div>
              )}
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-primary drop-shadow-[0_0_18px_oklch(0.62_0.22_295/0.5)]">
                {total}€
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform"
            >
              Passer à la caisse
            </Link>
          </footer>
        )}

      </aside>
    </>
  );
}
