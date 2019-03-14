import React from "react";
import { Formik, Form } from "formik";
import { object } from "yup";
import { Grid } from "@material-ui/core";

import SimpleField, { isSimpleElement } from "./SimpleField";
import FormError from "./FormError";

// There can be following types of elements:
// 1. SimpleElements
// 2. ComplexElements
// 3. Other Elements

// TODO global form styling
// TODO general error message handling
// TODO show errors when submitting form

const JsonForm = ({ schema, formikProps }) => {
  return (
    <React.Fragment>
      {typeof formikProps.status !== "undefined" && (
        <FormError message={formikProps.status} />
      )}
      <Grid
        container
        spacing={8}
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        {schema.map((element, index) => {
          return (
            <Grid key={index} item>
              {(() => {
                // Render a normal react element
                if (isSimpleElement(element)) {
                  return <SimpleField {...element} formikProps={formikProps} />;
                } else if (React.isValidElement(element)) {
                  return element;
                }
              })()}
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const transformFormSchema = schema => {
  let formSchema = [];
  let initialValues = {};
  let validationSchema = {};

  schema.map((field, i) => {
    const { value, validate, ...newField } = field;

    // Add all form elements to formSchema
    formSchema = [...formSchema, newField];

    // Add to initial value and validtionSchema
    // only if the Object is not a React.Element
    if (!React.isValidElement(field)) {
      // Add default value only if the field takes
      // an input from user.
      if (!["submit", "button"].includes(newField.type)) {
        // Use "" || [] based on input type if no default
        // value provided.
        initialValues = {
          ...initialValues,
          [newField.name]: value || (newField.type === "checkbox" ? [] : "")
        };
      }

      // Add validation only if provided.
      if (validate) {
        validationSchema = { ...validationSchema, [newField.name]: validate };
      }
    }
  });

  // Convert validationSchema to Yup.object and return.
  return {
    formSchema,
    initialValues,
    validationSchema: object().shape(validationSchema)
  };
};

export default ({ schema, ...formikProps }) => {
  const { formSchema, initialValues, validationSchema } = transformFormSchema(
    schema
  );

  return (
    <Formik
      {...formikProps}
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={props => (
        <Form>
          <JsonForm formikProps={props} schema={formSchema} />
        </Form>
      )}
    />
  );
};
