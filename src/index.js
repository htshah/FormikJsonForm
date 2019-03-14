import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form } from "formik";
import FormikJsonForm from "./FormikJsonForm";
import * as Yup from "yup";
import { Typography } from "@material-ui/core";

const initialValues = {
  username: "",
  password: "",
  vehicles: [],
  gender: "",
  selectbox: ""
};

const validationSchema = Yup.object().shape({
  username: Yup.number()
    .label("Username")
    .required()
    .typeError("The field must be a ${type}"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6)
    .max(32)
});

const formSchema = [
  <Typography variant="body2" align="left">
    REGISTER
  </Typography>,
  {
    type: "text",
    name: "username",
    label: "Username",
    margin: "normal"
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    margin: "normal"
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
    ]
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
    ]
  },
  {
    type: "select",
    name: "selectbox",
    label: "Select",
    fullWidth: true,
    options: [
      { label: "het", value: "het", disabled: true },
      { label: "hetsdfgsdfgsdfgsdfg", value: "het1" }
    ]
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => {
          // Set status to undefined every time
          // of Snackbar to work correctly
          formikBag.setStatus(undefined);
          setTimeout(() => {
            formikBag.setStatus("Something went wrong");
            formikBag.setSubmitting(false);
          }, 2000);
        }}
        render={props => (
          <Form>
            <FormikJsonForm formikProps={props} schema={formSchema} />
          </Form>
        )}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
