import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropdownGender = ({ genderArr, changeGender, gender, setGender }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const selectedGender = (val) => {
    changeGender(val);
    setGender(val);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{gender}</DropdownToggle>
      <DropdownMenu>
        {genderArr.map((item, idx) => {
          return (
            <DropdownItem key={idx} onClick={() => selectedGender(item)}>
              {item}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownGender;
