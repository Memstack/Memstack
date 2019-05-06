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
export declare type DynamoStack = DyanmoItem;
export declare const dynamoCardSchema: yup.ObjectSchema<{
    pkey: string;
    skey: string;
    front: string;
    back: string;
}>;
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
