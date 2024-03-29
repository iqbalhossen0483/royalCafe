import { Text } from "react-native";

import { moderateScale } from "../../services/theme";
import { color as colors } from "./colors";

const P = ({
  bold = 400,
  color = "black",
  size = 14,
  align = "left",
  style = {},
  children,
}) => {
  return (
    <Text
      style={{
        fontWeight: bold,
        color: colors[color],
        fontSize: moderateScale(size),
        textAlign: align,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export default P;
