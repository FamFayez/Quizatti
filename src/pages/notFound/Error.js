import React from "react";
import notFound from "../../assets/img/notFound.png";
import "../../style/Error.css";

const Error = () => {
  return (
    <div className="error">
      <img src={notFound} alt="not found" />
    </div>
  );
};

export default Error;
