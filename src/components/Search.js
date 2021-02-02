import React, { useState } from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

export default function Search({ searchItem, reset }) {
  const [text, setText] = useState("");
  const getVal = () => {
    if (text.trim() === "") return;
    searchItem(text.toLocaleLowerCase());
  };

  const resetHandler = () => {
    reset();
    setText("");
  };

  return (
    <InputGroup className="pt-5 w-75 m-auto mt-5" size="md">
      <Input
        placeholder="Search First Name, Last Name, Email"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <InputGroupAddon addonType="append">
        <Button onClick={getVal} color="success">
          Search
        </Button>
        <Button onClick={resetHandler} color="dark">
          Reset
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
