import * as yup from "yup";

// Stack

export interface IncomingStack {
  title: string;
}

export interface Stack extends IncomingStack {
  id: string;
  href: string;
  title: string;
  description: string;
  image: string;
}

export const incomingStackSchema = yup.object<IncomingStack>({
  title: yup.string().required()
});

// Card
export interface IncomingCard {
  front: string;
  back: string;
}

export interface Card extends IncomingCard {
  id: string;
}

export const incomingCardSchema = yup.object<IncomingCard>({
  front: yup.string().required(),
  back: yup.string().required()
});
