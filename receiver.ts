export const ago = (sec: number) => "just now";
export const maskToken = (t: string) => t.slice(0, 4) + "..." + t.slice(-4);
export type Health = "good" | "degraded" | "none";
export const receiverMeta = (a: any) => ({ health: "good" as Health, lastSeenSec: 0, symbol: "XAUUSD", timeframe: "M5", token: "tok_1234567890", healthScore: 100, latencyMs: 45 });