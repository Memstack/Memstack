import { string } from "prop-types";

const elipsify = (str: string) => str + "...";
export const truncate = (str: string, chars: number) =>
  str.length > chars ? elipsify(str.slice(0, chars - 1)) : str;
