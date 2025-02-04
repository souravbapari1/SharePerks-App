import React from "react";
import SwitchSelector from "react-native-switch-selector";
import { DISABLE_COLOR, SECONDARY_COLOR } from "../../constants/colors";

const options = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "A-Z",
    value: "atoz",
  },
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Amount",
    value: "amount",
  },
  {
    label: "Percent",
    value: "percent",
  },
] as const;
type Option = (typeof options)[number];
export type SelectFilterValue = Option["value"];
const SortOffers = ({
  onChange,
  initial = 0,
}: {
  initial?: number;
  onChange: (e: SelectFilterValue) => void;
}) => {
  return (
    <SwitchSelector
      options={options as any}
      initial={initial}
      buttonColor={SECONDARY_COLOR}
      backgroundColor="#F2F2F2"
      selectedColor={SECONDARY_COLOR}
      textCStyle={{ fontSize: 11, fontWeight: "700" }}
      textStyle={{
        fontSize: 11,
        fontWeight: "600",
        color: DISABLE_COLOR,
      }}
      selectedTextStyle={{
        fontWeight: "700",
        color: "#fff",
        fontSize: 11,
      }}
      height={30}
      buttonMargin={4}
      onPress={onChange}
    />
  );
};

export default SortOffers;
