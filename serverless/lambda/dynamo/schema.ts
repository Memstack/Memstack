import * as yup from "yup";

// Base item
export interface DynamoItem {
  pkey: string;
  skey: string;
  data: string;
}

export const dynamoItemSchema = yup.object<DynamoItem>({
  pkey: yup.string().required(),
  skey: yup.string().required(),
  data: yup.string().required()
});

// Stack
export interface DynamoStack extends DynamoItem {
  description: string;
  image: string;
}

// Card
export type DynamoCard = DynamoItem;

// TODO: Add JSON parse for data to validate?
export const dynamoCardSchema = dynamoItemSchema;
