import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import useStore from "../../context/useStore";
import { Fetch } from "../../services/common";
import BDT from "../utilitise/BDT";

function TimerComponent({ pendingTarget, runningTarget }) {
  const [time, setTime] = useState("");
  const store = useStore();

  let timer;
  useEffect(() => {
    const start_date = pendingTarget
      ? pendingTarget.start_date
      : runningTarget.start_date;
    const end_date = pendingTarget
      ? pendingTarget.end_date
      : runningTarget.end_date;
    const type = pendingTarget ? "start" : "end";
    const data = pendingTarget || runningTarget;

    timer = countDown(start_date, end_date, type, setTime, store, data);

    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      {pendingTarget ? (
        <Text style={{ color: "#167d01" }}>Starting In: {time}</Text>
      ) : runningTarget ? (
        <View>
          <Text style={{ color: "#9e4c0d" }}>Ending In: {time}</Text>
          <Text>
            Targeted Amnt: <BDT amount={runningTarget.targetedAmount} />
          </Text>
          <Text>
            Achieved Amnt:{" "}
            <BDT
              amount={
                runningTarget.targetedAmount - runningTarget.remainingAmount
              }
            />
          </Text>
          <Text>
            Remaining Amnt: <BDT amount={runningTarget.remainingAmount} />
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function countDown(start_date, end_date, type, setTime, store, data) {
  const start = new Date(start_date);
  const startDate = addOneDay(start);
  const end = new Date(end_date);
  const endDate = addOneDay(end);
  const today = new Date();

  const diffInMs = type === "start" ? today - startDate : endDate - today;
  const difdays = diffInMs / (1000 * 60 * 60 * 24);

  const isToday = parseInt(difdays) === 0;
  if (!isToday) {
    setTime(Math.trunc(difdays) + "d");
    return null;
  } else {
    const endTime = new Date();
    endTime.setHours(24, 59, 59);

    const timer = setInterval(() => {
      const time = countDownTimer(endTime);
      if (time === "0h:0m" || time.includes("-")) {
        //end time;
        updateTarget(store, data);
        clearInterval(timer);
      } else setTime(time);
    }, 3000);

    const time = countDownTimer(endTime);
    if (time.includes("-")) {
      //end time;
      updateTarget(store, data);
      setTime("loading...");
    } else setTime(time);
    return timer;
  }
}

async function updateTarget(store, data) {
  try {
    const result = await Fetch(`/user/target?id=${data.id}`, "PUT", { data });
    store.setUpdateUser((prev) => !prev);
    store.setMessage({ msg: result.message, type: "success" });
  } catch (error) {
    store.setMessage({ msg: error.message, type: "error" });
  }
}

function addOneDay(date = new Date()) {
  date.setDate(date.getDate() + 1);
  return date;
}

function countDownTimer(endTime) {
  const currentTime = new Date();
  const distance = endTime - currentTime;
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  return hours + "h:" + minutes + "m";
}

export default TimerComponent;
