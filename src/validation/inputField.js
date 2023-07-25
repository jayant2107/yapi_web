import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { FormikWrap, Input } from "./validationStyle";

export default function InputField(props) {
  // eslint-disable-next-line react/prop-types
  const [field, meta] = useField(props.field);

  return (
    <FormikWrap>
      <Input {...field} {...props} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </FormikWrap>
  );
}

InputField.propType = {
  props: PropTypes.any
};
