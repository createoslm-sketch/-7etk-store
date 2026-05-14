/**
 * Stripe payment stub
 * -------------------
 * Branche ici ton API Stripe quand tu auras ta clé secrète.
 * Pour le côté client, expose VITE_STRIPE_PUBLISHABLE_KEY puis remplace
 * cette fonction par un appel à Stripe.js (loadStripe + confirmCardPayment).
 *
 * Exemple futur (côté serveur via createServerFn) :
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *   const intent = await stripe.paymentIntents.create({
 *     amount: Math.round(payload.amount * 100),
 *     currency: "eur",
 *     receipt_email: payload.email,
 *   });
 */

export type StripePayload = {
  email: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
};

export async function processStripePayment(
  payload: StripePayload,
): Promise<{ success: boolean; transactionId: string }> {
  // TODO: Remplacer par un vrai appel à l'API Stripe
  console.log("[stripe] processing payment", { ...payload, cardNumber: "****", cvv: "***" });
  await new Promise((r) => setTimeout(r, 1200));
  return { success: true, transactionId: `stripe_${Date.now()}` };
}
