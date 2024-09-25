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
      fill="#fff"
      d="M6.563 14.063h18.75a.938.938 0 0 1 0 1.874H6.563a.938.938 0 0 1 0-1.874Z"
    />
    <Path
      fill="#fff"
      d="m6.95 15 7.776 7.774A.939.939 0 0 1 13.4 24.1l-8.438-8.437a.937.937 0 0 1 0-1.328L13.4 5.9a.939.939 0 1 1 1.328 1.327L6.95 15Z"
    />
  </Svg>
);
export default SvgComponent;
