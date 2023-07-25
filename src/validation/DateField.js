import React from "react";
import PropTypes from "prop-types";
import { FormikWrap } from "./validationStyle";
import { useField } from "formik";
import { DatePicker } from "antd";
import moment from "moment";
// import moment from "moment/moment";

export default function DateField(props) {
  // eslint-disable-next-line react/prop-types
  const [field, meta] = useField(props.field);
  const { onChange, setFieldValue, format } = props;
  console.log("field", field);
  return (
    <FormikWrap>
      <DatePicker
        {...field}
        {...props}
        allowClear={false}
        className="date-input"
        onChange={(date, dateString) => onChange(date, dateString, setFieldValue, field.name)}
        format={format}
        defaultValue={moment(field?.value)}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </FormikWrap>
  );
}

DateField.propTypes = {
  props: PropTypes.any,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  format: PropTypes.string
};
