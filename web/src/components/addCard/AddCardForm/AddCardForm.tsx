import { Field, Formik } from "formik";
import React from "react";
import Select, { DropdownValue } from "../../form/dropdown/Select";
import TextAreaInput from "../../form/textarea/TextAreaInput";
import "./AddCardForm.scss";
import { Dropdown, Divider } from "semantic-ui-react";
import Button from "../../button/Button";

const existingStacks = [
  { text: "Spanish", value: "spanish" },
  { text: "Italian", value: "italian" },
  { text: "Machine Learning", value: "machine-learning" },
  { text: "Physics", value: "physics" },
  { text: "UX", value: "ux" }
];

let existingTags = [
  { text: "Verb", value: "verb" },
  { text: "Adjective", value: "adjective" },
  { text: "Noun", value: "noun" }
];

interface AddCardFormValues {
  stack: string;
  front: string;
  back: string;
  tags: string[];
}

const handleAddTag = (
  e: React.SyntheticEvent<HTMLElement>,
  value: DropdownValue
) => {
  existingTags.push({ text: value as string, value: value as string });
};

const AddCardForm = () => (
  <div className="add-card-form">
    <Formik
      initialValues={{ stack: "", front: "", back: "", tags: [] }}
      validate={(values: AddCardFormValues) => {
        let errors: any = {};
        if (!values.stack) {
          errors.stack = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit }) => {
        return (
          <>
            <div className="label">
              <h2>Add Card</h2>
              <Divider />
            </div>
            <Field
              name="front"
              render={({ field, form }) => (
                <TextAreaInput
                  field={field}
                  form={form}
                  extra={{
                    placeholder: "Write a question"
                  }}
                />
              )}
            />
            <Field
              name="back"
              render={({ field, form }) => (
                <TextAreaInput
                  field={field}
                  form={form}
                  extra={{
                    placeholder: "Write the answer"
                  }}
                />
              )}
            />
            <Field
              name="stack"
              render={({ field, form }) => (
                <Select
                  placeholder="Choose a stack"
                  options={existingStacks}
                  field={field}
                  form={form}
                />
              )}
            />
            <Field
              name="tags"
              render={({ field, form }) => (
                <Select
                  placeholder="Add tags"
                  options={existingTags}
                  field={field}
                  form={form}
                  handleAddItem={handleAddTag}
                  allowAdditions
                  multiple
                />
              )}
            />
            <Button text="Add Card" />
          </>
        );
      }}
    </Formik>
  </div>
);

export default AddCardForm;
