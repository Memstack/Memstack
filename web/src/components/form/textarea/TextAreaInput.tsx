import React from "react";
import { FieldProps, FormikActions } from "formik";
import { Form, Label, TextArea } from "semantic-ui-react";

interface ExtraProps {
  extra?: {
    label?: any; // We can render pretty much anything as a label
    placeholder?: string;
    onKeyDown?: (
      e: React.KeyboardEvent<HTMLInputElement>,
      form: FormikActions<any>
    ) => void;
  };
}

interface TextAreaInputProps extends FieldProps, ExtraProps {}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  field,
  form,
  extra: { label, placeholder, onKeyDown } = {
    label: null,
    placeholder: undefined,
    onKeyDown: undefined
  }
}) => (
  <Form.Field>
    <label>{label}</label>
    <TextArea
      placeholder={placeholder}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        onKeyDown && onKeyDown(e, form)
      }
      tabIndex={0}
      {...field}
    />
    {form.touched[field.name] && form.errors[field.name] && (
      <Label pointing>{form.errors[field.name]}</Label>
    )}
  </Form.Field>
);

export default TextAreaInput;
