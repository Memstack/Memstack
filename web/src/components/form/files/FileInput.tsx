import { FieldProps, FormikProps } from "formik";
import React from "react";
import Dropzone from "react-dropzone";
import { Form, Label } from "semantic-ui-react";

interface FileInputProps extends FieldProps {
  form: FormikProps<any>;
  name: string;
  accept: string;
  className?: string;
  style?: {};
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  icon?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  form,
  field,
  name,
  accept,
  className,
  style,
  disabled,
  label,
  placeholder,
  icon
}) => {
  const onDrop = acceptedFile => {
    form.setFieldValue(name, acceptedFile);
    form.setFieldTouched(name, true);
  };
  return (
    <Form.Field>
      <label>{label}</label>
      <section className={className}>
        <Dropzone
          multiple={false}
          onDrop={acceptedFile => onDrop(acceptedFile)}
          accept={accept}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="text">
                {icon && <i className={icon} />}
                {placeholder || ""}
              </div>
            </div>
          )}
        </Dropzone>
      </section>
      {form.touched[field.name] && form.errors[field.name] && (
        <Label pointing>{form.errors[field.name]}</Label>
      )}
    </Form.Field>
  );
};

export default FileInput;
