import React from "react";

export default function TableRow({ item, idx }) {
  // console.log(item);
  return (
    <tr>
      <th scope="row">{idx + 1}</th>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.dob}</td>
      <td>{item.address}</td>
      <td>{item.city}</td>
      <td>{item.gender}</td>
      <td>{item.iq}</td>
    </tr>
  );
}
