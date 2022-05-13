import React from "react";

const Like = ({ liked, onClick }) => {
  return (
    <div>
      <i
        onClick={onClick}
        style={{ cursor: "pointer" }}
        className={getLikeClass()}
        aria-hidden="true"
      ></i>
    </div>
  );
  function getLikeClass() {
    let classes = "fa fa-heart-o";
    if (!liked) {
      return classes;
    } else {
      return (classes = "fa fa-heart");
    }
  }
};

export default Like;
