import * as yup from "yup";

export interface DynamoItem {
  pkey: string;
  skey: string;
  data: string;
}

export type DynamoCard = DynamoItem;

export type DynamoStack = DynamoItem;

export const dynamoItemSchema = yup.object<DynamoItem>({
  pkey: yup.string().required(),
  skey: yup.string().required(),
  data: yup.string().required()
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
