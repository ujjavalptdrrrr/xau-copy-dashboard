import { useEffect, useState } from "react";
import { demoAccounts, demoTrades, type Account, type AccountStatus } from "./demo-data";
import type { AccountFormValues } from "./account-schema";
import { demoConfigs, simulateTest, type BrokerConfig } from "./brokers";

export type AccountInput = AccountFormValues;
const KEY = "xau-demo-accounts-v1";
export function useAccountsStore() {
  const [accounts, setAccounts] = useState<Account[]>(demoAccounts);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setAccounts(JSON.parse(raw) as Account[]);
    } catch { }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(accounts));
  }, [accounts, loaded]);
  return {
    accounts, trades: demoTrades,
    add: (input: AccountInput) => setAccounts((p) => [...p, { ...input, id: `a${Date.now()}`, equity: input.balance, status: "live" }]),
    update: (id: string, input: AccountInput) => setAccounts((p) => p.map((a) => (a.id === id ? { ...a, ...input } : a))),
    setStatus: (id: string, status: AccountStatus) => setAccounts((p) => p.map((a) => (a.id === id ? { ...a, status } : a))),
    reset: () => setAccounts(demoAccounts),
  };
}

const CFG_KEY = "xau-demo-broker-configs-v1";
export type BrokerConfigInput = Pick<BrokerConfig, "broker" | "server" | "login" | "name" | "accountType">;
export function useBrokerConfigStore() {
  const [configs, setConfigs] = useState<BrokerConfig[]>(demoConfigs);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(CFG_KEY); if (raw) setConfigs(JSON.parse(raw) as BrokerConfig[]); } catch { }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(CFG_KEY, JSON.stringify(configs)); }, [configs, loaded]);
  return {
    configs,
    save: (input: BrokerConfigInput, id?: string) => setConfigs((p) => id ? p.map((c) => (c.id === id ? { ...c, ...input, status: "disconnected", message: "Changed", lastTested: null } : c)) : [...p, { ...input, id: `c${Date.now()}`, status: "disconnected", lastTested: null, message: "Not tested" }]),
    remove: (id: string) => setConfigs((p) => p.filter((c) => c.id !== id)),
    disconnect: (id: string) => setConfigs((p) => p.map((c) => (c.id === id ? { ...c, status: "disconnected", message: "Disconnected" } : c))),
    test: async (id: string) => {
      await new Promise((r) => setTimeout(r, 900));
      setConfigs((p) => p.map((c) => (c.id === id ? { ...c, ...simulateTest(c), lastTested: new Date().toISOString() } : c)));
    },
  };
}