import React from "react";
const Genre = ({ onItemSelect, items, selectedItem }) => {
  return (
    <div>
      <ul className="list-group">
        {items.map((genre) => (
          <li
            onClick={() => onItemSelect(genre)}
            className={
              genre === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            key={genre._id}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;
