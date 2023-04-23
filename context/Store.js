import { useState } from "react";

const Store = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    msg: "",
    type: "",
  });
  return {
    message,
    setMessage,
    loading,
    setLoading,
  };
};

export default Store;
