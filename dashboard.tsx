import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { money, type Account } from "@/lib/demo-data";
import { useAccountsStore } from "@/lib/api";
import { BrokerConfigPanel } from "@/components/dashboard/BrokerConfigPanel";
import { ReceiverCards } from "@/components/dashboard/ReceiverCards";
import { AccountDialog } from "@/components/dashboard/AccountDialog";
import { Btn, ConfirmDialog, Panel, StatCard, Td, Th, inputCls } from "@/components/dashboard/ui";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const store = useAccountsStore();
  const { accounts, trades } = store;
  const [dialog, setDialog] = useState<any>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("xau-demo-auth")) navigate({ to: "/" });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-3 flex justify-between">
        <span className="font-display font-semibold">XAU Copy Dashboard</span>
        <Btn onClick={() => { sessionStorage.removeItem("xau-demo-auth"); navigate({ to: "/" }); }}>Sign out</Btn>
      </header>
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <ReceiverCards
          accounts={accounts}
          onAdd={() => setDialog({})}
          onReset={() => store.reset()}
          onEdit={(a) => setDialog({ account: a })}
          onStatus={store.setStatus}
          onDisconnect={() => {}}
        />
        <BrokerConfigPanel />
      </main>
      {dialog && (
        <AccountDialog
          account={dialog.account}
          onClose={() => setDialog(null)}
          onSave={(v: any) => (dialog.account ? store.update(dialog.account.id, v) : store.add(v))}
        />
      )}
    </div>
  );
}