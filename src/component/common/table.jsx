import React from "react";
import TableBody from "./tableBody";
import TableHeaer from "./tableHeader";

const Table = ({ columns, sortColumn, data, onSort }) => {
  return (
    <table className="table">
      <TableHeaer columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
