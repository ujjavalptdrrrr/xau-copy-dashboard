export type ConnectionStatus = "connected" | "failed" | "disconnected";
export type BrokerConfig = { id: string; broker: string; server: string; login: string; name: string; accountType: string; status: ConnectionStatus; message: string; lastTested: string | null };
export const BROKERS: Record<string, string[]> = { "IC Markets": ["ICMarkets-Live07"], "Exness": ["Exness-Real3"] };
export const demoConfigs: BrokerConfig[] = [];
export const simulateTest = (c: any) => ({ status: "connected" as ConnectionStatus, message: "OK" });