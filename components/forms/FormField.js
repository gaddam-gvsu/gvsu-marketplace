import React from "react";
import { useFormikContext } from "formik";
import PInputText from "../PInputText";

const FormField = ({ name, width, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, values } = useFormikContext();

  return (
    <>
      <PInputText
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        mode="outlined"
        {...otherProps}
      />
    </>
  );
};

export default FormField;
