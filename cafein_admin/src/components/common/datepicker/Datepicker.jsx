import { useState } from "react";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import styled from "styled-components";

const DatePickerComponent = ({ startDate, setStartDate }) => {
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

export default DatePickerComponent;
