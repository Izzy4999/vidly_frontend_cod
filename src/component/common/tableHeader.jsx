import React from "react";

// colums:array
// sortCoumn:obj
// onsort:function

const TableHeaer = (props) => {
  const raiseSort = (path) => {
    const sortedColumn = { ...props.sortColumn };
    if (sortedColumn.path === path)
      sortedColumn.order = sortedColumn.order === "asc" ? "desc" : "asc";
    else {
      sortedColumn.path = path;
      sortedColumn.order = "asc";
    }
    props.onSort(sortedColumn);
  };
  const renderSortIcon = (column) => {
    const { sortColumn } = props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc "></i>;
  };
  return (
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaer;
