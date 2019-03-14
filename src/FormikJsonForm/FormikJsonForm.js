import React from "react";
import SimpleField, { isSimpleElement } from "./SimpleField";
import { Grid } from "@material-ui/core";
import FormError from "./FormError";

// There can be following types of elements:
// 1. SimpleElements
// 2. ComplexElements
// 3. Other Elements

// TODO global form styling
// TODO general error message handling
// TODO show errors when submitting form
export default ({ schema, globalStyles, formikProps }) => {
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
            <Grid key={index} item style={{ border: "0px solid black" }}>
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
