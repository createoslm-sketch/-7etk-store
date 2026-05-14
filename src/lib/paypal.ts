/**
 * PayPal SDK loader
 * -----------------
 * Charge dynamiquement le SDK PayPal côté client. Utilise le client-id
 * `sandbox` par défaut. Pour la production, remplace par ton client-id PayPal
 * (variable d'env VITE_PAYPAL_CLIENT_ID) lié au compte de réception.
 */

export const PAYPAL_RECEIVER_EMAIL = "younes24092008@gmail.com";
export const PAYPAL_CLIENT_ID =
  (import.meta as any).env?.VITE_PAYPAL_CLIENT_ID || "sb";

let loadingPromise: Promise<any> | null = null;

export function loadPaypalSdk(currency = "EUR"): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if ((window as any).paypal) return Promise.resolve((window as any).paypal);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      PAYPAL_CLIENT_ID,
    )}&currency=${currency}&intent=capture`;
    script.async = true;
    script.onload = () => resolve((window as any).paypal);
    script.onerror = () => {
      loadingPromise = null;
      reject(new Error("Impossible de charger le SDK PayPal"));
    };
    document.body.appendChild(script);
  });

  return loadingPromise;
}
