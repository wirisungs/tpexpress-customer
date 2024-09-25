import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    viewBox="-0.5 -0.5 36 36"
    {...props}
  >
    <Path
      fill={props.fill || "#000"}
      d="M4.375 30.625V4.375h26.25v26.25H4.375Zm2.917-9.552h20.416v-1.86H7.292v1.86Zm0 4.338h20.416v-1.494H7.292v1.494Z"
    />
  </Svg>
);
export default SvgComponent;
