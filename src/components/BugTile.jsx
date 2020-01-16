import React from 'react';

const BugTile = (props) => (
  <tbody>
    <tr className="bugTile">
      <td>{props.bugName}</td>
      <td>{props.bugDescription}</td>
      <td>{props.reportedBy}</td>
      <td>{props.creationTime}</td>
      <td>{props.assignedTo}</td>
      <td>{props.threatLevel}</td>
    </tr>
  </tbody>
);

export default BugTile;
