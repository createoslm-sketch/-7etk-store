import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, Download, Mail, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { sendEmailDelivery } from "@/lib/sendEmailDelivery";
import { DOWNLOAD_FILE_URL } from "@/data/products";

const searchSchema = z.object({
  email: z.string().optional().default(""),
  total: z.coerce.number().optional().default(0),
  method: z.enum(["card", "paypal", "crypto"]).optional().default("card"),
});

export const Route = createFileRoute("/confirmation")({
  component: Confirmation,
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Confirmation — !7etk" }] }),
});

function Confirmation() {
  const { email, total, method } = Route.useSearch();

  useEffect(() => {
    if (!email) return;
    // Simulation d'envoi d'email automatique de confirmation
    sendEmailDelivery({
      email,
      items: [{ id: "order", title: "Votre commande !7etk", price: total }],
      total,
      paymentMethod: method,
      orderId: `ord_${Date.now()}`,
    }).then(() => console.log(`[confirmation] email envoyé à ${email}`));
  }, [email, total, method]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[160px]" />
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 border border-primary/40 shadow-glow mb-8">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Merci pour votre achat !
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Votre paiement de <span className="text-primary font-semibold">{total}€</span> a bien été validé.
          </p>

          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 mb-8 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <p className="text-base">
                Email de confirmation envoyé à{" "}
                <span className="text-primary font-semibold break-all">
                  {email || "votre adresse"}
                </span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Pensez à vérifier vos spams si vous ne voyez rien.
            </p>
          </div>

          <a
            href={DOWNLOAD_FILE_URL}
            download
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform mb-4"
          >
            <Download className="h-5 w-5" />
            Télécharger mon E-book
          </a>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au catalogue
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
