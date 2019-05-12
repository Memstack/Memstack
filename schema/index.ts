import * as yup from "yup";

interface Resource {
  id: string;
  href: string;
}

// Stack
export interface IncomingStack {
  title: string;
}

// Properties not yet created via the API
export interface GeneratedStack {
  description: string;
  image: string;
}

export type Stack = Resource & IncomingStack & GeneratedStack;

export const incomingStackSchema = yup.object<IncomingStack>({
  title: yup.string().required()
});

// Card
export interface IncomingCard {
  front: string;
  back: string;
}

export type Card = Resource & IncomingCard;

export const incomingCardSchema = yup.object<IncomingCard>({
  front: yup.string().required(),
  back: yup.string().required()
});
