export const getEnv = (name: string): string => {
  const envVar = process.env[name];
  if (!envVar) {
    throw new Error(`Environment variable '${name}' is not set`);
  } else {
    return envVar;
  }
};
