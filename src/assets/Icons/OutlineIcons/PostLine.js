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
      strokeMiterlimit={10}
      d="M2.502 9.338h12.525A7.163 7.163 0 0 1 22.19 16.5v3.581H2.502V9.338ZM6.083 9.338v10.734M12.346 2.175V15.6M12.346 2.175h4.472v3.581h-4.472V2.175Z"
    />
    <Path
      stroke="#F91313"
      strokeMiterlimit={10}
      d="M10.556 22.762v-2.69h3.58v2.69M11.456 14.71a.89.89 0 1 0 1.78 0 .89.89 0 0 0-1.78 0Z"
    />
  </Svg>
);
export default SvgComponent;
