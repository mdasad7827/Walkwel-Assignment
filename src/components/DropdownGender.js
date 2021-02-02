import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropdownGender = ({ genderArr, changeGender, gender }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{gender}</DropdownToggle>
      <DropdownMenu>
        {genderArr.map((item, idx) => {
          return (
            <DropdownItem key={idx} onClick={() => changeGender(item)}>
              {item}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownGender;
