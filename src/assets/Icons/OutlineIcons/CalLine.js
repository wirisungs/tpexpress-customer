import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="-0.5 -0.5 24 24"
    {...props}
  >
    <G fill="none" stroke={props.fill || "#000"} strokeMiterlimit={10}>
      <Path
        strokeLinecap="square"
        d="M4.178 1.438h14.634v20.125H4.178ZM15.16 16.071v0Z"
      />
      <Path strokeLinecap="square" d="M7.84 5.098h7.32V8.76H7.84Z" />
      <Path d="M11.5 11.5v1.83M7.84 11.5v1.83M11.5 14.24v1.831M7.84 14.24v1.831M11.5 16.991v1.83M7.84 16.991v1.83M15.16 11.5v1.83" />
    </G>
  </Svg>
);
export default SvgComponent;
