import * as yup from "yup";
export const dynamoCardSchema = yup.object({
    pkey: yup.string().required(),
    skey: yup.string().required(),
    front: yup.string().required(),
    back: yup.string().required()
});
