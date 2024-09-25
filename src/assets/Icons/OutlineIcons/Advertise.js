import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <Path
      stroke="#F91313"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.346 11.476v5.242M12.346 7.293l.01-.012M12.346 22.484c5.79 0 10.484-4.694 10.484-10.484S18.136 1.516 12.346 1.516 1.862 6.21 1.862 12s4.694 10.484 10.484 10.484Z"
    />
  </Svg>
);
export default SvgComponent;
