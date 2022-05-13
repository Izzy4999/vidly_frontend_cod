import React from "react";

const Button = ({ determinant, label }) => {
  return (
    <button disabled={determinant} className="btn btn-primary margin-top">
      {label}
    </button>
  );
};

export default Button;
