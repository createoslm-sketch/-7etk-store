/**
 * sendEmailDelivery
 * -----------------
 * Stub function pour la livraison des fichiers par email après paiement.
 * Branche ici ton API (Resend, SendGrid, Lovable Cloud, webhook custom...).
 *
 * Exemple d'intégration future :
 *   await fetch("/api/send-delivery", {
 *     method: "POST",
 *     body: JSON.stringify({ email, items, orderId }),
 *   });
 */

export type DeliveryItem = {
  id: string;
  title: string;
  price: number;
  quantity?: number;
};

export type DeliveryPayload = {
  email: string;
  items: DeliveryItem[];
  total: number;
  paymentMethod: "card" | "paypal" | "crypto";
  cryptoCurrency?: "BTC" | "LTC";
  orderId: string;
};

export async function sendEmailDelivery(
  payload: DeliveryPayload,
): Promise<{ success: boolean; message: string }> {
  // TODO: connecter l'API d'envoi réel ici
  console.log("[sendEmailDelivery] payload:", payload);

  // Simulation pour le moment
  return {
    success: true,
    message: `Fichiers envoyés à ${payload.email}`,
  };
}
