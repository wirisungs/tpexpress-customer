import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
    viewBox="0 0 35 35"
  >
    <Path
      fill="#111"
      fillRule="evenodd"
      d="M15.357 7.977c.427.427.427 1.12 0 1.546l-6.883 6.883h20.693a1.094 1.094 0 0 1 0 2.188H8.474l6.883 6.883a1.094 1.094 0 0 1-1.547 1.546l-8.75-8.75a1.094 1.094 0 0 1 0-1.546l8.75-8.75a1.094 1.094 0 0 1 1.547 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
