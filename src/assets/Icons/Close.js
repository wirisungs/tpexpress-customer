import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="-0.5 -0.5 24 24"
    {...props}
  >
    <Path d="m12.516 11.5 4.734-4.734-1.016-1.016-4.734 4.734L6.767 5.75 5.75 6.766l4.734 4.734-4.734 4.734 1.017 1.016 4.733-4.734 4.734 4.734 1.016-1.016-4.734-4.734z" />
    <Path fill="none" d="M0 0h23v23H0Z" />
  </Svg>
);
export default SvgComponent;
