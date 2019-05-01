export const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const normaliseStackId = (stackId: string) =>
  stackId.replace(new RegExp(/^Stack-/), "");

export const denormaliseStackId = (id: string) => `Stack-${id}`;

export const normaliseCardId = (stackId: string) =>
  stackId.replace(new RegExp(/^Card-/), "");

export const denormaliseCardId = (id: string) => `Card-${id}`;
