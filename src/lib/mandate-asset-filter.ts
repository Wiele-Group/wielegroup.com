export const mandateAssetKeys = ["real-estate", "yachts", "classic-cars"] as const;

export function mandateAssetFromHash(hash: string) {
  const index = mandateAssetKeys.findIndex(key => hash === `#asset=${key}`);
  return index === -1 ? "" : String(index);
}
