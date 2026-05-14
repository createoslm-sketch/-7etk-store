import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Bitcoin, Check, Copy, CreditCard, Lock, Mail, ShieldCheck, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { sendEmailDelivery } from "@/lib/sendEmailDelivery";
import { loadPaypalSdk, PAYPAL_RECEIVER_EMAIL } from "@/lib/paypal";
import { processStripePayment } from "@/lib/stripePayment";

export const Route = createFileRoute("/checkout/")({
  component: CartCheckout,
  head: () => ({ meta: [{ title: "Paiement — !7etk" }] }),
});

type TabKey = "card" | "paypal" | "crypto";
type Crypto = "BTC" | "LTC";

const WALLETS: Record<Crypto, string> = {
  BTC: "bc1qarm5rlvh04yr6yptu8emnmzz9plggvdl248yq7",
  LTC: "LgQcYPoavzAos4kdij1NiDagUAF4iGxTrz",
};

function CartCheckout() {
  const { items, subtotal, discount, total, promoCode, applyPromoCode, clearPromoCode, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<"email" | "pay">("email");
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState<TabKey>("card");
  const [crypto, setCrypto] = useState<Crypto>("BTC");
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState(promoCode);
  const [paying, setPaying] = useState(false);

  // Card fields
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const copyWallet = async () => {
    await navigator.clipboard.writeText(WALLETS[crypto]);
    setCopied(true);
    toast.success("Adresse copiée");
    setTimeout(() => setCopied(false), 2000);
  };

  const finalize = async (method: "card" | "paypal" | "crypto") => {
    const orderId = `ord_${Date.now()}`;
    await sendEmailDelivery({
      email,
      items: items.map((i) => ({ id: i.product.id, title: i.product.title, price: i.product.price, quantity: i.quantity })),
      total,
      paymentMethod: method,
      cryptoCurrency: method === "crypto" ? crypto : undefined,
      orderId,
    });
    toast.success("Paiement confirmé");
    clearCart();
    navigate({ to: "/confirmation", search: { email, total, method } });
  };

  // ---- PayPal SDK ----
  const paypalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step !== "pay" || tab !== "paypal" || !paypalRef.current) return;
    let cancelled = false;
    paypalRef.current.innerHTML = "";
    loadPaypalSdk("EUR")
      .then((paypal) => {
        if (cancelled || !paypalRef.current) return;
        paypal.Buttons({
          style: { layout: "vertical", color: "gold", shape: "pill", label: "pay" },
          createOrder: (_: any, actions: any) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: { value: total.toFixed(2), currency_code: "EUR" },
                  payee: { email_address: PAYPAL_RECEIVER_EMAIL },
                  description: `Commande !7etk (${items.length} article${items.length > 1 ? "s" : ""})`,
                },
              ],
            }),
          onApprove: async (_: any, actions: any) => {
            try {
              await actions.order.capture();
              await finalize("paypal");
            } catch (e) {
              toast.error("Erreur lors de la capture PayPal");
            }
          },
          onError: () => toast.error("Erreur PayPal, réessayez."),
        }).render(paypalRef.current);
      })
      .catch(() => toast.error("Impossible de charger PayPal"));
    return () => { cancelled = true; };
  }, [step, tab, total, items.length]);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <section className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
          <Link to="/" className="text-primary hover:underline">Retour au catalogue</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-28 pb-20 px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
        </div>

        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8">
            <ArrowLeft className="h-4 w-4" /> Continuer mes achats
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Paiement sécurisé</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            <div className="rounded-3xl border border-border bg-card/50 backdrop-blur p-6 md:p-8">
              {step === "email" ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (!email) return; setStep("pay"); }}
                  className="max-w-lg mx-auto text-center py-6"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 border border-primary/40 mb-6">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Votre email</h2>
                  <p className="text-muted-foreground mb-8">
                    Où devons-nous envoyer vos fichiers après le paiement ?
                  </p>
                  <input
                    required type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="ck-input text-center mb-5"
                  />
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform">
                    Continuer vers le paiement
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <button onClick={() => setStep("email")} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" /> Modifier l'email
                    </button>
                    <span className="text-muted-foreground">
                      Livraison : <span className="text-primary font-medium">{email}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-muted/40 border border-border mb-8">
                    {(["card", "paypal", "crypto"] as TabKey[]).map((t) => (
                      <button key={t} onClick={() => setTab(t)} className={`inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${tab === t ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}>
                        {t === "card" && <CreditCard className="h-4 w-4" />}
                        {t === "crypto" && <Bitcoin className="h-4 w-4" />}
                        {t === "card" ? "Carte" : t === "paypal" ? "PayPal" : "Crypto"}
                      </button>
                    ))}
                  </div>

                  {tab === "card" && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setPaying(true);
                        try {
                          const res = await processStripePayment({ email, cardName, cardNumber, expiry, cvv, amount: total });
                          if (res.success) await finalize("card");
                        } catch {
                          toast.error("Paiement refusé");
                        } finally {
                          setPaying(false);
                        }
                      }}
                      className="space-y-5"
                    >
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="ck-input" />
                      <input required value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Nom sur la carte" className="ck-input" />
                      <input required value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim())} placeholder="1234 5678 9012 3456" className="ck-input" />
                      <div className="grid grid-cols-2 gap-4">
                        <input required value={expiry} onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(0, 4); setExpiry(d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d); }} placeholder="MM/AA" className="ck-input" />
                        <input required maxLength={4} value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))} placeholder="CVV" className="ck-input" />
                      </div>
                      <button disabled={paying} type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-60">
                        <Lock className="h-4 w-4" /> {paying ? "Traitement…" : `Payer ${total}€`}
                      </button>
                      <p className="text-xs text-muted-foreground text-center">Paiement sécurisé — Stripe (à connecter avec votre clé API).</p>
                    </form>
                  )}

                  {tab === "paypal" && (
                    <div className="space-y-4">
                      <p className="text-center text-sm text-muted-foreground">
                        Connectez-vous à PayPal pour payer <span className="text-primary font-semibold">{total}€</span>.
                        Le paiement sera envoyé à <span className="text-primary">{PAYPAL_RECEIVER_EMAIL}</span>.
                      </p>
                      <div ref={paypalRef} className="min-h-[200px]" />
                    </div>
                  )}

                  {tab === "crypto" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-3">
                        {(["BTC", "LTC"] as Crypto[]).map((c) => (
                          <button key={c} onClick={() => setCrypto(c)} className={`px-4 py-4 rounded-xl border transition text-center font-semibold ${crypto === c ? "border-primary bg-primary/10 text-primary shadow-glow" : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                      <div className="rounded-2xl border border-border bg-background/60 p-6">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Adresse {crypto}</p>
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/40 border border-border">
                          <code className="flex-1 text-sm break-all text-foreground font-mono">{WALLETS[crypto]}</code>
                          <button onClick={copyWallet} className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition">
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {copied ? "Copié" : "Copier"}
                          </button>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">
                          Envoyez exactement <span className="text-primary font-semibold">{total}€</span> en {crypto} à cette adresse.
                        </p>
                      </div>
                      <button onClick={() => finalize("crypto")} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform">
                        J'ai envoyé le paiement
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <aside className="rounded-3xl border border-border bg-card/50 backdrop-blur p-6 h-fit lg:sticky lg:top-24 space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Résumé ({items.length})</h2>

              <ul className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-3">
                    <div className="h-16 w-16 rounded-lg overflow-hidden border border-border shrink-0">
                      <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold leading-tight line-clamp-1">{product.title}</h3>
                      <p className="text-xs text-muted-foreground">x{quantity}</p>
                      <p className="text-sm font-bold">{product.price * quantity}€</p>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="self-start p-1 text-muted-foreground hover:text-destructive transition">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Code créateur */}
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" /> Code créateur
                </label>
                {promoCode ? (
                  <div className="flex items-center justify-between rounded-lg border border-primary/40 bg-primary/10 px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      <Check className="h-4 w-4" /> {promoCode} (-10%)
                    </span>
                    <button onClick={() => { clearPromoCode(); setCode(""); }} className="text-xs text-muted-foreground hover:text-foreground">Retirer</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Entrez votre code" className="flex-1 rounded-lg bg-background/60 border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
                    <button
                      onClick={() => {
                        if (applyPromoCode(code)) toast.success("Code appliqué !");
                        else toast.error("Code invalide");
                      }}
                      className="px-3 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary text-sm font-medium hover:bg-primary/30 transition"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Sous-total</span><span>{subtotal}€</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Réduction</span><span>-{discount}€</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-3xl font-bold text-primary drop-shadow-[0_0_20px_oklch(0.62_0.22_295/0.5)]">{total}€</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .ck-input {
          width: 100%;
          background: oklch(0 0 0 / 0.4);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 0.875rem 1rem;
          color: var(--color-foreground);
          font-size: 0.95rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .ck-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px oklch(0.62 0.22 295 / 0.25);
        }
        .ck-input::placeholder { color: var(--color-muted-foreground); }
      `}</style>
    </main>
  );
}
