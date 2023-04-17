import React, { useState } from "react";

const Store = () => {
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });
  return {
    message,
    setMessage,
  };
};

export default Store;
