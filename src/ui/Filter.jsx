import React, { useState } from "react";
import styled from "styled-components";

const Select = styled.select`
  cursor: pointer;
  font-size: 12px;
  padding: 1px 10px;
  height: 29px;
  width: auto;
  color: #000;
  border-radius: 5px;
  &:focus {
    border: none;
  }
`;
const Option = styled.option`
  font-size: 12px;
  border-radius: 5px;
`;

function FilterComponent({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <>
      <Select id="filter" value={selectedOption} onChange={handleChange}>
        {/* <Option value={options[0]}>{selectedOption}</Option> */}
        {options?.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </>
  );
}

export default FilterComponent;
