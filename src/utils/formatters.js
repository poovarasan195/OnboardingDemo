export const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

export const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export const toIsoDate = (date) =>
  date.toISOString().split('T')[0];
