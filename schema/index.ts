import * as yup from "yup";
import { dynamoItemSchema } from "../serverless/schema/types";

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
export interface DynamoStack extends DyanmoItem {
  description: string;
  image: string;
}

interface CardFrontBack {
  front: string;
  back: string;
}

export const cardDataSchema = yup.object<CardFrontBack>({
  front: yup.string().required(),
  back: yup.string().required()
});

// TODO: Add JSON parse for data to validate?
export const dynamoCardSchema = dynamoItemSchema;

export interface Stack {
  id: string;
  title: string;
  description: string;
  image: string;
}
export interface Card {
  id: string;
  front: string;
  back: string;
}
