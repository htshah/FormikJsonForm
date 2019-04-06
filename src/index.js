import React from "react";
import ReactDOM from "react-dom";
import FormikJsonForm from "./FormikJsonForm";
import * as Yup from "yup";
import { Typography } from "@material-ui/core";

const formSchema = [
  <Typography variant="body2" align="left">
    REGISTER
  </Typography>,
  {
    type: "hidden",
    name: "hidden-field",
    value: "hide"
  },
  {
    type: "group",
    GridItemProps: {
      direction: "row",
      spacing: 8
    },
    elements: [
      {
        type: "text",
        name: "username1",
        label: "Username2",
        margin: "normal",
        value: "12345672389",
        disabled: true,
        GridItemProps: { xs: 6 },
        inputProps: { maxLength: 10 },
        validate: Yup.number()
          .label("Username")
          .required()
          .typeError("The field must be a ${type}")
      },
      {
        type: "password",
        name: "password1",
        label: "Password2",
        margin: "normal",
        value: "helloworld",
        GridItemProps: { xs: 6 },
        validate: Yup.string()
          .label("Password")
          .required()
          .min(6)
          .max(32)
      }
    ]
  },
  {
    type: "text",
    name: "username",
    label: "Username",
    margin: "normal",
    value: "123456789",
    inputProps: { maxLength: 10 },
    validate: Yup.number()
      .label("Username")
      .required()
      .typeError("The field must be a ${type}")
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    margin: "normal",
    value: "helloworld",
    validate: Yup.string()
      .label("Password")
      .required()
      .min(6)
      .max(32)
  },
  {
    type: "radio",
    name: "gender",
    label: "Gender",
    fullWidth: true,
    row: true,
    style: { marginTop: "20px" },
    FormLabelProps: {
      style: { textAlign: "left" }
    },
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" }
    ],
    value: ""
  },
  {
    type: "checkbox",
    name: "vehicles",
    label: "Vehicles",
    row: true,
    fullWidth: true,
    style: { marginTop: "20px" },
    FormLabelProps: {
      style: { textAlign: "left" }
    },
    options: [
      { label: "Car", value: "car" },
      { label: "Motorbike", value: "bike" }
    ],
    value: []
  },
  {
    type: "select",
    name: "selectbox",
    label: "Select",
    fullWidth: true,
    options: [
      { label: "het", value: "het", disabled: true },
      { label: "hetsdfgsdfgsdfgsdfg", value: "het1" }
    ],
    value: ""
  },
  {
    type: "submit",
    label: "Submit",
    onSubmitLabel: "Submitting",
    fullWidth: true,
    style: {
      margin: "20px 0"
    }
  }
];

function App() {
  return (
    <div className="App" style={{ width: "220px", margin: "0 auto" }}>
      <button
        onClick={e => {
          const event = new Event("btn_clicked");
          window.dispatchEvent(event);
        }}
      >
        Hello
      </button>
      <FormikJsonForm
        schema={formSchema}
        disableFieldsOnSubmit={true}
        onInitialize={({ setFieldValue }) => {
          window.addEventListener(
            "btn_clicked",
            () => {
              setFieldValue("username", "9876543210");
            },
            false
          );
        }}
        onSubmit={(values, formikBag) => {
          console.log({ values, formikBag });
          // Set status to undefined every time
          // of Snackbar to work correctly
          formikBag.setStatus(undefined);
          setTimeout(() => {
            formikBag.setStatus("Something went wrong");
            formikBag.setErrors({ username: "Already exists" });
            formikBag.setSubmitting(false);
          }, 2000);
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
