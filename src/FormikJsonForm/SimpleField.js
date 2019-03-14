import React from "react";
import {
  FormikTextField,
  FormikSelectField,
  FormikRadioGroupField,
  FormikCheckboxGroupField
} from "formik-material-fields";
import { Button } from "@material-ui/core";

const textFields = [
  "color",
  "date",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "range", // Not working
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week"
];
const allFields = [
  ...textFields,
  "radio",
  "checkbox",
  "select",
  "button",
  "submit"
];

export default ({ type, formikProps, ...props }) => {
  if (textFields.includes(type)) {
    return <FormikTextField type={type} fullWidth {...props} />;
  } else if (type === "checkbox") {
    return <FormikCheckboxGroupField {...props} multiple={true} />;
  } else if (type === "radio") {
    return <FormikRadioGroupField {...props} />;
  } else if (type === "select") {
    return <FormikSelectField {...props} />;
  } else if (type === "button" || type === "submit") {
    const { label, onSubmitLabel, ...buttonProps } = props;
    const { isSubmitting, dirty } = formikProps;

    const isDisabled = type === "submit" && isSubmitting && dirty;
    return (
      <Button
        variant="contained"
        color="primary"
        type={type}
        {...buttonProps}
        disabled={isDisabled}
      >
        {isDisabled ? onSubmitLabel || "Submitting..." : label}
      </Button>
    );
  } else {
    throw new Error("JsonFormMui: Invalid field");
  }
};

export const isSimpleElement = ({ type }) => allFields.includes(type);