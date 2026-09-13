const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface StoreSettings {
  whatsappNumber: string;
  storeName: string;
}

export async function getSettings(): Promise<StoreSettings> {
  const res = await fetch(`${API_URL}/settings`);
  return res.json();
}
