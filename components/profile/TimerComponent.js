import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import BDT from "../utilitise/BDT";

function TimerComponent({ runningTarget }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const end_date = runningTarget.end_date;

    const timer = setInterval(async () => {
      const currentTime = new Date();
      const distance = new Date(end_date).getTime() - currentTime.getTime();

      const day = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setTime(day + "d " + hours + "h " + minutes + "m");
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <Text style={{ color: "#9e4c0d" }}>Ending In: {time}</Text>
      <Text>
        Targeted Amnt: <BDT amount={runningTarget.targetedAmount} />
      </Text>
      <Text>
        Achieved Amnt:{" "}
        <BDT
          amount={runningTarget.targetedAmount - runningTarget.remainingAmount}
        />
      </Text>
      <Text>
        Remaining Amnt: <BDT amount={runningTarget.remainingAmount} />
      </Text>
    </View>
  );
}

export default TimerComponent;
