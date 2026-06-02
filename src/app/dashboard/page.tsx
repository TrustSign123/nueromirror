"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  FileSpreadsheet,
  Loader2,
  Mail,
  MessageCircle,
  QrCode,
  Send,
  ShieldCheck,
  UploadCloud,
  Users
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { invitationChannels, integrationSources } from "@/lib/platform-data";
import { DashboardTenant, dashboardProfiles, testAccounts } from "@/lib/dashboard-data";

const campaignData = [
  { stage: "Imported", users: 500 },
  { stage: "Valid", users: 486 },
  { stage: "Invited", users: 486 },
  { stage: "Opened", users: 318 },
  { stage: "Joined", users: 204 }
];

function isTenant(value: string | null): value is DashboardTenant {
  return value === "organization" || value === "school" || value === "university" || value === "gym";
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const tenantParam = searchParams.get("tenant");
  const tenant = isTenant(tenantParam) ? tenantParam : "organization";
  const profile = dashboardProfiles[tenant];
  const [fileName, setFileName] = useState(`${tenant}-bulk-upload.csv`);
  const [campaignState, setCampaignState] = useState<"idle" | "sending" | "sent">("idle");
  const selectedChannels = useMemo(() => ["Email", "SMS", "WhatsApp", "Magic Link"], []);

  const sendInvites = () => {
    setCampaignState("sending");
    window.setTimeout(() => setCampaignState("sent"), 1200);
  };

  return (
    <main className="min-h-screen bg-mist text-ink">
      <header className="border-b border-ink/10 bg-white/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-semibold text-ink">
            <ArrowLeft size={16} /> Back to Website
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-graphite">{profile.tenantUrl}</span>
            <span className="rounded-full bg-clinical/10 px-3 py-1 text-sm font-semibold text-clinical">{profile.role}</span>
            <a href="/login" className="rounded-full border border-ink/10 bg-white px-3 py-1 text-sm font-semibold text-ink">
              Switch Login
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex max-w-full gap-2 overflow-x-auto rounded-full border border-ink/10 bg-white p-1 shadow-hairline">
          {testAccounts.map((account) => {
            const active = account.tenant === tenant;
            return (
              <a
                key={account.tenant}
                href={`/dashboard?tenant=${account.tenant}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-ink text-white" : "text-graphite hover:bg-mist hover:text-ink"
                }`}
              >
                {account.label}
              </a>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Tenant Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">{profile.title}</h1>
            <p className="mt-5 text-lg leading-8 text-graphite">{profile.headline}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {profile.stats.map(([label, value]) => (
                <div key={label} className="rounded-lg border border-ink/10 bg-white p-4 shadow-hairline">
                  <p className="text-xs font-semibold uppercase text-graphite">{label}</p>
                  <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
            <div className="rounded-lg border-2 border-dashed border-clinical/30 bg-mist p-6 text-center">
              <UploadCloud className="mx-auto text-clinical" size={42} />
              <h2 className="mt-4 text-2xl font-semibold text-ink">{profile.uploadLabel}</h2>
              <p className="mt-2 text-sm text-graphite">Accepts {profile.acceptedFiles}.</p>
              <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white">
                <FileSpreadsheet size={18} /> Choose File
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="sr-only"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? `${tenant}-bulk-upload.csv`)}
                />
              </label>
              <p className="mt-4 text-sm font-semibold text-clinical">{fileName}</p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-ink">Import source</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {integrationSources.map((source) => (
                  <span key={source} className="rounded-full bg-mist px-3 py-2 text-sm font-semibold text-ink">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-clinical">Role Requirements</p>
              <h2 className="mt-1 text-2xl font-semibold text-ink">What this dashboard must protect and show</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-clinical/10 px-3 py-1 text-sm font-semibold text-clinical">
              <ShieldCheck size={15} /> Policy enforced
            </span>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {profile.requirements.map((requirement) => (
              <div key={requirement} className="rounded-lg bg-mist p-4">
                <Check className="text-clinical" size={18} />
                <p className="mt-3 text-sm font-semibold text-ink">{requirement}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {profile.modules.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.name} className="rounded-lg border border-ink/10 p-4">
                  <Icon className="text-clinical" size={22} />
                  <h3 className="mt-3 font-semibold text-ink">{module.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-graphite">{module.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-clinical">Preview</p>
                <h2 className="mt-1 text-2xl font-semibold text-ink">Records ready to invite</h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-clinical/10 px-3 py-1 text-sm font-semibold text-clinical">
                <ShieldCheck size={15} /> Consent required
              </span>
            </div>

            <div className="mt-5 overflow-hidden overflow-x-auto rounded-lg border border-ink/10">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-mist text-xs uppercase text-graphite">
                  <tr>
                    {profile.previewColumns.map((column) => (
                      <th key={column} className="px-4 py-3">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {profile.people.map((person) => (
                    <tr key={person[1]}>
                      {person.map((cell, index) => (
                        <td key={cell} className={`px-4 py-3 ${index === 0 ? "font-semibold text-ink" : "text-graphite"}`}>
                          {index === person.length - 1 ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-clinical/10 px-2 py-1 text-xs font-semibold text-clinical">
                              <Check size={13} /> {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
            <p className="text-sm font-semibold uppercase text-clinical">Invitation Campaign</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">Send onboarding links</h2>
            <div className="mt-5 grid gap-3">
              {invitationChannels.map((channel) => {
                const Icon = channel.name === "Email" ? Mail : channel.name === "QR Code" ? QrCode : MessageCircle;
                const selected = selectedChannels.includes(channel.name);
                return (
                  <div key={channel.name} className={`flex items-center justify-between rounded-lg p-3 ${selected ? "bg-clinical/10" : "bg-mist"}`}>
                    <div className="flex items-center gap-3">
                      <span className={`grid h-9 w-9 place-items-center rounded-lg ${selected ? "bg-clinical text-white" : "bg-white text-graphite"}`}>
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="font-semibold text-ink">{channel.name}</p>
                        <p className="text-xs text-graphite">{channel.status}</p>
                      </div>
                    </div>
                    {selected && <Check size={18} className="text-clinical" />}
                  </div>
                );
              })}
            </div>

            <button
              onClick={sendInvites}
              disabled={campaignState === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clinical px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {campaignState === "sending" ? <Loader2 className="animate-spin" size={18} /> : campaignState === "sent" ? <Check size={18} /> : <Send size={18} />}
              {campaignState === "sent" ? "Invitations Sent" : campaignState === "sending" ? "Sending Invitations" : profile.primaryAction}
            </button>
          </section>
        </div>

        <section className="mt-8 rounded-lg border border-ink/10 bg-white p-5 shadow-hairline">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase text-clinical">Campaign Funnel</p>
              <h2 className="mt-1 text-2xl font-semibold text-ink">Track delivered, opened, registered, and uploaded reports.</h2>
            </div>
            <Users className="hidden text-clinical sm:block" size={28} />
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData}>
                <CartesianGrid stroke="#e5ecea" vertical={false} />
                <XAxis dataKey="stage" stroke="#647176" />
                <YAxis stroke="#647176" />
                <Tooltip />
                <Bar dataKey="users" fill="#0f766e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-mist p-10 text-ink">Loading dashboard...</main>}>
      <DashboardContent />
    </Suspense>
  );
}
