export const createMockFile = (name, sizeBytes, mimeType) => {
  const id = `${name}-${sizeBytes}-${Date.now()}`;
  return {
    id,
    name,
    sizeBytes,
    mimeType,
    uri: `mock://files/${name}`, // Mock URI for testing
    isMock: true,
    addedAt: new Date().toISOString(),
  };
};
