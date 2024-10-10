import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    fill="none"
    {...props}
    viewBox="0 0 200 200"
  >
    <Path
      stroke="#5DC061"
      strokeMiterlimit={10}
      strokeWidth={12.5}
      d="M175.5 100c0-41.406-33.594-75-75-75s-75 33.594-75 75 33.594 75 75 75 75-33.594 75-75Z"
    />
    <Path
      stroke="#5DC061"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12.5}
      d="m144.25 75-43.699 50-18.73-18.75M75.48 125 56.75 106.25M119.918 75 99.781 98.047"
    />
  </Svg>
);
export default SvgComponent;
