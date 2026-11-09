import { useMemo, useState } from "react";
import { money, type Account, type AccountStatus } from "@/lib/demo-data";
import { calcLot } from "@/lib/lot";
import { ago, maskToken, receiverMeta, type Health } from "@/lib/receiver";
import { Btn, StatusBadge, inputCls } from "./ui";

const healthUi: Record<Health, { label: string; bar: string; text: string }> = {
  good: { label: "Healthy", bar: "bg-success", text: "text-success" },
  degraded: { label: "Degraded", bar: "bg-warning", text: "text-warning" },
  none: { label: "No signal", bar: "bg-destructive", text: "text-destructive" },
};

type Props = {
  accounts: Account[];
  onAdd: () => void;
  onReset: () => void;
  onEdit: (a: Account) => void;
  onStatus: (id: string, s: AccountStatus) => void;
  onDisconnect: (a: Account) => void;
};

export function ReceiverCards({ accounts, onAdd, onReset, onEdit, onStatus, onDisconnect }: Props) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | AccountStatus>("all");
  const [broker, setBroker] = useState("all");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const brokers = useMemo(() => [...new Set(accounts.map((a) => a.broker))].sort(), [accounts]);

  const term = q.trim().toLowerCase();
  const shown = accounts.filter((a) =>
    (status === "all" || a.status === status) &&
    (broker === "all" || a.broker === broker) &&
    (!term || [a.name, a.login, a.broker, a.server].some((x) => x.toLowerCase().includes(term))));

  const toggle = (id: string) => setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <section className="rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <h2 className="font-display text-sm font-bold tracking-[0.18em]">CONNECTED RECEIVERS &amp; ACCOUNTS</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{shown.length} of {accounts.length} shown · demo snapshot</p>
        </div>
        <div className="flex gap-2">
          <Btn onClick={onReset}>Reset demo</Btn>
          <Btn variant="gold" onClick={onAdd}>+ Add new account</Btn>
        </div>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-2 2xl:grid-cols-3">
        {shown.map((a) => {
          const m = receiverMeta(a);
          const hUi = healthUi[m.health];
          const expanded = open.has(a.id);
          const online = a.status !== "offline";
          return (
            <article key={a.id} className="flex flex-col rounded-2xl border bg-background/60 p-4 transition hover:border-primary/40">
              <header className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display font-semibold">{a.name}</h3>
                    {a.accountType === "master" && <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-primary">MASTER</span>}
                  </div>
                  <p className="text-xs tabular-nums text-muted-foreground">ID {a.login}</p>
                </div>
                <StatusBadge status={a.status} />
              </header>
              <footer className="mt-4 flex flex-wrap items-center gap-1.5 pt-1">
                <div className="ml-auto flex flex-wrap gap-1.5">
                  <Btn onClick={() => onEdit(a)}>Edit</Btn>
                  {a.status === "live"
                    ? <Btn onClick={() => onStatus(a.id, "paused")}>Pause</Btn>
                    : <Btn onClick={() => onStatus(a.id, "live")}>Resume</Btn>}
                  <Btn variant="danger" disabled={a.status === "offline"} onClick={() => onDisconnect(a)}>Disconnect</Btn>
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}