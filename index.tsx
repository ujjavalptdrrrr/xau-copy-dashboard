import { createFileRoute, useNavigate } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: () => {
    const navigate = useNavigate();
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm rounded-xl border bg-card p-8 shadow-sm">
          <h1 className="font-display text-lg font-semibold mb-4">XAU Copy Admin</h1>
          <button onClick={() => { sessionStorage.setItem("xau-demo-auth", "1"); navigate({ to: "/dashboard" }); }} className="w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground">Sign in (Demo)</button>
        </div>
      </main>
    );
  }
});