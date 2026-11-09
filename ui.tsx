import type { ReactNode } from "react";
import type { AccountStatus } from "@/lib/demo-data";
const badge: Record<AccountStatus, { label: string; cls: string }> = {
  live: { label: "LIVE", cls: "bg-success/15 text-success" },
  paused: { label: "PAUSED", cls: "bg-warning/15 text-warning" },
  offline: { label: "OFFLINE", cls: "bg-destructive/15 text-destructive" },
};
export function StatusBadge({ status }: { status: AccountStatus }) {
  const b = badge[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wider ${b.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${status === "live" ? "animate-pulse" : ""}`} />
      {b.label}
    </span>
  );
}
export function StatCard({ label, value, tone = "" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1.5 font-display text-xl font-semibold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}
export function Panel({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
        <h2 className="font-display font-semibold">{title}</h2>
        {actions}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}
export const Th = ({ children, right }: { children?: ReactNode; right?: boolean }) => (
  <th className={`whitespace-nowrap px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground ${right ? "text-right" : "text-left"}`}>{children}</th>
);
export const Td = ({ children, right, className = "" }: { children?: ReactNode; right?: boolean; className?: string }) => (
  <td className={`whitespace-nowrap px-4 py-3 ${right ? "text-right tabular-nums" : ""} ${className}`}>{children}</td>
);
export function Btn({ variant = "ghost", className = "", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "gold" | "ghost" | "danger" }) {
  const v = {
    gold: "bg-primary text-primary-foreground hover:opacity-90",
    ghost: "border hover:bg-muted",
    danger: "border border-destructive/40 text-destructive hover:bg-destructive/10",
  }[variant];
  return <button {...p} className={`rounded-md px-3 py-1.5 text-xs font-semibold transition disabled:opacity-40 ${v} ${className}`} />;
}
export const inputCls = "w-full rounded-md border bg-input px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
export function Modal({ onClose, children, size = "max-w-lg" }: { onClose: () => void; children: ReactNode; size?: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className={`max-h-[90vh] w-full ${size} overflow-y-auto rounded-xl border bg-card p-6`}>
        {children}
      </div>
    </div>
  );
}
export function ConfirmDialog({ title, message, confirmLabel, onConfirm, onClose }: { title: string; message: ReactNode; confirmLabel: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal onClose={onClose} size="max-w-sm">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn variant="danger" onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Btn>
      </div>
    </Modal>
  );
}