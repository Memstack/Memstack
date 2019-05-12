import React from "react";
import { FieldProps, FormikActions } from "formik";
import { Form, Label, TextArea, Input } from "semantic-ui-react";

interface ExtraProps {
  extra?: {
    label?: any;
    placeholder?: string;
    onKeyDown?: (
      e: React.KeyboardEvent<HTMLInputElement>,
      form: FormikActions<any>
    ) => void;
    fluid?: boolean;
  };
}

interface TextInputProps extends FieldProps, ExtraProps {}

const TextInput: React.SFC<TextInputProps> = ({
  field,
  form,
  extra: { label, placeholder, onKeyDown, fluid } = {
    label: null,
    placeholder: undefined,
    onKeyDown: undefined,
    fluid: undefined
  }
}) => (
  <Form.Field>
    <label>{label}</label>
    <Input
      placeholder={placeholder}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        onKeyDown && onKeyDown(e, form)
      }
      tabIndex={0}
      fluid={fluid}
      {...field}
    />
    {form.touched[field.name] && form.errors[field.name] && (
      <Label pointing>{form.errors[field.name]}</Label>
    )}
  </Form.Field>
);

export default TextInput;
