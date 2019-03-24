import React from "react";
import { Form, Dropdown, Label, DropdownItemProps } from "semantic-ui-react";
import { FieldProps, FormikActions } from "formik";
import _ from "lodash";

export type DropdownValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | undefined;

interface DropdownInputOptionProps {
  options: DropdownItemProps[];
}
interface ExtraProps {
  multiple?: boolean;
  label?: any;
  placeholder?: string;
  allowAdditions?: boolean;
  handleChange?: (
    e: React.SyntheticEvent<HTMLElement>,
    value: DropdownValue,
    form: FormikActions<{}>,
    fieldName: string
  ) => void;
  handleAddItem?: (
    e: React.SyntheticEvent<HTMLElement>,
    value: DropdownValue
  ) => void;
}

interface DropdownInputProps
  extends DropdownInputOptionProps,
    FieldProps,
    ExtraProps {}

const onChange = (
  e: React.SyntheticEvent<HTMLElement>,
  value: string,
  form: FormikActions<{}>,
  fieldName: string
) => {
  form.setFieldValue(fieldName, value);
};

// Based on https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/modules/Dropdown/Dropdown.js#L777
// No deburring implemented here as not currently needed
export const customSearch = (
  filteredOptions: DropdownItemProps[],
  searchQuery: string
): DropdownItemProps[] => {
  const re = new RegExp(_.escapeRegExp(searchQuery), "i");

  const filtered = _.filter(filteredOptions, opt =>
    re.test(opt.text as string)
  );

  const sorted = _.sortBy(filtered, opt => (opt.text as string).search(re));

  return sorted;
};

const DropdownInput: React.SFC<DropdownInputProps> = ({
  field,
  form,
  options,
  multiple,
  allowAdditions,
  label,
  placeholder,
  handleChange,
  handleAddItem
}) => (
  <Form.Field>
    <label>{label}</label>
    <Dropdown
      {...field}
      onChange={(e, { value }) => {
        form.setFieldValue(field.name, value);
        if (handleChange) {
          handleChange(e, value, form, field.name);
        }
      }}
      onBlur={() => {
        form.setFieldTouched(field.name);
      }}
      onAddItem={(e, { value }) => {
        if (handleAddItem) {
          handleAddItem(e, value);
        }
      }}
      placeholder={placeholder}
      options={options}
      multiple={multiple}
      allowAdditions={allowAdditions}
      selection
      search={customSearch}
      fluid
      id={field.name}
      name={field.name}
    />
    {form.touched[field.name] && form.errors[field.name] && (
      <Label pointing>{form.errors[field.name]}</Label>
    )}
  </Form.Field>
);

DropdownInput.defaultProps = {
  multiple: false,
  allowAdditions: false,
  label: null,
  placeholder: "Select an option"
};

export default DropdownInput;
