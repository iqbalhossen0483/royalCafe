import React from "react";

import P from "./P";

const BDT = ({ amount, style, bdtSign = true }) => {
  if (!amount) amount = 0;
  const taka = amount.toString();
  const nagative = taka.startsWith("-");
  const actualMoaney = nagative ? taka.slice(1, taka.length) : taka;
  const length = actualMoaney.length;
  const formated =
    length === 4
      ? actualMoaney.slice(0, 1) + "," + actualMoaney.slice(1, 4)
      : length === 5
      ? actualMoaney.slice(0, 2) + "," + actualMoaney.slice(2, 5)
      : length === 6
      ? actualMoaney.slice(0, 1) +
        "," +
        actualMoaney.slice(1, 3) +
        "," +
        actualMoaney.slice(3, 6)
      : length === 7
      ? actualMoaney.slice(0, 2) +
        "," +
        actualMoaney.slice(2, 4) +
        "," +
        actualMoaney.slice(4, 7)
      : length > 7
      ? actualMoaney.slice(0, 1) +
        "," +
        actualMoaney.slice(1, 3) +
        "," +
        actualMoaney.slice(3, 5) +
        "," +
        actualMoaney.slice(5, length)
      : actualMoaney;

  return (
    <P bold={500} style={style}>
      {nagative ? "-" + formated : formated}
      {bdtSign && "৳"}
    </P>
  );
};

export default BDT;
