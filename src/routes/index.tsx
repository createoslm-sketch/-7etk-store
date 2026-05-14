import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Catalog } from "@/components/Catalog";
import { DiscordBanner } from "@/components/DiscordBanner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Nova — E-books & Formations Premium" },
      {
        name: "description",
        content:
          "Découvrez une bibliothèque exclusive d'e-books et de formations modernes pour développer vos compétences grâce a !7etk.",
      },
      { property: "og:title", content: "Nova — E-books & Formations Premium" },
      {
        content: "Apprenez. Créez.et devenez riche",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Catalog />
      <DiscordBanner />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Nova. Tous droits réservés.
      </footer>
    </main>
  );
}
