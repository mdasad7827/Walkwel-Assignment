import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropdownCity = ({ city, cityArr, changeCity }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{city}</DropdownToggle>
      <DropdownMenu>
        {cityArr.map((item, idx) => {
          return (
            <DropdownItem key={idx} onClick={() => changeCity(item)}>
              {item}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownCity;
