import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Text,
  SvgProps,
} from "react-native-svg";

export interface SvgTieProps extends SvgProps {
  width?: number;
  height?: number;
  startColor?: string;
  endColor?: string;
  text?: string;
  textColor?: string;
  textSize?: number;
  preserveAspectRatio?: string;
}

function SvgTie({
  width = 71,
  height = 16,
  startColor = "#F5873B",
  endColor = "#F36565",
  text,
  textColor = "#fff",
  textSize = 8,
  preserveAspectRatio = "xMidYMid meet",
  ...props
}: SvgTieProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 71 16"
      fill="none"
      preserveAspectRatio={preserveAspectRatio}
      {...props}
    >
      <Path
        d="M0 .77C0 .518 0 .392.044.294a.5.5 0 01.25-.25C.392 0 .518 0 .77 0h68.815c.43 0 .645 0 .77.082a.5.5 0 01.226.415c0 .15-.116.33-.35.691L65.69 8.212c-.099.153-.148.23-.169.31a.5.5 0 00.011.279c.027.079.082.151.193.296l4.33 5.665c.284.372.426.557.434.712a.5.5 0 01-.217.439c-.128.087-.361.087-.829.087H.77c-.252 0-.378 0-.476-.044a.5.5 0 01-.25-.25C0 15.608 0 15.482 0 15.23V.77z"
        fill="url(#paint0_linear)"
      />
      <Text
        x="28.5" // Set to half of viewBox width
        y="9" // Set to half of viewBox height
        fill={textColor}
        fontSize={textSize}
        fontWeight="700"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {text}
      </Text>
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={0}
          y1={8}
          x2={71}
          y2={8}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={startColor} />
          <Stop offset={1} stopColor={endColor} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgTie;
