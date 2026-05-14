export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  glowColor?: "cyan";
  specialGlow?: boolean;
  shortDescription: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "9",
    title: "All refund",
    category: "Tech",
    price: 70.0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&auto=format&fit=crop",
    shortDescription: "La methode ultime contenant 38 sites exploitables pour vos refunds.",
    description:
      "La methode ultime contenant 38 sites exploitables pour vos refunds. Tout ce qu'il vous faut pour reussir.",
  },
  {
    id: "22",
    title: "L'ENSEMBLE DU SITE (PACK ÉLITE)",
    category: "Bundle",
    price: 250,
    rating: 5,
    image: "/images/5k-suppliers.png",
    shortDescription: "Acces total a toutes les ressources du site.",
    description:
      "Accès total et illimité à l'intégralité des formations, techniques et bases de données de la plateforme. Inclut Nike Tech, Vinted, AliExpress, 5K Fournisseurs et toutes les formations IA/OFM. L'investissement ultime pour ceux qui veulent tout dominer d'un coup.",
  },
  {
    id: "24",
    title: "Formation Alex Hitchens",
    category: "Formation",
    price: 84.99,
    rating: 4.9,
    image: "/images/alex-hitchens.png",
    badge: "OFFRE LIMITÉE",
    shortDescription: "Masterclass influence, mindset et networking.",
    description:
      "Le masterclass complet sur l'influence, le mindset et la valeur sociale. Une formation premium pour comprendre les codes du networking, renforcer son image et progresser avec une methode claire.",
  },
  {
    id: "25",
    title: "Formation de Keo",
    category: "Formation",
    price: 69.99,
    rating: 4.9,
    image: "/images/formation-keo.png",
    shortDescription: "Formation sourcing, automatisation et marque personnelle.",
    description:
      "Decouvrez la methode exclusive de Keo pour maitriser le marche actuel. Une approche premium sur le sourcing, l'automatisation des ventes et la creation d'une marque forte. Inclus : etudes de cas reelles et acces aux outils prives utilises par Keo.",
  },
  {
    id: "28",
    title: "Formation Yomi Denzel",
    category: "Formation",
    price: 49.99,
    rating: 4.9,
    image: "/images/yomi-denzel.png",
    shortDescription: "Apprenez les secrets du E-commerce et du Business en ligne.",
    description:
      "Apprenez les secrets du E-commerce et du Business en ligne avec la méthode de Yomi Denzel.",
  },
  {
    id: "23",
    title: "OFM : Formation de la Menace",
    category: "Formation",
    price: 74.99,
    rating: 4.9,
    image: "/images/la-menace-ofm.png",
    specialGlow: true,
    shortDescription: "Formation OFM agressive orientee scale.",
    description:
      "La méthode radicale pour exploser en OFM. Stratégies de management, psychologie de vente et scaling agressif.",
  },
  {
    id: "1",
    title: "5k fournisseur",
    category: "Sourcing",
    price: 19.99,
    rating: 4.8,
    image: "/images/watermarked_img_1859419249417054901.png",
    shortDescription: "Accede a une base fournisseurs claire et exploitable.",
    description:
      "Accédez à notre base de données exclusive de plus de 5000 fournisseurs certifiés. Que ce soit pour l'électronique, la mode, les cosmétiques ou le matériel informatique, trouvez le partenaire idéal pour scaler votre business. Inclut : contacts directs, tarifs préférentiels, et conseils de négociation pour maximiser vos marges.",
  },
  {
    id: "2",
    title: "Trading",
    category: "Formation",
    price: 29.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop",
    shortDescription: "Approche claire pour progresser en trading.",
    description:
      "Programme structure autour des bases du trading, de l'analyse technique, de la gestion du risque et de la discipline. Le contenu t'aide a comprendre les marches avec une methode plus rigoureuse et des decisions mieux preparees.",
  },
  {
    id: "3",
    title: "Apprentissage Cyber-securite",
    category: "Formation",
    price: 34.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=1200&auto=format&fit=crop",
    shortDescription: "Formation cyber pour acquerir des bases solides.",
    description:
      "Parcours professionnel pour decouvrir les fondamentaux de la cybersecurite : analyse, bonnes pratiques, protection des environnements et methodes de travail. Ideal pour construire des bases serieuses et progresser avec une vision claire.",
  },
  {
    id: "27",
    title: "Ebooks Trading",
    category: "Ebooks",
    price: 19.99,
    rating: 4.7,
    image: "/images/ma-photo-trading.png",
    shortDescription: "Bases du trading, analyse technique et gestion du risque.",
    description:
      "Apprenez les bases du trading, l'analyse technique et la gestion du risque pour devenir profitable.",
  },
  {
    id: "29",
    title: "Ebook OFM IA",
    category: "Ebooks",
    price: 34.99,
    rating: 4.9,
    image: "/images/ebook-ofm-ia.png",
    shortDescription: "Automatisez une agence OFM grâce à l'intelligence artificielle.",
    description:
      "Découvrez comment automatiser une agence OFM grâce à l'intelligence artificielle. Scaling, recrutement et gestion sans effort.",
  },
  {
    id: "5",
    title: "Tech Apple",
    category: "Tech",
    price: 14.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop",
    shortDescription: "Optimise tes methodes autour de l'ecosysteme Apple.",
    description:
      "Guide pratique pour mieux comprendre les process, les optimisations et les bonnes pratiques liees a l'ecosysteme Apple. Le contenu met l'accent sur une approche claire, rapide a appliquer et orientee resultat.",
  },
  {
    id: "6",
    title: "Formation OFM IA",
    category: "Formation",
    price: 49.99,
    rating: 4.9,
    image: "/images/ofm-ia-formation-dark.webp",
    shortDescription: "Formation avancee pour structurer une activite OFM.",
    description:
      "Maîtrisez l'art de l'OFM (OnlyFans Management) propulsé par l'Intelligence Artificielle. Accédez à nos stratégies exclusives de sourcing sombre, d'automatisation de chat et de scale d'agences. Formation complète, mise à jour 2026, incluant l'intégration des modèles d'IA les plus performants pour le ressel et la gestion.",
  },
  {
    id: "8",
    title: "DOX",
    category: "OSINT",
    price: 23.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&auto=format&fit=crop",
    shortDescription: "Methodes OSINT pour mieux organiser tes recherches.",
    description:
      "Ressource professionnelle sur les methodes OSINT, le recoupement d'informations publiques et l'organisation d'une investigation numerique. Elle met l'accent sur la clarte, la verification des sources et une utilisation responsable des donnees accessibles.",
  },
  {
    id: "10",
    title: "Tech PayPal",
    category: "Tech",
    price: 9.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop",
    shortDescription:
      "Exploite la technique Paypal pour securiser et maximiser tes gains legalement.",
    description:
      "Exploite la technique Paypal pour securiser et maximiser tes gains legalement. Cette ressource t'aide a mieux comprendre les litiges, les preuves, les delais et les bonnes pratiques pour gerer tes paiements avec plus de methode.",
  },
  {
    id: "11",
    title: "Tech Vinted",
    category: "Tech",
    price: 19.99,
    rating: 4.7,
    image: "/images/vinted-tech-premium.png",
    glowColor: "cyan",
    shortDescription: "Technique exclusive pour le resell et les failles de la plateforme Vinted.",
    description:
      "L'arsenal ultime pour dominer Vinted. Algorithmes de détection de drops, techniques de négociation assistée par IA et méthodes de sourcing invisibles. Devenez le leader du ressell en 2026.",
  },
  {
    id: "16",
    title: "Tech Zalando",
    category: "Tech",
    price: 24.99,
    rating: 4.7,
    image: "/images/zalando-clean.png",
    shortDescription:
      "Maitrise la technique Zalando pour obtenir tes articles et optimiser tes commandes.",
    description:
      "Maitrise la technique Zalando pour obtenir tes articles et optimiser tes commandes. Cette methode t'aide a mieux comprendre les parcours d'achat, suivre tes operations et appliquer une organisation plus precise a chaque commande.",
  },
  {
    id: "17",
    title: "Tech Nike",
    category: "Tech",
    price: 14.99,
    rating: 4.8,
    image: "/images/nike-tech.jpg",
    shortDescription: "Accede aux stocks exclusifs Nike Tech.",
    description:
      "Accedez aux stocks exclusifs Nike Tech. Drops limites, editions rares et acces anticipe. Ideal pour le ressel ou pour completer votre collection personnelle.",
  },
  {
    id: "12",
    title: "Generateur d'Email",
    category: "Outil",
    price: 4.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&auto=format&fit=crop",
    shortDescription: "Cree et organise tes emails plus rapidement.",
    description:
      "Outil de generation d'emails concu pour gagner du temps dans la creation, l'organisation et la gestion de comptes. Il facilite les workflows repetitifs avec une approche simple, rapide et professionnelle.",
  },
  {
    id: "15",
    title: "Bot Telegram Pro",
    category: "Outil",
    price: 9.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop",
    shortDescription: "Automatise ta communaute et tes notifications Telegram.",
    description:
      "Bot Telegram pense pour automatiser les notifications, organiser une communaute et fluidifier les interactions. Il aide a centraliser les actions importantes et a rendre la gestion quotidienne plus efficace.",
  },
  {
    id: "18",
    title: "Site no VBV",
    category: "Outil",
    price: 9.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
    shortDescription: "Ressources web organisees pour tes recherches.",
    description:
      "Selection de ressources web organisees pour analyser des parcours de paiement, comparer les informations disponibles et optimiser tes recherches avec une structure plus claire.",
  },
  {
    id: "19",
    title: "Ebook Resell Vinted",
    category: "Ebook",
    price: 14.99,
    rating: 4.7,
    image: "/images/ebook-resell-vinted.png",
    shortDescription: "Guide resell Vinted pour vendre avec methode.",
    description:
      "La bible du ressel sur Vinted. Apprenez à transformer 10€ en 500€ avec nos secrets de sourcing, l'art de l'authentification express et les horaires précis pour sniper les meilleures pépites. Inclus : liste des marques à forte marge et modèles de messages pour conclure chaque vente.",
  },
  {
    id: "20",
    title: "Panel CC",
    category: "Outil",
    price: 29.99,
    rating: 4.6,
    image: "/images/panel-cc.png",
    shortDescription: "Tableau de bord clair pour piloter tes donnees.",
    description:
      "Tableau de bord centralise pour organiser tes donnees, suivre tes operations et piloter tes actions avec plus de clarte. L'objectif est de rendre les informations utiles plus accessibles et mieux structurees.",
  },
  {
    id: "21",
    title: "Tech AliExpress",
    category: "Tech",
    price: 9.99,
    rating: 4.7,
    image: "/images/aliexpress-tech.png",
    shortDescription: "Optimise tes recherches et commandes AliExpress.",
    description:
      "Exploitez les failles du géant du e-commerce. Méthodes de refund avancées, détection de fournisseurs cachés et automatisation de dropshipping à haute marge. La porte d'entrée vers l'importation massive sans les contraintes habituelles.",
  },
];

export const DOWNLOAD_FILE_URL = "/downloads/ebook.pdf";

export const promoByProductId: Record<string, { oldPrice: number; badge: string }> = {
  "1": { oldPrice: 99, badge: "-80%" },
  "3": { oldPrice: 150, badge: "-77%" },
  "5": { oldPrice: 60, badge: "-75%" },
};

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getStableReviewStats(productId: string) {
  const seed = Array.from(productId).reduce((total, char) => total + char.charCodeAt(0), 0);

  return {
    rating: (4.5 + (seed % 6) / 10).toFixed(1),
    count: 15 + (seed % 71),
  };
}
