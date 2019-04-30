import { createLogger, stdSerializers } from "bunyan";

interface MemstackLoggerOptions {
  name: string;
}

export const getLogger = ({ name }: MemstackLoggerOptions) =>
  createLogger({
    name,
    serializers: { err: stdSerializers.err }
  });
