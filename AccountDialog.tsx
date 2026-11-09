import { useState } from "react";
import type { AccountInput } from "@/lib/api";
import { Btn, Modal, inputCls } from "./ui";

const empty: AccountInput = { name: "", broker: "", server: "", login: "", accountType: "client", balance: 0, lotMode: "fixed", fixedLot: 0.1, multiplier: 0.04 };

export function AccountDialog({ account, existingLogins, onClose, onSave }: any) {
  const [v, setV] = useState<AccountInput>(account || empty);
  return (
    <Modal onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSave(v); onClose(); }}>
        <h3 className="font-display text-lg font-semibold">{account ? "Edit account" : "Add new account"}</h3>
        <input className={inputCls} placeholder="Name" value={v.name} onChange={(e) => setV({...v, name: e.target.value})} />
        <Btn variant="gold" type="submit" className="mt-4">Save</Btn>
      </form>
    </Modal>
  );
}