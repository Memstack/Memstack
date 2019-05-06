import * as yup from "yup";

export interface DynamoCard extends DyanmoItem {
  front: string;
  back: string;
}

export interface DyanmoItem {
  pkey: string;
  skey: string;
  data: string;
}

// No additional attributes on DynamoStack currently
export type DynamoStack = DyanmoItem;

export const dynamoCardSchema = yup.object({
  pkey: yup.string().required(),
  skey: yup.string().required(),
  front: yup.string().required(),
  back: yup.string().required()
});

export interface Stack {
  id: string;
  title: string;
  description: string;
  img: string;
}

export interface Card {
  id: string;
  front: string;
  back: string;
}
