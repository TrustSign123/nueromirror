"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { testAccounts } from "@/lib/dashboard-data";

export default function LoginPage() {
  const [username, setUsername] = useState(testAccounts[0].username);
  const [password, setPassword] = useState(testAccounts[0].password);
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const account = testAccounts.find((item) => item.username === username.trim() && item.password === password);
    if (!account) {
      setError("Invalid test credentials. Use one of the accounts shown below.");
      return;
    }

    window.localStorage.setItem("neuromirror-demo-role", account.tenant);
    window.location.href = `/dashboard?tenant=${account.tenant}`;
  };

  return (
    <main className="min-h-screen bg-mist text-ink">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <a href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-hairline">
            <ArrowLeft size={16} /> Back to Website
          </a>
          <p className="mt-10 text-sm font-semibold uppercase text-clinical">Dashboard Login</p>
          <h1 className="mt-3 text-5xl font-semibold leading-tight text-ink">Test role-based tenant dashboards.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
            Use the demo accounts to see how NeuroMirror changes the dashboard for an organization owner, school admin,
            university wellness team, or gym owner.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {testAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <button
                  key={account.username}
                  onClick={() => {
                    setUsername(account.username);
                    setPassword(account.password);
                    setError("");
                  }}
                  className="rounded-lg border border-ink/10 bg-white p-4 text-left shadow-hairline transition hover:border-clinical/40"
                >
                  <Icon className="text-clinical" size={22} />
                  <p className="mt-3 font-semibold text-ink">{account.label}</p>
                  <p className="mt-1 font-mono text-xs text-graphite">{account.username}</p>
                  <p className="mt-1 font-mono text-xs text-graphite">password: {account.password}</p>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-6 shadow-glass">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
            <LockKeyhole size={22} />
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-ink">Sign in</h2>
          <p className="mt-2 text-sm leading-6 text-graphite">Test-only login. No real authentication or patient data is connected.</p>

          <label className="mt-6 block text-sm font-semibold text-graphite">
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-lg border border-ink/10 px-4 py-3 text-ink"
              placeholder="org@neuromirror.test"
            />
          </label>

          <label className="mt-4 block text-sm font-semibold text-graphite">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="mt-2 w-full rounded-lg border border-ink/10 px-4 py-3 text-ink"
              placeholder="test123"
            />
          </label>

          {error && <p className="mt-4 rounded-lg bg-pulse/10 px-4 py-3 text-sm font-semibold text-pulse">{error}</p>}

          <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clinical px-5 py-3 font-semibold text-white">
            Open Dashboard <ArrowRight size={18} />
          </button>

          <p className="mt-4 flex items-center gap-2 text-xs text-graphite">
            <ShieldCheck size={14} /> Each account opens a different UI and requirement set.
          </p>
        </form>
      </section>
    </main>
  );
}
