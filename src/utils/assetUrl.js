// Helper: voegt het Vite base path toe aan lokale assets (bv. /screenshots/...)
// Externe URLs (https://...) worden ongewijzigd doorgestuurd
export const assetUrl = (path) => {
  if (!path || path.startsWith("http")) return path;
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}${path}`;
};
