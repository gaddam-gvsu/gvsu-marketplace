import React from "react";
import { useFormikContext } from "formik";
import InputText from "../InputText";

const FormField = ({ name, width, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, values } = useFormikContext();

  return (
    <>
      <InputText
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
    </>
  );
};

export default FormField;
