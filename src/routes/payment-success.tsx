import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { z } from "zod";

const searchSchema = z.object({
  email: z.string().optional().default(""),
});

export const Route = createFileRoute("/payment-success")({
  component: PaymentSuccess,
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Paiement réussi — !7etk" }] }),
});

function PaymentSuccess() {
  const { email } = Route.useSearch();

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
            Paiement réussi !
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Merci pour votre achat. Votre commande est confirmée.
          </p>

          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <p className="text-base md:text-lg">
                Vos fichiers ont été envoyés à{" "}
                <span className="text-primary font-semibold break-all">
                  {email || "votre adresse email"}
                </span>
              </p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Pensez à vérifier vos spams si vous ne voyez rien dans les prochaines minutes.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-transform"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
        </div>
      </section>
    </main>
  );
}
