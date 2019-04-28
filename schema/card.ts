import * as yup from "yup";

export interface DynamoCard extends DyanmoItem {
  front: string;
  back: string;
}

export interface DyanmoItem {
  pkey: string;
  skey: string;
}

export const dynamoCardSchema = yup.object({
  pkey: yup.string().required(),
  skey: yup.string().required(),
  front: yup.string().required(),
  back: yup.string().required()
});
