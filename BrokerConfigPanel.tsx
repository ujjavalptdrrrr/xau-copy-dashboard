import { useState } from "react";
import { z } from "zod";
import { BROKERS, type BrokerConfig, type ConnectionStatus } from "@/lib/brokers";
import { useBrokerConfigStore, type BrokerConfigInput } from "@/lib/api";
import { Btn, ConfirmDialog, Panel, Td, Th, inputCls } from "./ui";

const empty: BrokerConfigInput = { broker: "", server: "", login: "", name: "", accountType: "client" };

export function BrokerConfigPanel() {
  const store = useBrokerConfigStore();
  const [form, setForm] = useState<BrokerConfigInput>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    store.save(form, editingId ?? undefined);
    setForm(empty); setEditingId(null);
  };

  return (
    <Panel title="Broker & Account Configuration">
      <div className="grid gap-0 2xl:grid-cols-[340px_1fr]">
        <form onSubmit={submit} className="grid gap-3 border-b p-5 sm:grid-cols-2 2xl:block">
          <p className="text-sm font-medium">{editingId ? "Edit configuration" : "New configuration"}</p>
          <input className={inputCls} placeholder="Broker name" value={form.broker} onChange={(e) => setForm({...form, broker: e.target.value})} />
          <input className={inputCls} placeholder="Login ID" value={form.login} onChange={(e) => setForm({...form, login: e.target.value})} />
          <div className="flex gap-2 pt-1">
            <Btn variant="gold" type="submit" className="flex-1">Save</Btn>
          </div>
        </form>
      </div>
    </Panel>
  );
}