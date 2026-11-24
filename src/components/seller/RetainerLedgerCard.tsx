"use client";

import React, { useState } from "react";

interface RetainerLedgerProps {
  assetId: string;
  assetTitle: string;
  askingPriceEur: number;
  subscriptionId: string;
  portalToken: string;
  cumulativePaidNetEur: number;
  minimumTermEndTs: number;
  currentPeriodEndTs: number;
  cancelAtPeriodEnd: boolean;
  latestReportUrl?: string;
}

export function RetainerLedgerCard({
  assetId,
  assetTitle,
  askingPriceEur,
  subscriptionId,
  portalToken,
  cumulativePaidNetEur,
  minimumTermEndTs,
  currentPeriodEndTs,
  cancelAtPeriodEnd: initialCancelState,
  latestReportUrl,
}: RetainerLedgerProps) {
  const [cancelScheduled, setCancelScheduled] = useState(initialCancelState);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const nowSec = Math.floor(Date.now() / 1000);
  const isLockedInMinimumTerm = nowSec < minimumTermEndTs;

  const estimatedGrossCommission = askingPriceEur * 0.05;
  const projectedNetCommission = Math.max(0, estimatedGrossCommission - cumulativePaidNetEur);

  const formatDate = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatEur = (val: number) =>
    new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(val);

  async function handleCancelRetainer() {
    if (isLockedInMinimumTerm || cancelScheduled) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/retainer/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          portal_token: portalToken,
          asset_id: assetId,
        }),
      });
      const data = await res.json() as { detail?: string };
      if (!res.ok) {
        throw new Error(data.detail || "Unable to update subscription status.");
      }
      setCancelScheduled(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border border-white/15 bg-[#0D0F14] p-6 text-zinc-100">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C5A467]">
            Wiele Algorithm // Retainer & Commission Ledger
          </p>
          <h2 className="mt-1 text-lg font-medium tracking-tight text-white">
            {assetTitle} <span className="font-mono text-xs text-zinc-400">[{assetId}]</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 border border-white/15 bg-[#13161E] px-3 py-1.5 font-mono text-xs">
          <span
            className={`h-2 w-2 rounded-full ${
              cancelScheduled ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
          <span>
            {cancelScheduled
              ? `CLOSING ON ${formatDate(currentPeriodEndTs).toUpperCase()}`
              : isLockedInMinimumTerm
              ? "PHASE 01 // 3-MONTH CAMPAIGN LOCK"
              : "PHASE 02 // MONTH-TO-MONTH ACTIVE"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
        <div className="bg-[#0D0F14] p-4">
          <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            Monthly Retainer Rate
          </span>
          <span className="mt-1 block font-mono text-2xl font-medium tabular-nums text-white">
            €599.00 <span className="text-xs font-normal text-zinc-400">/ mo excl. VAT</span>
          </span>
          <span className="mt-1 block font-mono text-[11px] text-zinc-500">
            Next cycle: {formatDate(currentPeriodEndTs)}
          </span>
        </div>

        <div className="bg-[#0D0F14] p-4">
          <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            Accrued Commission Credit
          </span>
          <span className="mt-1 block font-mono text-2xl font-medium tabular-nums text-[#C5A467]">
            {formatEur(cumulativePaidNetEur)}
          </span>
          <span className="mt-1 block font-mono text-[11px] text-zinc-500">
            100% deductible from 5% sale fee
          </span>
        </div>

        <div className="bg-[#0D0F14] p-4">
          <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            Projected Net Commission (5%)
          </span>
          <span className="mt-1 block font-mono text-2xl font-medium tabular-nums text-white">
            {formatEur(projectedNetCommission)}
          </span>
          <span className="mt-1 block font-mono text-[11px] text-zinc-500">
            Based on {formatEur(askingPriceEur)} ask
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          {latestReportUrl ? (
            <a
              href={latestReportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#C5A467]/60 bg-[#C5A467]/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-[#C5A467] transition hover:bg-[#C5A467]/20"
            >
              Download Monthly Intelligence Dossier (PDF)
            </a>
          ) : (
            <span className="border border-white/10 px-3 py-2 font-mono text-xs text-zinc-400">
              Monthly Analytics Report compiles at cycle close
            </span>
          )}
        </div>

        <div>
          {isLockedInMinimumTerm ? (
            <div className="text-right font-mono text-xs text-zinc-400">
              <span className="block text-zinc-300">
                3-Month Minimum Term Active Until {formatDate(minimumTermEndTs)}
              </span>
              <span className="text-[11px] text-zinc-500">
                Flexible cancellation unlocks automatically after Month 3
              </span>
            </div>
          ) : cancelScheduled ? (
            <span className="font-mono text-xs text-amber-400">
              Subscription set to terminate at period end ({formatDate(currentPeriodEndTs)}).
            </span>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleCancelRetainer}
              className="border border-white/20 bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 transition hover:border-red-400/60 hover:text-red-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Cancel Subscription at Period End"}
            </button>
          )}
        </div>
      </div>

      {errorMsg && (
        <p className="mt-3 border border-red-500/30 bg-red-950/30 px-3 py-2 font-mono text-xs text-red-300">
          {errorMsg}
        </p>
      )}
    </section>
  );
}
