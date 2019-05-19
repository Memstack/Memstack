import { Field, Formik } from "formik";
import React from "react";
import { Divider } from "semantic-ui-react";
import * as Db from "../../../../../schema";
import Button from "../../button/Button";
import TextInput from "../../form/TextInput";
import "./AddStack.scss";
import FileInput from "../../form/files/FileInput";

type AddStackFormValues = Db.IncomingStack & Db.GeneratedStack;

const AddStack = () => (
  <div className="add-stack">
    <div className="add-stack-form">
      <Formik
        initialValues={{ title: "", image: "", description: "" }}
        validate={(values: AddStackFormValues) => {
          let errors: any = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ values, submitForm }) => {
          return (
            <>
              <div className="title">
                <h2>Add Stack</h2>
                <Divider />
              </div>
              <Field
                name="image"
                render={({ field, form }) => (
                  <FileInput
                    className="image-upload"
                    form={form}
                    field={field}
                    name="image"
                    accept="image/*"
                    placeholder="Upload Cover Image"
                    icon="fas fa-image"
                  />
                )}
              />
              <Field
                name="title"
                render={({ field, form }) => (
                  <TextInput
                    field={field}
                    form={form}
                    extra={{
                      placeholder: "Stack Name",
                      fluid: true
                    }}
                  />
                )}
              />
              <Field
                name="description"
                render={({ field, form }) => (
                  <TextInput
                    field={field}
                    form={form}
                    extra={{
                      placeholder: "Description",
                      fluid: true
                    }}
                  />
                )}
              />
              <Button text="Add" onClick={submitForm} />
            </>
          );
        }}
      </Formik>
    </div>
  </div>
);

export default AddStack;
