import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#767676"
      fillRule="evenodd"
      d="M8.867 5.115a.781.781 0 0 1 1.101.085l6.25 7.292c.251.292.251.724 0 1.017L9.968 20.8a.781.781 0 0 1-1.186-1.017L14.596 13 8.782 6.217a.781.781 0 0 1 .085-1.102Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
