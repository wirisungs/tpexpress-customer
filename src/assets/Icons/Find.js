import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="-0.75 -0.75 24 24"
    {...props}
  >
    <Path
      fill="none"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M1.406 8.569a7.162 7.162 0 1 0 14.325 0 7.162 7.162 0 1 0-14.325 0M21.094 21.094 13.49 13.49"
    />
  </Svg>
);
export default SvgComponent;
