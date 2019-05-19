import { mount } from "enzyme";
import React from "react";
import FileInput from "./FileInput";

describe("FileInput", () => {
  const form = {
    touched: {},
    errors: {},
    setFieldValue: (name: string, acceptedFile: any) => null,
    setFieldTouched: (name: string, isTouched: boolean) => null
  };

  const field = {
    name: ""
  };

  it("displays placeholder if no file selected", () => {
    const placeholder = "Upload Cover Image";
    const wrapper = mount(
      <FileInput
        className="image-upload"
        form={form as any}
        field={field as any}
        name="image"
        accept="image/*"
        placeholder={placeholder}
        icon="fas fa-image"
      />
    );

    const textDiv = wrapper.find(".text");

    expect(textDiv).toHaveLength(1);
    expect(textDiv.text()).toContain(placeholder);
  });
});
