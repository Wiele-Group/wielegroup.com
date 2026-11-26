type Terms = {
  monthlyRetainerEur: number;
  commissionPercent: number;
  netRetainerCreditPercent: number;
};

/** Amounts are net of VAT and in EUR cents. */
export function mandateFeeAmounts(saleCents: number, months: number, terms: Terms) {
  const retainer = Math.round(terms.monthlyRetainerEur * 100) * months;
  const gross = Math.round(saleCents * terms.commissionPercent / 100);
  const credit = Math.min(gross, Math.round(retainer * terms.netRetainerCreditPercent / 100));
  const closing = gross - credit;

  return { retainer, gross, credit, closing, total: retainer + closing };
}
