export type AccountStatus = "live" | "paused" | "offline";
export type LotMode = "fixed" | "multiplier";
export type AccountType = "master" | "client";

export type Account = {
  id: string; name: string; broker: string; login: string; server: string;
  accountType: AccountType; status: AccountStatus; balance: number; equity: number;
  lotMode: LotMode; fixedLot: number; multiplier: number;
};

export type Trade = {
  id: string; accountId: string; time: string; symbol: string; side: "BUY" | "SELL";
  lots: number; open: number; close: number; profit: number;
};

export const demoAccounts: Account[] = [
  { id: "a1", name: "Master", broker: "IC Markets", login: "5102233", server: "ICMarkets-Live07", accountType: "master", status: "live", balance: 25430.5, equity: 25612.1, lotMode: "fixed", fixedLot: 1.0, multiplier: 0.04 },
  { id: "a2", name: "Client — Rahul", broker: "Exness", login: "8823011", server: "Exness-Real3", accountType: "client", status: "live", balance: 5210.0, equity: 5244.8, lotMode: "fixed", fixedLot: 0.2, multiplier: 0.04 },
];

export const demoTrades: Trade[] = [];
export const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });