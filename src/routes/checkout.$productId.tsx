import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CreditCard, Bitcoin, Copy, Check, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/checkout/$productId")({
  component: Checkout,
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Paiement — ${loaderData?.product.title ?? ""} | !7etk` }],
  }),
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <Link to="/" className="text-primary hover:underline">Retour à l'accueil</Link>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <p className="text-destructive">{error.message}</p>
    </main>
  ),
});

type TabKey = "card" | "paypal" | "crypto";
type Crypto = "BTC" | "ETH" | "USDT";

const WALLETS: Record<Crypto, string> = {
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  USDT: "TXYZab1234567890CDEFghijKLMNopqrSTU",
};

function Checkout() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("card");
  const [crypto, setCrypto] = useState<Crypto>("BTC");
  const [copied, setCopied] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const fees = 0;
  const total = product.price + fees;

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const copyWallet = async () => {
    await navigator.clipboard.writeText(WALLETS[crypto]);
    setCopied(true);
    toast.success("Adresse copiée");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePay = (label: string) => {
    toast.success(`Paiement ${label} confirmé (démo)`);
    setTimeout(() => navigate({ to: "/" }), 1200);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-28 pb-20 px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/3 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[140px]" />
        </div>

        <div className="max-w-6xl mx-auto">
          <Link
            to="/product/$productId"
            params={{ productId: product.id }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au produit
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Paiement sécurisé
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Left: payment methods */}
            <div className="rounded-3xl border border-border bg-card/50 backdrop-blur p-6 md:p-8">
              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-muted/40 border border-border mb-8">
                <TabButton active={tab === "card"} onClick={() => setTab("card")} icon={<CreditCard className="h-4 w-4" />} label="Carte" />
                <TabButton active={tab === "paypal"} onClick={() => setTab("paypal")} icon={<PaypalIcon />} label="PayPal" />
                <TabButton active={tab === "crypto"} onClick={() => setTab("crypto")} icon={<Bitcoin className="h-4 w-4" />} label="Crypto" />
              </div>

              {tab === "card" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePay("par carte");
                  }}
                  className="space-y-5"
                >
                  <Field label="Nom sur la carte">
                    <input
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="input"
                    />
                  </Field>
                  <Field label="Numéro de carte">
                    <div className="relative">
                      <input
                        required
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="input pr-12"
                      />
                      <CreditCard className="h-4 w-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Date d'expiration">
                      <input
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/AA"
                        className="input"
                      />
                    </Field>
                    <Field label="CVV">
                      <input
                        required
                        inputMode="numeric"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        placeholder="123"
                        className="input"
                      />
                    </Field>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform"
                  >
                    <Lock className="h-4 w-4" />
                    Payer {total}€
                  </button>
                </form>
              )}

              {tab === "paypal" && (
                <div className="flex flex-col items-center text-center py-8">
                  <p className="text-muted-foreground max-w-sm mb-8">
                    Vous serez redirigé vers PayPal pour finaliser votre achat en toute sécurité.
                  </p>
                  <button
                    onClick={() => handlePay("PayPal")}
                    className="w-full max-w-md inline-flex items-center justify-center gap-3 px-6 py-5 rounded-xl bg-[#FFC439] text-[#003087] font-bold text-lg hover:brightness-105 transition"
                  >
                    <PaypalIcon big />
                    Se connecter avec PayPal
                  </button>
                  <p className="mt-6 text-xs text-muted-foreground flex items-center gap-2">
                    <Lock className="h-3 w-3" /> Connexion chiffrée SSL
                  </p>
                </div>
              )}

              {tab === "crypto" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    {(["BTC", "ETH", "USDT"] as Crypto[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setCrypto(c)}
                        className={`px-4 py-4 rounded-xl border transition text-center font-semibold ${
                          crypto === c
                            ? "border-primary bg-primary/10 text-primary shadow-glow"
                            : "border-border bg-muted/30 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-border bg-background/60 p-6">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Adresse {crypto}
                    </p>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/40 border border-border">
                      <code className="flex-1 text-sm break-all text-foreground font-mono">
                        {WALLETS[crypto]}
                      </code>
                      <button
                        onClick={copyWallet}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition"
                      >
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copié" : "Copier"}
                      </button>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      Envoyez exactement <span className="text-primary font-semibold">{total}€</span> en {crypto} à cette adresse. Votre commande sera validée après confirmation sur la blockchain.
                    </p>
                  </div>

                  <button
                    onClick={() => handlePay(crypto)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.01] transition-transform"
                  >
                    J'ai effectué le paiement
                  </button>
                </div>
              )}

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Transactions chiffrées · Vos données ne sont jamais stockées
              </div>
            </div>

            {/* Right: order summary */}
            <aside className="rounded-3xl border border-border bg-card/50 backdrop-blur p-6 h-fit lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                Résumé
              </h2>

              <div className="flex gap-4">
                <div className="h-24 w-24 rounded-xl overflow-hidden border border-border shrink-0">
                  <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h3 className="font-semibold leading-tight line-clamp-2">{product.title}</h3>
                  <p className="mt-2 text-lg font-bold text-foreground">{product.price}€</p>
                </div>
              </div>

              <div className="my-6 h-px bg-border" />

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Sous-total</dt>
                  <dd>{product.price}€</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Frais</dt>
                  <dd>Gratuit</dd>
                </div>
              </dl>

              <div className="my-6 h-px bg-border" />

              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-3xl font-bold text-primary drop-shadow-[0_0_20px_oklch(0.62_0.22_295/0.5)]">
                  {total}€
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .input {
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
        .input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px oklch(0.62 0.22 295 / 0.25);
        }
        .input::placeholder { color: var(--color-muted-foreground); }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
        {label}
      </span>
      {children}
    </label>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-gradient-primary text-primary-foreground shadow-glow"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function PaypalIcon({ big = false }: { big?: boolean }) {
  const size = big ? 22 : 16;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.4 21.5h-3l2.6-16h6.5c3.4 0 5.4 1.7 4.9 4.9-.5 3.5-3 5.3-6.6 5.3H9.2l-.7 5.8H7.4zM10 11.6h2c1.7 0 2.8-.8 3-2.4.2-1.4-.6-2.1-2.2-2.1h-2L10 11.6z" />
    </svg>
  );
}
